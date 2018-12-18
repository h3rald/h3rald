(function (window) {
  'use strict';
  
  var themeLinks = document.getElementsByClassName('theme-css-link');
  var currentTheme = themeLinks[0].href.match(/(light|dark)/)[1];

  document.addEventListener("DOMContentLoaded", function(event) { 
    // Theme Switching
    var themeSwitcher = document.getElementById('theme-switcher');
    function switchTheme() {
      var newTheme = currentTheme === 'light' ? 'dark' : 'light';
      for (var i = 0; i < themeLinks.length; i++) {
        themeLinks[i].disabled = themeLinks[i].href.match(currentTheme);
        themeLinks[i].rel = themeLinks[i].href.match(currentTheme) ? 'alternate stylesheet' : 'stylesheet';
      }
      themeSwitcher.title = themeSwitcher.title.replace(newTheme, currentTheme);
      themeSwitcher.innerText = currentTheme;
      currentTheme = newTheme;
    }
    themeSwitcher.addEventListener('click', switchTheme);
  });

})(window)