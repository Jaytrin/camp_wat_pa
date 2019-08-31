<?php
session_start();
$output = new stdClass;
$output->success = false;
if(isset($_SESSION['userData'])){
    $output->success = true;
    $output->loggedin = true;
    $output->userData = $_SESSION;
} else{
    $output->message = 'User is not logged in';
}
// json_encode($output);
?>