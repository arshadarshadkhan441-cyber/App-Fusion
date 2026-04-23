<?php
include("db.php");

$username = $_POST['username'];
$pass = $_POST['password'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);
if(!empty($username) && !empty($pass))
{
// check if user exists
$check = $conn->query("SELECT * FROM users WHERE username='$username'");
if ($check->num_rows > 0) {
    echo "User already exists";
    exit;
}

$sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

echo $conn->query($sql) ? "Signup successful" : "Error";
}
else{
    echo " User Name and Password required" ;
}
?>