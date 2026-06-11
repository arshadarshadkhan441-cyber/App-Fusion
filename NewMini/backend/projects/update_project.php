<?php

header("Content-Type: application/json");

include "../config/db.php";

$id = $_POST['id'] ?? '';
$title = $_POST['title'] ?? '';
$description = $_POST['description'] ?? '';
$status = $_POST['status'] ?? '';
$deadline = $_POST['deadline'] ?? '';

if(empty($id)){

    echo json_encode([
        "status" => "error",
        "message" => "Project ID Missing"
    ]);

    exit();
}

$sql = "UPDATE projects SET
title='$title',
description='$description',
status='$status',
deadline='$deadline'
WHERE id='$id'";

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