// ==UserScript==
// @name         BUAA JUDGE HELPER
// @namespace    https://github.com/BUAASubnet
// @version      2025-04-24
// @description  A helper script for BUAA judge exam.
// @author       Li Haotong
// @match        https://judge.buaa.edu.cn/exam/index.jsp
// @match        https://judge.buaa.edu.cn/exam/index.jsp*
// @match        https://judge.buaa.edu.cn/assignment/index.jsp
// @match        https://judge.buaa.edu.cn/assignment/index.jsp*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=buaa.edu.cn
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  setTimeout(() => {
    for (const e of $("tr")) {
      const th = $(e).children("th");
      if (th.length) {
        th.css("cursor", "pointer");
        th.click(() => {
          navigator.clipboard.writeText(
            convertHtmlToText($(e).find("form").html())
          );
        });
      }
    }
  }, 1000);

  function convertHtmlToText(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      html
        .replaceAll("\n", "")
        .replaceAll("  ", "")
        .replaceAll("&nbsp;", " ")
        .replaceAll("<p>", "")
        .replaceAll("</p>", "\n"),
      "text/html"
    );
    doc.querySelectorAll('input[type="text"]').forEach((input) => {
      input.outerHTML = "____________";
    });
    doc.querySelectorAll("br").forEach((br) => {
      br.outerHTML = "\n";
    });
    const result = doc.body.innerText;
    console.log(result);
    console.log(result.trim());
    return result.trim();
  }
})();
