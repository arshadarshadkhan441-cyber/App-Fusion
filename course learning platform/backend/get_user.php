<?php
session_start();

if(!isset($_SESSION['admin'])){
  echo "unauthorized";
  exit();
}

include 'db.php';
if(isset($_SESSION['user_id'])){
  echo json_encode([
    "id" => $_SESSION['user_id'],
    "email" => $_SESSION['email']
  ]);
} else {
  echo "not_logged_in";
}
?>