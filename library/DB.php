<?php

namespace Framework;
use Framework\DB\MySQLConnector;

/**
 * Class DB
 * @package Framework
 * @method static int getLastInsertedId()
 * @method static string getError()
 * @method static void setCharset($charset)
 * @method static array fetchAll($value, $charset = "utf8")
 * @method static void close()
 * @method static mixed execute($value, $charset = "utf8")
 * @method static array fetch($value, $charset = "utf8")
 * @method static void beginTransaction($value)
 * @method static void commit($value)
 * @method static mixed transaction($value)
 * @method static int affectedRows()
 * @method static mixed scape($q,$full = false)
 */
class DB{

    private static $connector = null;

    public static function getInstance(){
        if (self::$connector === null) {
            self::$connector = new MySQLConnector();
        }
        return self::$connector;
    }

    public function __call($name, $arguments){
        self::getInstance();
        return call_user_func_array(array(self::$connector, $name),$arguments);
    }

    public static function __callStatic($name, $arguments){
        self::getInstance();
        return call_user_func_array(array(self::$connector, $name),$arguments);
    }


}