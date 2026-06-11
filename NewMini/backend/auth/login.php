<?php

session_start();

include "../config/db.php";

$email = $_POST['email'];
$password = $_POST['password'];
$role = $_POST['role'];

$sql = "SELECT * FROM users
WHERE email='$email'
AND role='$role'";

$result = mysqli_query($conn,$sql);

if(mysqli_num_rows($result) > 0){

    $user = mysqli_fetch_assoc($result);

    if(
        password_verify(
            $password,
            $user['password']
        )
    ){

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];

        echo json_encode([
            "status" => "success",
            "role" => $user['role']
        ]);

    }else{

        echo json_encode([
            "status" => "incorrect_password"
        ]);
    }

}else{

    echo json_encode([
        "status" => "user_not_found"
    ]);
}

?>