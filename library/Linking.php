<?php
namespace Framework;

trait Linking{

    public function linkTo($value=null){
        if(!isset($value))return null;
        $tmp=(isset($value["module"])?($value["module"]==(isset($this->APP_CONFIGURATION['default_module'])?$this->APP_CONFIGURATION['default_module']:"index")?"":"/".$value["module"]):"").(isset($value["controller"])?($value["controller"]=="index"?"":"/".$value["controller"]):"").(isset($value["action"])?($value["action"]=="index"?"":"/".$value["action"]):"");
        if (isset($value["values"])){
            foreach($value["values"] as $kay => $val){
                if(isset($val))$tmp.="/".$kay."/".$val;
            }
        }
        return BASE_URL.$tmp;
    }

    /**
     * @param null $value
     * @return false|null|string
     * @throws \Exception
     */
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
            throw new \Exception("Can not find controller ".(string)$value['controller']."Controller");
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
                include_once("View.php");
                $view = new View($this->APP_CONFIGURATION, $var->_view);
                $view->init(realpath(realpath(APP_PATH."/modules"."/".$value['module']."/views/".$value['controller']."/".$value['action'].".phtml")));
                foreach($view->_layout as $key => $value){
                    $lay[$key]=$value;
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
                    return null;
                }
                require_once("Layout.php");

                $layout = new Layout($this->APP_CONFIGURATION, $var->_view);
                $layout->setContent($content);
                $layout->init(realpath(APP_PATH."/layouts"."/".(string)$temp.".phtml"));
                unset($layout);
                return ob_get_clean();
            }
        }return $content;
    }

}