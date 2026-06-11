<?php

include "../config/db.php";

$name = $_POST['name'];
$email = $_POST['email'];
$company = $_POST['company'];

$sql = "INSERT INTO clients
(name,email,company)
VALUES
('$name','$email','$company')";

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