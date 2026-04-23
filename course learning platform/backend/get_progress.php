<?php
session_start();
include 'db.php';

$user_id = $_SESSION['user_id'];
$course_id = $_GET['course_id'];

$total = $conn->query("SELECT COUNT(*) as t FROM lessons WHERE course_id=$course_id")->fetch_assoc()['t'];

$completed = $conn->query("
SELECT COUNT(*) as c FROM progress 
JOIN lessons ON progress.lesson_id = lessons.id
WHERE progress.user_id=$user_id AND lessons.course_id=$course_id
")->fetch_assoc()['c'];

$percent = $total > 0 ? ($completed / $total) * 100 : 0;

echo json_encode([
  "total"=>$total,
  "completed"=>$completed,
  "percent"=>round($percent)
]);
?>