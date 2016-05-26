<?php

	include "my_db.php";

	//sql-запрос - выбираем ивенты, дата которых больше или равна сегодняшней 
	//( CURDATE - текущая дата) ASC - в порядке возрастания
	$check = 0;
	if($_POST['id_event']=='false'){ 
		$get_actual_events = "SELECT title_event, desc_event, date_event, time_event, poster_event
	 	FROM m_events  WHERE CURDATE() <= date_event  ORDER BY date_event ASC LIMIT 5";
	}
	else{
		$check = $_POST['id_event'];
		$get_actual_events = "SELECT title_event, desc_event, date_event, time_event, poster_event
	 	FROM m_events WHERE date_event = '".$_POST['id_event']."'  ORDER BY date_event ASC";
	}
	
	$rs = mysql_query($get_actual_events);
	$rows = array();
	while($row = mysql_fetch_assoc($rs)) {
		$rows[] = $row;
	}


	mysql_close();
	array_push($rows, array("check" => $check));
	$json_massiv= json_encode($rows);
	echo $json_massiv;
?>