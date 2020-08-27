(function () {
  "use strict";

  // ==UserScript==
  // @name        Renovate Dashboard
  // @author      Michael Kriese
  // @namespace   https://github.com/ViceIce/UserScripts
  // @version     0.1
  // @description Updates renovate dashboard
  // @copyright   2018 Michael Kriese
  // @run-at      document-end
  // @grant       none
  //
  // @updateURL   https://raw.githubusercontent.com/ViceIce/UserScripts/master/Renovate.Dashboard.js
  // @installURL  https://raw.githubusercontent.com/ViceIce/UserScripts/master/Renovate.Dashboard.js
  // @downloadURL https://raw.githubusercontent.com/ViceIce/UserScripts/master/Renovate.Dashboard.js
  //
  // @include     https://app.renovatebot.com/dashboard
  // ==/UserScript==

  try {
      $(document).on('click', '#sidebarList > .nav-item', (e) => {
          if($(e.target).is('.repo-item')){
              console.log("ignore repo-item")
              return;
          }

          console.log("todo")
      })
  } catch (e) {
    console.error(e);
  }
})();
