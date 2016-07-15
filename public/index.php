<?php
if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) ob_start("ob_gzhandler");
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
$conf = parse_ini_file(realpath(APP_PATH . '/../application/configuration/conf.ini'), true);
require("configuration.php");
if(isset($conf["app_models"]))if(is_array($conf["app_models"])){
	app_library_configuration::add($conf["app_models"]);
}
date_default_timezone_set('GMT');
defined('APP_NAME') || define('APP_NAME',isset($conf["app_name"])?$conf["app_name"]:"");
defined('D_SEPARATOR') || define('D_SEPARATOR',DIRECTORY_SEPARATOR == "\\"?"\\\\":DIRECTORY_SEPARATOR);
defined('SQL_FILE_PATH') || define('SQL_FILE_PATH',str_replace("\\","\\\\",realpath(APP_PATH. '/user')));
defined('FILE_PATH') || define('FILE_PATH',realpath(APP_PATH. '/user'));
defined('EXTERNAL_FILE_PATH') || define('EXTERNAL_FILE_PATH',realpath(PUBLIC_PATH. '/images/ext'));
defined('EXTERNAL_FILE_PATH_URL') || define('EXTERNAL_FILE_PATH_URL','images/ext');
require_once("navigate.php");
function curPageURLsdfg() {
	$isHTTPS = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on");
	$port = (isset($_SERVER["SERVER_PORT"]) && ((!$isHTTPS && $_SERVER["SERVER_PORT"] != "80") || ($isHTTPS && $_SERVER["SERVER_PORT"] != "443")));
	$port = ($port) ? ':'.$_SERVER["SERVER_PORT"] : '';
	$url = ($isHTTPS ? 'https://' : 'http://').$_SERVER["SERVER_NAME"];
	return $url;
}

defined('APP_BASE_URL') || define('APP_BASE_URL',curPageURLsdfg().substr($_SERVER["PHP_SELF"],0, strpos($_SERVER["PHP_SELF"], "/index.php", 0)));
$navigation = new navigate(array("baseUrl" => APP_BASE_URL,"config"=>$conf));
$navigation->navigate();