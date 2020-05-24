var urlBase = 'http://knightacts.ueuo.com/';
var extension = 'php';

var userId = 0;

function doSignup()
{
	var login = document.getElementById("signupText").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );
	var url = urlBase + '/Signup.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("signupResult").innerHTML = "User has been added. Please log in now.";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}
}

function doLogin()
{
	userId = 0;
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();
	
		window.location.href = "contactPage.html";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userId").innerHTML = "Logged in as " + userId;
	}
}

function doLogout()
{
	userId = 0;
	document.cookie = "userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function returnToLogin()
{
	window.location.href = "index.html";
}

function moveToSignUp()
{
	window.location.href = "signUp.html";
}

function returnToContactPage()
{
	window.location.href = "contactPage.html";
}

function goToAddContact()
{
	window.location.href = "createNewContact.html";
}

function goToEditContact()
{
	window.location.href = "editContact.html";
	// autofill the contacts information 4-5 pull requests probably.
}

function addContact()
{
	var firstName = document.getElementById("firstNameText").value;
	var lastName = document.getElementById("lastNameText").value;
	var emailContact = document.getElementById("emailContact").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var addressContact = document.getElementById("addressContact").value;
	var notesContact = document.getElementById("notesContact").value;
	
	document.getElementById("contactAddResult").innerHTML = "";
	
	var jsonPayload = '{"First Name" : "' + firstName + '", "Last Name" : "' +lastName+ '", "Email" : "' +emailContact+ '", "Phone Number" : "' +phoneNumber+ '", "Address" : "' +addressContact+ '", "Notes" : "' +notesContact+ '", "userId" : ' + userId + '}';
	var url = urlBase + '/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Knightact has been Added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}	
}

function searchContact()
{
	var srch = document.getElementById("searchBar").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	var contactList = "";
	
	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}'; // ????
	var url = urlBase + '/SearchContacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				for( var i = 0; i < jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i]; // need to print fname lname only
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n"; //button list here 
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}	
}

function updateContact()
{
	//delete old 
	//save new and add it to list 
	window.location.href = "contactPage.html";
}

function deleteContact()
{
	var r = confirm("Are you sure you want to delete this Knightact?");
	if (r == true) 
	{
		 // delete and redirect back to contactPage.html
		 window.location.href = "contactPage.html";
	}
	else {
  		return;
	}
	
}

function editPage()
{
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var emailContact = document.getElementById("emailContact").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var addressContact = document.getElementById("addressContact").value;
	var notesContact = document.getElementById("notesContact").value;
	
	//This should fill in the text boxes
		firstName = document.getElementById("firstName").innerHTML;
		lastName = document.getElementById("lastName").innerHTML;
		emailContact = document.getElementById("emailContact").innerHTML;
		phoneNumber = document.getElementById("phoneNumber").innerHTML;
		addressContact = document.getElementById("addressContact").innerHTML;
		notesContact = document.getElementById("notesContact").innerHTML;
	

	
	//This will allow the change
	var jsonPayload = '{"First Name" : "' + firstName + '","Last Name" : "' + lastName + '","Email" : "' + emailContact + '","PhoneNumber" : "' + phoneNumber + '","Address" : "' + addressContact + '","Notes" : "' + notesContact + '","id" : "' + id + '","Email" : "' + email + '"}';
	var url = urlBase + '/EditContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("editResult").innerHTML = "Contact has been Updated";
				var jsonObject = JSON.parse( xhr.responseText );

				if(jsonObject.results != undefined)
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					
					var firstName = "";
					var lastName = "";
					var emailContact = "";
					var phoneNumber = "";
					var addressContact = "";
					var notesContact = "";
					
					document.getElementById("firstName").innerHTML = firstName;
					document.getElementById("lastName").innerHTML = lastName;
					document.getElementById("emailContact").innerHTML = emailContact;
					document.getElementById("phoneNumber").innerHTML = phoneNumber;
					document.getElementById("addressContact").innerHTML = addressContact;
					document.getElementById("notesContact").innerHTML = notesContact;
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("editResult").innerHTML = err.message;
	}


}


function editButton()
{
	var jsonPayload = '{"id" : "' + id + '"}';
	var url = urlBase + '/EditSearch.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse( xhr.responseText );

				if(jsonObject.results != undefined)
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					
					var firstName = "";
					var lastName = "";
					var emailContact = "";
					var phoneNumber = "";
					var addressContact = "";
					var notesContact = "";
					
					document.getElementById("firstName").innerHTML = firstName;
					document.getElementById("lastName").innerHTML = lastName;
					document.getElementById("emailContact").innerHTML = emailContact;
					document.getElementById("phoneNumber").innerHTML = phoneNumber;
					document.getElementById("addressContact").innerHTML = addressContact;
					document.getElementById("notesContact").innerHTML = notesContact;
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("editResult").innerHTML = err.message;
	}
}

function deleteButton()
{
	
	var prompt = confirm("Are you sure you want to delete " + text);
	if(prompt)
	{
		var jsonPayload = '{"id" : "' + id + '"}';
		var url = urlBase + '/DeleteContact.' + extension;

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.send(jsonPayload);
			location.reload();
		}
		catch(err)
		{
			document.getElementById("contactSearchResult").innerHTML = err.message;
		}
	}
}
