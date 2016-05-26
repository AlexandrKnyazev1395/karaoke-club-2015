<?php
	$images = array();
	$dir = opendir('../about_rest_events/art-party/mini/');
	while($file = readdir($dir)){
	    if($file == '.' || $file == '..'){
	        continue;
	    }
	    $images[] = $file;
	}
	$json_massiv= json_encode($images);
	echo $json_massiv;
	/* Закрываем папку */
	@closedir($dir);
?>