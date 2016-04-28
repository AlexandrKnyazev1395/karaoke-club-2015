<?php
	$folder = $_POST['folder'];
	/*mysql_connect("localhost", "root", "") or die (mysql_error ());
	// Выбрать БД
	mysql_select_db("mozart") or die(mysql_error());

	$get_kinds_menu = "SELECT *
 	FROM m_kind_menu ORDER BY id_kind";
	
	$rs = mysql_query($get_kinds_menu);
	$rows = array();
	while($row = mysql_fetch_assoc($rs)) {
		$rows[] = $row;
	}


	mysql_close();
	$json_massiv= json_encode($rows);*/
	echo $folder;
?>