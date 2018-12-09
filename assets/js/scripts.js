(function(window){
  'use strict';

  // Theme Switching
  var themeSwitcher = document.getElementById('theme-switcher');
  var themeLinks = document.getElementsByClassName('theme-css-link');

  themeSwitcher.addEventListener('click', function(){
    var currentTheme = themeLinks[0].href.match(/(light|dark)/)[1];
    var newTheme = currentTheme === 'light' ? 'dark' : 'light';
    for (var i=0; i<themeLinks.length; i++) {
      themeLinks[i].href = themeLinks[i].href.replace(currentTheme, newTheme);
    }
    themeSwitcher.title = themeSwitcher.title.replace(newTheme, currentTheme);
    themeSwitcher.innerText = currentTheme;
  });
})(window)
