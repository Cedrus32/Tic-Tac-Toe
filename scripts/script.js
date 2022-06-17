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
            }
        }
    };

    // make public
    return {
        display
    };
})();

function createPlayer(name) {
    // data
    let _name = name;
    // * let _player = // from pubsub
    // * let _input = // from pubsub

    // cache DOM

    // bind events

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
    };
};

const playGame = (() => {
    // data
    console.log('play game');

    // cache DOM


    // bind events

    // methods


    // flow
    // ? on start click, get input values --> create players
    // ?                                  --> display player names

    gameboard.display();
    // ? on board click, make move --> check if legal
    // ?                           --> mark gameboard
    // ?                           --> clear gameboard
    // ?                           --> display gameboard
    // ?                 listen for win/loss/tie
    // ?                 track turn
    // ?                 update ticker
})();

const init = (() => {
    // data

    // cache DOM
    const _startButton = document.getElementById('start');
    //// console.log(_startButton);
    let _inputX = document.querySelector('div input#player-x');
    let _inputO = document.querySelector('div input#player-o');
    //// console.log(_playerX);
    //// console.log(_playerO);
    let _labelX = _inputX.nextElementSibling;
    let _labelO = _inputO.nextElementSibling;
    //// console.log(_labelX);
    //// console.log(_labelO);

    // bind listeners
    _startButton.addEventListener('click', () => {
        setPlayers(_inputX, _inputO);
        // playGame();
    });

    // methods
    function setPlayers(inputX, inputO) {
        let playerX = createPlayer(inputX.value);
        let playerO = createPlayer(inputO.value);
        //// playerX.displayName();
        //// playerO.displayName();
        //// console.log(_labelX);
        //// console.log(_labelO);
        displayName(_labelX, inputX);
        displayName(_labelO, inputO);
    };

    function displayName(target, source) {
        target.textContent = source.value;
        target.classList.toggle('hide');
        source.classList.toggle('hide');
    };

})();