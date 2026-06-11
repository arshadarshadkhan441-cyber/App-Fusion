<?php

include "../config/db.php";

$sql = "SELECT * FROM uploads
ORDER BY id DESC";

$result = mysqli_query($conn,$sql);

$uploads = [];

while($row = mysqli_fetch_assoc($result)){

    $uploads[] = $row;
}

echo json_encode($uploads);

?>