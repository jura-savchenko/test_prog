<?php

include_once '../objects/user.php';
include_once '../config/database.php';
include_once '../tools/api-response.php';

$connect = new Database();
$user = new User($connect->getConnection());

$postdata = file_get_contents("php://input");
$user->token = $_SERVER['HTTP_AUTH_TOKEN'];
echo $user ->getUser();
