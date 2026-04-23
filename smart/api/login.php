<?php
include("db.php");

$username = $_POST['username'];
$password = $_POST['password'];

$res = $conn->query("SELECT * FROM users WHERE username='$username'");
$user = $res->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    echo json_encode([
        "status" => "success",
        "user_id" => $user['id']
       // "role" => $user['role']
    ]);
} else {
    echo json_encode(["status" => "fail"]);
}
?>