<?php
/**
 * @package Contact class
 *
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
			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$status = $stmt->rowCount();
            return $status;

		} catch (Exception $e) {
    		die("There's an error in the query!");
		}
    }
}
?>
