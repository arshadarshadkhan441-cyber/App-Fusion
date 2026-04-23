<?php
session_start();
include 'db.php';

$user_id = $_SESSION['user_id'];


$result = $conn->query("SELECT * FROM cart WHERE user_id=$user_id");



{
while($row = $result->fetch_assoc()){
  $course_id = $row['course_id'];

  $conn->query("INSERT INTO purchases (user_id, course_id)
                VALUES ($user_id, $course_id)");
}

$conn->query("DELETE FROM cart WHERE user_id=$user_id");

echo "purchased";
}



?>