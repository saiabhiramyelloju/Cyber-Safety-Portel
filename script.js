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

/* ================= FAKE USER DATABASE (JSON) ================= */
const users = [
  { email: "admin@test", password: "1234" },
  { email: "user@test", password: "abcd" }
];

/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ===== LOGIN STATE CHECK ===== */
  if (localStorage.getItem("isLoggedIn") === "true") {
    showApp();
  } else {
    showLogin();
  }

  // prevent flash
  document.body.style.visibility = "visible";

  /* ================= PASSWORD STRENGTH CHECK ================= */
  const passwordInput = document.getElementById("pass_check");
  const strengthText = document.getElementById("strengthText");

  if (passwordInput && strengthText) {
    passwordInput.addEventListener("input", () => {
      const password = passwordInput.value;

      if (!password) {
        strengthText.textContent = "";
        return;
      }

      const result = zxcvbn(password);
      const strengthMap = ["Weak", "Weak", "Medium", "Strong", "Very Strong"];
      strengthText.textContent = strengthMap[result.score];
    });
  }

  /* ================= LOGIN ================= */
  document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.querySelector(".username").value.trim();
    const pass = document.querySelector(".password").value.trim();
    const error = document.getElementById("error");

    if (!email || !pass) {
      error.textContent = "Email and password required";
      return;
    }

    const userFound = users.find(
      user => user.email === email && user.password === pass
    );

    if (!userFound) {
      error.textContent = "Invalid email or password";
      return;
    }

    // login success
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(userFound));
    error.textContent = "";
    showApp();
  });

  /* ================= LOGOUT ================= */
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    showLogin();
  });

});

/* ================= UI TOGGLE FUNCTIONS ================= */
function showApp() {
  document.querySelector(".log").style.display = "none";
  document.querySelector(".appSection").style.display = "block";
}

function showLogin() {
  document.querySelector(".log").style.display = "flex";
  document.querySelector(".appSection").style.display = "none";
}

document.getElementById("logout-btn").addEventListener("click", () => {
  // clear login session
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");

  // switch UI back to login
  document.querySelector(".appSection").style.display = "none";
  document.querySelector(".log").style.display = "flex";
});