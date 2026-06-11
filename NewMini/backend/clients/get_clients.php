<?php

include "../config/db.php";

$sql = "SELECT * FROM clients
ORDER BY id DESC";

$result = mysqli_query($conn,$sql);

$clients = [];

while($row = mysqli_fetch_assoc($result)){

    $clients[] = $row;
}

echo json_encode($clients);

?>