// ==UserScript==
// @name         MS Redirection Helper
// @author       Michael Kriese
// @namespace    https://github.com/viceice/userscripts
// @version      0.10.0
// @description  Redirects to en-us locale docs
// @copyright    2021 Michael Kriese
// @run-at       document-start
// @grant        none
//
// @updateURL    https://raw.githubusercontent.com/viceice/userscripts/HEAD/ms.redirection.user.js
// @installURL   https://raw.githubusercontent.com/viceice/userscripts/HEAD/ms.redirection.user.js
// @downloadURL  https://raw.githubusercontent.com/viceice/userscripts/HEAD/ms.redirection.user.js
//
// @include      http://msdn.microsoft.com/*
// @include      https://msdn.microsoft.com/*
// @include      http://technet.microsoft.com/*
// @include      https://technet.microsoft.com/*
// @include      https://docs.microsoft.com/*
// ==/UserScript==

/* eslint-env browser,es2021,greasemonkey  */
(function () {
  'use strict';

  var path = location.pathname;

  if (path.match(/^\/\w{2}-\w{2}\//gi) && !path.match(/^\/en-us\//gi)) {
    var uri = location.href;
    uri = uri.replace(/\/\w{2}-\w{2}\//gi, '/en-us/');
    location.href = uri;
  }
})();
