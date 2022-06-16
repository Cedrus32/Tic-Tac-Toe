'use strict'

const gameboard = (() => {
    // properties
    const _board = [['X', 'O', 'O'],
                   ['O', 'X', 'O'],
                   ['O', 'O', 'X'],
                  ];
    
    // cache DOM
    const _boardSpace = document.getElementById('board-space');

    // methods
    const display = () => {
        for (let row in _board) {
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            _boardSpace.appendChild(rowDiv);
            for (let cell in _board[row]) {
                let cellSpan = document.createElement('span');
                cellSpan.textContent = _board[row][cell];
                rowDiv.appendChild(cellSpan);
            }
        }
    };

    // make public
    return {
        display
    };
})();

function createPlayer(name, player, type) {
    // properties
    let _name = name;
    let _player = player;
    let _type = type;

    // methods
    function displayName() {
        console.log(_name);
    }

    function displayPlayer() {
        console.log(_player);
    }

    function displayType() {
        console.log(_type);
    }

    // make public
    return {
        displayName,
        displayPlayer,
        displayType
    }
}

gameboard.display();

let player1 = createPlayer('shannon', 1, 'human');
player1.displayName();
player1.displayPlayer();
player1.displayType();
