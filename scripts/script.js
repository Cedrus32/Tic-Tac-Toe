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

const player = {
    // properties
    // name: ...
    // player: ... (1 || 2)
    // type: ... ('human' || 'computer)

    // methods
    create: function(values) {
        let instance = Object.create(this);
        Object.keys(values).forEach(function(key) {
            instance[key] = values[key];
        });
        return instance;
    }

    // return {
    //     // ...
    // }
};

gameboard.display();

let player1 = player.create({name: 'shannon', player: 1, type: 'human'});
let player2 = player.create({name: 'duane', player: 2, type: 'human'});
console.log({player1});
console.log({player2});
