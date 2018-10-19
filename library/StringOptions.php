<?php
namespace Framework;
class StringOptions {
    public static function backwardStrpos($haystack, $needle, $offset = 0){
        $length = strlen($haystack);
        $offset = ($offset > 0)?($length - $offset):abs($offset);
        $pos = strpos(strrev($haystack), strrev($needle), $offset);
        return ($pos === false)?false:( $length - $pos - strlen($needle) );
    }
    public static function limit_text_by_letters($text,$limit,$addEllipsis = false) {
        if (strlen ($text) > $limit) {
            $xMaxFit = $limit - 3;
            $xTruncateAt = self::backwardStrpos($text,' ',$xMaxFit);
            if($xTruncateAt==false || $xTruncateAt < $limit / 2)$xTruncateAt = $xMaxFit;
            return substr ($text,0,$xTruncateAt).($addEllipsis==false?"":"...");
        }else return $text;
    }
    public static function limit_text_by_words($text,$limit,$addEllipsis = false) {
        if (str_word_count($text, 0) > $limit) {
            $words = str_word_count($text, 2);
            $pos = array_keys($words);
            $text = substr($text, 0, $pos[$limit]).($addEllipsis==false?"":"...");
        }
        return $text;
    }
}