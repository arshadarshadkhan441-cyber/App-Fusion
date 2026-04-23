<?php
session_start();

if(!isset($_SESSION['admin'])){
  echo "unauthorized";
  exit();
}

include 'db.php';

$id = $_POST['id'];
$title = $_POST['title'];
$category = $_POST['category'];
$price = $_POST['price'];

$conn->query("
UPDATE courses 
SET title='$title', category='$category', price='$price'
WHERE id=$id
");

echo "updated";
?>