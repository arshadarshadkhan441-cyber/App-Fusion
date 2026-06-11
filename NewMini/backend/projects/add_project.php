<?php

include "../config/db.php";

$title = $_POST['title'];
$description = $_POST['description'];
$status = $_POST['status'];
$deadline = $_POST['deadline'];

$sql = "INSERT INTO projects
(title,description,status,deadline)
VALUES
('$title','$description','$status','$deadline')";

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