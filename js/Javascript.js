var urlBase = 'http://knightacts.ueuo.com';
var extension = 'php';

var userId = 0;

// Creates an account for the new user.
function doSignUp()
{
	userId = 0;
	var userName = document.getElementById("newUserName").value;
	var password = document.getElementById("newPassword").value;

	if (!userName || userName.length === 0 || !password || password.length === 0)
	{
		document.getElementById("signUpResult").innerHTML = "Please enter a username and password.";
		return;
	}

	var hash = md5( password );

	document.getElementById("signUpResult").innerHTML = "";
	var jsonPayload = '{"username" : "' + userName + '", "password" : "' + hash + '"}';
	var url = urlBase + '/api/user/create.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	var createdFlag = false;
	try
	{
		xhr.onreadystatechange = function()
		{
		    // API returns 409 if account was not able to be created
            if (this.status == 409)
            {
                document.getElementById("signUpResult").innerHTML = "User could not be created";
                return; // return seems to not do anything in this context
            }


			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("signUpResult").innerHTML = "User has been added"; // Remove msg when working
				createdFlag = true;
			}
		};
		xhr.send(jsonPayload);

	}
	catch(err)
	{
		document.getElementById("signUpResult").innerHTML = err.message;
	}

	// if accoutn is created, go to logged in page
	if (createdFlag)
	{
	    saveCookie();
        window.location.href = "contactPage.html";
	}
}

// Logs existing user into account.
function doLogin()
{
	userId = 0;

	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var url = urlBase + '/api/user/login.' + extension;
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

		saveCookie();
		window.location.href = "contactPage.html";
		getAllContacts();
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
	document.cookie = "userId=" + userId + ";expires=" + date.toGMTString();
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
		//document.getElementById("userId").innerHTML = "Logged in as " + userId;
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
	getAllContacts();
}

function goToAddContact()
{
	window.location.href = "createNewContact.html";
}

// Creates a new contact
function addContact()
{
	readCookie();

	var firstName = document.getElementById("firstNameText").value;
	var lastName = document.getElementById("lastNameText").value;
	var emailContact = document.getElementById("emailContact").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var addressContact = document.getElementById("addressContact").value;
	var notesContact = document.getElementById("notesContact").value;
	document.getElementById("contactAddResult").innerHTML = "";

	if (firstName == '' || lastName == '')
	{
		document.getElementById("contactAddResult").innerHTML = "Please enter the required fields.";
		return;
	}


	else
	{
		var jsonPayload = '{"FirstName" : "' + firstName + '", "LastName" : "' +lastName+ '", "Email" : "' +emailContact+ '", "PhoneNumber" : "' +phoneNumber+ '", "Address" : "' +addressContact+ '", "AdditionalNotes" : "' +notesContact+ '", "UserID" : ' + userId + '}';
		var url = urlBase + '/api/contact/create.' + extension;

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
}

function searchContacts()
{
	readCookie();

	var srch = document.getElementById("searchBar").value;

	var contactList = "";

	var jsonPayload = '{"userId" : "' + userId + '","search" : ' + srch + '}';
	var url = urlBase + '/api/contact/search.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("contactSearchResult").innerHTML = "Knightacts have been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );

				for( var i = 0; i < jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i]; // need to print fname lname only
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n"; // list here
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

// SearchContacts2() is what is currently being called in contactPage.html. It does a "live" search
// based on tag name. Needs to instead go off of firstName, lastName of the contact objects - which I don't think
// are being stored. Also needs to be connected to the API.
function searchContact2()
{
	readCookie();

	var srch = document.getElementById("searchBar").value;
	var contactList = "";
	var jsonPayload = '{"userId" : "' + userId + '","search" : ' + srch + '}';
	var url = urlBase + '/api/contact/search.' + extension;
	var input, filter, ul, li, a, i, txtValue;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	// This block of code does a "live"
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
			li[i].style.display = "none";
	 	}
    }
}

function editPage()
{
	readCookie();

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

	if (firstName == '' || lastName == '')
	{
		document.getElementById("contactAddResult").innerHTML = "Please enter the required fields.";
		return;
	}

	else
	{
	//This will allow the change
	var jsonPayload = '{FirstName" : "' + firstName + '", "LastName" : "' +lastName+ '", "Email" : "' +emailContact+ '", "PhoneNumber" : "' +phoneNumber+ '", "Address" : "' +addressContact+ '", "AdditionalNotes" : "' +notesContact+ '", "UserID" : ' + userId + '}';
	var url = urlBase + '/api/contact/update';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{

			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("editResult").innerHTML = "Knightact has been Updated";
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
}


function goToEditPage()
{
	readCookie();

	window.location.href = "editContact.html";

	var jsonPayload = null;
	var url = urlBase + '/api/contact/api/contact/update.' + extension;

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

function deleteContact(id)
{
	readCookie();

	var prompt = confirm("Are you sure you want to delete this Knightact?");
	if(prompt)
	{
		var url = urlBase + '/api/contact/delete/' + Number(id);
		var jsonPayload = null;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.send(jsonPayload);
			window.location.href = "contactPage.html";
			getAllContacts();
		}
		catch(err)
		{
			document.getElementById("contactEditResult").innerHTML = err.message;
		}
	}
}

function getAllContacts()
{
	readCookie();

    getAllContactsUser(userId);
}

function getAllContactsUser(id)
{
	var url = urlBase + '/api/contact/getUserContacts/' + Number(id);

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
		    var div = document.getElementById("myUL");
		    var jsonObject = JSON.parse( xhr.responseText );

		    for (i = 0; i < jsonObject.contacts.length; i++)
		    {
		        var content = document.createElement("a");
		        content.id = "contact";
		        content.setAttribute("onclick", "goToEditPage();");

		        content.innerHTML = jsonObject.contacts[i].FirstName;

		        var contact = document.createElement("li");
                contact.appendChild(content);

                div.appendChild(contact);
		    }
		}
		xhr.send(null); // sending null since get request
	}
	catch(err)
	{
		//document.getElementById("editResult").innerHTML = err.message;
		alert(err.message);
	}
}
