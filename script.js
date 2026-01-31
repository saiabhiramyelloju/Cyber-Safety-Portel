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