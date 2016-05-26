<?php

	include "my_db.php";

	$get_info = "SELECT *
	 	FROM contacts_info";
	
	$rs = mysql_query($get_info);
	$rows = array();
	while($row = mysql_fetch_assoc($rs)) {
		$rows[] = $row;
	}
	mysql_close();
	$json_massiv= json_encode($rows);
	echo $json_massiv;
?>