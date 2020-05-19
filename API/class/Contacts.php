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
    private $_firstName;
	private $_lastName;
	private $_userID;
    private $_phoneNumber;
	private $_address;
	private $_email;
    private $_dateAdded;
	private $_dateUpdated;
	private $_additionalNotes;
	
	public function setId($id) {
        $this->_id = $id;
    }
	public function setUserID($userID) {
        $this->_userID = $userID;
    }
    public function setContactID($contactID) {
        $this->_id = $contactID;
    }
    public function setFirstName($firstName) {
        $this->_firstName = $firstName;
    }
    public function setLastName($lastName) {
        $this->_lastName = $lastName;
	}
	public function setPhoneNumber($phoneNumber) {
        $this->_phoneNumber = $phoneNumber;
    }
    public function setAddress($address) {
        $this->_address = $address;
    }
    public function setEmail($email) {
        $this->_email = $email;
	}
	public function setAdditionalNotes($additionalNotes) {
        $this->_additionalNotes = $additionalNotes;
	}
	public function setDateUpdated(){
		$this->dateUpdated = 'CURRENT_TIMESTAMP()'; 
	}
   
    public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
	}
	

 
    // create contact
    public function createContact() {
		try {
    		$sql = "INSERT INTO Contacts (firstName, lastName, phoneNumber, email, address, additionalNotes, userID)
					VALUES (:firstName, :lastName, :phoneNumber, :email, :address, :additionalNotes, :userID)";
    		$data = [
			    'firstName' => $this->_firstName,
				'lastName' => $this->_lastName,  
				'phoneNumber' => $this->_phoneNumber,
				'email' => $this->_email, 
				'address' => $this->_address,
				'additionalNotes' => $this->_additionalNotes,
				'userID' => $this->_userID
			];
	    	$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$status = $stmt->rowCount();
            return $status;
 
		} catch (Exception $e) {
    		die("There's an error in the query!");
		}
    }
 
    // update contact
    public function updateContact() {
        try {
		    $sql = "UPDATE Contacts SET firstName=:firstName,
									   lastName=:lastName,
									   phoneNumber=:phoneNumber,
									   email=:email,
									   address=:address,
									   additionalNotes=:additionalNotes							 
								   WHERE id=:contact_id";
		    $data = [
			    'firstName' => $this->_firstName,
				'lastName' => $this->_lastName,
				'phoneNumber' => $this->_phoneNumber,
				'email' => $this->_email,
				'address' => $this->_address,
				'additionalNotes' => $this->_additionalNotes,
			    'contact_id' => $this->_id
			];
			$stmt = $this->db->prepare($sql);
			$stmt->execute($data);
			$status = $stmt->rowCount();
            return $status;
		} catch (Exception $e) {
			die("There's an error in the query!");
		}
    }
	
    // get contact
    public function getContact() {
    	try {
    		$sql = "SELECT * FROM Contacts WHERE id=:contact_id";
		    $stmt = $this->db->prepare($sql);
		    $data = ['contact_id' => $this->_id];
		    $stmt->execute($data);
		    $result = $stmt->fetch(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
		    die("There's an error in the query!");
		}
	}
	
	// getAll contacts
    public function getAllStudent() {
    	try {
    		$sql = "SELECT * FROM Contacts";
		    $stmt = $this->db->prepare($sql);
 
		    $stmt->execute();
		    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
		} catch (Exception $e) {
		    die("There's an error in the query!");
		}
    }
 
    // delete contact
    public function deleteContact() {
    	try {
	    	$sql = "DELETE FROM Contacts WHERE id=:contact_id";
		    $stmt = $this->db->prepare($sql);
		    $data = [
		    	'contact_id' => $this->_id
			];
	    	$stmt->execute($data);
            $status = $stmt->rowCount();
            return $status;
	    } catch (Exception $e) {
		    die("There's an error in the query!");
		}
    }
}
?>	