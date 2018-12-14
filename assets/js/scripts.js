(function (window) {
  'use strict';

  // Theme Switching
  var themeSwitcher = document.getElementById('theme-switcher');
  var themeLinks = document.getElementsByClassName('theme-css-link');
  var themeNames = {
    light: 'day',
    dark: 'night'
  }
  var hour = new Date().getHours();
  var currentTheme = themeLinks[0].href.match(/(light|dark)/)[1];
  var actualTheme = (hour >= 18 || hour < 6) ? 'dark' : 'light';

  function switchTheme() {
    var newTheme = currentTheme === 'light' ? 'dark' : 'light';
    for (var i = 0; i < themeLinks.length; i++) {
      themeLinks[i].href = themeLinks[i].href.replace(currentTheme, newTheme);
    }
    themeSwitcher.title = themeSwitcher.title.replace(themeNames[newTheme], themeNames[currentTheme]);
    themeSwitcher.innerText = themeNames[currentTheme];
    actualTheme = newTheme;
    currentTheme = newTheme;
  }

  themeSwitcher.addEventListener('click', switchTheme);
  if (actualTheme !== currentTheme) {
    switchTheme();
    currentTheme = actualTheme;
  }

})(window)