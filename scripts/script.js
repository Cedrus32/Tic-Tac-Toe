'use strict'

const events = {
    // data
    _events: {},

    // methods
    subscribe: function (eventName, fn) {
        this._events[eventName] = this._events[eventName] || [];
        this._events[eventName].push(fn);
    },
    unsubscribe: function (eventName, fn) {
        if (this._events[eventName]) {
            for (let i = o; i < (this._events[eventName].length); i++) {
                if (this[eventName][i] === fn) {
                    this._events[eventName].splice(i, 1);
                    break;
                };
            };
        };
    },
    publish: function (eventName, data) {
        // this === events
        console.log(eventName);
        console.log(data);
        console.log(this._events[eventName]);
        if (this._events[eventName]) {
            this._events[eventName].forEach(function(fn) {
                fn(data);
            });
        };
    }
};

const gameboard = (() => {
    // data
    let _board = [['X', 'X', 'X'],
                  ['O', 'O', 'O'],
                  ['O', 'O', 'O'],
                 ];
    
    // cache DOM
    const _boardSpace = document.getElementById('board-space');
    // const _cells = document.querySelectorAll('boardspace div div');
    // console.log({_cells});

    // bind events
    // * event to mark board included with display();

    // methods
    const display = () => {
        for (let row in _board) {
            let rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            _boardSpace.appendChild(rowDiv);
            for (let cell in _board[row]) {
                let cellDiv = document.createElement('div');
                cellDiv.textContent = _board[row][cell];
                rowDiv.appendChild(cellDiv);
                cellDiv.addEventListener('click', (e) => {
                    console.log(e.target);
                });
            }
        }
    };

    const markBoard = () => {
        
    }

    // make public
    return {
        display // todo share to pubsub? (take out of public scope)
    };
})();

const playGame = (() => {
    // data
    console.log('play game');

    // cache DOM

    // bind events

    // methods


    // flow
    gameboard.display(); // todo accept from pubsub? (keep in private scope)
    // ? on board click, make move --> check if legal
    // ?                           --> mark gameboard
    // ?                           --> clear gameboard
    // ?                           --> display gameboard
    // ?                 listen for win/loss/tie
    // ?                 track turn
    // ?                 update ticker
})();

function createPlayer(name) {
    // data
    let _name = name;

    // methods
    function displayName() {
        console.log(_name);
    };

    function displayPlayer() {
        console.log(_player);
    };

    function displayType() {
        console.log(_type);
    };

    // make public
    return {
        displayName,
        displayPlayer,
        displayType
    };
};

const init = (() => {
    // cache DOM
    const _startButton = document.getElementById('start');
    let _inputX = document.querySelector('div input#player-x');
    let _inputO = document.querySelector('div input#player-o');
    let _labelX = _inputX.nextElementSibling;
    let _labelO = _inputO.nextElementSibling;

    // bind listeners
    _startButton.addEventListener('click', () => {
        setPlayers(_inputX, _inputO);
        playGame();
    });

    // methods
    function setPlayers(inputX, inputO) {
        let playerX = createPlayer(inputX.value);
        let playerO = createPlayer(inputO.value);
        displayName(_labelX, inputX);
        displayName(_labelO, inputO);
    };

    function displayName(target, source) {
        target.textContent = source.value;
        target.classList.toggle('hide');
        source.classList.toggle('hide');
    };
})();
