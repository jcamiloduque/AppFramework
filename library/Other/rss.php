<?php
class app_library_rss{
	
	public function get($URL){
		if(!is_string($URL))return null;
		$doc = new DOMDocument('1.0');
		try{
			$doc->load($URL);
			$arrFeeds = array();
			foreach ($doc->getElementsByTagName('item') as $node) {
			  $itemRSS = array ( 
				'title' => utf8_decode($node->getElementsByTagName('title')->item(0)->nodeValue),
				'description' => utf8_decode($node->getElementsByTagName('description')->item(0)->nodeValue),
				'link' => utf8_decode($node->getElementsByTagName('link')->item(0)->nodeValue),
				'date' => utf8_decode($node->getElementsByTagName('pubDate')->item(0)->nodeValue)
				);
			  array_push($arrFeeds, $itemRSS);
			}
			return $arrFeeds;
		}catch(\Exception $e){return null;}
	}
	
	public function create($data){
		if (!is_array($data))return null;
		$doc = new DOMDocument();
		$tmp = $doc->createElement("rss");
		$tmp->setAttribute("version", "2.0");
		$tmp1 = $doc->createElement("channel");
		$tmp->appendChild($tmp1);
		$tmp2=$doc->createElement("title");
		$tmp2->appendChild($doc->createTextNode($_SERVER["SERVER_NAME"]."'s RSS"));
		$tmp1->appendChild($tmp2);
		$tmp2=$doc->createElement("link");
		$tmp2->appendChild($doc->createTextNode($this->curPageURL()));
		$tmp1->appendChild($tmp2);
		foreach($data as $item){
			if(isset($item['title'])&&isset($item['description'])&&isset($item['link'])&&isset($item['date'])){
				$tmp2 = $doc->createElement("item");
				foreach($item as $key => $value){
					$tmp3=$doc->createElement((string)$key=="date"?"pubDate":(string)$key);
					$tmp3->appendChild($doc->createTextNode((string)$value));
					$tmp2->appendChild($tmp3);
				}
				$tmp1->appendChild($tmp2);
			}
		}
		$doc->appendChild($tmp);
		return $doc;
	}
	
	private function curPageURL() {
		$isHTTPS = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on");
		$url = ($isHTTPS ? 'https://' : 'http://').$_SERVER["SERVER_NAME"];
		return $url;
	} 
	
	public function addItem($rss, $item){
		if (!is_array($item))return false;
		if (!$rss instanceof DOMDocument)return false;
		if(isset($item['title'])&&isset($item['description'])&&isset($item['link'])&&isset($item['date'])){
			$tmp1 = $rss->getElementsByTagName("channel");
			$tmp1 = $tmp1[0];
			$tmp2 = $doc->createElement("item");
			foreach($item as $key => $value){
				$tmp3=$doc->createElement((string)$key=="date"?"pubDate":(string)$key);
				$tmp3->appendChild($doc->createTextNode((string)$value));
				$tmp2->appendChild($tmp3);
			}
			$tmp1->appendChild($tmp2);
			return true;
		}
		else return false;
	}
	
	public function toString($rss){
		if (!$rss instanceof DOMDocument)return false;
		$rss->formatOutput = true;
		return utf8_decode($rss->saveXML());
	}
	
}