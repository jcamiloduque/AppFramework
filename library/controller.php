<?php
class app_library_controller{
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
    
    public function __set($name, $value){
        $method = 'set' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)){
            throw new Exception('Propiedad invalida');
        }
        $this->$method($value);
    }
    
	public function linkTo($value=null){
		if(!isset($value))return;
		$tmp=(isset($value["module"])?($value["module"]==(isset($this->APP_CONFIGURATION['default_module'])?$this->APP_CONFIGURATION['default_module']:"index")?"":"/".$value["module"]):"").(isset($value["controller"])?($value["controller"]=="index"?"":"/".$value["controller"]):"").(isset($value["action"])?($value["action"]=="index"?"":"/".$value["action"]):"");
		if (isset($value["values"])){
			foreach($value["values"] as $kay => $val){
				if(isset($val))$tmp.="/".$kay."/".$val;
			}
		}
		return BASE_URL.$tmp;
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
	
	public function __get($name){
        $method = 'get' . $name;
        if (('mapper' == $name) || !method_exists($this, $method)){
            throw new Exception('Propiedad invalida');
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
	
	/*public function render($value=null,$post=null){
		if(!is_array($value))return null;
		$tmp=(isset($value["module"])?($value["module"]=="index"?"":"/".$value["module"]):"").(isset($value["controller"])?($value["controller"]=="index"?"":"/".$value["controller"]):"").(isset($value["action"])?($value["action"]=="index"?"":"/".$value["action"]):"");
		if (isset($value["values"])){
			foreach($value["values"] as $kay => $val){
				if(isset($val))$tmp.="/".$kay."/".$val;
			}
		}
		if(!isset($post))$handle = file_get_contents(BASE_URL.$tmp, "r");
		else{
			$data_url = http_build_query ($post);
			$data_len = strlen ($data_url);
			return @file_get_contents(BASE_URL.$tmp, false, stream_context_create (array ('http'=>array ('method'=>'POST', 'header'=>"Connection: close\r\nContent-Length: $data_len\r\nContent-type: application/x-www-form-urlencoded\r\nAccept-Language: ".$_SERVER['HTTP_ACCEPT_LANGUAGE']."\r\n", 'content'=>$data_url))));
		}
		return $handle;
	}*/
	
	public function render($value=null){
		if(!is_array($value))return null;
		if(!isset($value["module"])||!isset($value["controller"])||!isset($value["action"]))return null;
		foreach($value as $key => $v)if(is_string($value[$key]))$value[$key]=strtolower($v);
		ob_start();
		if(!isset($_SESSION))session_start();
		$_SESSION["APP_RENDER_NUM"]=!isset($_SESSION["APP_RENDER_NUM"])?0:(((int)$_SESSION["APP_RENDER_NUM"])+1);
		
		//Same as Navigate:
		if(!file_exists(realpath(APP_PATH."/modules"."/".$value['module']."/controllers/".$value['controller']."Controller".".php"))){
			ob_get_clean();
			ob_start();
			echo "<h1>"."Can't find controller ".(string)$value['controller']."Controller"."!!!</h1>";
			throw new Exception("Can not find controller ".(string)$value['controller']."Controller");
			return ob_get_clean();
		}
		$lay = array();
		if(!class_exists($value['controller']."Controller"))require_once(realpath(APP_PATH."/modules"."/".$value['module']."/controllers/".$value['controller']."Controller".".php"));
		$t=$value['controller']."Controller";
		$var= new $t();
		$var->app_Actual=$value;
		$var->_GET=isset($value['values'])?$value['values']:array();
		$var->APP_CONFIGURATION=$this->APP_CONFIGURATION;
        $var->internalCall=true;
        $var->init();
		if(!$var->isCancelAction()){
			$t=(string)$value['action']."Action";
			if(!method_exists($var,$t)){
				ob_get_clean();
				ob_start();
				echo "<h1>"."Can't find controller action ".(string)$value['action']."!!!</h1>";
				return ob_get_clean();
			}
			$var->$t();
			$lay= $var->_layout;
			if(!$var->isCancelView()){
				if(!file_exists(realpath(APP_PATH."/modules"."/".$value['module']."/views/".$value['controller']."/".$value['action'].".phtml"))){
					ob_get_clean();
					ob_start();
					echo "<h1>"."Can't find view for ".(string)$value['action']." Action!!!</h1>";
					return ob_get_clean();
				}
				require_once("view.php");
				$view = file_get_contents(realpath(APP_PATH."/modules"."/".$value['module']."/views/".$value['controller']."/".$value['action'].".phtml"));
				$view1= "class app_library_myView".$_SESSION["APP_RENDER_NUM"]." extends app_library_controller_view{\npublic \$APP_CONFIGURATION =".var_export($this->APP_CONFIGURATION, true).";\n";
				$view1.="\npublic function init(){\n?>".(string)$view."<?php\n}\n}";
				eval($view1);
				unset($view1);
				unset($view);
				$t="app_library_myView".$_SESSION["APP_RENDER_NUM"];
				$view = new $t($var->_view);
				foreach($view->_layout as $key => $v){
					$lay[$key]=$v;
				}
				unset($view);
			}
		}
		$content = ob_get_clean();
		$temp=$var->hasPrivateLayout()?$var->getLayout():(isset($this->APP_CONFIGURATION['layout_'.(string)$value['module'].'_'.(string)$value['controller']])?$this->APP_CONFIGURATION['layout_'.(string)$value['module'].'_'.(string)$value['controller']]:(isset($this->APP_CONFIGURATION['layout_'.(string)$value['module']])?$this->APP_CONFIGURATION['layout_'.(string)$value['module']]:(isset($this->APP_CONFIGURATION['layout'])?$this->APP_CONFIGURATION['layout']:null)));
		if(!$var->isCancelLayout()){
			if($temp!=null){
				ob_start();
				if(!file_exists(realpath(APP_PATH."/layouts"."/".(string)$temp.".phtml"))){
					echo "<h1>"."Can't find layout ".(string)$temp."!!!</h1>";
					return;
				}
				require_once("layout.php");
				$layout1 = file_get_contents(realpath(APP_PATH."/layouts"."/".(string)$temp.".phtml"));
				$layout= "class app_library_myLayout".$_SESSION["APP_RENDER_NUM"]." extends app_library_layout{\npublic \$APP_CONFIGURATION = ".var_export($this->APP_CONFIGURATION, true).";\n";
				$layout.="\npublic function init(){\n?>".(string)$layout1."<?php\n}\n}";
				eval($layout);
				unset($layout1);
				unset($layout);
				$t="app_library_myLayout".$_SESSION["APP_RENDER_NUM"];
				$layout = new $t($lay);
				$layout->setContent($content);
				$layout->init();
				unset($layout);
				return ob_get_clean();
			}
		}return $content;
	}

    public function currentURL() {
        $isHTTPS = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on");
        $port = (isset($_SERVER["SERVER_PORT"]) && ((!$isHTTPS && $_SERVER["SERVER_PORT"] != "80") || ($isHTTPS && $_SERVER["SERVER_PORT"] != "443")));
        $port = ($port) ? ':'.$_SERVER["SERVER_PORT"] : '';
        $url = ($isHTTPS ? 'https://' : 'http://').$_SERVER["SERVER_NAME"].$port.$_SERVER["REQUEST_URI"];
        return $url;
    }

}