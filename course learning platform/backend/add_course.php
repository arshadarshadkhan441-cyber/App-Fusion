<?php

session_start();

if(!isset($_SESSION['admin'])){
  echo "unauthorized";
  exit();
}

include 'db.php';


$title = $_POST['title'];
$category = $_POST['category'];
$price = $_POST['price'];

$sql = "INSERT INTO courses (title, category, price)
        VALUES ('$title','$category','$price')";

if ($conn->query($sql)) {
  echo "Course Added";
}
?>