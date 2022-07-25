// ==UserScript==
// @name         MDN Redirection Helper
// @author       Michael Kriese
// @namespace    https://github.com/viceice/userscripts
// @version      1.0.1
// @description  Redirects to en-us locale docs
// @copyright    2021 Michael Kriese
// @run-at       document-start
// @grant        none
//
// @updateURL    https://raw.githubusercontent.com/viceice/userscripts/HEAD/mdn.redirection.user.js
// @installURL   https://raw.githubusercontent.com/viceice/userscripts/HEAD/mdn.redirection.user.js
// @downloadURL  https://raw.githubusercontent.com/viceice/userscripts/HEAD/mdn.redirection.user.js
//
// @match        https://developer.mozilla.org/*
// ==/UserScript==

/* eslint-env browser,es2021,greasemonkey  */
(function () {
  'use strict';

  var path = location.pathname;

  if (path.match(/^\/\w{2}(?:-\w{2})?\//gi) && !path.match(/^\/en-US\//gi)) {
    path = path.replace(/^\/\w{2}(?:-\w{2})?\//i, '/en-US/');
    location.href = path;
  }
})();
