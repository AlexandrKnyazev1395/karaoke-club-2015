<?php
$directory =  "../photos/26_09_2015/full/";
$dir_handle = @opendir($directory);
if ($dir_handle > 1){ 				//Проверяем, что папка открыта и в ней есть файлы
	$allowed_types=array('jpg','jpeg'); // Список обрабатываемых расширений
	$file_parts=array();
	$ext='';
	$title='';
	$i=0;
	 
	while ($file = @readdir($dir_handle))
	{
	    /* Пропускаем системные файлы: */
	    if($file=='.' || $file == '..') continue;
	 
	    $file_parts = explode('.',$file);    	//Разделяем имя файла на части 
	    $ext = strtolower(array_pop($file_parts));
	 
	    /* Используем имя файла (без расширения) как заголовок изображения: */
	    $title = implode('.',$file_parts);
	    $title = htmlspecialchars($title);
	 
	    /* Если расширение входит в список обрабатываемых: */
	    if(in_array($ext,$allowed_types))
	    {
	 		$source = $directory . $file;  //изображение - источник
	 		$stype = explode(".", $source); //расширение изображения
	 		$dest = $directory . $file;  //получаемое изображение
	 		list($width, $height) = getimagesize($source);
			$new_width = $width;
			$new_height = $height;

			$image_p = imagecreatetruecolor($new_width, $new_height);
			$image = imagecreatefromjpeg($source);
			imagecopyresampled($image_p, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

			imagejpeg($image_p, $source, 50); //50% это качество 0-100%*/
	    }
	}

	@closedir($dir_handle);
 
}
?>