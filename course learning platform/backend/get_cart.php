<?php
session_start();
include 'db.php';

$user_id = $_SESSION['user_id'];

$result = $conn->query("
SELECT courses.id, courses.title, courses.price 
FROM cart 
JOIN courses ON cart.course_id = courses.id
WHERE cart.user_id = $user_id
");

$data = [];
while($row = $result->fetch_assoc()){
  $data[] = $row;
}

echo json_encode($data);
?>