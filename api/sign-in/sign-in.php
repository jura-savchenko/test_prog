<?php

include_once '../tools/headers.php';
include_once '../config/database.php';
include_once '../objects/sign-in.php';

$connection = new Database();
$signIn = new SignIn($connection->getConnection());

$postData = file_get_contents("php://input");
$request = json_decode($postData);
$signIn->email = $request->email;
$signIn->password = md5(addslashes($request->password));

if (empty($signIn->email)) {
    echo json_response('Invalid email', 400);;
    return;
}
if (empty($signIn->password)) {
    echo json_response('Invalid password', 400);
    return;
}

echo $signIn->signInUser();
