// ==UserScript==
// @name         Accoding
// @namespace    https://github.com/BUAASubnet
// @version      2024-09-11
// @description  BUAA Accoding Add Copy Button
// @author       Li Haotong
// @match        https://accoding.buaa.edu.cn/contest-ng/index.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=buaa.edu.cn
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  setInterval(() => {
    for (let pre of document.querySelectorAll("h2+pre")) {
      let h2 = pre.previousElementSibling;
      if (h2.querySelector("button")) continue;
      let button = document.createElement("button");
      button.textContent = "复制";
      button.className = "btn btn-success";
      button.onclick = async (e) => {
        await navigator.clipboard.writeText(pre.innerText);
      };
      h2.appendChild(button);
    }
  }, 200);
})();
