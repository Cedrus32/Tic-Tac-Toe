const buttonFlipper = (() => {
    // data

    // cache DOM
    const _startButton = document.getElementById('start');
    const _restartButton = document.getElementById('restart');
    const _form = document.querySelector('form.player-container');

    // bind listeners
    _startButton.addEventListener('click', () => {
        if (_form.checkValidity() === true) {
            _startButton.classList.add('hide');
            _restartButton.classList.remove('hide');
        };
    });
    _restartButton.addEventListener('click', () => {
        _startButton.classList.remove('hide');
        _restartButton.classList.add('hide');
    });

    // methods
})();