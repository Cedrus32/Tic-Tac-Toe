const playerSwitcher = (() => {
    // data
    let _gameMode = 'human';

    // cache DOM
    const _gameModeButtons = document.querySelectorAll('img.game-mode');

    // bind listeners
    _gameModeButtons.forEach(button => button.addEventListener('click', (e) => {
        if (e.target.id === 'ai') {
            //// console.log('switch to computer opponent');
            _gameMode = 'ai';
            // deselect human
            _gameModeButtons[0].classList.remove('selected');
            // select computer
            e.target.classList.add('selected');
        } else if (e.target.id === 'human') {
            _gameMode = 'human';
            //// console.log('switch to human opponent');
            // deselect computer
            _gameModeButtons[1].classList.remove('selected');
            // select human
            e.target.classList.add('selected');
        };
    }));
})();