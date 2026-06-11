<?php

include "../config/db.php";

$id = $_POST['id'];

$sql = "DELETE FROM projects
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