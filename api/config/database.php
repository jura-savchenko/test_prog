<?php

include_once '../tools/api-response.php';
/**
 * Class Database
 */
class Database
{

    /**
     * @var string Host
     */
    private $host = "mysql.zzz.com.ua";

    /**
     * @var string Database name
     */
    private $db_name = "jura_aka_gosha";

    /**
     * @var string Username
     */
    private $username = "testprojdb";

    /**
     * @var string Password
     */
    private $password = "Password1";

    /**
     * @var mysqli Database connection
     */
    public $conn;

    /**
     * Get the database connection
     */
    public function getConnection()
    {
        $this->conn = null;
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name) or die('Cannot connect to database');
        return $this->conn;
    }
}
