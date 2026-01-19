const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-container p");
const strengthLabel = document.getElementById("strength-label");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

generateButton.addEventListener("click", makePassword);

function makePassword(){
  const length = Number(lengthSlider.value);
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
    alert("Please select at least one char type.");
    return;
  }

  const newPassword = createRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);

  passwordInput.value = newPassword;
  updateStrengthMeter(newPassword);
}

function createRandomPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols){
    let all = "";
    let password = "";

    if (includeUppercase) all += uppercaseLetters;
    if (includeLowercase) all += lowercaseLetters;
    if (includeNumbers) all += numberCharacters;
    if (includeSymbols) all += symbolCharacters;   

    for(let i=0; i < length; i++){
        const idx = Math.floor(Math.random() * all.length);
        password += all[idx];
    }

    return password;
}

function updateStrengthMeter(password){
    const passwordLength = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

    let strengthScore = 0, safeScore;
    const max = 40, min = 8;
    let strengthLabelText = "";
    let barColor = "";

    strengthScore += Math.min(passwordLength * 2, max);

    if(hasUppercase) strengthScore += 15;
    if(hasLowercase) strengthScore += 15;
    if(hasNumbers) strengthScore += 15;
    if(hasSymbols) strengthScore += 15;

    if(passwordLength < min) {
        strengthScore = Math.min(strengthScore, max);
    }

    safeScore = Math.max(5, Math.min(100, strengthScore)) //percentage
    strengthBar.style.width = safeScore + "%";

    if (strengthScore < 40){//weak 
        barColor = "#fc8181";
        strengthLabelText = "Weak";
    } else if (strengthScore < 70){ //medium
        barColor = "#fbd38d"; 
        strengthLabelText = "Medium";
    }else{ //strong
        barColor = "#68d391";
        strengthLabelText = "Strong";
    }

    strengthBar.style.backgroundColor = barColor;
    strengthLabel.textContent = strengthLabelText;
}

window.addEventListener("DOMContentLoaded", makePassword);

copyButton.addEventListener("click", () => {
  if(!passwordInput.value) return;

  navigator.clipboard.writeText(passwordInput.value)
  .then(() => showCopySuccess())
  .catch((error) => console.log("Could not copy:", error));
});

function showCopySuccess() {
  copyButton.classList.remove("far", "fa-copy");
  copyButton.classList.add("fas", "fa-check");
  copyButton.style.color = "#48bb78";

  setTimeout(() => {
    copyButton.classList.remove("fas", "fa-check");
    copyButton.classList.add("far", "fa-copy");
    copyButton.style.color = "";
  }, 1500);
}