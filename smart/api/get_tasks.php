<?php
include("db.php");

$user_id = $_GET['user_id'];

$res = $conn->query("SELECT * FROM tasks WHERE user_id='$user_id'");

$tasks = [];
while ($row = $res->fetch_assoc()) {
    $tasks[] = $row;
}

echo json_encode($tasks);
?>