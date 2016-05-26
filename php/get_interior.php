<?php
	$images = array();
	$dir = opendir('../interior/');
	while($file = readdir($dir)){
	    if($file == '.' || $file == '..'){
	        continue;
	    }
	    $images[] = $file;
	}
	$json_massiv= json_encode($images);
	echo $json_massiv;
?>