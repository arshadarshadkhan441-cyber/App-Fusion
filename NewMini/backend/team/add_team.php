<?php

include "../config/db.php";

$name = $_POST['name'];
$role = $_POST['role'];
$email = $_POST['email'];

$sql = "INSERT INTO team
(name,role,email)
VALUES
('$name','$role','$email')";

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