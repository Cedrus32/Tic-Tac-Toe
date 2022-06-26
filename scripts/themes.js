const themeSwitcher = (() => {
    // cache DOM
    let _themeBox = document.querySelector('div.theme-box');
    let styleSheet = document.getElementById('theme');
    _selectAI = document.getElementById('ai');
    // console.log({styleSheet});

    // bind listeners
    _themeBox.addEventListener('click', switchTheme);

    // methods
    function switchTheme() {
        let icon;
        
        for (let i = 0; i < (_themeBox.children.length); i++) {
            // console.log('BEFORE CHANGE...')
            icon = _themeBox.children[i];
            if (i === 0) {
                next = _themeBox.children[1];
                prev = _themeBox.children[5];
            } else if (i === 5) {
                next = _themeBox.children[0];
                prev = _themeBox.children[4];
            } else if (0 < i < 5) {
                console.log(icon);
                next = _themeBox.children[i + 1];
                prev = _themeBox.children[i - 1];
            }
            // console.log(icon);
            // console.log(next);
            // console.log(prev);

            // console.log('AFTER CHANGE...')
            changeTheme(icon);
            // console.log(icon);
            // console.log(next);
            // console.log(prev);
        };
    };
    function changeTheme(icon) {
        if (icon.classList.contains('p-prev')) {
            icon.classList.add('hide');
            icon.classList.remove('p-prev');
            icon.src = 'assets/theme-ico/' + icon.id + '.svg';
        } else if (icon.classList.contains('prev')) {
            icon.classList.add('p-prev');
            icon.classList.remove('prev');
            icon.src = 'assets/theme-ico/' + icon.id + '.svg';
        } else if (icon.classList.contains('curr')) {
            icon.classList.add('prev');
            icon.classList.remove('curr');
            icon.src = 'assets/' + next.id + '/' + icon.id + '.svg';
        } else if (icon.classList.contains('next')) {
            icon.classList.add('curr');
            icon.classList.remove('next');
            icon.src = 'assets/theme-ico/' + icon.id + '.svg';
            styleSheet.classList = icon.id;
            styleSheet.href = './styles/colors-' + icon.id + '.css';
            _selectAI.src = './assets/' + icon.id + '/computer.svg';
        } else if (icon.classList.contains('n-next')) {
            icon.classList.add('next');
            icon.classList.remove('n-next');
            icon.src = 'assets/' + prev.id + '/' + icon.id + '.svg';
        } else if (icon.classList.contains('hide')) {
            icon.classList.add('n-next');
            icon.classList.remove('hide');
            icon.src = 'assets/theme-ico/' + icon.id + '.svg';
        };
    }
})();
