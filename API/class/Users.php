<?php
/**
 * @package Contact class
 *
<<<<<<< HEAD
 * @author Luis Galvis
 *   
 */
 
include("DBConnection.php");
class Users 
{
    protected $db;
    private $_username;
    private $_usernamePW;
	
	public function setUsername($Login) {
        $this->_username = $Login;
    }
    public function setPassword($Password) {
        $this->_usernamePW = $Password;
    }
	
	#public function setDateUpdated(){
	#	$this->dateUpdated = 'CURRENT_TIMESTAMP()'; 
	#}
   
    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	
    // create user
    public function createUser() {
		try {
    		$sql = "INSERT INTO Users (Login, Password)
					VALUES (:login, :password)";
    		$data = [
			    'login' => $this->_username,
				'password' => $this->_usernamePW

?>