// User name validation
function verifyUserName(userName) {
	const userName_regex = /^(?=.{6,16}$)(?=(.*[A-z]){5,})(?=.*[0-9])(?!.*[!@#$%^&*]).*$/gm;

	if (userName_regex.test(userName)) {
		return true;
	} else {
		return false;
	}
}

// User email validation
function verifyEmail(email) {
	const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (email_regex.test(email)) {
		return true;
	} else {
		return false;
	}
}

// Email repeat validation
function verifyRepeatEmail() {  
	const emailTest = document.getElementById("email").value;		 
	const emailTest2 = document.getElementById("emailRepeat").value;		 
	
	if(emailTest == emailTest2) {  
		document.getElementById("emailRepeatValidation"); 
		return true;  
	} else {
		return false;
	}
}  

// User password validation
function verifyPassword() {  
	const pw = document.getElementById("psw").value;		 
	if(pw.length >= 6) {  
		return true;
	} else {
		return false; 
	}
}  

function showVerifyUserNameResult(username) {
	if (verifyUserName(username)) {		
		document.getElementById("userNameValidation").style.color = "#00ff00";
		document.getElementById("userNameValidation").textContent = "Prawidłowa nazwa użytkownika";
	} else {
		document.getElementById("userNameValidation").style.color = "#ff0000";
		document.getElementById("userNameValidation").textContent = "Nieprawidłowa nazwa użytkownika. Długość od 6 do 16 znaków, nazwa może składać się tylko z liter, cyfr oraz znaków - _ [ ] \ / przy czym musi zawierać co najmniej 5 liter i jedną cyfrę, popraw!";
	}
}

function showUserNameAlreadyUsed() {
	document.getElementById("userNameValidation").style.color = "#ff0000";
	document.getElementById("userNameValidation").textContent = "Nazwa użytkownika zajęta, wybierz inną!";
}


function showVerifyEmailResult(email) {
	if (verifyEmail(email)) {
		document.getElementById("emailValidation").style.color = "#00ff00";
		document.getElementById("emailValidation").textContent = "Prawidłowy format email";
	} else {
		document.getElementById("emailValidation").style.color = "#ff0000";
		document.getElementById("emailValidation").textContent = "Nieprawidłowy email, popraw!";
	}
}

function showEmailAlreadyUsed() {
	document.getElementById("emailValidation").style.color = "#ff0000";
	document.getElementById("emailValidation").textContent = "Email już zarejestrowany, wybierz inny lub zaloguj się!";
}

function showVerifyRepeatEmailResult(email) {
	if (!verifyRepeatEmail(email)) {
		document.getElementById("emailRepeatValidation").style.color = "#ff0000";
		document.getElementById("emailRepeatValidation").textContent = "Podane adresy mail różnią się od siebie";
	} else {
		document.getElementById("emailRepeatValidation").style.color = "#00ff00";
		document.getElementById("emailRepeatValidation").textContent = "Podane adresy mail pasują do siebie";
	}
}


function showVerifyPasswordResult(password) {
	if (verifyPassword(password)) {
		document.getElementById("pswMessage").style.color = "#00ff00";
		document.getElementById("pswMessage").textContent = "Prawidłowa liczba znaków";
		
	} else {
		document.getElementById("pswMessage").style.color = "#ff0000";
		document.getElementById("pswMessage").textContent = "Hasło musi mieć co najmniej 6 znaków!";
	}
}

function hashString(string) {
    var hash = 0;
    if (string.length == 0) return hash;
    for (x = 0; x <string.length; x++) {
    ch = string.charCodeAt(x);
            hash = ((hash <<5) - hash) + ch;
            hash = hash & hash;
        }
    return hash;
}

function register (form) {
	
	showVerifyUserNameResult(form.userName.value);
	showVerifyEmailResult(form.email.value);
	showVerifyRepeatEmailResult(form.emailRepeat.value);
	showVerifyPasswordResult(form.psw.value);

	if (! ( verifyUserName(form.userName.value) && verifyEmail(form.email.value) && verifyRepeatEmail(form.emailRepeat.value) && verifyPassword(form.psw.value) )) {
		return false;
	} else {
	
		var users = JSON.parse(window.localStorage.getItem("users_db"));
		if (users === null) {
			var users = {};
		}
		
		var userName = form.userName.value;
		var email = form.email.value; 
		var emailRepeat = form.emailRepeat.value;
		var pass = form.psw.value;


		// Check if email is not already used
		if ( email in users ) {
			showEmailAlreadyUsed();
			return false;
		}

		// Check if username is not already used
		for (const [key, value] of Object.entries(users)) {

			console.log(key, value);

			if ( userName == value["userName"] ) {
				showUserNameAlreadyUsed();
				console.log("User istnieje", userName);
				return false;
			}
		}

		users[email] = {
			"userName": userName,
			"email": email,
			"password": hashString(pass)
		}

		// Sign in user after registration
		localStorage.setItem("current_user", form.userName.value);
		localStorage.setItem("current_user", form.email.value);

		// Add user to database
		localStorage.setItem("users_db", JSON.stringify(users));

		show('userLogged'); hide('login'); hide('register'); hide('home');

		on_load();
			
		return true;
	}
}