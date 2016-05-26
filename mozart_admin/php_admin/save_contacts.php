<?php
    include "../../php/my_db.php";
    $phone = $_POST['phone'];
    $adress = $_POST['adress'];
    $mail = $_POST['mail'];
    $vk = $_POST['vk_group'];
    $ok = $_POST['ok_group'];
    $inst = $_POST['inst_group'];
    
    $contacts_array = array($phone, $adress, $mail, $vk, $ok, $inst);

    for ($i=1; $i < 7; $i++) {
    	$contact = $contacts_array[$i-1]; 
    	$save_contacts = "UPDATE contacts_info SET content_contact = '$contact' WHERE id_contact = $i ";
    	$rs = mysql_query($save_contacts);
    }
    echo "Изменения прошли усешно, <a href='../admin_panel_main.php'>Вернуться к управлению сайтом</a>"
   
?>