<?php
    if (!isset($_POST['name_event'], $_POST['description_event'], $_POST['date_event'],  $_POST['time_event'], $_FILES['poster_event'])) {
        exit("Что-то не было введено");
    }
    include "../../php/my_db.php";
    $name_event = $_POST['name_event'];
    $desc_event = $_POST['description_event'];
    $date_event = $_POST['date_event'];
    $time_event = $_POST['time_event'];
    $poster_event = $_FILES['poster_event'];

    if($poster_event["size"] > 10000000){
        echo ("Размер файла превышает десять мегабайт, так нельзя");
        exit;
    }
    // Проверяем загружен ли файл
    if(is_uploaded_file($poster_event["tmp_name"])){
    // Если файл загружен успешно, перемещаем его
    // из временной директории в конечную
        $ext = array_pop(explode('.',$poster_event['name'])); // расширение
        $new_name = time().'.'.$ext; // новое имя с расширением
        move_uploaded_file($poster_event["tmp_name"], "../../posters/".$new_name);
    } else {
        echo("Ошибка загрузки файла");
        exit;
    }
    //поменять время так как в бд хранится с секундами
    $time_event = $time_event.":00";
    $save_event = "INSERT INTO m_events (title_event, desc_event, date_event, time_event, poster_event) 
                    VALUES ('$name_event', '$desc_event', '$date_event', '$time_event', '$new_name')";
    $rs = mysql_query($save_event);
    if (!$rs) {
        die('Неверный запрос: ' . mysql_error());
    }
    echo "Изменения прошли усешно, <a href='../admin_panel_main.php'>Вернуться к управлению сайтом</a>"
   
?>