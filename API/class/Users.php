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
=======
 * @author Ngoc Nguyen
 *
 */

include("DBConnection.php");
class Contacts
{
    protected $db;
    private $_id;
    private $_login;
    private $_password;

    public function setLogin($Login) {
        $this->_login = $Login;
    }
    public function setPassword($Password) {
        $this->_password = $Password;
    }

    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
   }


    // create contact
    public function createUser() {
		try {
    		$sql = "INSERT INTO Contacts (Login, Password)
					VALUES (:login, :password)";
    		$data = [
			    'login' => $this->_login,
				'password' => $this->_password,
>>>>>>> 62c3af5f479a9ddfeee0d17b8eaf8877397ad8d5
			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$status = $stmt->rowCount();
            return $status;
<<<<<<< HEAD
 
=======

>>>>>>> 62c3af5f479a9ddfeee0d17b8eaf8877397ad8d5
		} catch (Exception $e) {
    		die("There's an error in the query!");
		}
    }
}
<<<<<<< HEAD
?>	
=======
?>
>>>>>>> 62c3af5f479a9ddfeee0d17b8eaf8877397ad8d5
