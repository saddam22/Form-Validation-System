const authForm = document.getElementById("authForm");
const formTitle = document.getElementById("formTitle");
const toggleForm = document.getElementById("toggleForm");

const nameDiv = document.getElementById("nameDiv");
const confirmDiv = document.getElementById("confirmDiv");

const togglePasswordBtn = document.getElementById("togglePassword");

let isLogin = false;


// Show/Hide Password
togglePasswordBtn.addEventListener("click", () =>{
	let pw = document.getElementById("password");
	if(pw.type === "password"){
		pw.type = "text";
		togglePasswordBtn.innerText = "Hide";
	}else{
		pw.type = "password";
		togglePasswordBtn.innerText = "Show";
	}
});


// Toggle Login/Register
toggleForm.addEventListener("click", () =>{
	isLogin = !isLogin;

	if(isLogin){
		formTitle.innerText = "Login";
		nameDiv.classList.add("hidden");
		confirmDiv.classList.add("hidden");
		toggleForm.innerText = "Don't have an account? Register";
	}else{
		formTitle.innerText = "Register";
		nameDiv.classList.remove("hidden");
		confirmDiv.classList.remove("hidden");
		toggleForm.innerText = "Already have an account? Login";
	}

	clearMessages();
});


// Submit
authForm.addEventListener("submit", (e)=>{
	e.preventDefault();
	clearMessages();

	let name = document.getElementById("name").value.trim();
	let email = document.getElementById("email").value.trim();
	let password = document.getElementById("password").value.trim();
	let confirmPassword = document.getElementById("confirmPassword").value.trim();

	let valid = true;


// Name (Only Register)
if(!isLogin){
	if(name === ""){
		showError("nameError", "Name is required");
		valid = false;
	}else{
		hideError("nameError");
	}
}


// Email
let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

if(email === ""){
	showError("emailError", "Email is required");
	valid = false;
}else if(!email.match(emailPattern)){
	showError("emailError", "Invalid email format");
	valid = false;
}else{
	hideError("emailError");
}


// Password
if(password.length < 6){
	showError("passwordError", "Password must be 6 characters");
	valid = false;
}else{
	hideError("passwordError");
}


// Confirm Password (Only Register)
if(!isLogin){
	if(password !== confirmPassword){
		showError("confirmError", "Passwords do not match");
		valid = false;
	}else{
		hideError("confirmError");
	}
}


if(!valid) return;


// Register
if(!isLogin){
	let users = JSON.parse(localStorage.getItem("users") || "[]");

	if(users.find(u => u.email === email)){
		showError("emailError", "Email already registered");
		return;
	}

	users.push({name, email, password});
	localStorage.setItem("users", JSON.stringify(users));

	showSuccess("Registration Successful! You can now login.");
	authForm.reset();

}else{
	// Login
	let users = JSON.parse(localStorage.getItem("users") || "[]");

	let user = users.find(u => u.email === email && u.password === password);

	if(user){
		showSuccess(`Welcome ${user.name}! You are logged in.`);
		authForm.reset();
	}else{
		showError("emailError","Invalid Email or Password");
		showError("passwordError","Invalid Email or Password");
	}
}

});


// Functions
function showError(id, message){
	let el = document.getElementById(id);
	el.innerText = message;
	el.classList.remove("hidden");
}

function hideError(id){
	let el = document.getElementById(id);
	el.classList.add("hidden");
}

function showSuccess(msg){
	let el = document.getElementById("successMsg");
	el.innerText = msg;
	el.classList.remove("hidden");
}

function clearMessages(){
	["nameError","emailError","passwordError","confirmError","successMsg"].forEach(id =>{
		document.getElementById(id).classList.add("hidden");
	});
}