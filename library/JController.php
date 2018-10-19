<?php

namespace Framework;

class JController extends Controller {
    public $isJson = false;
    private $_isCanceled = false;

    public function cancelJson(){
        $this->_isCanceled = true;
    }

    public function isCanceledJson(){
        return $this->_isCanceled;
    }
}