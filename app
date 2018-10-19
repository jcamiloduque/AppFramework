<?php
defined('BASE_PATH') || define('BASE_PATH',realpath(dirname(__FILE__)));
if(file_exists($f = realpath(BASE_PATH . '/vendor/autoload.php')))include_once($f);
else throw new \Exception('Functionality not supported');

spl_autoload_register(function($className){
    $data = explode('\\', $className);
    if(in_array($data[0],['Command'])){
        $tmp = BASE_PATH.'/commands';
        $t = false;
        for($i=1;$i<count($data)-1;$i++){
            $tmp.= DIRECTORY_SEPARATOR . (!$t?$data[$i]:strtolower($data[$i]));
        }
        $tmp.=DIRECTORY_SEPARATOR . $data[$i].".php";
        if (@is_readable($tmp)) {
            require_once($tmp);
            return TRUE;
        }
    }
    return FALSE;
});

$app = new Symfony\Component\Console\Application();

$app->add(new \Command\Serve\ServeCommand());

$app->run();
