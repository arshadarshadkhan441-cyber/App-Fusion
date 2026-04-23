<?php
include("db.php");

$user_id = $_POST['user_id'];
$text = $_POST['text'];
$priority = $_POST['priority'];
$due = $_POST['date'] ?? null;

if(!empty($text) &&  !empty($priority) && !empty($due))
{

$sql = "INSERT INTO tasks (user_id, text, priority, due_date)
        VALUES ('$user_id', '$text', '$priority', '$due')";

echo $conn->query($sql) ? "Task Added" : "Error";
}
else{
        echo "kindly fill all field";
}
?>