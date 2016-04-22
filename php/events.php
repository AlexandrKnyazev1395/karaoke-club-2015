<?php
  $mysqli = new mysqli('localhost', 'root', '', 'mozart');
  if (mysqli_connect_errno()) {
    echo "Подключение невозможно: ".mysqli_connect_error();
  }
  
?>