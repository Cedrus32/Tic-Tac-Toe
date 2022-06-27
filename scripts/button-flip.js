const buttonFlipper = (() => {
    // data

    // cache DOM
    const _startButton = document.getElementById('start');
    const _restartButton = document.getElementById('restart');
    const _form = document.querySelector('form.player-container');

    // bind listeners
    _startButton.addEventListener('click', () => {
        if (_form.checkValidity() === true) {
            _startButton.addEventListener('animationend', addHide);
            _restartButton.classList.remove('hide');

            // flip out start
            _startButton.classList.add('flip-out');
            _startButton.classList.remove('flip-in');
            // flip in restart
            _restartButton.classList.add('flip-in');
            _restartButton.classList.remove('flip-out');
            
        };
    });
    _restartButton.addEventListener('click', () => {
        _restartButton.addEventListener('animationend', addHide);
        _startButton.classList.remove('hide');

        // flip in start
        _startButton.classList.add('flip-in');
        _startButton.classList.remove('flip-out');
        // flip out restart
        _restartButton.classList.add('flip-out');
        _restartButton.classList.remove('flip-in');
    });

    // methods
    function addHide(e) {
        e.target.classList.add('hide');
        e.target.removeEventListener('animationend', addHide);
    };
})();