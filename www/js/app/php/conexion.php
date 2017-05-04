<?php

$server = "127.0.0.1";
$user = "pms1023";
$pass = "";
$bd = "animalReport";

session_start(); 

$conexion = mysqli_connect($server, $user, $pass,$bd)

or die("error");

$sql="INSERT INTO `user` (nombre,apellido,email) VALUES('user.nombre','user.apellido','user.email')";

if(!$result = mysqli_query($conexion, $sql)) die();

$close = mysqli_close($conexion) 
or die("error");

echo $sql;
 ?>
