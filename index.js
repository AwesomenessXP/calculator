//---------------------------------- GLOBAL VARIABLES ---------------------------------------
const calculator = document.getElementById('numpad');
const btnPress = calculator.getElementsByClassName('row');
let screen = document.getElementById('screen-text');
const COLSIZE = 4;
const ROWSIZE = 5;
let isSecondNum = false; // set true AFTER operator is used!!

//---------------------------------- EVENTS --------------------------------------------------
// run ALL of these functions on start up
window.addEventListener('load', () => {
    createBtns();
});

// ----------------------------------OBJECTS/ ARRAYS ------------------------------------------------

let calcTwoNums = { // update this each time a pair of numbers needs to be calculated
    firstNum: null, 
    secondNum: null,
    doOperation: null
}

let num2 = []; 

// --------------------------------- EVENTS -----------------------------------------------------------------

// if any button is pressed, store it in an object/array, then output to screen
calculator.addEventListener('click', (e) => {
    // we want to make that we are not outputting the column IDs, ONLY the keys!!
    if (e.target.id !== "column-0" && e.target.id !== "column-1" && e.target.id !== "column-2"
             && e.target.id !== "column-3" && e.target.id !== "numpad" && e.target.id !== "ignore"){
        
        // check if the btn is a number
        if (e.target.id >= "0" && e.target.id <= "9"){
            numKeyPress(e.target.id);
        }// if

        // check if btn is operation
        if (e.target.id === "+" || e.target.id === "-" || e.target.id === "*" || e.target.id === "/" 
                && calcTwoNums.firstNum !== null) {
            operatorPress(e.target.id);
        }// if

        // after pressing equals sign, do operation
        if (e.target.id === "=" && calcTwoNums.doOperation !== null 
                && calcTwoNums.firstNum !== null
                && calcTwoNums.secondNum !== null) {
            equalsPress("=");
        }// if

        // check if btn is AC (all clear)
        (e.target.id === "AC") ? clear() : null;

        if (e.target.id === "(-)") {
            screen.textContent = 0 - screen.textContent;
        }
    }// if
});

// ----------------------------------- FUNCTIONS -------------------------------------------

// basic operator functions 
let add = () => {
    return parseInt(calcTwoNums.firstNum) + parseInt(calcTwoNums.secondNum)
};
let sub = () => calcTwoNums.firstNum - calcTwoNums.secondNum;
let mult = () => calcTwoNums.firstNum * calcTwoNums.secondNum;
let div = () => calcTwoNums.firstNum / calcTwoNums.secondNum;

// do this function after user presses equals sign
function operate() { // takes object of operations needed
    screen.text = null;
    (calcTwoNums.doOperation === '+') ? screen.textContent = add(): null;
    (calcTwoNums.doOperation === '-') ? screen.textContent = sub(): null;
    (calcTwoNums.doOperation === '*') ? screen.textContent = mult(): null;
    (calcTwoNums.doOperation === '/') ? screen.textContent = div().toFixed(2): null;
    return screen.textContent;
}// operate()

// when a number key is pressed
function numKeyPress(num) {
    screen.textContent = screen.textContent + num;

    if (calcTwoNums.firstNum === null || !isSecondNum) {
        isSecondNum = false;
        calcTwoNums.firstNum = screen.textContent; // pass the joined value of the array here
    }// if
    else {
        isSecondNum = true;
        num2.push(num);
        screen.textContent = num2.join('');
        calcTwoNums.secondNum = num2.join(''); // pass the joined value of the array here
    }// else
}// numKeyPress()

// when an operator key is pressed
function operatorPress(op) {
    calcTwoNums.doOperation = op;
    isSecondNum = true;
}// operatorPress()

// when equal sign is pressed
function equalsPress() {
    if (isSecondNum){
        let answer = operate();
        // empty our result object
        calcTwoNums.firstNum = answer;
        console.log(calcTwoNums.firstNum);
        calcTwoNums.secondNum = null;
        calcTwoNums.doOperation = null;
        isSecondNum = false; // set this to false, we want to start a new calculation
        num2 = []; // empty the array
    }// if
}// equalsPress()

