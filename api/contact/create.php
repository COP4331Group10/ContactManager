<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$requestMethod = $_SERVER["REQUEST_METHOD"];
include ('../class/Contacts.php');
$contact = new Contacts();

// get posted data
$data = json_decode(file_get_contents("php://input"));

switch ($requestMethod)
{
    case 'POST':
        $contact->setUserID($data->userId);
        $contact->setFirstName($data->firstName);
        $contact->setLastName($data->lastName);
        $contact->setPhoneNumber($data->phoneNumber);
        $contact->setEmail($data->email);
        $contact->setAddress($data->address);
        $contact->setAdditionalNotes($data->additionalNotes);

        $contactInfo = $contact->createContact();

        if (!empty($contactInfo))
        {
            header("HTTP/1.0 200 OK");
        }
        else
        {
            header("HTTP/1.0 409 Conflict");
        }
        header('Content-Type: application/json');
        if (!empty($data))
        {
            $js_encode = json_encode(array(
                'status' => true,
                'message' => 'Contact created Successfully'
            ) , true);
        }
        else
        {
            $js_encode = json_encode(array(
                'status' => false,
                'message' => 'Contact creation failed.'
            ) , true);
        }
        echo $js_encode;
    break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
    break;
}
?>
