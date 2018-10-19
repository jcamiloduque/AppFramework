<?php

namespace Framework\DB;

abstract class DBConnector implements DBConnectorInterface{

    abstract protected function open();

    protected static $connection = null;
    protected static $appConfig = null;

    public static function init(&$config){
        if(!isset(self::$appConfig))
            self::$appConfig = $config;
    }

    public function __set($name, $value){
        $method = 'set' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)){
            throw new \Exception('Propiedad invalida');
        }
        $this->$method($value);
    }

    public function __get($name){
        $method = 'get' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)){
            throw new \Exception('Propiedad invalida');
        }
        return $this->$method();
    }

    public function __construct(array $options = null){
        if (is_array($options)){
            $this->setOptions($options);
        }
    }

    public function setOptions(array $options){
        $methods = get_class_methods($this);
        foreach ($options as $key => $value) {
            $method = 'set' . ucfirst($key);
            if (in_array($method, $methods)) {
                $this->$method($value);
            }
        }
        return $this;
    }

}