// when AC is pressed, RESET EVERYTHING
function clear() {
    screen.textContent = null;
    calcTwoNums = {
        firstNum: null, 
        secondNum: null,
        doOperation: null
    }
    num2 = [];
    isSecondNum = false;
}

function createBtns () {
    // create a row of columns to make the grid
    for (let i = 0; i < COLSIZE; i++) {
        let column = document.createElement('div');
        // give each column the class and individual id
        column.classList.add("column");
        column.setAttribute('id', `column-${i}`);

        calculator.appendChild(column); // append new column to numpad

        for (let i = 0; i < ROWSIZE; i++) {
            let row = document.createElement('div');
            // give each row the class and individual id
            row.classList.add("row");
            row.classList.add(`row-${i}`);

            column.appendChild(row); // append new row to column
        }// for
    }// for

    // create an id for each individual key so we can access them later
    identifyBtn(document.querySelectorAll('.row-1'), 7);
    identifyBtn(document.querySelectorAll('.row-2'), 4);
    identifyBtn(document.querySelectorAll('.row-3'), 1);

    // fifth row
    const FIFTHROW = document.querySelectorAll('.row-4');
    let i = 0;
    FIFTHROW.forEach(btn => {
        (i === 0) ? btn.textContent = i : null;
        (i === 1) ? btn.textContent = '.': null;
        (i === 2) ? btn.textContent = '(-)' : null;
        btn.setAttribute('id', btn.textContent);
        i++;
    });

    // add calculator operations on the right side of numpad
    const FOURTHCOLUMN = document.querySelector('#column-3');
    FOURTHCOLUMN.style.flex = "3.5 3.5 auto";
    FOURTHCOLUMN.querySelector('.row-0').textContent = '/';
    FOURTHCOLUMN.querySelector('.row-1').textContent = '*';
    FOURTHCOLUMN.querySelector('.row-2').textContent = '-';
    FOURTHCOLUMN.querySelector('.row-3').textContent = '+';
    FOURTHCOLUMN.querySelector('.row-4').textContent = '=';

    // give ids to operation keys
    FOURTHCOLUMN.querySelector('.row-0').setAttribute('id', '/');
    FOURTHCOLUMN.querySelector('.row-1').setAttribute('id', '*');
    FOURTHCOLUMN.querySelector('.row-2').setAttribute('id', '-');
    FOURTHCOLUMN.querySelector('.row-3').setAttribute('id', '+');
    FOURTHCOLUMN.querySelector('.row-4').setAttribute('id', '=');
    FOURTHCOLUMN.querySelector('.row-4').style.backgroundColor = '#1363DF'; // make the 'enter' button blue

    // add AC button in first row
    const FIRSTROW = document.getElementById('column-0');
    FIRSTROW.querySelector('.row-0').textContent = 'AC';
    FIRSTROW.querySelector('.row-0').style.backgroundColor = 'red';
    FIRSTROW.querySelector('.row-0').setAttribute('id', 'AC');
    FIRSTROW.querySelector('.row-0').style.flex = "3 3 auto";
    
    // add CE button in second row
    const SECROW = document.getElementById('column-1');
    SECROW.querySelector('.row-0').textContent = 'CE';
    SECROW.querySelector('.row-0').setAttribute('id', 'CE');
    SECROW.querySelector('.row-0').style.backgroundColor = '#92B4EC';
    SECROW.querySelector('.row-0').style.flex = "3 3 auto";

    // EMPTY ROW, DONT DISPLAY ON NUMPAD
    const THIRDROW = document.getElementById('column-2');
    THIRDROW.querySelector('.row-0').textContent = '\s'; // create empty space 
    THIRDROW.querySelector('.row-0').style.opacity = "0";
    THIRDROW.querySelector('.row-0').style.cursor = "default";
    THIRDROW.querySelector('.row-0').setAttribute('id', 'ignore');
    THIRDROW.querySelector('.row-0').style.flex = "3 3 auto";
}// createBtns()

function identifyBtn (row, iterator) { // takes class of row# and the numbers to be added as args
    row.forEach(btn => {
        btn.textContent = iterator; // show the key on the numpad
        btn.setAttribute('id', iterator); // set id for the key
        iterator++;
    });
}// identifyBtn()