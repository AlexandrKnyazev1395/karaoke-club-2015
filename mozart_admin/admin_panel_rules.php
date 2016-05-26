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
        span{
            font-weight: 700;
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
    <h1>Редактор правил ресторана</h1>
    <p>Вы можете добавить новые правила, изменить старые или удалить их. 
    Для этого введите нужные вам изменения в окне ниже и нажмите кнопку "Отправить". <br><span>(ТОЛЬКО добавляйте, изменяйте или удаляйте текст, не смотрите что в окне ввода сверху много кнопок)<span></p>
    <form method="post" action="php_admin/save_rules.php">
        <textarea name="editor1" id="editor1" rows="10" cols="80">
            <?
                $get_vacancy = "SELECT text_change
                FROM m_admin_change_html WHERE id_page=2";
                $rs = mysql_query($get_vacancy);
                $itog =  mysql_fetch_assoc($rs);
                echo $itog["text_change"];
            ?>
        </textarea>
        <script>
            // Replace the <textarea id="editor1"> with a CKEditor
            // instance, using default configuration.
            CKEDITOR.replace( 'editor1' );
        </script>
        <p><input type="submit"></p>
    </form>
    <a href="admin_panel_main.php">Вернуться к главной странице управления</a>     
    <footer>
    </footer>
    <script src="/scripts/jquery-2.2.2.min.js"></script>
    <script src="/scripts/metro.min.js"></script>
</body>
</html>