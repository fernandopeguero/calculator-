"use strict";

const textDisplay = document.querySelector(".display-text");
const container = document.querySelector(".container");

const hint = document.querySelector(".hint");

// CONSTANTS 

const MAX_NUMBERS = 10;


let currentNumber = [];
let previousNumber = [];
let operator = "";


container.addEventListener("click" , (e) => {
    e.preventDefault();

    const userSelection = e.target.value.trim()

    switch(userSelection) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": 
         if (currentNumber.length < MAX_NUMBERS) {
                currentNumber.push(userSelection);
 
            }

            textDisplay.textContent = currentNumber.join("");
           
        break;
        case "backspace":
            if(currentNumber.length > 0){
                currentNumber.pop();
            }
            textDisplay.textContent = currentNumber.length ? currentNumber.join("") : currentNumber.length;
        break;
        case "plus":
            
            setOperation("+");
            break;
        case "minus":
           setOperation("-");
            break;
        case "multiply":
            setOperation("*");
            break;
        case "divide":
            setOperation("/");
            break;
        case "dot":
            if(!currentNumber.includes(".")){
                currentNumber.push(".");
            }
            textDisplay.textContent = currentNumber.join("");
            break;
        case "equals":
            operate()
            break;
        case "toggle":
           toggleOperator()
            break;
        case "clear":
            clear()
            break;

    }
})

function add (first , second) {

    return (first + second).toFixed(1);

}

function substract (first, second) {
    return (first - second).toFixed(1);
}

function multiply (first, second) {
    return (first * second).toFixed(1);
}

function divide (first, second) {
    return (first / second).toFixed(1);
}

function clear () {
    currentNumber = []
    previousNumber = []
    operator = ""
    textDisplay.textContent = currentNumber.length;
    setHintText();
}


function operate() {

    if(currentNumber.length === 0 || previousNumber.length === 0) return;

    let total = 0;
    switch(operator) {
        case "+":
            total = add(Number(previousNumber.join("")),Number(currentNumber.join("")));
            break;
        case "-":
            total = substract(Number(previousNumber.join("")),Number(currentNumber.join("")));
        break;
        case "/":
            total = divide(Number(previousNumber.join("")),Number(currentNumber.join("")));
            break; 
        case "*":
            total = multiply(Number(previousNumber.join("")),Number(currentNumber.join("")));
            break;
    }
    
    currentNumber = [];
    previousNumber = [];
    operator = "";
    textDisplay.textContent = "";
    setHintText(total.toString().split(""), "", true)
    
}


function setOperation (simbol) {
    if(currentNumber.length === 0) return 
    previousNumber = [...currentNumber];
    currentNumber = [];
    textDisplay.textContent = currentNumber.length;
    operator = simbol;

    setHintText(previousNumber, simbol);
}

function setHintText (value = [], simbol = "" , equals = false) {
    hint.textContent = `${equals ? "= " : ""}${value.join("")}${simbol}`;
}

function removeDecimal(num){

    const [wholeNumber , decimal] = num.toString().split(".");

    const isDecimalZero = Number(decimal[0]) === 0;

    return isDecimalZero ? wholeNumber : num;

}


function toggleOperator() {

    if(operator === "+"){
        operator = "-";
    } else if (operator === "-"){
        operator = "+";
    }

    setHintText(previousNumber, operator)
}


