'use strict'

const gameboard = (() => {
    // properties
    const board = [['X', 'O', 'O'],
                   ['O', 'X', 'O'],
                   ['O', 'O', 'X'],
                  ];
    
    // cache DOM
    const _boardSpace = document.getElementById('board-space');

    // methods
    const display = () => {
        for (let row in board) {
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            _boardSpace.appendChild(rowDiv);
            for (let cell in board[row]) {
                let cellSpan = document.createElement('span');
                cellSpan.textContent = board[row][cell];
                rowDiv.appendChild(cellSpan);
            }
        }
    }

    return {
        display
    }
})();

gameboard.display();
