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
                cellDiv.classList.add('empty');
                //// console.log(cellDiv);
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
    function clearBoardArray() {
        for (let i = 0; i < (boardArray.length); i++) {
            boardArray[i] = '';
        };
        //// console.log('boardArray: [' + boardArray + ']');
    };

    // make public to global
    return {
        display,            // used by playGame actions
        clear,              // used by init click event
        returnBoardSpace,   // used by init & playGame data
        returnBoardArray,   // used by playGame data
        clearBoardArray,    // used by init click event (_restartButton -> resetGame)
    };
})();

const computer = (() => {
    // data
    let availMoves = [];
    let boardArray = gameboard.returnBoardArray();
    const boardSpace = gameboard.returnBoardSpace();

    // cache DOM

    // bind listeners

    // methods
    function returnAvailMoves() {
        return availMoves;
    }
    function getAvailMoves() {
        //// ('getAvailMoves()')
        // if boardArray cell.length === 0, push that index to _availMoves
        for (let i = 0; i < (boardArray.length); i++) {
            if (boardArray[i].length === 0) {
                let move = i.toString();
                availMoves.push(move);
            };
        };
        //// console.log('availMoves: ' + availMoves);
    };
    function selectMove() {
        //// console.log('selectMove()...');
        let validMove = false;
        let n;
        let move;

        while (validMove === false) {
            n = Math.floor(Math.random() * 9);
            move = n.toString();
            //// console.log({move});
            if (availMoves.includes(move)) {
                validMove = true;
            };
        };

        return move;
    };
    function markBoard(move) {
        //// console.log('computer.markBoard()...')
        for (let x = 0; x < 3; x++) {
            let row = boardSpace.children[x];
            for (let y = 0; y < 3; y++) {
                let cell = row.children[y];
                if (cell.id === move) {
                    //// console.log('cell: cell[' + cell.id + ']');
                    cell.textContent = 'O';
                    cell.classList = 'o-mark';
                    boardArray[cell.id] = 'O';
                };
            };
        };
    };
    function clearAvailMoves() {
        availMoves.length = 0;
        //// console.log('availMoves: [' + availMoves + ']');
    };

    //actions

    // make public to global
    return {
        returnAvailMoves,   // used by playGame data
        getAvailMoves,      // used by playGame -> markBoard
        selectMove,         // used by playGame -> markBoard
        markBoard,          // used by playGame -> markBoard
        clearAvailMoves,    // used by init click event (_restartButton -> resetGame)
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
    let availMoves = computer.returnAvailMoves();

    let _winMatch = false;
    let _xMarks = [];
    let _oMarks = [];

    let players = [];
    let _currPlayer = 0;

    let _turnCounter = 0;
    let _tickerMessage = '';

    let gameMode = '';

    // cache DOM
    const _ticker = document.querySelector('h3');

    // methods
    function getGameMode(mode) {
        gameMode = mode;
    };
    function enableCells(board) {
        for (let x = 0; x < 3; x++) {
            let row = board.children[x];
            for (let y = 0; y < 3; y++) {
                let cell = row.children[y]
                cell.addEventListener('click', markBoard);
                cell.addEventListener('mouseover', showSelectStyle);
                cell.addEventListener('mouseleave', hideSelectStyle);
            };
        };
    };
    function disableCells(board) {
        for (let x = 0; x < 3; x++) {
            let row = board.children[x];
            for (let y = 0; y < 3; y++) {
                let cell = row.children[y];
                cell.removeEventListener('click', markBoard);
                cell.removeEventListener('mouseover', showSelectStyle);
                cell.removeEventListener('mouseleave', hideSelectStyle);
            };
        };
    };
    function showSelectStyle(e) {
        //// console.log('mouseover');
        //// console.log(e.target);
        //// console.log((e.target.classList.length));
        if (e.target.textContent.length === 0) {
            e.target.classList.remove('empty');
            if (players[_currPlayer].returnMark() === 'X') {
                e.target.classList.add('x-mark');
            } else {
                e.target.classList.add('o-mark');
            };
        };
    };
    function hideSelectStyle(e) {
        //// console.log('mouseleave');
        if ((e.target.textContent.length === 0) && (e.target.classList !== 'empty')) {
            e.target.classList.add('empty');
            if (players[_currPlayer].returnMark() === 'X') {
                e.target.classList.remove('x-mark');
            } else {
                e.target.classList.remove('o-mark');
            };
        };
        //// console.log(e.target);
        //// console.log((e.target.classList.length));
    };
    function markBoard(e) {
        //// console.log('new game mode (mark board): ' + gameMode);
        //// console.log(boardArray);
        //// console.log('');
        if ((gameMode === 'ai') && (_turnCounter === 0)) {
            computer.getAvailMoves();
        };
        if (markValid(e) === true) {
            // count human turn
            _turnCounter++;
            //// console.log('_turnCounter: ' + _turnCounter);

            // * mark board & update boardArray with human move
            //// console.log('human selects...')
            e.target.textContent = players[_currPlayer].returnMark();
            boardArray[e.target.id] = players[_currPlayer].returnMark();

            // log human moves
            if (players[_currPlayer].returnMark() === 'X') {
                _xMarks.push(e.target.id);
                //// console.log('_xMarks: ' + _xMarks);
                // share human move with computer's available moves
                if (gameMode === 'ai') {
                    updateAvailMoves(e.target.id);
                    //// console.log('availMoves: ' + availMoves);
                };
            } else if (players[_currPlayer].returnMark() === 'O') {
                _oMarks.push(e.target.id);
                //// console.log('_oMarks: ' + _oMarks);
            };
            //// console.log('');
            
            // check for human wins
            if (_turnCounter >= 5) {
                console.log('enter checkWin() conditional');
                if (players[_currPlayer].returnMark() === 'X') {
                    //// console.log('enter _xMarks winCheck()');
                    checkWin(_xMarks);
                } else {
                    //// console.log('enter _oMarks winCheck()');
                    checkWin(_oMarks);
                };

                //// console.log('_winMatch?: ' + _winMatch);
                //// console.log('');

                // if win, change game mode to 'human'
                // (triggers correct win message)
                if (_winMatch) {
                    gameMode = 'human';
                }
            };

            // select & mark computer moves
            if ((gameMode === 'ai') && (_turnCounter < 9) && (!_winMatch)) {
                _turnCounter++;
                //// console.log('_turnCounter: ' + _turnCounter);

                // * mark board & update boardArray with computer move
                console.log('computer selects...')
                let computerMove = computer.selectMove();
                //// console.log(computerMove);
                //// console.log('computerMove: ' + computerMove);
                computer.markBoard(computerMove);
                _oMarks.push(computerMove);
                //// console.log('_oMarks: ' + _oMarks);
                updateAvailMoves(computerMove);
                //// console.log('availMoves: ' + availMoves);
                //// console.log('');

                // check for computer wins
                if (_turnCounter >= 5) {
                    //// console.log('enter checkWin() conditional');
                    //// console.log('enter _oMarks winCheck()');

                    checkWin(_oMarks);

                    //// console.log('_winMatch?: ' + _winMatch);
                    //// console.log('');
                };
            };

            // set ticker message & next move
            if (_winMatch) {
                //// console.log('enter win conditional');
                if (gameMode === 'human') {
                    // if human win...
                    _tickerMessage = players[_currPlayer].returnName() + ' wins!';
                // ! vv always logs 'Computer wins.' even if human wins in ai mode
                } else if (gameMode === 'ai') {
                    _tickerMessage = 'Computer wins.';
                };
                updateTicker(_tickerMessage);
                disableCells(boardSpace);
                _turnCounter = 0;
            } else if ((gameMode === 'human') && (_turnCounter < 9) && (!_winMatch)) {
            // if no human win...
                //// console.log('enter switchPlayer conditional')
                switchPlayer();
            } else if ((!_winMatch) && (_turnCounter === 9)) {
            // if tie...
                //// console.log('enter tie conditional');
                _tickerMessage = "It's a tie.";
                updateTicker(_tickerMessage);
                _turnCounter = 0;
            };
        };
    };
    function updateAvailMoves(move) {
        availMoves.splice(availMoves.indexOf(move), 1);
    }
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
                break;
            };
        };
    };
    function updateTicker() {
        _ticker.textContent = _tickerMessage;
        //// console.log('ticker updated to: ' + _ticker.textContent);
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
    function clearWinMatch() {
        _winMatch = false;
        //// console.log('_winMatch: ' + _winMatch);
    }
    function clearMoves() {
        _xMarks = [];
        _oMarks = [];
        //// console.log('_xMarks: [' + _xMarks + ']');
        //// console.log('_oMarks: [' + _oMarks + ']');
    };
    function clearCellStyle() {
        for (let x = 0; x < 3; x++) {
            let row = boardSpace.children[x];
            for (let y = 0; y < 3; y++) {
                let cell = row.children[y];
                //// console.log(cell);
                //// console.log('div#' + cell.id + ' classList.length: ' + cell.classList.length);
                if (cell.classList !== 'empty') {
                    cell.classList = 'empty';
                };
            };
        };
    };
    function resetCurrPlayer() {
        _currPlayer = 0;
    };

    // actions
    gameboard.display();

    // make public to global
    return {
        getGameMode,        // used by init click event (_gameModeButton)
        enableCells,        // used by init click event (_startButton)
        disableCells,       // used by init click event (_startButton -> checkErrors, _restartButton)
        getPlayers,         // used by init click event (_startButton)
        setTicker,          // used by init click event (_startButton)
        clearTicker,        // used by init click event (_restartButton)
        clearWinMatch,      // used by init click event (_restartButton)
        clearMoves,         // used by init click event (_restartButton)
        clearCellStyle,     // used by init click event (_restartButton)
        resetCurrPlayer,    // used by init click event (_restartButton)
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
        //// console.log(_name);
    };
    function displayMark() {
        //// console.log(_mark);
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
    const _gameModeButtons = document.querySelectorAll('img.game-mode');
    const _gameModeFilter = document.querySelector('.mode-filter');
    const _form = document.querySelector('form.player-container');
    let _inputX = document.querySelector('input#X');
    let _inputO = document.querySelector('input#O');
    let _labelX = _inputX.nextElementSibling;
    let _labelO = _inputO.nextElementSibling;
    let gameMode = 'human';

    // bind listeners
    _gameModeButtons.forEach(button => button.addEventListener('click', (e) => {
        if (e.target.id === 'ai') {
            //// console.log('switch to computer opponent');
            // deselect human
            _gameModeButtons[0].src='./assets/human.svg';
            _gameModeButtons[0].classList.remove('selected');
            // select computer
            e.target.src='./assets/computer-sel.svg';
            e.target.classList.add('selected');
            e.target.parentElement.previousElementSibling.classList.add('computer-label');
            // show computer label
            _inputO.value = 'computer';
            showName(_labelO, _inputO);
        } else if (e.target.id === 'human') {
            //// console.log('switch to human opponent');
            // deselect computer
            _gameModeButtons[1].src='./assets/computer.svg';
            _gameModeButtons[1].classList.remove('selected');
            e.target.parentElement.previousElementSibling.classList.remove('computer-label');
            // select human
            e.target.src='./assets/human-sel.svg';
            e.target.classList.add('selected');

            // show human input
            clearInput(_inputO);
            hideName(_labelO, _inputO);
        }
        gameMode = button.id;
    }));
    _startButton.addEventListener('click', () => {
        //// ('new game mode (start click): ' + gameMode);
        //// console.log('');
        // verify entries
        checkErrors(_inputX);
        if (gameMode === 'human') {
            // if opponent is human, check for errors
            checkErrors(_inputO);
        };
        // init game
        if (_form.checkValidity() === true) {
            disablePlayerChoice();
            _labelO.classList = '';
            setPlayer(_inputX);
            setPlayer(_inputO);

            playGame.getPlayers(players);
            playGame.setTicker();
            playGame.getGameMode(gameMode);
            playGame.enableCells(boardSpace);

            _startButton.classList.add('hide');
            _restartButton.classList.remove('hide');
        };
    });
    _restartButton.addEventListener('click', () => {
        playGame.disableCells(boardSpace);
        playGame.resetCurrPlayer();
        resetGameMode();
        unsetPlayers(players);
        playGame.clearMoves();
        computer.clearAvailMoves();

        gameboard.clear();
        gameboard.clearBoardArray();
        playGame.clearTicker();
        playGame.clearWinMatch();

        playGame.clearCellStyle();
        _startButton.classList.remove('hide');
        _restartButton.classList.add('hide');
        enablePlayerChoice();

        //// console.log('game mode: ' + gameMode);
        //// console.log('players: [' + players + ']');
        ////// console.log moves in main function
        ////// console.log availMoves in main function
        ////// console.log boardArray in main function
        ////// console.log _winMatch in main function
        //// console.log('');
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
        input.placeholder = input.validationMessage;
    };
    function removeError(input) {
        // let errorDiv = input.nextElementSibling;
        input.setCustomValidity('');
        // errorDiv.remove();
        input.placeholder = 'name';
    };
    function setPlayer(input) {
        // create players
        if (input.id === 'X') {
            let _playerX = createPlayer(input.value, input.id);
            _playerX.savePlayer(players);
        } else if (input.id === 'O') {
            let _playerO = createPlayer(input.value, input.id);
            _playerO.savePlayer(players);
        }
    };
    function showName(label, input) {
        label.textContent = input.value;
        hideElement(input); // hides input
        showElement(label); // shows label
    };
    function enablePlayerChoice() {
        _gameModeFilter.classList.add('hide');
    }
    function disablePlayerChoice() {
        _gameModeFilter.classList.remove('hide');
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
    function hideName(label, input) {
        label.textContent = '';
        hideElement(label); // hides label
        showElement(input); // shows input
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
    function resetGameMode() {
        if (gameMode === 'ai') {
            // deselect computer
            _gameModeButtons[1].classList.remove('selected');
            _gameModeButtons[1].src='./assets/computer.svg';
            // select human
            _gameModeButtons[0].classList.add('selected');
            _gameModeButtons[0].src='./assets/human-sel.svg';
            gameMode = 'human';
        };
    };

    // make public to global
    return {
        returnPlayers   // unused (qc)
    };
})();
