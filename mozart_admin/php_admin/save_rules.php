<?php
    include "../../php/my_db.php";
    if(isset($_POST['editor1'])){
        $editor_data = $_POST['editor1'];
        //rules info in bd have id 2
        $set_vacansy = "UPDATE m_admin_change_html SET text_change ='$editor_data' WHERE id_page=2";
        $rs = mysql_query($set_vacansy);
        if ($rs){
            echo "Изменения прошли усешно, <a href='../admin_panel_main.php'>Вернуться к управлению сайтом</a>";
        }
    }
    
   
?>