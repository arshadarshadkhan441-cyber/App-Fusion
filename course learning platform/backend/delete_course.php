<?php

session_start();

if(!isset($_SESSION['admin'])){
  echo "unauthorized";
  exit();
}

include 'db.php';



$id = $_POST['id'];

$conn->query("DELETE FROM courses WHERE id=$id");

echo "Deleted";
?>