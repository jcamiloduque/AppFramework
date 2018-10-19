<?php

namespace Framework\DB;

use \Framework\EventListener;
use Framework\Exception;

class MySQLConnector extends DBConnector {

	public function getError(){
		return mysqli_error(self::$connection );
	}

    /**
     * @param $charset
     * @throws \Exception
     */
    public function setCharset($charset){
		$this->open();
		mysqli_set_charset(self::$connection,$charset);
	}

	protected function open(){
		if(!isset(self::$connection)){
			if(!isset(self::$appConfig["user"])||!isset(self::$appConfig["host"])||!isset(self::$appConfig["password"])||!isset(self::$appConfig["database"]))throw new \Exception("Invalid configuration");
			self::$connection = mysqli_connect(self::$appConfig["host"],self::$appConfig["user"],self::$appConfig["password"]) or ob_get_clean()&&die("Database error");
			mysqli_select_db(self::$connection,self::$appConfig["database"]);
			mysqli_set_charset(self::$connection,"utf8");
			EventListener::addEvent('unload',function(){
				$db = new MySQLConnector();
				$db->close();
			});
			mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
			mysqli_set_charset(self::$connection,!isset(self::$appConfig["charset"])?'utf8':self::$appConfig["charset"]);
        }
    }

    /**
     * @param $value
     * @param string $charset
     * @return array|bool
     * @throws \Exception
     */
    public function fetchAll($value, $charset = "utf8"){
		$this->open();
        $result = mysqli_query(self::$connection,$value);
		$r=array();
		if($result==true){
			while($row=mysqli_fetch_assoc($result)) {
				array_push($r,$row);
			}
			if(!is_bool($result)) {
				mysqli_free_result($result);
				$this->clearStoredResults();
			}
			return $r;
		}else return false;
	}

	private function clearStoredResults(){
		while(mysqli_more_results(self::$connection)&&mysqli_next_result(self::$connection)){
			if($l_result = mysqli_store_result(self::$connection)){
				mysqli_free_result($l_result);
			}
		}
	}

    public function close(){
		if(isset(self::$connection))mysqli_close(self::$connection);
		self::$connection = null;
	}

    /**
     * @param $value
     * @param string $charset
     * @return bool|\mysqli_result
     * @throws \Exception
     */
    public function execute($value, $charset = "utf8"){
		$this->open();
		$result = mysqli_query(self::$connection,$value);
		if(!is_bool($result)){
			mysqli_free_result($result);
			$this->clearStoredResults();
		}
		return $result;
	}

    /**
     * @param $value
     * @param string $charset
     * @return array|null
     * @throws \Exception
     */
    public function fetch($value, $charset = "utf8"){
		$this->open();
		$result = mysqli_query(self::$connection,$value);
		if($result==false)throw new \Exception("Can't fetch the value");
		$rs = mysqli_fetch_assoc($result);
		if(!is_bool($result)){
			mysqli_free_result($result);
			$this->clearStoredResults();
		}
		return $rs;
	}

    /**
     * @param $value
     * @throws \Exception
     */
    public function beginTransaction($value){
		$this->open();
		$result = mysqli_query(self::$connection,"SET AUTOCOMMIT=0");
		mysqli_free_result($result);
		$result = mysqli_query(self::$connection,"START TRANSACTION");
		mysqli_free_result($result);
	}

    /**
     * @param $value
     * @throws \Exception
     */
    public function commit($value){
		$this->open();
		$result = mysqli_query(self::$connection,"COMMIT");
		mysqli_free_result($result);
		$result = mysqli_query(self::$connection,"SET AUTOCOMMIT=1");
		mysqli_free_result($result);
	}

    /**
     * @param $value
     * @return bool
     * @throws \Exception
     */
    public function transaction($value){
		$this->open();
		$result = mysqli_query(self::$connection,"SET AUTOCOMMIT=0");
		$result = mysqli_query(self::$connection,"START TRANSACTION");
		$a1 = mysqli_query(self::$connection,$value) or ob_get_clean()&&die(mysqli_error(self::$connection));
		$this->affectedRows = mysqli_affected_rows(self::$connection);
		if ($a1==true) {
			mysqli_query(self::$connection,"COMMIT");
			mysqli_query(self::$connection,"SET AUTOCOMMIT=1");
			return true;
		} else {
			mysqli_query(self::$connection,"ROLLBACK");
			mysqli_query(self::$connection,"SET AUTOCOMMIT=1");
			return false;
		}
	}

	public function getLastInsertedId(){
		return mysqli_insert_id(self::$connection);
	}
	
	public function affectedRows(){
		return mysqli_affected_rows(self::$connection);
	}

    /**
     * @param $q
     * @param bool $full
     * @return array|string
     * @throws \Exception
     */
    public function scape($q, $full = false){
		$this->open();
		if(is_array($q)) 
			foreach($q as $k => $v)
				$q[$k] = $this->scape($v); //recursive
		elseif(is_string($q))
			$q = mysqli_real_escape_string(self::$connection,$q);
            if($full)$q = addcslashes($q,'%_');
		return $q;
	}
	
}