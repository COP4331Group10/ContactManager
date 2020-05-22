<?php
/**
 * @package Users class
 *
 * @author Luis Galvis
 *
 */

include("DBConnection.php");
class Users
{

	protected $db;
	private $_username;
	private $_password;

	public function setUsername($username) {
		$this->_username = $username;
	}

	public function setPassword($password) {
		$this->_password = $password;
	}

	public function __construct() {
		$this->db = new DBConnection();
		$this->db = $this->db->returnConnection();
   }

	// create user
	public function createUser() {
		try {

			$sql = "INSERT INTO Users (Login, Password)
					VALUES (:username, :password)";
			$data = [
				'username' => $this->_username,
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
