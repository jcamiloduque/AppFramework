<?php 
class navigate {
	private $_navigate=null;
	private $conf=null;
	private $navigateTo = null;
	
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
	
	private function setBaseUrl($value){
		$this->_navigate = substr($this->curPageURL(), strpos($this->curPageURL(), $value, 0)+strlen($value)+1, strlen($this->curPageURL()));
	}
	
	private function setConfig($value){
		$this->conf = $value;
	}
	
	public function navigate(){
		$t= $this->findModels();
		foreach($t as $model)require(realpath(APP_PATH."/models/".$model.".php"));
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
			echo "<h1>"."Can't find controller ".(string)$this->navigateTo['controller']."!!!</h1>";
			throw new Exception("Can not find controller ".(string)$this->navigateTo['controller']);
			return;
		}
		require_once("controller.php");
		$lay = null;
		require_once(realpath(APP_PATH."/modules"."/".$this->navigateTo['module']."/controllers/".$this->navigateTo['controller'].".php"));
		$var= new $this->navigateTo['controller']();
		$var->app_Actual=array("module"=>$this->navigateTo['module'],"controller"=>str_replace("Controller","",$this->navigateTo['controller']),"action"=>$this->navigateTo['action']);
		$var->_GET=isset($this->navigateTo['values'])?$this->navigateTo['values']:array();
		$var->APP_CONFIGURATION=$this->conf;
		$var->init();
		if(!$var->isCancelAction()){
			$temp=(string)$this->navigateTo['action']."Action";
			if(!method_exists($var,$temp)){
				ob_get_clean();
				echo "<h1>"."Can't find controller action ".(string)$this->navigateTo['action']."!!!</h1>";
				throw new Exception("Can not find controller action ".(string)$this->navigateTo['action']);
				return;
			}
			$var->$temp();
			$lay= $var->_layout;
			if(!$var->isCancelView()){
				if(!file_exists(realpath(APP_PATH."/modules"."/".$this->navigateTo['module']."/views/".str_replace("Controller","",$this->navigateTo['controller'])."/".$this->navigateTo['action'].".phtml"))){
					ob_get_clean();
					echo "<h1>"."Can't find view for ".(string)$this->navigateTo['action']." Action!!!</h1>";
					throw new Exception("Can not find view ".(string)$this->navigateTo['controller']);
					return;
				}
				require_once("view.php");
				$view = file_get_contents(realpath(APP_PATH."/modules"."/".$this->navigateTo['module']."/views/".str_replace("Controller","",$this->navigateTo['controller'])."/".$this->navigateTo['action'].".phtml"));
				$view1= 'class app_library_controller_myView extends app_library_controller_view{
					public $APP_CONFIGURATION ='.var_export($this->conf, true).';
					';
				foreach($var->_view as $key => $value){
					$view1.="private $".$key."=".var_export($value, true).";";
				}
				$view1.='
					public function init(){
					  ?>'.(string)$view.'<?php  
					}
				}';
				eval($view1);
				unset($view1);
				unset($view);
				$view = new app_library_controller_myView();
				foreach($view->_layout as $key => $value){
					$lay[$key]=$value;
				}
				unset($view);
			}
		}
		$content = ob_get_clean();
		require_once("layout.php");
		$temp=$var->hasPrivateLayout()?$var->getLayout():(isset($this->conf['layout_'.(string)$this->navigateTo['module'].'_'.(string)$this->navigateTo['controller']])?$this->conf['layout_'.(string)$this->navigateTo['module'].'_'.(string)$this->navigateTo['controller']]:(isset($this->conf['layout_'.(string)$this->navigateTo['module']])?$this->conf['layout_'.(string)$this->navigateTo['module']]:(isset($this->conf['layout'])?$this->conf['layout']:null)));
		if(!$var->isCancelLayout()){
			if($temp!=null){
				if(!file_exists(realpath(APP_PATH."/layouts"."/".(string)$temp.".phtml"))){
					echo "<h1>"."Can't find layout ".(string)$temp."!!!</h1>";
					throw new Exception("Can't find layout ".(string)$temp."!!!");
					return;
				}
				$layout1 = file_get_contents(realpath(APP_PATH."/layouts"."/".(string)$temp.".phtml"));
				$layout= 'class app_library_myLayout extends app_library_layout{
					public $APP_CONFIGURATION ='.var_export($this->conf, true).';
					';
				foreach($lay as $key => $value){
					$layout.="private $".$key."=".var_export($value, true).";";
				}
				$layout.='
					public function init(){
					  ?>'.(string)$layout1.'<?php  
					}
				}';
				eval($layout);
				unset($layout1);
				unset($layout);
				$layout = new app_library_myLayout();
				$layout->setContent($content);
				$layout->init();
				unset($layout);
			}
		}else echo $content;
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
			$this->navigateTo['module']="index";
			$this->navigateTo['controller']="indexController";
			$this->navigateTo['action']="index";
			return;
		}
		foreach($this->findModules() as $value){
			if($value == $navi[$ac]){
				$this->navigateTo['module']=strtolower($value);
				$y= true;
			}
		}
		if(!$y)$this->navigateTo['module']="index";
		else $ac++;
		$y = false;
		if ($count==$ac){
			$this->navigateTo['controller']="indexController";
			$this->navigateTo['action']="index";
			return;
		}
		foreach($this->findControllers($this->navigateTo['module']) as $value){
			if($value == $navi[$ac]){
				$this->navigateTo['controller']=strtolower($value)."Controller";
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
		foreach($this->findAction($this->navigateTo['module'],$this->navigateTo['controller']) as $value){
			if($value == $navi[$ac]){
				$this->navigateTo['action']=strtolower($value);
				$y= true;
			}
		}
		if(!$y)$this->navigateTo['action']="index";
		else $ac++;
		$y = false;
		for ($i=$ac;$i<$count;$i++){
			$this->navigateTo['values'][strtolower($navi[$i])]=isset($navi[$i+1])?strtolower($navi[$i+1]):null;
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
		require_once("controller.php");
		require_once(realpath(APP_PATH."/modules"."/".$module."/controllers/".$controller.".php"));
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