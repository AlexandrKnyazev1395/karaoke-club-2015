<?php

	include "my_db.php";

	$get_galery = "SELECT *
	 	FROM m_galery ORDER BY date_event DESC";
	
	$rs = mysql_query($get_galery);
	$rows = array();
	while($row = mysql_fetch_assoc($rs)) {
		$dir = opendir('../photos/'. $row['folder'] .'/mini/');
		while($file = readdir($dir)){
		    if($file == '.' || $file == '..'){
		        continue;
		    }
		    $row['images_name'][] = $file;
		}
		$rows[] = $row;
	}
	mysql_close();
	$json_massiv= json_encode($rows);
	echo $json_massiv;
?>