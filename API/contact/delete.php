<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");

$requestMethod = $_SERVER["REQUEST_METHOD"];
include('../class/Contacts.php');
$contact = new Contacts();
switch($requestMethod) {
	case 'DELETE':
		$empId = '';	
		if($_GET['id']) {
			$contactID = $_GET['id'];
			$contact->setContactID($contactID);
		}
		$contactInfo = $contact->deleteContact();
		if(!empty($contactInfo)) {
		//   $js_encode = json_encode(array('status'=>TRUE, 'message'=>'Contact deleted Successfully.'), true);
		  header("HTTP/1.1 200 OK");
        } else {
			// $js_encode = json_encode(array('status'=>FALSE, 'message'=>'Contact delete failed.'), true);
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