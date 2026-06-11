<?php

include "../config/db.php";

$id = $_POST['id'];

$sql = "DELETE FROM clients
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