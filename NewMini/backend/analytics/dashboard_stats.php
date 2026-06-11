<?php
include("../config/db.php");

$users = $conn->query("SELECT COUNT(*) as total FROM users")->fetch_assoc();
$projects = $conn->query("SELECT COUNT(*) as total FROM projects")->fetch_assoc();

echo json_encode([
    "users" => $users['total'],
    "projects" => $projects['total']
]);
?>