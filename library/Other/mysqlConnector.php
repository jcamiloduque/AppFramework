<?php
class app_library_mySQLConnector {
	
	private $connection;
	
	public function __construct(array $options = null){
        if (is_array($options)){
            $this->setOptions($options);
        }
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
	
	private function open(){
		if(!isset($this->app_Config["db_user"])||!isset($this->app_Config["db_host"])||!isset($this->app_Config["db_password"])||!isset($this->app_Config["db_database"]))throw new Exception("No attributes allowed");
		$this->connection = mysql_connect($this->app_Config["db_host"],$this->app_Config["db_user"],$this->app_Config["db_password"]) or die("Database error"); 
		mysql_select_db($this->app_Config["db_database"], $this->connection);
	}
	
	public function fetchAll($value){
		$this->open();
		$result = mysql_query($value) or die(mysql_error());
		mysql_close(); 
		$r=array();
		if($result==true){
			while($row=mysql_fetch_assoc($result)) {
				array_push($r,$row);
			}
			return $r;
		}
		else return false;
	}
	
	public function execute($value){
		$this->open();
		$result = mysql_query($value) or die(mysql_error());
		mysql_close(); 
		$r=array();
		return $result;
	}
	
	public function fetch($value){
		if($result==false)throw new Exception("Can't fetch the value");
		return mysql_fetch_assoc($value) or die(mysql_error());
	}
	
	public function transaction($value){
		$this->open();
		mysql_query("SET AUTOCOMMIT=0");
		mysql_query("START TRANSACTION");
		$a1 = mysql_query($value);
		if ($a1==true) {
			mysql_query("COMMIT");
			mysql_query("SET AUTOCOMMIT=1");
			mysql_close();
			return true;
		} else {        
			mysql_query("ROLLBACK");
			mysql_query("SET AUTOCOMMIT=1");
			mysql_close();
			return false;
		}
		
	}
	
	public function scape($q){
		$this->open();
		if(is_array($q)) 
			foreach($q as $k => $v) 
				$q[$k] = mres($v); //recursive
		elseif(is_string($q))
			$q = mysql_real_escape_string($q);
		return $q;
	}
	
}