<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$requestMethod = $_SERVER["REQUEST_METHOD"];
include('../class/Users.php');
$user = new Users();

// get posted data
$data = json_decode(file_get_contents("php://input"));

switch($requestMethod) {
	case 'POST':
		$user->setUsername($data->username);
		$user->setPassword($data->password);
		
		$userInfo = $user->createUser();
 
		if(!empty($userInfo)) {
			header("HTTP/1.0 200 OK");
        } else {
			header("HTTP/1.0 409 Conflict");
        }
		header('Content-Type: application/json');
		echo $js_encode;	
		break;
	default:
		header("HTTP/1.0 405 Method Not Allowed");
	break;
}
?>	