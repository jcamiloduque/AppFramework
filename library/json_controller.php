<?php

class app_json_controller extends app_library_controller {
    public $isJson = false;
    private $_isCanceled = false;

    public function cancelJson(){
        $this->_isCanceled = true;
    }

    public function isCanceledJson(){
        return $this->_isCanceled;
    }
}