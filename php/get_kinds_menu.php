<?php

	include "my_db.php";

	$get_kinds_menu = "SELECT *
 	FROM m_kind_menu ORDER BY id_kind";
	
	$rs = mysql_query($get_kinds_menu);
	$rows = array();
	
	while($row = mysql_fetch_assoc($rs)) {
		$dir = opendir('../menu/'. $row['folder'] .'/');
		$count = 0;
		while($file = readdir($dir)){
		    if($file == '.' || $file == '..' || is_dir('../menu/'. $row['folder'] .'/' . $file)){
		        continue;
		    }
		    $count++;
		}
		$row['amount_images'] = $count;
		$rows[] = $row;
	}

	
	mysql_close();
	$json_massiv= json_encode($rows);
	echo $json_massiv;
?>