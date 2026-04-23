<?php
include("db.php");

$id = $_POST['id'];

$conn->query("UPDATE tasks SET completed = NOT completed WHERE id='$id'");
echo "updated";
?>

