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
    <script src="/ckeditor/ckeditor.js"></script>
    <style type="text/css">
        input{
            display: block !important;
            width: 60% !important;
            margin-bottom: 20px;
            
        }
        form{
            margin-left: 2%;
        }
        a{
            position: relative;
            top: 20px;
            font-size: 20px;
        }
        a:hover{
            cursor: pointer;
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <header>
    
    </header>
     
    <nav>
        
    </nav>
    <h1>Редактор контактов</h1>
    <p>Внесите изменения в нужное поле, затем нажмите на кнопку "Отправить"</p>
    <form id="contact_form" method="post" action="php_admin/save_contacts.php">
        <label for="#phone">Телефон ресторана: </label>
        <input class="input-control text" type="text" id="phone" name="phone" maxlength="50">
        <label for="#mail">Электронная почта ресторана: </label>
        <input class="input-control text" type="text" id="mail" name="mail" maxlength="50">
        <label for="#adress">Адрес ресторана: </label>
        <input class="input-control text" type="text" id="adress" name="adress" maxlength="100">
        <label for="#vk_group">Группа в ВК:</label>
        <input class="input-control text" type="text" id="vk_group" name="vk_group" maxlength="100">
        <label for="#ok_group">Группа в Одноклассниках: </label>
        <input class="input-control text" type="text" id="ok_group" name="ok_group" maxlength="100">
        <label for="#inst_group">Группа в инстаграмме: </label>
        <input class="input-control text" type="text" id="inst_group" name="inst_group" maxlength="100">
        <input type="submit">
    </form>
    <a href="admin_panel_main.php">Вернуться к главной странице управления</a>   
    <footer>
    </footer>
    <script src="/scripts/jquery-2.2.2.min.js"></script>
    <script src="/scripts/metro.min.js"></script>
    <script src="/mozart_admin/scripts_admin/contacts_admin.js"></script>
</body>
</html>