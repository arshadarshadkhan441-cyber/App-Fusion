<?php

header("Content-Type: application/json");

include "../config/db.php";

$id = $_POST['id'] ?? '';
$status = $_POST['status'] ?? '';

if(empty($id)){

    echo json_encode([
        "status" => "error",
        "message" => "Project ID Missing"
    ]);
    exit();
}

$sql = "UPDATE projects SET status='$status' WHERE id='$id'";

if(mysqli_query($conn, $sql)){

    echo json_encode([
        "status" => "success",
        "message" => "Project updated successfully"
    ]);

}else{

    echo json_encode([
        "status" => "error",
        "message" => mysqli_error($conn)
    ]);
}

?>