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
        display,            // used by playGame actions
        clear,              // used by init click event
        returnBoardSpace,   // used by init data
        returnBoardArray    // used by playGame data
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
    let boardArray = gameboard.returnBoardArray();
    let _winMatch;
    let _xMarks = [];
    let _oMarks = [];

    let players = [];
    let _currPlayer = 0;
    //// let _playerMark = '';
    //// let _playerName = '';

    let _turnCounter = 0;
    let _tickerMessage = '';
    //// console.log(boardArray);

    // cache DOM
    const _ticker = document.querySelector('#game-container h3');
    //// console.log(_ticker);

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
    };
    function markBoard(e) {
        if (markValid(e) === true) {
            _turnCounter++;
            //// console.log({_currPlayer});
            e.target.textContent = players[_currPlayer].returnMark();
            boardArray[e.target.id] = players[_currPlayer].returnMark();

            if (players[_currPlayer].returnMark() === 'X') {
                _xMarks.push(e.target.id);
            } else {
                _oMarks.push(e.target.id);
            };
            if (_turnCounter >= 5) {
                if (players[_currPlayer].returnMark() === 'X') {
                    checkWin(_xMarks);
                } else {
                    checkWin(_oMarks);
                }
                if ((_turnCounter === 9) && (!_winMatch)) {
                    console.log('tie');
                    //todo link into ticker
                }
            };
            if (!_winMatch) {
                switchPlayer();
            }

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
        playerMarks.sort();
        for (let set in _wins) {
            console.log(_wins[set]);
            console.log(playerMarks);
            _winMatch = _wins[set].every(mark => playerMarks.includes(mark));
            console.log(_winMatch);
            if (_winMatch) {
                //// console.log(players[_currPlayer].returnName());
                _tickerMessage = players[_currPlayer].returnName() + ' wins!';
                updateTicker(_tickerMessage);
                break;
            }
        };
    };
    function updateTicker() {
        _ticker.textContent = _tickerMessage;
    };
    function switchPlayer() {
        //// console.log(playGamePlayers);
        //// playGamePlayers[0].displayPlayer();
        //// playGamePlayers[1].displayPlayer();

        if (players[_currPlayer].returnMark() === 'X') {
            //// console.log(_currPlayer);
            _currPlayer = 1;
            _tickerMessage = players[_currPlayer].returnName() + "'s turn...";
            updateTicker(_tickerMessage);
        } else {
            //// console.log(_currPlayer);
            _currPlayer = 0;
            _tickerMessage = players[_currPlayer].returnName() + "'s turn...";
            updateTicker(_tickerMessage);
        };
    };
    function getPlayers(array) {
        players = array;
    };
    function setTicker() {
        _ticker.textContent = players[_currPlayer].returnName() + "'s turn...";
    }
    function clearTicker() {
        _ticker.textContent = '';
    }

    // actions
    gameboard.display();

    // make public to global
    return {
        addClicks,      // used by init click event
        removeClicks,   // used by init click event
        getPlayers,     // used by init click event
        setTicker,      // used by init click event
        clearTicker     // used by init click event
    }

})();

function createPlayer(name, mark) {
    // data
    let _name = name;
    let _mark = mark;

    // methods
    function returnName() {
        return _name;
    };
    function displayName() {
        console.log(_name);
    };
    function displayMark() {
        console.log(_mark);
    };
    function returnMark() {
        return _mark;
    };
    function savePlayer(saveState) {
        saveState.push(this);
    };

    // make public to global
    return {
        returnName,     // unused (qc)
        displayName,    // unused (qc)
        returnMark,     // unused (qc)
        displayMark,    // unused (qc)
        savePlayer      // used by init (click event -> setPlayers)
    };
};

const init = (() => {
    // data
    let players = [];
    let boardSpace = gameboard.returnBoardSpace();

    // cache DOM
    const _startButton = document.getElementById('start');
    const _restartButton = document.getElementById('restart');
    const _form = document.querySelector('form.set-players');
    //// console.log(_form);
    let _inputX = document.querySelector('input#X');
    let _inputO = document.querySelector('input#O');
    let _labelX = _inputX.nextElementSibling;
    let _labelO = _inputO.nextElementSibling;

    // bind listeners
    _startButton.addEventListener('click', () => {
        //// console.log(_inputX, _inputO);
        if (_form.checkValidity() === true) {
            setPlayers(_inputX, _inputO); // ! WORKS
            playGame.getPlayers(players);
            playGame.setTicker();
            playGame.addClicks(boardSpace); // ! WORKS   
        } else {
            console.log('missing value');
        }
    });
    // * addClick functionality in showGame()
    _restartButton.addEventListener('click', () => {
        unsetPlayers(players); // ! WORKS
        playGame.clearTicker();
        playGame.removeClicks(boardSpace); // ! WORKS
        gameboard.clear();
    });

    // methods
    function setPlayers(inputX, inputO) {
        // create players
        let _playerX = createPlayer(inputX.value, inputX.id);
        let _playerO = createPlayer(inputO.value, inputO.id);
        // save players
        _playerX.savePlayer(players);
        _playerO.savePlayer(players);
        // console.log(players);
        showName(_labelX, _inputX);
        showName(_labelO, _inputO);
        //// players[0].displayName();
        //// players[1].displayName();
        //// players[0].displayPlayer();
        //// players[1].displayPlayer();
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
    function returnPlayers() {
        return players;
    }

    // make public to global
    return {
        returnPlayers   // unused (qc)
    }
})();
