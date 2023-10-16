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
}