const themeSwitcher = (() => {
    // cache DOM
    let _themeBox = document.querySelector('div.theme-box');

    // bind listeners
    _themeBox.addEventListener('click', switchTheme);

    // methods
    function switchTheme() {
        let icon;
        
        for (let i = 0; i < (_themeBox.children.length); i++) {
            icon = _themeBox.children[i];
            changeTheme(icon);
        };
    };
    function changeTheme(icon) {
        if (icon.classList.contains('p-prev')) {
            icon.classList.add('hide');
            icon.classList.remove('p-prev');
        } else if (icon.classList.contains('prev')) {
            icon.classList.add('p-prev');
            icon.classList.remove('prev');
        } else if (icon.classList.contains('curr')) {
            icon.classList.add('prev');
            icon.classList.remove('curr');
        } else if (icon.classList.contains('next')) {
            icon.classList.add('curr');
            icon.classList.remove('next');
        } else if (icon.classList.contains('n-next')) {
            icon.classList.add('next');
            icon.classList.remove('n-next');
        } else if (icon.classList.contains('hide')) {
            icon.classList.add('n-next');
            icon.classList.remove('hide');
        };
    }
})();
