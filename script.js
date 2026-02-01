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

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("isLoggedIn") === "true") {
      showApp();
    } else {
      showLogin();
    }

    // allow page to render ONLY after decision
    document.body.style.visibility = "visible";
  });

  function showApp() {
  document.querySelector(".log").style.display = "none";
  document.querySelector(".appSection").style.display = "block";
}

function showLogin() {
  document.querySelector(".log").style.display = "flex";
  document.querySelector(".appSection").style.display = "none";
}

  document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.querySelector(".username").value.trim();
  const pass = document.querySelector(".password").value.trim();
  const error = document.getElementById("error");

  if (!email || !pass) {
    error.textContent = "Email and password required";
    return;
  }

  // fake success (frontend only)
  localStorage.setItem("isLoggedIn", "true");
  showApp();
});
