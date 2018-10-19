<?php
namespace Framework;

class UserInterface{

    use Linking, FileLinking;

    protected $APP_CONFIGURATION;

    public function __construct($config, array $options = null){
        $this->APP_CONFIGURATION = $config;
        if(is_array($options))
            foreach($options as $key => $value){
                $this->$key = $value;
            }
    }

    public function init($file){
        include_once($file);
    }

}