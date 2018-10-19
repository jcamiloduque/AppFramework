<?php
namespace Framework;

class Configuration {

    private static $data = array();

    public static function add(&$value){
        self::$data=&$value;
    }

    /**
     * @param $key
     * @param null $base
     * @return mixed|null
     * @throws \Exception
     */
    public static function value($key, $base=null){
        if(!is_string($key))throw new \Exception("Invalid Arguments");
        if(!isset($base))return isset(self::$data[$key])?self::$data[$key]:null;
        else {
            if(isset(self::$data[$base])&&isset(self::$data[$base][$key]))return self::$data[$base][$key];
            return null;
        }
    }

}