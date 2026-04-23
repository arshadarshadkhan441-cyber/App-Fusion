<?php
include 'db.php';

$course_id = $_POST['course_id'];
$title = $_POST['title'];
$video = $_POST['video_url'];

$conn->query("
INSERT INTO lessons (course_id, title, video_url)
VALUES ($course_id, '$title', '$video')
");

echo "added";
?>