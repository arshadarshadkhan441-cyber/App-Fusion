<?php

header("Content-Type: application/json");

include "../config/db.php";

$id = $_POST['id'] ?? '';
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$company = $_POST['company'] ?? '';

$sql = "UPDATE clients SET
name='$name',
email='$email',
company='$company'
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