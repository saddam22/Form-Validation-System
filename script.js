const form = document.getElementById("form");

form.addEventListener("submit", function(e){
	e.preventDefault();

	let name = document.getElementById("name").value.trim();
	let email = document.getElementById("email").value.trim();
	let password = document.getElementById("password").value.trim();
	let confirmPassword = document.getElementById("confirmPassword").value.trim();

	let valid = true;


// Name Validation
if(name === ""){
	showError("nameError", "Name is required");
	valid = false;
}else{
	hideError("nameError");
}

// Email Validation
let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

if (email === "") {
	showError("emailError", "Email is required");
	valid = false;
}else if(!email.match(emailPattern)){
	showError("emailError", "Invalid email format");
	valid = false;
}else{
	hideError("emailError");
}

// Password Validation
if(password.length < 6){
	showError("passwordError", "Password must be 6 characters");
	valid = false;
}else{
	hideError("passwordError");
}

// Confirm Password
if(password !== confirmPassword){
	showError("confirmPassword", "Password do not match");
	valid = false;
}else{
	hideError("confirmPassword");
}

// Success
if(valid){

	document.getElementById("successMsg").classList.remove("hidden");
	form.reset();
}

});


function showError(id, message){
	let e1 = document.getElementById(id);
	e1.innerText = message;

	e1.classList.remove("hidden");
}


function hideError(id){
	let e1 = document.getElementById(id);
	e1.classList.add("hidden");
}
