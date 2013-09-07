<?php 
class app_translator{
	
	static private $isWritting=array();
	
	static public function translate($value, $lang=null,$save=true){
		header('Content-type: text/html; charset=utf-8');
		if(is_array($value)){
			$dt=array();
			foreach($value as $key => $val){
				$dt[$key]=self::translate($val,$lang);
			}
			return $dt;
		}else if(!is_string($value))return $value;
		if($lang==null)$lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
		if(isset(self::$conf["adminted_languages"]))$lang=in_array($lang,self::$conf["adminted_languages"])?$lang:self::$conf["language"];
		if($lang==self::$conf["language"])return $value;
		while(in_array($lang,self::$isWritting))sleep(1);
		$path=APP_PATH."/translate/".self::$conf["language"]."2".$lang.".txt";
		if(!file_exists($path)){
			$file = fopen($path, 'w') or die("can't open file to translate");
			fwrite($file,'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><'.$lang.'></'.$lang.'>');
			fclose($file);
		}
		$xml = simplexml_load_file($path);
		foreach($xml->children() as $ch)if($ch->phrase==$value)return $ch->translate;
		$data = self::googleTranslate($value,self::$conf["language"],$lang);
		if(!$save)return $data;
		array_push(self::$isWritting,$lang);
		$t=$xml->addChild('item');
		$t->addChild('phrase', $value);
		$t->addChild('translate',$data);
		$xml->asXML($path) or die("can't open file to translate");
		$pos = array_search($lang,self::$isWritting);
		if($pos!== false)unset(self::$isWritting[$pos]);
		return $data;
	}
	
	static private function googleTranslate($string,$from='en',$to='es'){
		error_reporting(E_ALL | E_STRICT);
		$context = stream_context_create(array(
			'http' => array(
				'method' => 'POST',
				'header' => implode("\r\n", array(
						'Content-type: application/x-www-form-urlencoded',
						'Accept-Language: en-us,en;q=0.5', // optional
						'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7' // optional
				)),
				'content' => http_build_query(array(
						'prev'  =>      '_t',
						'hl'    =>      'en',
						'ie'    =>      'UTF-8',
						'text'  =>      $string,
						'sl'    =>      $from,
						'tl'    =>      $to
				))
			)
		));
		@$source =file_get_contents('http://translate.google.com/translate_t', false, $context);
		$tag="span";
		@preg_match('/<'.$tag.'[^>]*result_box[^>]*>(<(\S+)[^>]*>([^><]*(<(\S+)>)*[^><]*)*<\/[^>]*>)*<\/'.$tag.'>/i', $source, $matches);
		@$source2=preg_replace("/\"[\s\S]*/","",preg_replace("/(.*)meta content=\"text\/html; charset=/","",$source));
		@$matches=preg_replace("/<[^>]*br[^>]*>/i","\n",$matches[0]);
		@$matches=preg_replace("/<[^>]*>/","",$matches);
		unset($source);
		unset($context);
		return @iconv($source2,'UTF-8',$matches);
	}
	
	
}