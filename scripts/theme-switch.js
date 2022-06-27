const themeSwitcher = (() => {
    // cache DOM
    const _themeBox = document.querySelector('div.theme-box');
    let styleSheet = document.getElementById('theme');
    // console.log({styleSheet});

    // bind listeners
    _themeBox.addEventListener('click', switchTheme);

    // methods
    function switchTheme() {
        _theme = document.getElementById('theme').classList[0];
        let icon;
        
        for (let i = 0; i < (_themeBox.children.length); i++) {
            icon = _themeBox.children[i];
            if (i === 0) {
                next = _themeBox.children[1];
                prev = _themeBox.children[5];
            } else if (i === 5) {
                next = _themeBox.children[0];
                prev = _themeBox.children[4];
            } else if (0 < i < 5) {
                next = _themeBox.children[i + 1];
                prev = _themeBox.children[i - 1];
            }

            changeTheme(icon);
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
            
            // use new stylesheet
            styleSheet.classList = icon.id;
            styleSheet.href = './styles/themes/' + icon.id + '.css';
        } else if (icon.classList.contains('n-next')) {
            icon.classList.add('next');
            icon.classList.remove('n-next');
            icon.src = 'assets/' + prev.id + '/' + icon.id + '.svg';
        } else if (icon.classList.contains('hide')) {
            icon.classList.add('n-next');
            icon.classList.remove('hide');
            icon.src = 'assets/theme-ico/' + icon.id + '.svg';
        };
    };
})();
