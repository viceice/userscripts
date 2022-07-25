// ==UserScript==
// @name         Gitea checkbox helper
// @author       Michael Kriese
// @namespace    https://github.com/viceice/userscripts
// @version      0.4.5
// @description  Allows clicking checkboxes on Gitea
// @copyright    2021 Michael Kriese
// @run-at       document-end
// @grant        none
//
// @updateURL    https://raw.githubusercontent.com/viceice/userscripts/HEAD/gitea.cb.user.js
// @installURL   https://raw.githubusercontent.com/viceice/userscripts/HEAD/gitea.cb.user.js
// @downloadURL  https://raw.githubusercontent.com/viceice/userscripts/HEAD/gitea.cb.user.js
//
// @include      https://gitea.visualon.de/*
// ==/UserScript==

/* eslint-env browser,es2021,greasemonkey  */
/* global $,config */
(function () {
  'use strict';
  const prefix = '[RD] ';
  console.log(`${prefix}starting`);
  const cbRe = /^\s+- \[( |x)\] (.+)$/gm;

  try {
    const { owner, repo, type, id } =
      location.pathname?.match(
        /(?<owner>[^/]+)\/(?<repo>[^/]+)\/(?<type>pulls|issues)\/(?<id>\d+)/
      )?.groups ?? {};

    if (!owner) {
      console.error(`${prefix}issue / pr not found`);
      return;
    }
    /**
     *
     * @param {number} idx
     */
    // eslint-disable-next-line no-inner-declarations
    async function process(idx) {
      /**
       * @type {{body:string}}
       */
      let { body } = await fetch(
        `/api/v1/repos/${owner}/${repo}/issues/${id}`
      ).then((response) => response.json());
      const m = [...body.matchAll(cbRe)];

      if (!m[idx]) {
        console.log(`${prefix}not found: ${idx}`);
        return;
      }
      const line = m[idx];
      console.log(`${prefix}match:`, line[0]);
      body = body.replace(
        line[0],
        line[0].replace(/\[( |x)\]/, (_, val) => (val == ' ' ? '[x]' : '[ ]'))
      );

      //       console.log(`${prefix}body`, body);

      body = JSON.stringify({ body });

      const headers = {
        'content-type': 'application/json',
        'X-Csrf-Token': config.csrf,
      };
      const resp = await fetch(`/api/v1/repos/${owner}/${repo}/issues/${id}`, {
        method: 'PATCH',
        headers,
        body,
      });

      if (!resp.ok) {
        return;
      }

      location.reload();
    }

    console.log(`${prefix}${owner}/${repo}/${type}#${id}`);

    $(document).on(
      'click',
      '.timeline-item.comment.first .render-content .task-list-item > .checkbox',
      (e) => {
        if ($(e.target).closest('a,.vo-table-link').length > 0) return true;

        const idx = $(
          '.timeline-item.comment.first .render-content .task-list-item'
        ).index($(e.target).closest('.task-list-item'));
        console.log(`${prefix}click:`, idx);
        process(idx).catch((e) =>
          console.error(`${prefix}unexpected error`, e)
        );
        return undefined;
      }
    );
  } catch (e) {
    console.error(`${prefix}unexpected error`, e);
  }
})();
