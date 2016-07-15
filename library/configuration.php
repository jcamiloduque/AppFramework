<?php
class app_library_configuration {

    private static $data = array();

    public static function add(&$value){
        self::$data=&$value;
    }

    public static function value($key){
        if(!is_string($key))throw new Exception("Invalid Arguments");
        return isset(self::$data[$key])?self::$data[$key]:null;
    }

}