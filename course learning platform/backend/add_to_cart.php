<?php
session_start();
include 'db.php';

$user_id = $_SESSION['user_id'];
$course_id = $_POST['course_id'];

$conn->query("INSERT INTO cart (user_id, course_id) VALUES ($user_id, $course_id)");

echo "added";
?>