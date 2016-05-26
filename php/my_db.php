<?php
$con = mysql_connect("localhost", "root", "") or die (mysql_error ());
	// Выбрать БД
$db = mysql_select_db("mozart_mozart") or die(mysql_error());
?>