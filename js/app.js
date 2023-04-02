
function generatePassword() {
    const length = document.getElementById("password-length-input").value;
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]\:;?><,./-=";
    const characterList = [uppercaseLetters, lowercaseLetters, numbers, symbols];
    let password = "";


    // Generate password
    for (let i = 0; i < length; i++) {
        const randomCharacterList = characterList[Math.floor(Math.random() * characterList.length)];
        const randomCharacter = randomCharacterList.charAt(Math.floor(Math.random() * randomCharacterList.length));
        password += randomCharacter;
    }

    document.getElementById("password-input").value = password;

    // Calculate password strength
    const passwordStrength = calculatePasswordStrength(password);
    displayPasswordStrength(passwordStrength);
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let passwordStrength = 0;
    const length = password.length;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numbersRegex = /[0-9]/;
    const symbolsRegex = /[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/;


    if (uppercaseRegex.test(password)) {
        passwordStrength++;
    }


    if (lowercaseRegex.test(password)) {
        passwordStrength++;
    }


    if (numbersRegex.test(password)) {
        passwordStrength++;
    }


    if (symbolsRegex.test(password)) {
        passwordStrength++;
    }


    passwordStrength = (passwordStrength / 4) * 100;


    passwordStrength *= Math.min(Math.pow(length / 16, 2), 1);

    return passwordStrength;
}


function displayPasswordStrength(passwordStrength) {
    const progressBar = document.getElementById("password-strength-meter").querySelector(".progress-bar");
    progressBar.style.width = passwordStrength + "%";
    progressBar.setAttribute("aria-valuenow", passwordStrength);
    progressBar.setAttribute("aria-valuetransitiongoal", passwordStrength);
    progressBar.className = "progress-bar";

    if (passwordStrength < 20) {
        progressBar.classList.add("bg-danger");
    } else if (passwordStrength < 40) {
        progressBar.classList.add("bg-warning");
    } else if (passwordStrength < 60) {
        progressBar.classList.add("bg-info");
    } else if (passwordStrength < 80) {
        progressBar.classList.add("bg-primary");
    } else {
        progressBar.classList.add("bg-success");
    }
}


function copyPassword() {
    const passwordInput = document.getElementById("password-input");
    passwordInput.select();
    document.execCommand("copy");
}


function refreshPage() {
    location.reload();
}



document.getElementById("generate-button").addEventListener("click", generatePassword);
document.getElementById("copy-button").addEventListener("click", copyPassword);
document.getElementById("refresh-button").addEventListener("click", refreshPage);



