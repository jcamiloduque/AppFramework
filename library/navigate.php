<?php

class EventListener{
	protected static $events = array();

	public static function addEvent($event,$fun){
		if(!is_string($event)||!is_callable($fun))throw new Exception("Invalid Attributes");
		if(isset(self::$events[$event]))array_push(self::$events[$event],$fun);
		else self::$events[$event] = array($fun);
	}

	public static function dispatchEvent($event){
		if(!is_string($event))throw new Exception("Invalid Attributes");
		if(isset(self::$events)&&isset(self::$events[$event])){
			foreach(self::$events[$event] as &$fun){
				$fun();
			}
		}
	}
}

class navigate {
	private $_navigate=null;
	private $conf=null;
	private $navigateTo = null;
	
    public function __construct(array $options = null){
		header('Content-type: text/html; charset=utf-8');
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
	
	private function setBaseUrl($value){
		$this->_navigate = substr($this->curPageURL(), strpos($this->curPageURL(), $value, 0)+strlen($value)+1, strlen($this->curPageURL()));
	}
	
	private function setConfig($value){
		$this->conf = $value;
	}
	
	public function navigate(){
        $isJson = false;
		$t= $this->findModels();
		foreach($t as $model)include_once(realpath(APP_PATH."/models/".$model.".php"));
		$t= $this->findLibs();
		foreach($t as $libs){
			$tmp = file_get_contents(realpath(APP_PATH."/../library/Other/".$libs.".php"));
			$pos =strpos($tmp, "{")+1;
			$tmp2="private \$app_Config=".var_export($this->conf, true).";"."private static \$conf=".var_export($this->conf, true).";";
			$tmp = substr($tmp, 0, $pos) . $tmp2 . substr($tmp, $pos);
			eval("?>".$tmp);
			unset($tmp);
			unset($tmp2);
			unset($pos);
		}
		unset($t);
		$this->findPath();
		ob_start();
		if(!file_exists(realpath(APP_PATH."/modules"."/".$this->navigateTo['module']."/controllers/".$this->navigateTo['controller'].".php"))){
			ob_get_clean();
            ob_start();
			echo "<h1>"."Can't find controller ".(string)$this->navigateTo['controller']."!!!</h1>";
			//throw new Exception("Can not find controller ".(string)$this->navigateTo['controller']);
            if($isJson){
                include_once("HTMLConvert.php");
                $tmp = array(
                    'string'=>"",
                    'module'=>'admin'
                );
                $convert= new HTMLConvert($tmp);
                $convert->setString(ob_get_clean());
                @header('Content-type: text/html; charset=utf-8');
                echo json_encode($convert->getArray());
            }
			return;
		}
		include_once("controller.php");
        include_once("json_controller.php");
        include_once("HTMLConvert.php");
		$lay = null;
		include_once(realpath(APP_PATH."/modules"."/".$this->navigateTo['module']."/controllers/".$this->navigateTo['controller'].".php"));
		$var= new $this->navigateTo['controller']();
        if(isset($_POST)&&($var instanceof app_json_controller))if(isset($this->conf["jsonPage_name"])){
            if(isset($_POST[$this->conf["jsonPage_name"]]))if(isset($this->conf["jsonPage_value"]))if($this->conf["jsonPage_value"]==$_POST[$this->conf["jsonPage_name"]]){
                if(isset($this->conf["jsonPage_status"]))if($this->conf["jsonPage_status"]=="enable"){
                    $var->isJson=true;
                    $isJson = true;
                }
            }
        }
		$var->app_Actual=array("module"=>$this->navigateTo['module'],"controller"=>str_replace("Controller","",$this->navigateTo['controller']),"action"=>$this->navigateTo['action']);
		$var->_GET=isset($this->navigateTo['values'])?$this->navigateTo['values']:array();
		$var->APP_CONFIGURATION=$this->conf;
		$var->init();
        if($var instanceof app_json_controller)if($var->isCanceledJson())$isJson = false;
		if(!$var->isCancelAction()){
			$temp=(string)$this->navigateTo['action']."Action";
			if(!method_exists($var,$temp)){
				ob_get_clean();
                ob_start();
				echo "<h1>"."Can't find controller action ".(string)$this->navigateTo['action']."!!!</h1>";
				//hrow new Exception("Can not find controller action ".(string)$this->navigateTo['action']);
                if($isJson){
                    $tmp = array(
                        'string'=>"",
                        'module'=>'admin'
                    );
                    $convert= new HTMLConvert($tmp);
                    $convert->setString(ob_get_clean());
                    @header('Content-type: text/html; charset=utf-8');
                    echo json_encode($convert->getArray());
                }
				return;
			}
			$var->$temp();
			$lay= $var->_layout;
			if(!$var->isCancelView()){
				if(!file_exists(realpath(APP_PATH."/modules"."/".$this->navigateTo['module']."/views/".str_replace("Controller","",$this->navigateTo['controller'])."/".$this->navigateTo['action'].".phtml"))){
					ob_get_clean();
                    ob_start();
					echo "<h1>"."Can't find view for ".(string)$this->navigateTo['action']." Action!!!</h1>";
					//throw new Exception("Can not find view ".(string)$this->navigateTo['controller']);
                    if($isJson){
                        include_once("HTMLConvert.php");
                        $tmp = array(
                            'string'=>"",
                            'module'=>'admin'
                        );
                        $convert= new HTMLConvert($tmp);
                        $convert->setString(ob_get_clean());
                        @header('Content-type: text/html; charset=utf-8');
                        echo json_encode($convert->getArray());
                    }
					return;
				}
				include_once("view.php");
				$view = file_get_contents(realpath(APP_PATH."/modules"."/".$this->navigateTo['module']."/views/".str_replace("Controller","",$this->navigateTo['controller'])."/".$this->navigateTo['action'].".phtml"));
				$view1= "class app_library_controller_myView extends app_library_controller_view{\n public \$APP_CONFIGURATION = ".var_export($this->conf, true).";\n";
				$view1.="\npublic function init(){\n?>".(string)$view."<?php\n}\n}";
				eval($view1);
				unset($view1);
				unset($view);
				$view = new app_library_controller_myView($var->_view);
				foreach($view->_layout as $key => $value){
					$lay[$key]=$value;
				}
				unset($view);
			}
		}
		$content = preg_replace('/>\s+</i',"><",ob_get_clean());
		include_once("layout.php");
		$temp=$var->hasPrivateLayout()?$var->getLayout():(isset($this->conf['layout_'.(string)$this->navigateTo['module'].'_'.(string)$this->navigateTo['controller']])?$this->conf['layout_'.(string)$this->navigateTo['module'].'_'.(string)$this->navigateTo['controller']]:(isset($this->conf['layout_'.(string)$this->navigateTo['module']])?$this->conf['layout_'.(string)$this->navigateTo['module']]:(isset($this->conf['layout'])?$this->conf['layout']:null)));
		if(!$var->isCancelLayout()){
			if($temp!=null){
                if($isJson)ob_start();
				if(!file_exists(realpath(APP_PATH."/layouts"."/".(string)$temp.".phtml"))){
					echo "<h1>"."Can't find layout ".(string)$temp."!!!</h1>";
					throw new Exception("Can't find layout ".(string)$temp."!!!");
					return;
				}
				$layout1 = file_get_contents(realpath(APP_PATH."/layouts"."/".(string)$temp.".phtml"));
				$layout= "class app_library_myLayout extends app_library_layout{\npublic \$APP_CONFIGURATION =".var_export($this->conf, true).";\n";
				$layout.="\npublic function init(){\n?>".(string)$layout1."<?php\n}\n}";
				eval($layout);
				unset($layout1);
				unset($layout);
				$layout = new app_library_myLayout($lay);
				$layout->setContent($content);
				$layout->init();
				unset($layout);
                if($isJson)$content = ob_get_clean();
			}
		}else if(!$isJson)echo $content;
		EventListener::dispatchEvent("unload");
        if($isJson){
            include_once("HTMLConvert.php");
            $tmp = array(
                'string'=>"",
                'module'=>'admin'
            );
            $convert= new HTMLConvert($tmp);
            $convert->setString($content);
            header('Content-type: text/html; charset=utf-8');
            echo json_encode($convert->getArray());
        }
		unset($lay);
		unset($var);
		if(isset($_SESSION))if(isset($_SESSION["APP_RENDER_NUM"]))unset($_SESSION["APP_RENDER_NUM"]);
	}
	
	private function findPath(){
		$n = array();
		$y= false;
		$navi = array();
		$temp = explode("/", $this->_navigate);
		foreach($temp as $key => $value){
			if($value!="")array_push($navi,$value);
		}
		unset($temp);
		$count= count($navi);
		$ac = 0;
		if ($count==$ac){
			$this->navigateTo['module']=isset($this->conf['default_module'])?$this->conf['default_module']:"index";
			$this->navigateTo['controller']="indexController";
			$this->navigateTo['action']="index";
			return;
		}
        $tmp = null;
        $tmp = strtolower($navi[$ac]);
		foreach($this->findModules() as $value){
			if(strtolower($value) == $tmp){
				$this->navigateTo['module']=$value;
				$y= true;
			}
		}
		if(!$y)$this->navigateTo['module']=isset($this->conf['default_module'])?$this->conf['default_module']:"index";
		else $ac++;
		$y = false;
		if ($count==$ac){
			$this->navigateTo['controller']="indexController";
			$this->navigateTo['action']="index";
			return;
		}
        $tmp = strtolower($navi[$ac]);
		foreach($this->findControllers($this->navigateTo['module']) as $value){
			if(strtolower($value) == $tmp){
				$this->navigateTo['controller']=$value."Controller";
				$y= true;
			}
		}
		if(!$y)$this->navigateTo['controller']="indexController";
		else $ac++;
		$y = false;
		if ($count==$ac){
			$this->navigateTo['action']="index";
			return;
		}
        $tmp = strtolower($navi[$ac]);
		foreach($this->findAction($this->navigateTo['module'],$this->navigateTo['controller']) as $value){
			if(strtolower($value) == $tmp){
				$this->navigateTo['action']=$value;
				$y= true;
			}
		}
		if(!$y)$this->navigateTo['action']="index";
		else $ac++;
		for ($i=$ac;$i<$count;$i++){
			$this->navigateTo['values'][$navi[$i]]=isset($navi[$i+1])?$navi[$i+1]:null;
			$i++;
		}
		unset($navi);
	}
	
	private function findControllers($module){
		$r = array();
		$path= APP_PATH."/modules"."/".$module."/controllers";
		$results = scandir($path);
		foreach ($results as $result) {
			if ($result === '.' or $result === '..') continue;
			if (is_file($path . '/' . $result)){
				$f=pathinfo($path . '/' . $result);
				if($f['extension']=="php")
				array_push($r,str_replace("Controller","",$f['filename']));
			}
		}
		return $r;
	}
	
	private function findAction($module,$controller){
		$r = array();
		include_once("controller.php");
        include_once("json_controller.php");
		include_once(realpath(APP_PATH."/modules"."/".$module."/controllers/".$controller.".php"));
		foreach (get_class_methods(new $this->navigateTo['controller']()) as $method_name) {
			if(!strpos($method_name,"Action")===false)array_push($r,str_replace("Action","",$method_name));
		}
		return $r;
	}
	
	private function findModels(){
		$r = array();
		$path= APP_PATH."/models";
		$results = scandir($path);
		foreach ($results as $result) {
			if ($result === '.' or $result === '..') continue;
			if (is_file($path . '/' . $result)){
				$f=pathinfo($path . '/' . $result);
				if($f['extension']=="php")
				array_push($r,$f['filename']);
			}
		}
		return $r;
	}
	
	private function findLibs(){
		$r = array();
		$path= APP_PATH."/../library/Other";
		$results = scandir($path);
		foreach ($results as $result) {
			if ($result === '.' or $result === '..') continue;
			if (is_file($path . '/' . $result)){
				$f=pathinfo($path . '/' . $result);
				if($f['extension']=="php")
				array_push($r,$f['filename']);
			}
		}
		return $r;
	}
	
	private function findModules(){
		$r = array();
		$path= APP_PATH."/modules";
		$results = scandir($path);
		foreach ($results as $result) {
			if ($result === '.' or $result === '..') continue;
			if (is_dir($path . '/' . $result)) {
				array_push($r,$result);
			}
		}
		return $r;
	}
	
	private function curPageURL() {
		$isHTTPS = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] == "on");
		$port = (isset($_SERVER["SERVER_PORT"]) && ((!$isHTTPS && $_SERVER["SERVER_PORT"] != "80") || ($isHTTPS && $_SERVER["SERVER_PORT"] != "443")));
		$port = ($port) ? ':'.$_SERVER["SERVER_PORT"] : '';
		$url = ($isHTTPS ? 'https://' : 'http://').$_SERVER["SERVER_NAME"].$port.$_SERVER["REQUEST_URI"];
		return $url;
	} 
}