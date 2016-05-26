<?php

	include "my_db.php";

	$get_galery = "SELECT *
	 	FROM m_weddings ORDER BY id_wedding DESC";
	
	$rs = mysql_query($get_galery);
	$rows = array();
	while($row = mysql_fetch_assoc($rs)) {
		$dir = opendir('../about_rest_events/weddings/'. $row['folder'] .'/mini/');
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