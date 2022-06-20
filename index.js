//---------------------------------- GLOBAL VARIABLES ---------------------------------------
const calculator = document.getElementById('numpad');
const btnPress = calculator.getElementsByClassName('row');

//---------------------------------- EVENTS --------------------------------------------------
// run ALL of these functions on start up
window.addEventListener('load', () => {
    createBtns();
});

calculator.addEventListener('click', (e) => {
    // we want to make that we are not outputting the column IDs, ONLY the keys!!
    if (e.target.id !== "column-0" && e.target.id !== "column-1"
            && e.target.id !== "column-2" && e.target.id !== "column-3"){
        document.getElementById('screen-text').textContent = e.target.id;
    }// if
});

// ----------------------------------- FUNCTIONS -------------------------------------------
function createBtns () {
    // create a row of columns to make the grid
    for (let i = 0; i < 4; i++) {
        let column = document.createElement('div');
        // tag each column with these classes
        column.classList.add("column");
        column.setAttribute('id', `column-${i}`);
        calculator.appendChild(column);
        for (let i = 0; i < 5; i++) {
            let row = document.createElement('div');
            // tag each row with these classes
            row.classList.add("row");
            row.classList.add(`row-${i}`);
            column.appendChild(row);
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

    // add calc operations on the right side of numpad
    const FOURTHCOLUMN = document.querySelector('#column-3');
    FOURTHCOLUMN.querySelector('.row-0').textContent = '/';
    FOURTHCOLUMN.querySelector('.row-1').textContent = '*';
    FOURTHCOLUMN.querySelector('.row-2').textContent = '-';
    FOURTHCOLUMN.querySelector('.row-3').textContent = '+';
    FOURTHCOLUMN.querySelector('.row-4').textContent = 'enter';

    // give ids to operation keys
    FOURTHCOLUMN.querySelector('.row-0').setAttribute('id', '/');
    FOURTHCOLUMN.querySelector('.row-1').setAttribute('id', '*');
    FOURTHCOLUMN.querySelector('.row-2').setAttribute('id', '-');
    FOURTHCOLUMN.querySelector('.row-3').setAttribute('id', '+');
    FOURTHCOLUMN.querySelector('.row-4').setAttribute('id', 'enter');
    FOURTHCOLUMN.querySelector('.row-4').style.backgroundColor = '#1363DF';
}// createBtns()

function identifyBtn (row, iterator) { // takes class of row# and the numbers to be added as args
    row.forEach(btn => {
        btn.textContent = iterator; // show the key on the numpad
        btn.setAttribute('id', iterator); // set id for the key
        iterator++;
    });
}// identifyBtn()

function operate() {

}