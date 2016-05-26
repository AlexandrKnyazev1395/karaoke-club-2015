<?php
$thumb_directory =  "../photos/26_09_2015/mini/";    	//Папка для миниатюр 
$orig_directory = "../photos/26_09_2015/full/";    	//Папка для полноразмерных изображений 
 
$dir_handle = @opendir($orig_directory); 	//Открываем папку с полноразмерными изображениями 
if ($dir_handle > 1){ 				//Проверяем, что папка открыта и в ней есть файлы
 
    $allowed_types=array('jpg','jpeg','gif','png'); // Список обрабатываемых расширений
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
     
            /* Если вы планируете хранить изображения в базе данных, вставьте код для запроса здесь */
     
            /* Далее следует код, который разбирался в уроке */
            /* Выводим каждое изображение: */
     
            $nw = 250;
            $nh = 170;
            $source = $orig_directory . $file;
            $stype = explode(".", $source);
            $stype = $stype[count($stype)-1];
            $dest = $thumb_directory . $file;
     
            $size = getimagesize($source);
            $w = $size[0];
            $h = $size[1];
     
            switch($stype) {
                case 'gif':
                    $simg = imagecreatefromgif($source);
                    break;
                case 'jpg':
                    $simg = imagecreatefromjpeg($source);
                    break;
                case 'png':
                    $simg = imagecreatefrompng($source);
                    break;
            }
     
            $dimg = imagecreatetruecolor($nw, $nh);
            $wm = $w/$nw;
            $hm = $h/$nh;
            $h_height = $nh/2;
            $w_height = $nw/2;
     
            if($w> $h) {
                $adjusted_width = $w / $hm;
                $half_width = $adjusted_width / 2;
                $int_width = $half_width - $w_height;
                imagecopyresampled($dimg,$simg,-$int_width,0,0,0,$adjusted_width,$nh,$w,$h);
            } elseif(($w <$h) || ($w == $h)) {
                $adjusted_height = $h / $wm;
                $half_height = $adjusted_height / 2;
                $int_height = $half_height - $h_height;
     
                imagecopyresampled($dimg,$simg,0,-$int_height,0,0,$nw,$adjusted_height,$w,$h);
            } else {
                imagecopyresampled($dimg,$simg,0,0,0,0,$nw,$nh,$w,$h);
            }
                imagejpeg($dimg,$dest,92);
            }
}
 
/* Закрываем папку */
@closedir($dir_handle);
 
}
?>