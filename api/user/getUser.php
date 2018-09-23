<?php

include_once '../objects/user.php';
include_once '../config/database.php';

ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

$connect = new Database();
$user = new User($connect->getConnection());

$postdata = file_get_contents("php://input");
$user->token = apache_request_headers()['auth-token'];
echo $user ->getUser();
