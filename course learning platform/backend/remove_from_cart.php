<?php
session_start();
include 'db.php';

$user_id = $_SESSION['user_id'];
$course_id = $_POST['course_id'];

$conn->query("DELETE FROM cart WHERE user_id=$user_id AND course_id=$course_id");

echo "removed";
?>