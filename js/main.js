function hide(name) {
	document.getElementById(name).style.display = 'none';
}
function show(name) {
	document.getElementById(name).style.display = 'inline';
}

function on_load () {
	const email = localStorage.getItem('current_user');
	if (email === null) {
		console.log("no logged user");
		document.getElementById("user").innerHTML = "Użytkownik nie jest zalogowany";
		// chowanie przyciskow jak niezalogowany i pokazywanie
		hide("btn4");
		show("btn2");
		show("btn3");
		hide("btn1");
		hide("btn5");

	} else {
		document.getElementById("user").innerHTML = email;
		// chowanie i pokazywanie jak zalogowany
		hide("btn1");
		hide("btn2");
		hide("btn3");
		hide("btn4");	
		show("btn5");		

	}
}
on_load();