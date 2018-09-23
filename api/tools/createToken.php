<?php
include_once 'jwt-helper.php';

/**
 * Class TokenService
 */
class TokenService{

    /**
     * @var string Secret token key
     */
    private $_tokenKey = 'secretKey';

    /**
     * @param $id string User id
     * @param $email string User email
     * @return string Token
     */
    public function createToken($id, $email)
    {
        $token = array();
        $token['id'] = $id;
        $token['email'] = $email;
        return JWT::encode($token, $this->_tokenKey);
    }

    /**
     * @param $token string Token value
     * @return object
     */
    public function getTokenValue($token)
    {
        return JWT::decode($token, $this->_tokenKey);
    }
}
