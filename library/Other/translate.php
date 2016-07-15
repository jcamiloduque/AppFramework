<?php 
class app_translator{
	
	static private $isWritting=array();
	static private $HTTP_ACCEPT_LANGUAGE="";
    static private $xml=array();

    /**
     * @param $value
     * @param null $lang Language to translate to. Null means that it will take the client language
     * @param bool $save If you want to store the result
     * @return array|string Translated text
     */
    static public function translate($value, $lang=null,$save=true){
		if(!isset($_SESSION))session_start();
		if(isset($_SERVER["HTTP_ACCEPT_LANGUAGE"]))self::$HTTP_ACCEPT_LANGUAGE=$_SESSION["HTTP_ACCEPT_LANGUAGE"]=$_SERVER["HTTP_ACCEPT_LANGUAGE"];
		else self::$HTTP_ACCEPT_LANGUAGE=isset($_SESSION["HTTP_ACCEPT_LANGUAGE"])?$_SESSION["HTTP_ACCEPT_LANGUAGE"]:"en";
		if(is_array($value)){
			$dt=array();
			foreach($value as $key => $val){
				if(is_string($val))$dt[$key]=(string)self::translate($val,$lang);
                else $dt[$key]=self::translate($val,$lang);
			}
			return $dt;
		}else if(!is_string($value))return $value;
		if($lang==null)$lang = substr(self::$HTTP_ACCEPT_LANGUAGE, 0, 2);
		if(isset(self::$conf["adminted_languages"]))$lang=in_array($lang,self::$conf["adminted_languages"])?$lang:self::$conf["language"];
		if($lang==self::$conf["language"])return $value;
        $path=APP_PATH."/translate/".self::$conf["language"]."2".$lang.".txt";
        if(!isset(self::$xml[$lang])){
            while(in_array($lang,self::$isWritting))sleep(1);
            if(!file_exists($path)){
                $file = fopen($path, 'w') or die("can't open file to translate");
                fwrite($file,'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><'.$lang.'></'.$lang.'>');
                fclose($file);
            }
            self::$xml[$lang] = simplexml_load_file($path);
        }
		foreach(self::$xml[$lang]->children() as $ch)if($ch->phrase==$value)return $ch->translate;
		$data = self::staticTranslate($value,self::$conf["language"],$lang);
        if($data==false||$data=="")$data = $value;
		if(!$save)return $data;
		array_push(self::$isWritting,$lang);
		$t=self::$xml[$lang]->addChild('item');
		$t->addChild('phrase', $value);
		$t->addChild('translate',$data);
        self::$xml[$lang]->asXML($path) or die("can't open file to save the translation");
		$pos = array_search($lang,self::$isWritting);
		if($pos!== false)unset(self::$isWritting[$pos]);
		return $data;
	}

    /**
     * Simplified curl method
     * @param string $url URL
     * @param array $params Parameter array
     * @param boolean $cookieSet
     * @return string
     * @access public
     */
    private static final function makeCurl($url, array $params = array(), $cookieSet = false) {
        $cookie = null;
        if (!$cookieSet) {
            $cookie = tempnam(sys_get_temp_dir(), "CURLCOOKIE");
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $output = curl_exec($ch);

            // Clean up temporary file
            unset($ch);
            unlink($cookie);

            return $output;
        }

        $queryString = http_build_query($params);

        $curl = curl_init($url . "?" . $queryString);
        curl_setopt($curl, CURLOPT_COOKIEFILE, $cookie);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $output = curl_exec($curl);

        return $output;
    }

    /**
     * Static method for translating text
     *
     * @param string $string Text to translate
     * @param string $from Language code
     * @param string $to Language code
     * @return string/boolean Translated text
     * @access public
     */
    private static function staticTranslate($string,$from='en',$to='es') {
        $url = sprintf("http://translate.google.com/translate_a/t?client=t&text=%s&hl=en&sl=%s&tl=%s&ie=UTF-8&oe=UTF-8&multires=1&otf=1&pc=1&trs=1&ssel=3&tsel=6&sc=1", rawurlencode($string), $from, $to);
        $result = preg_replace('!,+!', ',', self::makeCurl($url)); // remove repeated commas (causing JSON syntax error)
        $resultArray = json_decode($result, true);
        $finalResult = "";
        if (!empty($resultArray[0])) {
            foreach ($resultArray[0] as $results) {
                $finalResult .= $results[0];
            }
            return $finalResult;
        }
        return false;
    }
	
	
}