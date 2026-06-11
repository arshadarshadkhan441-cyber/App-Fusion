<?php

include "../config/db.php";

$fileName = $_FILES['file']['name'];
$tempName = $_FILES['file']['tmp_name'];

$uploadPath = "../../uploads/" . $fileName;

move_uploaded_file(
    $tempName,
    $uploadPath
);

$sql = "INSERT INTO uploads(file_name)
VALUES('$fileName')";

if(mysqli_query($conn,$sql)){

    echo json_encode([
        "status" => "uploaded"
    ]);

}else{

    echo json_encode([
        "status" => "error"
    ]);
}

?>