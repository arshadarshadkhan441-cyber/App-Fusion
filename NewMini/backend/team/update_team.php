<?php

header("Content-Type: application/json");

include "../config/db.php";

$id = $_POST['id'] ?? '';
$name = $_POST['name'] ?? '';
$role = $_POST['role'] ?? '';
$email = $_POST['email'] ?? '';

$sql = "UPDATE team SET
name='$name',
role='$role',
email='$email'
WHERE id='$id'";

if(mysqli_query($conn,$sql)){

    echo json_encode([
        "status" => "success"
    ]);

}else{

    echo json_encode([
        "status" => "error"
    ]);
}

?>