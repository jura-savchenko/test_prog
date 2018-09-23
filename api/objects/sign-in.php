<?php

include_once '../config/database.php';
include_once '../tools/jwt-helper.php';
include_once '../tools/api-response.php';
include_once '../tools/createToken.php';
include_once '../tools/headers.php';

/**
 * Class SignIn Sign in object
 */
class SignIn
{
    /**
     * @var mysqli Database connection
     */
    private $conn;

    /**
     * @var string Table name
     */
    private $table_name = "user";

    /**
     * @var string User email
     */
    public $email;

    /**
     * @var string User password
     */
    public $password;

    /**
     * SignIn constructor.
     * @param $db mysqli Db connection
     */
    public function __construct($db)
    {
        $this->conn = $db;
    }

    /**
     * @return string Sign in user
     */
    function signInUser()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE email = '{$this->email}' and password = '{$this->password}'";
        $result = $this->conn->query($query);
        $tokenClass = new TokenService();

        if ($result->num_rows > 0) {
            $obj = $result->fetch_object();
            unset($obj->password);
            return json_response($tokenClass->createToken($obj->id, $obj->email), 200);
        } else {
            return json_response('Invalid email or password', 404);;
        }
    }
}
