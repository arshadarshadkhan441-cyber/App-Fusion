<?php
session_start();
include 'db.php';

$user_id = $_SESSION['user_id'];
$lesson_id = $_POST['lesson_id'];

$conn->query("
INSERT INTO progress (user_id, lesson_id)
VALUES ($user_id, $lesson_id)
");

echo "done";
?>