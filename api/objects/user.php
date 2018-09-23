<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../tools/headers.php';
include_once '../tools/api-response.php';
include_once '../tools/createToken.php';

class User
{
    /**
     * @var mysqli Db connection
     */
    private $conn;

    /**
     * @var string Table name
     */
    private $table_name = "user";

    /**
     * @var string User token
     */
    public $token;

    /**
     * User constructor.
     * @param $db mysqli Db connection
     */
    public function __construct($db)
    {
        $this->conn = $db;
    }

    /**
     * @return string Get user
     */
    public function getUser()
    {
        $tokenClass = new TokenService();
        $userId = $tokenClass->getTokenValue($this->token);

        $query = "SELECT * FROM " . $this->table_name . " WHERE email = '{$userId->email}'";
        $result = $this->conn->query($query);

        if ($result->num_rows > 0) {
            $user = $result->fetch_object();
            unset($user->password);
            return json_response($user, 200);
        } else {
            return json_response('User does not exists', 404);;
        }
    }
}
