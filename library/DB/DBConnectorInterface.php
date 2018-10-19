<?php

namespace Framework\DB;

interface DBConnectorInterface{

    public function getLastInsertedId();

    public function getError();

    public function setCharset($charset);

    public function fetchAll($value, $charset = "utf8");

    public function close();

    public function execute($value, $charset = "utf8");

    public function fetch($value, $charset = "utf8");

    public function beginTransaction($value);

    public function commit($value);

    public function transaction($value);

    public function affectedRows();

    public function scape($q,$full = false);

}