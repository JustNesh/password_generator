const characters = ["A","B","C","D","E","F","G","H","I",
    "J","K","L","M","N","O","P","Q","R","S","T","U","V",
    "W","X","Y","Z","a","b","c","d","e","f","g","h","i",
    "j","k","l","m","n","o","p","q","r","s","t","u","v",
    "w","x","y","z","0","1","2","3","4","5","6","7","8",
    "9","~","`","!","@","#","$","%","^","&","*","(",")",
    "_","-","+","=","{","[","}","]",",","|",":",";","<",
    ">",".","?","/"];

const justLetters = characters.slice(0,52);
const noSymbols = characters.slice(0,62)
const noNumbers = [];
for (let i=0; i<justLetters.length; i++){
    noNumbers.push(justLetters[i])
}
for (let i=63; i<characters.length; i++){
    noNumbers.push(characters[i])
}

//HTML Elements
const rangeEl = document.getElementById("range-el");
const passwordSizeEl = document.getElementById("password-size-el")
const passwordDisplayArray = document.querySelectorAll(".password");
const toolTipTextArray = document.querySelectorAll(".tooltiptext");
const numbersCheckbox = document.getElementById("checkbox-numbers-el");
const symbolsCheckbox = document.getElementById("checkbox-symbols-el");

//Starting values from HTML Doc
let passwordSize = Number(rangeEl.value)
let isNumbersChecked = true;
let isSymbolsChecked = true;

//Functions
function changePasswordSizeEl(){
    passwordSize = rangeEl.value;
    passwordSizeEl.textContent = `Password Size: ${passwordSize}`;
}


function checkboxChange(name){
    if (name === "numbers"){
        if(numbersCheckbox.checked){
            isNumbersChecked = true;
            return
        }
        isNumbersChecked = false;
    } else{
        if(symbolsCheckbox.checked){
            isSymbolsChecked = true;
            return
        }
        isSymbolsChecked = false;
    }
}

function generatePassword(){
    let result = "";
    if (isNumbersChecked === true && isSymbolsChecked === true){
        for (let i=0; i<passwordSize; i++){
            result+= characters[Math.floor(Math.random() * characters.length)]
        }
    } else if (isSymbolsChecked){
        for (let i=0; i<passwordSize; i++){
            result+= noNumbers[Math.floor(Math.random() * noNumbers.length)]
        }
    } else if (isNumbersChecked){
        for (let i=0; i<passwordSize; i++){
            result+= noSymbols[Math.floor(Math.random() * noSymbols.length)]
        }
    } else {
        for (let i=0; i<passwordSize; i++){
            result+= justLetters[Math.floor(Math.random() * justLetters.length)]
        }
    }
    return result
}

function generateMultplePasswords(length){
    let multiplePasswords = [];
    for(let i=0; i<length;i++){
        multiplePasswords.push(generatePassword())
    }
    return multiplePasswords;
}

function setTooltipToDefault(){
    for(let j=0; j<toolTipTextArray.length; j++){
        toolTipTextArray[j].textContent = "Copy to Clipboard"
    }
}

function displayPasswords() {
    const passwords = generateMultplePasswords(6);
    passwordDisplayArray.forEach((element,i) =>{
        element.textContent = passwords[i];
        element.style.backgroundColor="#1F2937"
    })
    setTooltipToDefault()
}

function copyText(i){
    let elToCopy = passwordDisplayArray[i]
    setTooltipToDefault()
    toolTipTextArray[i].textContent = "Password Copied!"
    navigator.clipboard.writeText(elToCopy.textContent)
}

//To get this to work in VITE and production
window.displayPasswords = displayPasswords;
window.changePasswordSizeEl = changePasswordSizeEl
window.checkboxChange = checkboxChange
window.copyText = copyText