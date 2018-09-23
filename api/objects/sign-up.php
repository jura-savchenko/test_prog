<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../tools/jwt-helper.php';
include_once '../tools/api-response.php';
include_once '../tools/createToken.php';
include_once '../tools/headers.php';

/**
 * Class SignUpClass sign up user class
 */
class SignUpClass
{
    /**
     * Connection to database
     */
    private $conn;

    /**
     * Table name
     */
    private $table_name = "user";

    /**
     * @var string User name
     */
    public $name;

    /**
     * @var string User surname
     */
    public $surname;

    /**
     * @var string User email
     */
    public $email;

    /**
     * @var string User birthday
     */
    public $birthday;

    /**
     * @var string User password
     */
    public $password;

    /**
     * @var string User password confirmation
     */
    public $repeatPassword;

    /**
     * SignUpClass constructor.
     * @param $db mysqli DB connection
     */
    public function __construct($db){
        $this->conn = $db;
    }

    /**
     * Check is user exist
     * @return array|null User status
     */
    public function isUserExist(){
        $user_check_query = "SELECT * FROM " . $this->table_name . " WHERE email='$this->email' LIMIT 1";
        $result = mysqli_query($this->conn, $user_check_query);
        $user = mysqli_fetch_assoc($result);
        return $user;
    }

    /**
     * Sign up user
     * @return string Sign up status
     */
    public function signUpUser(){
        $this->password = md5($this->password);
        $tokenClass = new TokenService();

        $query = "INSERT into " . $this->table_name . " (email, password, name, surname, birthday)" .
            " VALUES ('$this->email', '$this->password', '$this->name', '$this->surname', '$this->birthday')";

        $result = $this->conn->query($query);
        $last_id = $this->conn->insert_id;
        return $tokenClass->createToken(`${$last_id}`, $this->email);
    }
}
