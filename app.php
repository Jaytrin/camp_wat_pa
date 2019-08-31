<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST');
require_once('mysql_connect.php');
$request = $_GET['request'];
switch($request){
    case 'get_data':
    require_once('families.php');
    break;
    case 'login':
    require_once('login.php');
    break;
    default:
    $output['Errors'] = 'Request URL failed';
    break;
}
$output = json_encode($output);
echo $output;
?>