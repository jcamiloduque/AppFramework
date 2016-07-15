<?php

class app_library_mySQLConnector {
	
	private static $connection = null;
	private $lastId;
	private $affectedRows = null;
	
	public function __construct(array $options = null){
        if (is_array($options)){
            $this->setOptions($options);
        }
    }
	
	public function getLastInsertedId(){
		return $this->lastId;
	}
    
	public function setOptions(array $options)
    {
        $methods = get_class_methods($this);
        foreach ($options as $key => $value) {
            $method = 'set' . ucfirst($key);
            if (in_array($method, $methods)) {
            	//Llamar el método
                $this->$method($value);
            }
        }
        //Se devuelve el objeto
        return $this;
    }
	
    public function __set($name, $value){
        $method = 'set' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)){
            throw new Exception('Propiedad invalida');
        }
        $this->$method($value);
    }
    
	public function __get($name){
        $method = 'get' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)){
            throw new Exception('Propiedad invalida');
        }
        return $this->$method();
    }

	public function setCharset($charset){
		$this->open();
		mysqli_set_charset(self::$connection,$charset);
	}

	private function open(){
		if(!isset($connection)){
			if(!isset($this->app_Config["db_user"])||!isset($this->app_Config["db_host"])||!isset($this->app_Config["db_password"])||!isset($this->app_Config["db_database"]))throw new Exception("No attributes allowed");
			self::$connection = mysqli_connect($this->app_Config["db_host"],$this->app_Config["db_user"],$this->app_Config["db_password"]) or ob_get_clean()&&die("Database error");
			mysqli_select_db(self::$connection,$this->app_Config["db_database"]);
			mysqli_set_charset(self::$connection,"utf8");
			EventListener::addEvent('unload',function(){
				$db = new app_library_mySQLConnector();
				$db->close();
			});
			//mysqli_query(self::$connection,"SET NAMES utf8")or die(mysqli_error(self::$connection));
        }
    }

	public function fetchAll($value, $charset = "utf8"){
		$this->open();
		mysqli_set_charset(self::$connection,$charset);
        $result = mysqli_query(self::$connection,$value) or ob_get_clean()&&die(mysqli_error(self::$connection));
		$r=array();
		if($result==true){
			while($row=mysqli_fetch_assoc($result)) {
				array_push($r,$row);
			}
			return $r;
		}
		else return false;
	}

	public function close(){
		if(isset(self::$connection))mysqli_close(self::$connection);
		self::$connection = null;
	}

	public function execute($value, $charset = "utf8"){
		$this->open();
		mysqli_set_charset(self::$connection,$charset);
		$result = mysqli_query(self::$connection,$value) or ob_get_clean()&&die(mysqli_error(self::$connection));
		$this->lastId = mysqli_insert_id(self::$connection);
		$this->affectedRows = mysqli_affected_rows(self::$connection);
		return $result;
	}

	public function fetch($value, $charset = "utf8"){
		$this->open();
		mysqli_set_charset(self::$connection,$charset);
		$result = mysqli_query(self::$connection,$value) or ob_get_clean()&&die(mysqli_error(self::$connection));
		if($result==false)throw new Exception("Can't fetch the value");
		return mysqli_fetch_assoc($value) or ob_get_clean()&&die(mysqli_error(self::$connection));
	}

	public function beginTransaction($value){
		$this->open();
		mysqli_query(self::$connection,"SET AUTOCOMMIT=0");
		mysqli_query(self::$connection,"START TRANSACTION");
	}

	public function commit($value){
		$this->open();
		mysqli_query(self::$connection,"COMMIT");
		mysqli_query(self::$connection,"SET AUTOCOMMIT=1");
	}

	public function transaction($value){
		$this->open();
		mysqli_query(self::$connection,"SET AUTOCOMMIT=0");
		mysqli_query(self::$connection,"START TRANSACTION");
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
	
	public function affectedRows(){
		return $this->affectedRows;
	}
	
	public function scape($q,$full = false){
		$this->open();
		if(is_array($q)) 
			foreach($q as $k => $v)
				$q[$k] = scape($v); //recursive
		elseif(is_string($q))
			$q = mysqli_real_escape_string(self::$connection,$q);
            if($full)$q = addcslashes($q,'%_');
		return $q;
	}
	
}