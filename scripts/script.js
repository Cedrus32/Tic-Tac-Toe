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
    //// console.log({_cells});

    // bind events
    // * add/remove event listeners in addClick() / removeClick() in methods

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

    // todo make for loop to cycle through each cell; -- share with playGame via pubsub
    // cellDiv.addEventListener('click', (e) => {
    //     console.log(e.target);
    // });

    // todo logic to decide whether to accept click & make change to _board, gameboard.display()
    // const markBoard = () => {
        
    // }

    // make public to global
    return {
        display, // todo share with init() via pubsub? (take out of public scope)
        // addClick // todo share with init() via pubsub (take out of public scope)
        // removeClick // todo share with init() via pubsub (take out of public scope)
        // markBoard // todo share with playGame() via pubsub? (take out of public scope)
    };
})();

const playGame = (() => {
    // data

    // cache DOM

    // bind events

    // methods

    // actions
    // ? on board click, make move --> check if legal
    // ?                           --> mark gameboard
    // ?                           --> clear gameboard
    // ?                           --> display gameboard
    // ?                 listen for win/loss/tie
    // ?                 track turn
    // ?                 update ticker
})();

function createPlayer(value) {
    // data
    let _name = value;

    // methods
    function returnName() {
        return _name;
    }

    function savePlayer(saveState) {
        saveState.push(this);
    }

    // function deletePlayer(saveState) {
    //     saveState.
    // }

    // make public to global
    return {
        returnName,
        savePlayer,
        // deletePlayer
    }
};

const init = (() => {
    // data
    let _players = [];

    // cache DOM
    let _inputX = document.querySelector('div input#player-x');
    let _inputO = document.querySelector('div input#player-o');
    let _labelX = _inputX.nextElementSibling;
    let _labelO = _inputO.nextElementSibling;
    const _startButton = document.getElementById('start');
    const _gameContainer = document.getElementById('game-container');
    const _restartButton = document.getElementById('restart');
    //// console.log(_gameContainer);

    // bind listeners
    _startButton.addEventListener('click', () => {
        //// console.log(_inputX, _inputO);
        setPlayers(_inputX, _inputO);
        showGame();
        // playGame();
    });

    _restartButton.addEventListener('click', () => {
        // deletePlayers(playerX, playerO);
        hideGame();
    })

    // methods
    function setPlayers(inputX, inputO) {
        let _playerX = createPlayer(inputX.value);
        let _playerO = createPlayer(inputO.value);
        _playerX.savePlayer(_players);
        _playerO.savePlayer(_players);
        //// console.log(_players);
        //// console.log(_players[0])
        //// console.log(_players[1])
        displayName(_labelX, _inputX);
        displayName(_labelO, _inputO);
    };

    function displayName(target, source) {
        target.textContent = source.value;
        target.classList.toggle('hide');
        source.classList.toggle('hide');
    };

    function showGame() {
        _startButton.classList.add('hide');
        _gameContainer.classList.remove('hide');
        gameboard.display(); // todo accept from gameboard via pubsub? (keep in private scope)
    }

    function hideGame() {
        _startButton.classList.remove('hide');
        _gameContainer.classList.add('hide');
        // gameboard.display(); // todo accept from gameboard via pubsub? (keep in private scope)
    }
})();
