<?php

namespace Framework;

class Controller{

	use Linking;

	private $cancelAction=false;
	private $cancelView=false;
	private $cancelLayout=false;
	private $layout=null;
	public $_GET;
	public $app_Actual;
	public $_layout= array();
	public $_view = array();
    public $internalCall = false;
	public $APP_CONFIGURATION=array();
	
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

    /**
     * @param $name
     * @param $value
     * @throws \Exception
     */
    public function __set($name, $value){
        $method = 'set' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)){
            throw new \Exception('Propiedad invalida');
        }
        $this->$method($value);
    }


	
	public function redirect($value=null){
		if(!isset($value))return;
		$tmp=(isset($value["module"])?($value["module"]==(isset($this->APP_CONFIGURATION['default_module'])?$this->APP_CONFIGURATION['default_module']:"index")?"":"/".$value["module"]):"").(isset($value["controller"])?($value["controller"]=="index"?"":"/".$value["controller"]):"").(isset($value["action"])?($value["action"]=="index"?"":"/".$value["action"]):"");
		if (isset($value["values"])){
			foreach($value["values"] as $kay => $val){
				if(isset($val))$tmp.="/".$kay."/".$val;
			}
		}
		if (isset($value["hash"]))$tmp.="#".$value["hash"];
		header("Location: ".BASE_URL.$tmp);
		exit;
	}

    /**
     * @param $name
     * @return mixed
     * @throws \Exception
     */
    public function __get($name){
        $method = 'get' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)){
            throw new \Exception('Propiedad invalida');
        }
        return $this->$method();
    }
	
	public function init(){}
	
	public function cancelAction(){
		$this->cancelAction = true;
	}
	
	public function isCancelAction(){
		return $this->cancelAction;
	}
	
	public function cancelView(){
		$this->cancelView= true;
	}
	
	public function isCancelView(){
		return $this->cancelView;
	}
	
	public function cancelLayout(){
		$this->cancelLayout= true;
	}
	
	public function isCancelLayout(){
		return $this->cancelLayout;
	}
	
	public function setLayout($value){
		$this->layout= $value;
	}
	
	public function hasPrivateLayout(){
		return $this->layout!=null;
	}
	
	public function getLayout(){
		return $this->layout;
	}

    public function currentURL() {
        $isHTTPS = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on");
        $port = (isset($_SERVER["SERVER_PORT"]) && ((!$isHTTPS && $_SERVER["SERVER_PORT"] != "80") || ($isHTTPS && $_SERVER["SERVER_PORT"] != "443")));
        $port = ($port) ? ':'.$_SERVER["SERVER_PORT"] : '';
        $url = ($isHTTPS ? 'https://' : 'http://').$_SERVER["SERVER_NAME"].$port.$_SERVER["REQUEST_URI"];
        return $url;
    }

}