<?php

include "../config/db.php";

$sql = "SELECT * FROM team
ORDER BY id DESC";

$result = mysqli_query($conn,$sql);

$team = [];

while($row = mysqli_fetch_assoc($result)){

    $team[] = $row;
}

echo json_encode($team);

?>