<?php

include "../config/db.php";
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

include "../config/db.php";

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? '';

if(
    empty($name) ||
    empty($email) ||
    empty($password) ||
    empty($role)
){

    echo json_encode([
        "status" => "error",
        "message" => "All fields required"
    ]);

    exit();
}

$hashedPassword =
password_hash($password,PASSWORD_DEFAULT);

$sql = "INSERT INTO users
(name,email,password,role)
VALUES
('$name','$email','$hashedPassword','$role')";

if(mysqli_query($conn,$sql)){

    echo json_encode([
        "status" => "success"
    ]);

}else{

    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
}

?>