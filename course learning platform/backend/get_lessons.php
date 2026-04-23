<?php
include 'db.php';

$course_id = $_GET['course_id'];

$result = $conn->query("SELECT * FROM lessons WHERE course_id=$course_id");

$data = [];
while($row = $result->fetch_assoc()){
  $data[] = $row;
}

echo json_encode($data);
?>