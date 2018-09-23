<?php

include_once '../tools/headers.php';
include_once '../config/database.php';
include_once '../objects/sign-up.php';

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);
$connection = new Database();
$signUp = new SignUpClass($connection->getConnection());

$signUp->email = $data->email;
$signUp->name = $data->name;
$signUp->surname = $data->surname;
$signUp->birthday = $data->birthday;
$signUp->password = $data->password;
$signUp->repeatPassword = $data->confirmPassword;


if (empty($signUp->email)) {
    echo json_response("Email is required", 400);
    return;
}
if (empty($signUp->name)) {
    echo json_response("Name is required", 400);
    return;
}
if (empty($signUp->password)) {
    echo json_response("Password is required", 400);
    return;
}
if (empty($signUp->surname)) {
    echo json_response("Surname is required", 400);
    return;
}
if ($signUp->password != $signUp->repeatPassword) {
    echo json_response("The two passwords do not match", 400);
    return;
}

if ($signUp->isUserExist()) { // if user exists
    echo json_response("Email is already exist", 400);
    return;
}

echo json_response($signUp->signUpUser(), 200);
