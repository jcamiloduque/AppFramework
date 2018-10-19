<?php
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler");
function curPageURL() {
	$isHTTPS = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on");
	$port = (isset($_SERVER["SERVER_PORT"]) && ((!$isHTTPS && $_SERVER["SERVER_PORT"] != "80") || ($isHTTPS && $_SERVER["SERVER_PORT"] != "443")));
	$port = ($port) ? ':'.$_SERVER["SERVER_PORT"] : '';
	$url = ($isHTTPS ? 'https://' : 'http://').$_SERVER["SERVER_NAME"].$port;
	return $url;
}
$t = is_dir(realpath(dirname(__FILE__) . '/application'))?'':'/..';
defined('APP_PATH') || define('APP_PATH',realpath(dirname(__FILE__) .$t. '/application'));
defined('BASE_PATH') || define('BASE_PATH',realpath(dirname(__FILE__)));
defined('PUBLIC_PATH') || define('PUBLIC_PATH',realpath(APP_PATH . '/../public'));
defined('CACHE_PATH') || define('CACHE_PATH',realpath(APP_PATH . '/../cache'));
defined('OTHER_PATH') || define('OTHER_PATH',realpath(APP_PATH. '/../library/Other'));
defined('BASE_URL') || define('BASE_URL',curPageURL().preg_replace("/\/index.php.*/i","",$_SERVER['PHP_SELF']));
if(file_exists($f = realpath(dirname(__FILE__) .$t. '/vendor/autoload.php')))include_once($f);
$conf = parse_ini_file(realpath(APP_PATH . '/../application/configuration/conf.ini'), true);
if(strtolower($conf["environment"])=="development"&&class_exists("\\Whoops\\Run")) {
	$whoops = new \Whoops\Run;
	$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler);
	$whoops->register();
	set_include_path(implode(PATH_SEPARATOR, array(
		realpath(APP_PATH . '/../library'),
		get_include_path(),
	)));
}
if(isset($conf["session"])){
	if(isset($conf["session"]["defaults"])&&intval($conf["session"]["defaults"])==0)session_set_cookie_params ( $conf["session"]["time"], $conf["session"]["path"], $conf["session"]["domain"], intval($conf["session"]["time"])===1?true:false);
}

spl_autoload_register(function($className) {
	$data = explode('\\', $className);
	if(in_array($data[0],['Framework','App'])){
		$tmp = APP_PATH;
		$t = false;
		if($data[0]=='Framework'){
			$t = true;
			$tmp .= '/../library';
		}
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

if(isset($conf["app_models"]))if(is_array($conf["app_models"])){
	\Framework\Configuration::add($conf["app_models"]);
}
date_default_timezone_set('GMT');
defined('APP_NAME') || define('APP_NAME',isset($conf["app_name"])?$conf["app_name"]:"");
defined('D_SEPARATOR') || define('D_SEPARATOR',DIRECTORY_SEPARATOR == "\\"?"\\\\":DIRECTORY_SEPARATOR);
defined('SQL_FILE_PATH') || define('SQL_FILE_PATH',str_replace("\\","\\\\",realpath(APP_PATH. '/user')));
defined('FILE_PATH') || define('FILE_PATH',realpath(APP_PATH. '/user'));
defined('EXTERNAL_FILE_PATH') || define('EXTERNAL_FILE_PATH',realpath(PUBLIC_PATH. '/images/ext'));
defined('EXTERNAL_FILE_PATH_URL') || define('EXTERNAL_FILE_PATH_URL','images/ext');

function curPageURLsdfg() {
	$isHTTPS = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on");
	$port = (isset($_SERVER["SERVER_PORT"]) && ((!$isHTTPS && $_SERVER["SERVER_PORT"] != "80") || ($isHTTPS && $_SERVER["SERVER_PORT"] != "443")));
	$port = ($port) ? ':'.$_SERVER["SERVER_PORT"] : '';
	$url = ($isHTTPS ? 'https://' : 'http://').$_SERVER["SERVER_NAME"].$port;
	return $url;
}

defined('APP_BASE_URL') || define('APP_BASE_URL',curPageURLsdfg().substr($_SERVER["PHP_SELF"],0, strpos($_SERVER["PHP_SELF"], "/index.php", 0)));
$navigation = new \Framework\Navigate(array("baseUrl" => APP_BASE_URL,"config"=>$conf));
$navigation->navigate();
