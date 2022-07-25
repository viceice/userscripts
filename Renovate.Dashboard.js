// ==UserScript==
// @name         Renovate Dashboard
// @author       Michael Kriese
// @namespace    https://github.com/viceice/userscripts
// @version      0.3.2
// @description  Updates renovate dashboard
// @copyright    2021 Michael Kriese
// @run-at       document-end
// @grant        none
//
// @updateURL    https://raw.githubusercontent.com/viceice/userscripts/HEAD/renovate.dashboard.user.js
// @installURL   https://raw.githubusercontent.com/viceice/userscripts/HEAD/renovate.dashboard.user.js
// @downloadURL  https://raw.githubusercontent.com/viceice/userscripts/HEAD/renovate.dashboard.user.js
//
// @include      https://app.renovatebot.com/dashboard
// ==/UserScript==

/* eslint-env browser,es2021,greasemonkey  */
/* global $,hashState,generateSidebarLists */

(function () {
  'use strict';

  const prefix = '[RD] ';
  console.log(`${prefix}starting`);

  /**
   * @param {JQuery} $tgt
   * @param {'slow' | 'fast'} mode
   */
  function toggle($tgt, mode) {
    console.log(`${prefix}toggle`);
    $tgt.next().nextUntil(':not(.repo-item)').toggle(mode);
  }

  try {
    $(document).on('click', '#sidebarList > .nav-item', (e) => {
      const $tgt = $(e.target).parent();
      if ($tgt.is('.repo-item')) {
        console.log(`${prefix}ignore repo-item`);
        return;
      }

      toggle($tgt, 'slow');
    });

    const bkp_generateSidebarLists = generateSidebarLists;

    /**
     * @param {unknown[]} args
     */
    // eslint-disable-next-line no-global-assign
    generateSidebarLists = (...args) => {
      bkp_generateSidebarLists(...args);
      let orgs = $('#sidebarList > .nav-item').not('.repo-item');
      if (hashState && hashState.owner) {
        orgs = orgs.filter(
          (_i, e) => $(e).find('a').data('owner') !== hashState.owner
        );
      }
      toggle(orgs, 'fast');
    };
  } catch (e) {
    console.error(`${prefix}unexpected error`, e);
  }
})();
