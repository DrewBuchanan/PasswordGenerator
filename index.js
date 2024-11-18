const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const special = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];

const passwordOne = document.querySelector("#password-one");
const copyAlert = document.querySelector("#copy-alert");
const copyButton = document.querySelector("#copy-button");
const lengthSlider = document.querySelector("#length");
const lengthDisplay = document.querySelector("#length-value");
const minimumSpecial = document.querySelector("#special-min");
const minimumNumber = document.querySelector("#numbers-min");
const includeNumbersToggle = document.querySelector("#include-numbers");
const includeSpecialToggle = document.querySelector("#include-special");
const avoidAmbiguousToggle = document.querySelector("#include-ambiguous");

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
    let length = lengthSlider.value;
    let password = "";
    let usedLIOrOne = "";
    let usedZeroOrO = "";
    let avoidAmbiguous = avoidAmbiguousToggle.checked;
    let countSpecial = 0;
    let countNumber = 0;
    if (includeSpecialToggle.checked) {
        countSpecial = Math.floor(Math.random() * (minimumSpecial.max - minimumSpecial.value) + minimumSpecial.value);
    }
    if (includeNumbersToggle.checked) {
        countNumber = Math.floor(Math.random() * (minimumNumber.max - minimumNumber.value) + minimumNumber.value);
    }
    
    for (let i = 0; i < countSpecial; i++) {
        password += special[Math.floor(Math.random() * special.length)]
    }
    for (let i = 0; i < countNumber; i++) {
        let number = numbers[Math.floor(Math.random() * numbers.length)];
        if (avoidAmbiguous) {
            if (number === "0") {
                usedZeroOrO = "0";
            }
            else if (number === "1") {
                usedLIOrOne = "1";
            }
        }
        password += number;
    }
    for (let i = 0; i < length - countNumber - countSpecial; i++) {
        let letter = letters[Math.floor(Math.random() * letters.length)];
        if (avoidAmbiguous) {
            while (letter === "l" || letter === "I" || letter === "O" && (usedZeroOrO === "0" || usedLIOrOne === "1" || (usedLIOrOne !== "" && usedLIOrOne !== letter))) {
                letter = letters[Math.floor(Math.random() * letters.length)];
            }
            if (letter === "l" || letter === "I") {
                usedLIOrOne = letter
            }
            if (letter === "O") {
                usedZeroOrO = letter;
            }
        }
        password += letter;
    }

    return password.shuffle();
}

function copyToClipboard() {
    navigator.clipboard.writeText(passwordOne.value);
    copyButton.disabled = true;
    copyButton.textContent = "Copied!";
    copyAlert.classList.add("animatemove");
    copyAlert.addEventListener("animationend", () => copyAlert.classList.remove("animatemove"), {once : true});
}

String.prototype.shuffle = function() {
    var a = this.split(""), n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}