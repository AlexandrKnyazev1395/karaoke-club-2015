<?php
	mysql_connect("localhost", "root", "") or die (mysql_error ());
	// Выбрать БД
	mysql_select_db("mozart") or die(mysql_error());

	//sql-запрос - выбираем ивенты, дата которых больше или равна сегодняшней 
	//( CURDATE - текущая дата) ASC - в порядке возрастания
	$get_dates_events = "SELECT date_event FROM m_events";
	$rs = mysql_query($get_dates_events);
	$rows = array();
	
	while($row = mysql_fetch_row($rs)) {
		array_push($rows, $row[0]);
		
	}


	mysql_close();
	$json_massiv= json_encode($rows);
	echo $json_massiv;

?>