<?php
header("Access-Control-Allow-Methods: GET");

$requestMethod = $_SERVER["REQUEST_METHOD"];
include('../class/Contacts.php');
$contact = new Contacts();
switch($requestMethod) {
	case 'GET':
		$contactID = '';

		if($_GET['id']) {
			$contactID = $_GET['id'];
			$contact->setContactID($contactID);
			$contactInfo = $contact->getContact();
		} else {
			$contactInfo = $contact->getAllContact();
		}
		if(!empty($contactInfo)) {
	      $js_encode = json_encode($contactInfo, true);
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