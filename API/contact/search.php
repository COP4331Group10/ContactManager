<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$requestMethod = $_SERVER["REQUEST_METHOD"];
include('../class/Contacts.php');
$contact = new Contacts();

// get posted data
$data = json_decode(file_get_contents("php://input"));

if ($conn->connect_error){
		returnWithError( $conn->connect_error );
	}
	
	else{
		
		$sql = "Search for contacts where Name like '%" . $inData["search"] . "%' and UserID = " . $inData["userId"];
		$result = $conn->query($sql);
		
		if ($result->num_rows > 0){
			while($row = $result->fetch_assoc()){
				if( $searchCount > 0 ){
					$searchResults .= ",";
				}
				
				$searchCount++;
				$searchResults .= '"' . $row["Name"] . '"';
			}
		}
		
		else{
			returnWithError( "No Conctacts Found." );
		}
		
		$conn->close();
	}

	returnWithInfo( $searchResults );

	function getRequestInfo(){
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj ){
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err ){
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults ){
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
}
?>	