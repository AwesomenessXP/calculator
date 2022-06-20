//---------------------------------- GLOBAL VARIABLES ---------------------------------------
const CALCULATOR = document.getElementById('numpad');

//---------------------------------- EVENTS --------------------------------------------------
// run ALL of these functions on start up
window.addEventListener('load', () => {
    createBtns();
});

// ----------------------------------- FUNCTIONS -------------------------------------------
function createBtns () {
    // create a row of columns to make the grid
    for (let i = 0; i < 4; i++) {
        let column = document.createElement('div');
        // tag each column with these classes
        column.classList.add("column");
        column.setAttribute('id', `column-${i}`);
        CALCULATOR.appendChild(column);
        for (let i = 0; i < 5; i++) {
            let row = document.createElement('div');
            // tag each row with these classes
            row.classList.add("row");
            row.classList.add(`row-${i}`);
            column.appendChild(row);
        }
    }// for

    // variables for rows 2 - 5
    const SECONDROW = document.querySelectorAll('.row-1');
    const THIRDROW = document.querySelectorAll('.row-2');
    const FOURTHROW = document.querySelectorAll('.row-3');
    const FIFTHROW = document.querySelectorAll('.row-4');

    // create an id for each individual key so we can access them later
    identifyBtn(SECONDROW, 7);
    identifyBtn(THIRDROW, 4);
    identifyBtn(FOURTHROW, 1);

    // fifth row
    let i = 0;
    FIFTHROW.forEach(btn => {
        (i === 0) ? btn.textContent = i : null;
        (i === 1) ? btn.textContent = '.': null;
        (i === 2) ? btn.textContent = '=' : null;
        btn.setAttribute('id', `key-${btn.textContent}`);
        i++;
    });

    // add calc operations on the right side of numpad
    const FOURTHCOLUMN = document.querySelector('#column-3');
    FOURTHCOLUMN.querySelector('.row-0').textContent = '/';
    FOURTHCOLUMN.querySelector('.row-1').textContent = '*';
    FOURTHCOLUMN.querySelector('.row-2').textContent = '-';
    FOURTHCOLUMN.querySelector('.row-3').textContent = '+';
    FOURTHCOLUMN.querySelector('.row-4').textContent = 'enter';
    FOURTHCOLUMN.querySelector('.row-4').style.backgroundColor = '#1363DF';
}

function identifyBtn (row, iterator) {
    row.forEach(btn => {
        btn.textContent = iterator;
        btn.setAttribute('id', `key-${iterator}`);
        iterator++;
    });
}// identifyBtn