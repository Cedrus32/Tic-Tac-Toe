'use strict'

const gameboard = (() => {
    // data
    let boardArray = ['', '', '',
                      '', '', '',
                      '', '', '',
                     ];
    
    // cache DOM
    const boardSpace = document.getElementById('board-space');
    //// console.log({_cells});

    // bind events

    // methods
    function display() {
        let rowDiv;
        let cellDiv;
        let cellCounter = 0;
        for (let i = 0; i < 12; i++) {
            if ((i === 0) || (i%4 === 0)) {
                rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                //// console.log(rowDiv);
                boardSpace.appendChild(rowDiv);
            } else {
                cellDiv = document.createElement('div');
                cellDiv.id = cellCounter;
                //// console.log(rowDiv);
                console.log(cellDiv);
                rowDiv.appendChild(cellDiv);
                cellCounter++;
            }
        }
    };
    function clear() {
        //// console.log(boardSpace);
        let rowDiv;
        let cellDiv;
        for (let x = 0; x < 3; x++) {
            rowDiv = boardSpace.children[x];
            console.log(rowDiv);
            for (let y = 0; y < 3; y++) {
                cellDiv = rowDiv.children[y];
                cellDiv.textContent = '';
                boardArray[cellDiv.id] = '';
            }
        }
        console.log(boardArray);
    };
    function returnBoardSpace() {
        return boardSpace;
    };
    function returnBoardArray() {
        return boardArray;
    };

    // make public to global
    return {
        display,
        clear,
        returnBoardSpace,
        returnBoardArray
    };
})();

const playGame = (() => {
    // data
    const _wins = [['0', '1', '2'],
                   ['3', '4', '5'],
                   ['6', '7', '8'],
                   ['0', '3', '6'],
                   ['1', '4', '7'],
                   ['2', '5', '8'],
                   ['0', '4', '8'],
                   ['2', '4', '6'],
                  ];
    let _xMarks = [];
    let _oMarks = [];
    let _currPlayer = 'X';
    let turnCounter = 0;
    let boardArray = gameboard.returnBoardArray();
    //// console.log(boardArray);

    // cache DOM

    // bind events

    // methods
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
        // turnCounter = 0; //? add later if does not re-initialize on restart
    };
    function markBoard(e) {
        if (markValid(e) === true) {
            turnCounter++;
            //// console.log({_currPlayer});
            e.target.textContent = _currPlayer[0];
            boardArray[e.target.id] = _currPlayer[0];

            if (_currPlayer === 'X') {
                _xMarks.push(e.target.id);
            } else {
                _oMarks.push(e.target.id);
            };
            if (turnCounter >= 5) {
                if (_currPlayer === 'X') {
                    checkWin(_xMarks);
                } else {
                    checkWin(_oMarks);
                }
            };
            switchPlayer();

            logClick(e);
            //// console.log(boardArray);
        };
    };
    function markValid(e) {
        if (boardArray[e.target.id] === '') {
            return true;
        };
    };
    function logClick(e) {
        console.log(e.target);
    };
    function checkWin(playerMarks) {
        //// console.log(boardArray);
        //// console.log(_xMarks);
        //// console.log(_oMarks);
        let winMatch;
        playerMarks.sort();
        for (let set in _wins) {
            console.log(_wins[set]);
            console.log(playerMarks);
            winMatch = _wins[set].every(mark => playerMarks.includes(mark));
            console.log(winMatch);
            if (winMatch) {
                console.log(_currPlayer + ' wins!');
                break;
            };
        };
    };
    function switchPlayer() {
        if (_currPlayer === 'X') {
            _currPlayer = 'O';
        } else {
            _currPlayer = 'X';
        };
    };

    // actions
    gameboard.display();

    return {
        addClicks,
        removeClicks
    }

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
    let boardSpace = gameboard.returnBoardSpace();

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
        playGame.addClicks(boardSpace); // ! WORKS
    });
    // * addClick functionality in showGame()
    _restartButton.addEventListener('click', () => {
        unsetPlayers(_players); // ! WORKS
        playGame.removeClicks(boardSpace); // ! WORKS
        gameboard.clear();
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
        // target === label
        // source === input
        target.textContent = source.value;
        if (source.classList.length === 0) {
            hideElement(source); // hides input
        }
        showElement(target); // shows label
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
        // target === label
        // source === input
        target.textContent = '';
        if (target.classList.length === 0) {
            hideElement(source); // hides label
        }
        showElement(source); // shows input
    };
    function hideElement(element) {
        element.classList.add('hide');
    };
    function showElement(element) {
        element.classList.remove('hide');
    }
    function clearInput(input) {
        input.value = '';
    };
})();
