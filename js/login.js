function login (form) {
	var email = form.email_or_userName.value;
	var pass = hashString(form.psw.value);

	console.log(email);    
	console.log(pass);    
	console.log(users);    

	var users = JSON.parse(window.localStorage.getItem("users_db"));
	
	if (email in users) {
		console.log("user in users");
		
		if (users[email]["password"] == pass) {
			console.log("password is correct loging in");

			localStorage.setItem("current_user", email);

			console.log(users[email]["userName"]);


			show('userLogged'); hide('login'); hide('register'); hide('home'); 	// pokazujesz do widoku zalogowanego
			on_load();
			return true;

		} else {
			document.getElementById("loginFormPassword").textContent = "Niepoprawny email lub hasło";
			console.log("incorrect password");
		}
	} else {
		console.log("user not registered");
		alert("Nie ma takiego użytkownika w bazie danych. Podany adres email jest wolny, możesz się zarejestrować wykorzystując podany adres");
		hide("btn3");
	}

	on_load();
	return false;
}

function logout() {
	localStorage.removeItem("current_user");
	alert("Wylogowany");
	on_load();
}