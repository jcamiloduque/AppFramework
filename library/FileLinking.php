<?php

namespace Framework;

trait FileLinking{

    public function getFile($value=null){
        $value= implode("", explode("public/", $value, 2));
        if(!strrpos(BASE_URL, 'public', strlen(BASE_URL)-8))return BASE_URL.(!strrpos(BASE_PATH, 'public', strlen(BASE_PATH)-8)?"/public/":"/").$value;
        else return BASE_URL."/".$value;
    }

}