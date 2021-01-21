// ==UserScript==
// @name         Gitea checkbox helper
// @author       Michael Kriese
// @namespace    https://github.com/viceice/userscripts
// @version      0.2
// @description  Allows clicking checkboxes on Gittea
// @copyright    2021 Michael Kriese
// @run-at       document-end
// @grant        none
//
// @updateURL   https://raw.githubusercontent.com/viceice/userscripts/master/gitea.cb.helper.js
// @installURL  https://raw.githubusercontent.com/viceice/userscripts/master/gitea.cb.helper.js
// @downloadURL https://raw.githubusercontent.com/viceice/userscripts/master/gitea.cb.helper.js
//
// @include      https://gitea.visualon.de/*
// ==/UserScript==


/* eslint-env browser,es2017,greasemonkey */
/* global $ */
(function() {
  'use strict';
  const prefix = "[RD] ";
  console.log(`${prefix}starting`);
  const cbRe = /^\s+- \[( |x)\] (.+)$/gm


  try {
    const { owner, repo, type, id } = location.pathname.match(/(?<owner>[^/]+)\/(?<repo>[^/]+)\/(?<type>pulls|issues)\/(?<id>\d+)/).groups;

    async function process(idx) {
      let { body } = await fetch(`/api/v1/repos/${owner}/${repo}/issues/${id}`).then(response => response.json());
      const m = [...body.matchAll(cbRe)];

      if(!m[idx]) {
        console.log(`${prefix}not found: ${idx}`);
        return;
      }
      const line = m[idx];
      console.log(`${prefix}match:`, line[0]);
      body = body.replace(line[0], line[0].replace(/\[( |x)\]/, (m,val) => val == ' ' ? '[x]' : '[ ]'));

//       console.log(`${prefix}body`, body);

      body = JSON.stringify({ body });

      const csrfToken = $('meta[name=_csrf]').attr('content');
      const headers = { 'content-type': 'application/json', 'X-Csrf-Token': csrfToken };
      const resp = await fetch(`/api/v1/repos/${owner}/${repo}/issues/${id}`, { method: 'PATCH', headers, body });

      if(!resp.ok) {
        return;
      }

      location.reload();
    }

    console.log(`${prefix}${owner}/${repo}/${type}#${id}`);

    $(document).on('click', '.timeline-item.comment.first .render-content .task-list-item > .checkbox', (e) => {
      if ($(e.target).closest('a,.vo-table-link').length > 0) return true;

      const idx = $('.timeline-item.comment.first .render-content .task-list-item').index($(e.target).closest('.task-list-item'));
      console.log(`${prefix}click:`, idx);
      process(idx).catch(e => console.error(`${prefix}unexpected error`, e));
    });
  } catch (e) {
    console.error(`${prefix}unexpected error`, e);
  }
})();
