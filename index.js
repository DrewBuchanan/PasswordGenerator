const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const passwordOne = document.querySelector("#password-one");
const copyAlert = document.querySelector("#copy-alert");
const copyButton = document.querySelector("#copy-button");
const lengthSlider = document.querySelector("#length");
const lengthDisplay = document.querySelector("#length-value");
const minimumSpecial = document.querySelector("#special-min");
const minimumNumber = document.querySelector("#numbers-min");

lengthSlider.addEventListener("input", (event) => {
    lengthDisplay.value = event.target.value;
    minimumNumber.max = Math.floor(event.target.value/4);
    minimumSpecial.max = Math.floor(event.target.value/4);
});

lengthDisplay.addEventListener("input", (event) => {
    lengthSlider.value = event.target.value;
    minimumNumber.max = Math.floor(event.target.value/4);
    minimumSpecial.max = Math.floor(event.target.value/4);
})

function generatePasswords() {
    passwordOne.value = generatePassword();
    copyButton.disabled = false;
    copyButton.textContent = "Copy";
}

function generatePassword() {
    let length = 15;
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }

    return password;
}

function copyToClipboard() {
    navigator.clipboard.writeText(passwordOne.value);
    copyButton.disabled = true;
    copyButton.textContent = "Copied!";
    copyAlert.classList.add("animatemove");
    copyAlert.addEventListener("animationend", () => copyAlert.classList.remove("animatemove"), {once : true});
}