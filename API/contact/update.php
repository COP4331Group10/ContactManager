<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");

$requestMethod = $_SERVER["REQUEST_METHOD"];

include('../class/Contacts.php');

$contact = new Contacts();

// get put data
$data = json_decode(file_get_contents("php://input"));

switch($requestMethod) {	
	case 'PUT':
		$contact->setId($data->id);
		$contact->setFirstName($data->firstName);
		$contact->setLastName($data->lastName);
	    $contact->setPhoneNumber($data->phoneNumber);
	    $contact->setEmail($data->email);
	    $contact->setAddress($data->address);
		$contact->setAdditionalNotes($data->additionalNotes);
		//$contact->setDateUpdated();


		$contactInfo = $contact->updateContact();

		if(!empty($contactInfo)) {
			header("HTTP/1.0 200 OK");
        } else {
            header("HTTP/1.1 404 Not Found");
        }
		header('Content-Type: application/json');
		echo $js_encode;
		break;
	default:
	header("HTTP/1.0 405 Method Not Allowed");
	break;
}
?>