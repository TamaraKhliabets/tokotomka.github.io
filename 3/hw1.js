
function inputCheck() {
	if (passwordIsValid() & emailIsValid() & checkboxIsChecked() & nicknameIsChecked()) {
		document.body.style.backgroundImage = "url('')";
		document.body.style.opacity = '0';
		
		if (document.getElementById("destroy").checked) {
			document.body.style.backgroundColor = 'black';
		}
		setTimeout(greeting, 3000);
		setTimeout(showAlert, 4000);
	}
}

function showAlert() {
	if (document.getElementById("destroy").checked) {
		alert("Welcome to Hell!");
	} else {
		alert("Welcome to Garden of Eden!");
	}
}

function passwordIsValid() {
	const MIN_PASSWORD_LENGTH = 5;
	if (document.getElementById("password").value.length < MIN_PASSWORD_LENGTH) {
		document.getElementById("passwordError").innerHTML = "Password is too short!";
		return false;
	} else {
		document.getElementById("passwordError").innerHTML = "";
		return true;
	}
}

function emailIsValid() {
	var regExp = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
	var email = document.getElementById("emailAddress").value;
	if (!regExp.test(email)) {
		document.getElementById("emailError").innerHTML = "Email is invalid!";
		return false;
	} else {
		document.getElementById("emailError").innerHTML = "";
		return true;
	}
}

function checkboxIsChecked() {
	if (document.getElementById("checkbox").checked) {
		document.getElementById("checkboxError").innerHTML = "";
		return true;
	} else {
		document.getElementById("checkboxError").innerHTML = "You must agree with Policy!";
		return false;
	}
	
}

function nicknameIsChecked() {
	const MIN_NICKNAME_LENGTH = 1;
	if (document.getElementById("nickname").value.length > MIN_NICKNAME_LENGTH) {
		document.getElementById("nicknameError").innerHTML = "";
		return true;
	} else {
		document.getElementById("nicknameError").innerHTML = "Nickname is too short!";
		return false;
	}
}
	
function greeting() {
	var indexOfHero = document.getElementById("select").options.selectedIndex;
	if (indexOfHero == 0) {
		indexOfHero = Math.round(Math.random() * 3 + 1);
	}
	var hero = document.getElementById("select").options[indexOfHero].text;
	alert ("Hello, " + hero + "!");
}