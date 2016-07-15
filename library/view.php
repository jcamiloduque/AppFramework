<?php
class app_library_controller_view{
	
	public $_layout= array();
	
	public function __construct(array $options = null){
        if(is_array($options))
        foreach($options as $key => $value){
            $this->$key = $value;
        }
		$this->init();
    }

	public function init(){}
	
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
	
	public function getFile($value=null){
		$value= implode("", explode("public/", $value, 2));
		if(!strrpos(BASE_URL, 'public', strlen(BASE_URL)-8))return BASE_URL.(!strrpos(BASE_PATH, 'public', strlen(BASE_PATH)-8)?"/public/":"/").$value;
		else return BASE_URL."/".$value;
	}
	
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
	
}
?>