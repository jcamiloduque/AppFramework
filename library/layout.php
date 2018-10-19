<?php
namespace Framework;

class Layout extends UserInterface{

	use Linking, FileLinking;

	private $_content;

	public function setContent($value){
		$this->_content=$value;
	}

	public function getContent(){
		echo $this->_content;
	}
	
}