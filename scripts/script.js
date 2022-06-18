'use strict'

const events = {
    // * event.link('someEvent', someMethod)      // links event with relevant method into event:method pair
    // * event.unlink('someEvent', someMethod)    // removes event:method pair
    // * event.call('someEvent', someData)        // calls event:method pair with relevant data

    // data
    _storedEvents: {
        // stores key:value (event:handler) pairs 
        // * 'someEvent': [someMethod, someOtherMethod, anotherMethod]
    },

    // methods
    link: function (eventName, fn) {
    //             'someEvent', someMethod
        // preserve key:method pair in _storedEvents OR create a new blank key:method pair
        this._storedEvents[eventName] = this._storedEvents[eventName] || [];
        // push someMethod to key 'someEvent'
        this._storedEvents[eventName].push(fn);
    },
    unlink: function (eventName, fn) {
    //               'someEvent', someMethod
        // if key 'someEvent' exists...
        if (this._storedEvents[eventName]) {
            // for each method linked to key...
            for (let i = 0; i < (this._storedEvents[eventName].length); i++) {
                // if linked method === someMethod being called...
                if (this[eventName][i] === fn) {
                    // remove linked method from key
                    this._storedEvents[eventName].splice(i, 1);
                    break;
                };
            };
        };
    },
    call: function (eventName, data) {
    //            'someEvent', someMethod
        // if key 'someEvent' exists...
        if (this._storedEvents[eventName]) {
            // call each linked method with the data provided
            this._storedEvents[eventName].forEach(function(fn) {
                fn(data);
            });
        };
    }
};

const gameboard = (() => {
    // data
    let _board = ['', '', '',
                  '', '', '',
                  '', '', '',
                 ];
    
    // cache DOM
    const boardSpace = document.getElementById('board-space');
    //// console.log({_cells});

    // bind events
    // events.call('startGame', _board);
    // events.call('pauseGame', _board);

    // methods
    const display = () => {
        let rowDiv;
        let cellDiv;
        for(let i = 0; i < 12; i++) {
            if ((i === 0) || (i%4 === 0)) {
                rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                //// console.log(rowDiv);
                boardSpace.appendChild(rowDiv);
            } else {
                cellDiv = document.createElement('div');
                console.log(rowDiv);
                console.log(cellDiv);
                // cellDiv.textContent = _board[row][cell]; //todo functionality in markBoard?
                rowDiv.appendChild(cellDiv);
            }
        }
    };
    function logClick(e) {
        console.log(e.target);
    };
    function addClicks(board) {
        //// console.log(board);
        for (let x = 0; x < 3; x++) {
            let row = board.children[x];
            //// console.log(row);
            for (let y = 0; y < 3; y++) {
                let cell = row.children[y]
                //// console.log (cell);
                cell.addEventListener('click', markBoard);
                //// console.log('click added');
            };
        };
    };
    function removeClicks(board) {
        //// console.log(board);
        for (let x = 0; x < 3; x++) {
            let row = board.children[x];
            //// console.log(row);
            for (let y = 0; y < 3; y++) {
                let cell = row.children[y];
                //// console.log (cell);
                cell.removeEventListener('click', markBoard);
                //// console.log('click removed');
            };
        };
    };
    // todo logic to decide whether to accept click & make change to _board, gameboard.display()
    function markBoard(e) {
        logClick(e);
    };
    function returnBoard() {
        return boardSpace;
    };

    // make public to global
    return {
        display,
        addClicks,
        removeClicks,
        // markBoard, // todo share with playGame() via pubsub? (take out of public scope)
        returnBoard
    };
})();

const playGame = (() => {
    // data

    // cache DOM
    const _gameContainer = document.getElementById('game-container');
    //// console.log(_gameContainer);

    // bind events
    // ? on board click, make move --> check if legal
    // ?                           --> mark gameboard
    // ?                           --> clear gameboard
    // ?                           --> display gameboard
    // ?                 listen for win/loss/tie
    // ?                 track turn
    // ?                 update ticker

    // methods

    // actions
    gameboard.display();
})();

function createPlayer(value) {
    // data
    let _name = value;

    // methods
    function returnName() {
        return _name;
    };
    function displayName() {
        console.log(_name);
    }
    function savePlayer(saveState) {
        saveState.push(this);
    };

    // make public to global
    return {
        returnName,
        displayName,
        savePlayer
    };
};

const init = (() => {
    // data
    let _players = [];
    let board = gameboard.returnBoard();

    // cache DOM
    let _inputX = document.querySelector('div input#player-x');
    let _inputO = document.querySelector('div input#player-o');
    let _labelX = _inputX.nextElementSibling;
    let _labelO = _inputO.nextElementSibling;
    const _startButton = document.getElementById('start');
    const _restartButton = document.getElementById('restart');

    // bind listeners
    _startButton.addEventListener('click', () => {
        //// console.log(_inputX, _inputO);
        setPlayers(_inputX, _inputO); // ! WORKS
        gameboard.addClicks(board); // ! WORKS
        // playGame(); // ! WIP
    });
    // * addClick functionality in showGame()
    _restartButton.addEventListener('click', () => {
        unsetPlayers(_players); // ! WORKS
        gameboard.removeClicks(board); // ! WORKS
    });

    // methods
    function setPlayers(inputX, inputO) {
        // create players
        let _playerX = createPlayer(inputX.value);
        let _playerO = createPlayer(inputO.value);
        // save players
        _playerX.savePlayer(_players);
        _playerO.savePlayer(_players);
        // toggle input/label to show player names
        showName(_labelX, _inputX);
        showName(_labelO, _inputO);
        //// _playerX.displayName();
        //// _playerO.displayName();
    };
    function showName(target, source) {
        target.textContent = source.value;
        toggleHide(target); // toggles input to hide
        toggleHide(source); // toggles label to show
    };
    function unsetPlayers(players) {
        // delete players
        for (let i = 0; i < 2; i++) {
            players.pop();
        }
        // clear inputs
        clearInput(_inputX);
        clearInput(_inputO);
        // toggle input/label to hide player names
        hideName(_labelX, _inputX)
        hideName(_labelO, _inputO)
    };
    function hideName(target, source) {
        target.textContent = '';
        toggleHide(target); // toggles input to show
        toggleHide(source); // toggles label to hide
    };
    function toggleHide(element) {
        element.classList.toggle('hide');
    };
    function clearInput(input) {
        input.value = '';
    };
})();
