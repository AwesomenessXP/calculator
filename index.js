//---------------------------------- GLOBAL VARIABLES ---------------------------------------
const calculator = document.getElementById('numpad');
const btnPress = calculator.getElementsByClassName('row');
let screen = document.getElementById('screen-text');
const COLSIZE = 4;
const ROWSIZE = 5;

//---------------------------------- EVENTS --------------------------------------------------
// run ALL of these functions on start up
window.addEventListener('load', () => {
    createBtns();
});

// ----------------------------------OBJECTS ------------------------------------------------

let outputResult = {
    firstNum: null,
    secondNum: null,
    doOperation: null
}

// if any button is pressed, store it in an object/array, then output to screen
calculator.addEventListener('click', (e) => {
    // we want to make that we are not outputting the column IDs, ONLY the keys!!
    if (e.target.id !== "column-0" && e.target.id !== "column-1" && e.target.id !== "column-2"
             && e.target.id !== "column-3" && e.target.id !== "numpad" && e.target.id !== "ignore"){             
        //document.getElementById('screen-text').textContent = e.target.id; // change the text in this div
        
        // check if the btn is a number
        if (e.target.id >= "0" && e.target.id <= "9"){
            screen.textContent = e.target.id; // TODO: CHANGE THIS LATER TO UPDATE IT APPROPRIATELY
            (outputResult.firstNum === null) ? outputResult.firstNum = parseFloat(e.target.id): outputResult.secondNum = parseFloat(e.target.id);
        }// if

        // check if btn is operation
        if (e.target.id === "+" || e.target.id === "-" || e.target.id === "*" || e.target.id === "/") {
            outputResult.doOperation = e.target.id;
        }

        // after pressing equals sign, do operation
        if (e.target.id === "=" && outputResult.doOperation !== null && outputResult.firstNum !== null
                && outputResult.secondNum !== null) {
            console.log(outputResult.doOperation);
            operate();
            outputResult.firstNum = null;
            outputResult.secondNum = null;
            outputResult.doOperation = null;
        }// if
    }// if
});

// ----------------------------------- FUNCTIONS -------------------------------------------
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

// basic operator functions 
let add = () => outputResult.firstNum + outputResult.secondNum;
let sub = () => outputResult.firstNum - outputResult.secondNum;
let mult = () => outputResult.firstNum * outputResult.secondNum;
let div = () => outputResult.firstNum / outputResult.secondNum;

function operate() { // takes row key id and the two numbers needed for operation
    (outputResult.doOperation === '+') ? screen.textContent = add(): null;
    (outputResult.doOperation === '-') ? screen.textContent = sub(): null;
    (outputResult.doOperation === '*') ? screen.textContent = mult(): null;
    (outputResult.doOperation === '/') ? screen.textContent = div(): null;
}// operate