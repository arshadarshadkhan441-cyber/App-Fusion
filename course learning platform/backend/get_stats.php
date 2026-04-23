<?php

session_start();

if(!isset($_SESSION['admin'])){
  echo "unauthorized";
  exit();
}

include 'db.php';
$users = $conn->query("SELECT COUNT(*) as total FROM users")->fetch_assoc()['total'];
$courses = $conn->query("SELECT COUNT(*) as total FROM courses")->fetch_assoc()['total'];
$purchases = $conn->query("SELECT COUNT(*) as total FROM purchases")->fetch_assoc()['total'];

echo json_encode([
  "users" => $users,
  "courses" => $courses,
  "purchases" => $purchases
]);
?>