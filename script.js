const passwordInput = document.getElementById("pass_check");
const strengthText = document.getElementById("strengthText");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  if (!password) {
    strengthText.textContent = "";
    return;
  }

  const result = zxcvbn(password);

  // zxcvbn score: 0–4
  const strengthMap = [
    "Weak",
    "Weak",
    "Medium",
    "Strong",
    "Very Strong"
  ];

  strengthText.textContent = strengthMap[result.score];
});

checklogin();

function checklogin() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if(isLoggedIn === "true"){
    showApp();
  }
  else{
    showLogin();
  }
}

function login(){
  const user = document.getElementsByClassName("username").value
  const pass = document.getElementsByClassName("password").value

  if(user === "" || pass === ""){
    document.getElementById("error").innerText = "Fill all feilds";
    return;
  }
  localStorage.setItem("isloggedIn","true");
  showApp();
}

function showApp(){
  document.getElementById("log").style.display = "none";
  document.getElementById("appSection").style.display = "block";
}

function showLogin(){
  document.getElementById("log").style.display = "block";
  document.getElementById("appSection").style.display = "none";
}