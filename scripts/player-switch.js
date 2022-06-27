const playerSwitcher = (() => {
    // data
    let _gameMode = 'human';

    // cache DOM
    const _gameModeButtons = document.querySelectorAll('img.game-mode');
    const _restartButton = document.getElementById('restart');
    const _themeBox = document.querySelector('div.theme-box');
    let _theme = Array.from(_themeBox.children).find(i => i.className === 'curr').id;

    // bind listeners
    _themeBox.addEventListener('click', () => {
        getTheme();
        matchPlayerIcons();
    });
    _gameModeButtons.forEach(button => button.addEventListener('click', (e) => {
        if (e.target.id === 'ai') {
            //// console.log('switch to computer opponent');
            _gameMode = 'ai';
            // deselect human
            _gameModeButtons[0].src='./assets/' + _theme + '/human.svg';
            _gameModeButtons[0].classList.remove('selected');
            // select computer
            e.target.src='./assets/player-ico/computer-sel.svg';
            e.target.classList.add('selected');
            e.target.parentElement.previousElementSibling.classList.add('computer-label');
        } else if (e.target.id === 'human') {
            _gameMode = 'human';
            //// console.log('switch to human opponent');
            // deselect computer
            _gameModeButtons[1].classList.remove('selected');
            _gameModeButtons[1].src='./assets/' + _theme + '/computer.svg';
            e.target.parentElement.previousElementSibling.classList.remove('computer-label');
            // select human
            e.target.src='./assets/player-ico/human-sel.svg';
            e.target.classList.add('selected');
        };
    }));
    _restartButton.addEventListener('click', () => {
        if (_gameMode === 'ai') {
            resetPlayerIcons();
            _gameMode = 'human';
        };
    });

    // methods
    function resetPlayerIcons() {
        if (_gameMode === 'ai') {
            // deselect computer
            _gameModeButtons[1].classList.remove('selected');
            _gameModeButtons[1].src='./assets/' + _theme + '/computer.svg';
            // select human
            _gameModeButtons[0].classList.add('selected');
            _gameModeButtons[0].src='./assets/player-ico/human-sel.svg';
        };
    };
    function getTheme() {
        _theme = Array.from(_themeBox.children).find(i => i.className === 'curr').id;
    };
    function matchPlayerIcons() {
        if (_gameMode === 'human') {
            _gameModeButtons[0].src = './assets/player-ico/human-sel.svg';
            _gameModeButtons[1].src = './assets/' + _theme + '/computer.svg';
        } else if (_gameMode === 'ai') {
            _gameModeButtons[0].src = './assets/' + _theme + '/human.svg';
            _gameModeButtons[1].src = './assets/player-ico/computer-sel.svg';
        };
    };
})();