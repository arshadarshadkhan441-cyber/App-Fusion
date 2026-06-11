<?php

include "../config/db.php";

$id = $_POST['id'];

$getFile = mysqli_query(
    $conn,
    "SELECT * FROM uploads WHERE id='$id'"
);

$file = mysqli_fetch_assoc($getFile);

$filePath = "../../uploads/" . $file['file_name'];

if(file_exists($filePath)){
    unlink($filePath);
}

$sql = "DELETE FROM uploads
WHERE id='$id'";

if(mysqli_query($conn,$sql)){

    echo json_encode([
        "status" => "deleted"
    ]);

}else{

    echo json_encode([
        "status" => "error"
    ]);
}

?>