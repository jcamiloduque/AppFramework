<?php 
function curPageURL() {
	$isHTTPS = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on");
	$url = ($isHTTPS ? 'https://' : 'http://').$_SERVER["SERVER_NAME"];
	return $url;
} 
$t = is_dir(realpath(dirname(__FILE__) . '/application'))?'':'/..';
defined('APP_PATH') || define('APP_PATH',realpath(dirname(__FILE__) .$t. '/application'));
defined('BASE_PATH') || define('BASE_PATH',realpath(dirname(__FILE__)));
defined('PUBLIC_PATH') || define('PUBLIC_PATH',realpath(APP_PATH . '/../public'));
defined('OTHER_PATH') || define('OTHER_PATH',realpath(APP_PATH. '/../library/Other'));
defined('BASE_URL') || define('BASE_URL',curPageURL().str_replace("/index.php","",$_SERVER['PHP_SELF']));
set_include_path(implode(PATH_SEPARATOR, array(
    realpath(APP_PATH . '/../library'),
    get_include_path(),
)));
$conf = parse_ini_file(realpath(APP_PATH . '/../application/configuration/conf.ini'));
defined('APP_NAME') || define('APP_NAME',isset($conf["app_name"])?$conf["app_name"]:"");

require_once("navigate.php");
function curPageURLsdfg() {
	$isHTTPS = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on");
	$port = (isset($_SERVER["SERVER_PORT"]) && ((!$isHTTPS && $_SERVER["SERVER_PORT"] != "80") || ($isHTTPS && $_SERVER["SERVER_PORT"] != "443")));
	$port = ($port) ? ':'.$_SERVER["SERVER_PORT"] : '';
	$url = ($isHTTPS ? 'https://' : 'http://').$_SERVER["SERVER_NAME"];
	return $url;
} 
	
$navigation = new navigate(array("baseUrl" => curPageURLsdfg().substr($_SERVER["PHP_SELF"],0, strpos($_SERVER["PHP_SELF"], "/index.php", 0)),"config"=>$conf));
$navigation->navigate();
