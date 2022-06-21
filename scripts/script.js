'use strict'

const gameboard = (() => {
    // data
    let boardArray = ['', '', '',
                      '', '', '',
                      '', '', '',
                     ];
    
    // cache DOM
    const boardSpace = document.getElementById('board-space');

    // methods
    function display() {
        let rowDiv;
        let cellDiv;
        let cellCounter = 0;
        for (let i = 0; i < 12; i++) {
            if ((i === 0) || (i%4 === 0)) {
                rowDiv = document.createElement('div');
                rowDiv.classList.add('row');
                boardSpace.appendChild(rowDiv);
            } else {
                cellDiv = document.createElement('div');
                cellDiv.id = cellCounter;
                rowDiv.appendChild(cellDiv);
                cellCounter++;
            };
        };
    };
    function clear() {
        let rowDiv;
        let cellDiv;
        for (let x = 0; x < 3; x++) {
            rowDiv = boardSpace.children[x];
            for (let y = 0; y < 3; y++) {
                cellDiv = rowDiv.children[y];
                cellDiv.textContent = '';
                boardArray[cellDiv.id] = '';
            };
        };
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
        returnBoardSpace,   // used by init & playGame data
        returnBoardArray    // used by playGame data
    };
})();

const computer = (() => {
    // data
    let _availMoves = [];
    let boardArray = gameboard.returnBoardArray();

    // cache DOM

    // bind listeners

    // methods
    function makeMove() {
        //// update available moves
        //// generate random index number
        // check if index number in available moves
        // if index available, mark board

        getAvailMoves(); // ! move out -- push once, then splice for every move
        chooseCell();
    }
    function getAvailMoves() {
        console.log('getAvailMoves()')
        // if boardArray cell.length === 0, push that index to _availMoves
        for (let i = 0; i < (boardArray.length); i++) {
            if (boardArray[i].length === 0) {
                console.log(i);
                _availMoves.push(i);
            };
        };
    };
    function chooseCell() {
        let validMove = false;
        let n;
        
        while (validMove === false) {
            validMove = true;
            n = Math.floor(Math.random() * 10);
            if (_availMoves.includes(n)) {
                validMove = true;
            };
        };
        
        console.log('computer moves to ' + n)
    };

    //actions

    // make public to global
    return {
        makeMove,   // used by playGame -> markBoard
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
    let boardSpace = gameboard.returnBoardSpace();

    let _winMatch;
    let _xMarks = [];
    let _oMarks = [];

    let players = [];
    let _currPlayer = 0;

    let _turnCounter = 0;
    let _tickerMessage = '';

    //// let gameMode = 'human';
    let gameMode = 'ai';

    // cache DOM
    const _ticker = document.querySelector('#game-container h3');

    // methods
    function addClicks(board) {
        for (let x = 0; x < 3; x++) {
            let row = board.children[x];
            for (let y = 0; y < 3; y++) {
                let cell = row.children[y]
                cell.addEventListener('click', markBoard);
            };
        };
    };
    function removeClicks(board) {
        for (let x = 0; x < 3; x++) {
            let row = board.children[x];
            for (let y = 0; y < 3; y++) {
                let cell = row.children[y];
                cell.removeEventListener('click', markBoard);
            };
        };
    };
    function markBoard(e) {
        if (markValid(e) === true) {
            _turnCounter++;
            e.target.textContent = players[_currPlayer].returnMark();
            boardArray[e.target.id] = players[_currPlayer].returnMark();

            if (players[_currPlayer].returnMark() === 'X') {
                // log X mark
                _xMarks.push(e.target.id);
            } else {
                // log O mark
                _oMarks.push(e.target.id);
            };
            if (gameMode === 'ai') {
                // log computer move
                computer.makeMove();
            };
            if (_turnCounter >= 5) {
                if (players[_currPlayer].returnMark() === 'X') {
                    checkWin(_xMarks);
                } else {
                    checkWin(_oMarks);
                };
                if ((_turnCounter === 9) && (!_winMatch)) {
                    _tickerMessage = "It's a tie.";
                    updateTicker(_tickerMessage);
                };
            };
            if (gameMode === 'human') {
                if ((!_winMatch) && (_turnCounter < 9)) {
                    switchPlayer();
                };
            };
        };
    };
    function markValid(e) {
        if (boardArray[e.target.id] === '') {
            return true;
        };
    };
    function checkWin(playerMarks) {
        playerMarks.sort();
        for (let set in _wins) {
            _winMatch = _wins[set].every(mark => playerMarks.includes(mark));
            if (_winMatch) {
                _tickerMessage = players[_currPlayer].returnName() + ' wins!';
                updateTicker(_tickerMessage);
                removeClicks(boardSpace);
                break;
            };
        };
    };
    function updateTicker() {
        _ticker.textContent = _tickerMessage;
    };
    function switchPlayer() {
        if (players[_currPlayer].returnMark() === 'X') {
            _currPlayer = 1;
            _tickerMessage = players[_currPlayer].returnName() + "'s turn...";
            updateTicker(_tickerMessage);
        } else {
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
    };
    function clearTicker() {
        _ticker.textContent = '';
    };

    // actions
    gameboard.display();

    // make public to global
    return {
        addClicks,      // used by init click event
        removeClicks,   // used by init click event
        getPlayers,     // used by init click event
        setTicker,      // used by init click event
        clearTicker     // used by init click event
    };

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
        returnName,     // used by playGame (markBoard, switchPlayer)
        displayName,    // unused (qc)
        returnMark,     // used by playGame (markBoard, switchPlayer)
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
    let _inputX = document.querySelector('input#X');
    let _inputO = document.querySelector('input#O');
    let _labelX = _inputX.nextElementSibling;
    let _labelO = _inputO.nextElementSibling;

    // bind listeners
    _startButton.addEventListener('click', () => {
        checkErrors(_inputX);
        checkErrors(_inputO);
        if (_form.checkValidity() === true) {
            setPlayers(_inputX, _inputO);
            playGame.getPlayers(players);
            playGame.setTicker();
            playGame.addClicks(boardSpace);  
        };
    });
    _restartButton.addEventListener('click', () => {
        unsetPlayers(players);
        playGame.clearTicker();
        playGame.removeClicks(boardSpace);
        gameboard.clear();
    });

    // methods
    function checkErrors(input) {
        // input no value && no previous error...
        if ((!input.value) && (!input.validity.customError)) {
            createError(input);
        // input has value && input has previous error...
        } else if ((input.value) && (input.validity.customError)) {
            removeError(input);
            let label = input.nextElementSibling;
            showName(label, input);
        // if input has value && no previous error...
        } else if ((input.value) && (!input.validity.customError)) {
            let label = input.nextElementSibling;
            showName(label, input);
        };
    };
    function createError(input) {
        input.setCustomValidity('Player ' + input.id + ' name?');
        let errorDiv = document.createElement('div');
        input.parentElement.insertBefore(errorDiv, input.nextElementSibling);
        errorDiv.textContent = input.validationMessage;
    };
    function removeError(input) {
        let errorDiv = input.nextElementSibling;
        input.setCustomValidity('');
        errorDiv.remove();
    };
    function setPlayers(inputX, inputO) {
        // create players
        let _playerX = createPlayer(inputX.value, inputX.id);
        let _playerO = createPlayer(inputO.value, inputO.id);
        // save players
        _playerX.savePlayer(players);
        _playerO.savePlayer(players);
    };
    function showName(target, source) {
        // target === label
        // source === input
        target.textContent = source.value;
        if (source.classList.length === 0) {
            hideElement(source); // hides input
        };
        showElement(target); // shows label
    };
    function unsetPlayers(players) {
        // delete players
        for (let i = 0; i < 2; i++) {
            players.pop();
        };
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
    };

    // make public to global
    return {
        returnPlayers   // unused (qc)
    };
})();
