<?php
include("../config/db.php");

$id = $_GET['id'];

$conn->query("DELETE FROM users WHERE id=$id");

echo json_encode(["message" => "User deleted"]);
?>