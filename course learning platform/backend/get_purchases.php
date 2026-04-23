<?php
session_start();
include 'db.php';

$user_id = $_SESSION['user_id'];

$result = $conn->query("
SELECT courses.id, courses.title, courses.price 
FROM purchases
JOIN courses ON purchases.course_id = courses.id
WHERE purchases.user_id = $user_id
");

$data = [];
while($row = $result->fetch_assoc()){
  $data[] = $row;
}

echo json_encode($data);
?>