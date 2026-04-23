<?php
session_start();
include 'db.php';

$email = $_POST['email'];
$password = $_POST['password'];

$result = $conn->query("SELECT * FROM admin WHERE email='$email'");

if ($result->num_rows > 0) {
  $admin = $result->fetch_assoc();

  if (password_verify($password, $admin['password'])) {
    $_SESSION['admin'] = true;
    echo "success";
  } else {
    echo "Wrong password";
  }
} else {
  echo "Admin not found";
}
?>