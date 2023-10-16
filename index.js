window.addEventListener("load", initializeApp);

export function initializeApp() {
    createBoard();
}

const gameboard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = [
    "", "", "", "", "", "", "", "", ""
];

let go = 'circle';
infoDisplay.innerHTML = /*html*/
    `<article class="info">Circle goes first</article>`;

function createBoard() {
    startCells.forEach((index) => {
        const cellElement = /*html*/
            `
            <div id="${index}" class="square"></div>
            `;

        gameboard.insertAdjacentHTML("beforeend", cellElement);

        gameboard.lastElementChild.addEventListener('click', addGo);
    });
}

function addGo(event) {
    const square = event.target;

    if (go === 'circle') {
        go = 'cross';

        infoDisplay.innerHTML = `<article>Cross turn.</article>`;

        const circleDisplay = /*html*/
            `
        <div class="circle"></div>
        `;

        square.insertAdjacentHTML('beforeend', circleDisplay);

    } else if (go === 'cross') {
        go = 'circle';

        infoDisplay.innerHTML = `<article>Circle turn.</article>`;

        const crossDisplay = /*html*/
            `
        <div class="cross">
            <div class="horizontal-line"></div>
            <div class="vertical-line"></div>
        </div>
        `;

        square.insertAdjacentHTML('beforeend', crossDisplay);
    }

    square.removeEventListener('click', addGo);

    checkScore();
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square");

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    winningCombos.forEach(combination => {
        let circleIsWinner = true;
        let crossIsWinner = true;

        combination.forEach(squareIndex => {
            const square = allSquares[squareIndex];
            const cross = square.querySelector('.cross');

            if (!cross) {
                crossIsWinner = false;
                return;
            }
        });

        combination.forEach(squareIndex => {
            const square = allSquares[squareIndex];
            const circle = square.querySelector('.circle');

            if (!circle) {
                circleIsWinner = false;
                return;
            }
        });

        if (circleIsWinner) {
            infoDisplay.innerHTML = /*HTML*/ `<article>CIRCLE WINS !!!<br><button class='reset-button'>Reset game</button></article>`;

            document.querySelector(".reset-button").addEventListener("click", resetGameBoard);
        }

        if (crossIsWinner) {
            infoDisplay.innerHTML = /*HTML*/ `<article>CROSS WINS !!!</article><button class='reset-button'>Reset game</button>`;

            document.querySelector(".reset-button").addEventListener("click", resetGameBoard);
        }

    });

    // winningCombos.forEach(combination => look at each square in the combination and see if has an elementchild with the class circle if it does, return the innerHTML = <p>Circle wins</p>)
}

function resetGameBoard() {
    const allSquares = document.querySelectorAll(".square");

    allSquares.forEach(square => {
        square.innerHTML = '';
    });

    infoDisplay.innerHTML = /*html*/
        `<article class="info">Circle goes first</article>`;
}