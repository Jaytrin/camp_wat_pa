<?php
session_start();
Ob_start();
require_once('mysql_connect.php');
$email = $_POST['email'];
$password = $_POST['password'];
$hashQuery = "SELECT p.hash
            FROM password AS p
            JOIN user AS u
            ON u.ID = p.user_id
            WHERE u.email = '$email'
            AND u.status = 'active'
            ";
$hashResult = mysqli_query($conn, $hashQuery);
if($hashResult){
    $hashNumRows = mysqli_num_rows($hashResult);
    if($hashNumRows > 0){
        $hash = mysqli_fetch_assoc($hashResult)['hash'];
        if(password_verify($password, $hash)){
            $query = "SELECT u.ID AS _id, u.fname, u.lname, u.email, u.username, u.status
                FROM user AS u
                JOIN password AS p
                ON u.ID = p.user_id
                WHERE u.email = '$email'
                AND p.hash = '$hash'
                AND u.status = 'active'
              ";
            $result = mysqli_query($conn, $query);
            $output = new stdClass;
            $output->success = false;
            $output->loggedin = false;
            if($result){
                $numRows = mysqli_num_rows($result);
                if($numRows > 0){
                    $row = mysqli_fetch_assoc($result);
                    
                    print_r($row);
                    $_SESSION['userData'] = $row;
                    $output->success = true;
                    $output->loggedin = true;
                    $output->userData = $_SESSION['userData'];
                    $output->message = 'Logged In';
                } else{
                    $output->message = 'Invalid email and/or password';
                }
            } else{
                $output->message = 'Server error';
            }
        } else {
            echo 'Invalid password.';
        }}};
ob_end_clean();
?>