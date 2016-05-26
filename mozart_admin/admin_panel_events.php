<?php
    include "../php/my_db.php";
    
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="content-language" content="ru">
    <title>Mozart official</title>

    <link href="/styles/metro.min.css" rel="stylesheet">
    <link href="/styles/metro-icons.min.css" rel="stylesheet">
    <link href="/styles/metro-schemes.css" rel="stylesheet">
    <link href="/mozart_admin/styles_admin/events_admin.css" rel="stylesheet">
    <script src="/ckeditor/ckeditor.js"></script>
</head>

<body>
    <header>
    
    </header>
     
    <nav>
        
    </nav>
    <div id="events_admin">
    <h1>Редактор афишы</h1>
    <p>Добавьте новое мероприятие или удалите старое</p>
    
        <h4>1)Выберите действие</h4>
        <select class="input-control selec" name="choose_activity" id="">
            <option value="">Добавить мероприятие</option>
            <option value="">Удалить мероприятие</option>
        </select>
        <h4>2)Заполните форму</h4>
        <form enctype="multipart/form-data" id="add_event_form" method="post" action="php_admin/save_event.php">
            <ul>
                <li>
                    <p class="description_input">Название мероприятия</p>
                    <input required class="input-control text" type="text" id="name_event" name="name_event" maxlength="100">
                </li>
                <li>
                    <p class="description_input">Описание мероприятия<br>
                    Если хотите в описании начать какой-то текст с новой строчки - нажмите на клавишу "Добавить перенос на следующую строку".
                    В поле для ввода будет добавлена специальная конструкция &ltbr&gt, она не отобразится в тексте, она нужна для переноса строки.
                    </p>
                    <div class="input-control textarea" data-role="input" data-text-auto-resize="true">
                        <textarea required id="description_event" name="description_event"></textarea>
                    </div>
                    <span class="button primary" id="to_next_string">Добавить перенос на следующую строку</span>
                </li>
                <li>
                    <p class="description_input">Дата мероприятия<br>
                    Не обращайте внимания, что здесь дата появляется в формете год-месяц-день, на сайте дата будет выглядеть как день-месяц-г
                    </p>
                    <div class="input-control text" data-role="datepicker">
                        <input required id="date_event" name="date_event" type="text">
                        <button class="button"><span class="mif-calendar"></span></button>
                    </div>
                </li>
                <li>
                    <p class="description_input">Время мероприятия</p>
                    <input required class="input-control" type="time" name="time_event">
                </li>
                <li>
                    <p class="description_input">Изображение (постер) мероприятия в формате jpeg/jpg</p>
                    <div class="input-control file" data-role="input">
                        <input type="hidden" name="MAX_FILE_SIZE" value="10000000"/>
                        <input required name="poster_event" type="file" accept="image/*,image/jpeg,image/jpg">
                        <button class="button"><span class="mif-folder"></span></button>
                    </div>
                </li>
                <li>
                    <input class="button success" type="submit">
                </li>
            </ul>
        </form>
        <a href="admin_panel_main.php">Вернуться к главной странице управления</a>
    </div>
       
    <footer>
    </footer>
    <script src="/scripts/jquery-2.2.2.min.js"></script>
    <script src="/scripts/metro.min.js"></script>
    <script src="/mozart_admin/scripts_admin/events_admin.js"></script>
</body>
</html>