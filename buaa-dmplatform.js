// ==UserScript==
// @name         BUAA DMPlatform
// @namespace    https://github.com/BUAASubnet
// @version      2025-04-09
// @description  Find keys in BUAA DMPlatform
// @author       Li Haotong
// @match        https://dmplatform.buaa.edu.cn/work/detail/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=buaa.edu.cn
// @grant        none
// ==/UserScript==

(async function () {
  "use strict";
  const workId = window.location.href.match(/work\/detail\/(\d+)/)[1];
  const token = document.cookie.match(/token=([^;]+)/)[1];
  const detail = await fetch(
    `https://dmplatform.buaa.edu.cn/dmapi/work/detail/?id=${workId}`,
    {
      headers: {
        cookie: document.cookie,
        token: token,
      },
    }
  ).then((res) => res.json());
  const qlist = detail.data.qList;
  let qid = 0;
  setTimeout(() => {
    for (const qbox of document.querySelectorAll("div.q-box")) {
      if (
        qlist[qid].steps == undefined ||
        qlist[qid].steps === null ||
        qlist[qid].steps.length === 0
      ) {
        qid++;
        continue;
      }
      let steps = "";
      qlist[qid].steps.forEach((s, i) => {
        steps += `<span>(${s.point}分)</span>${s.answer}<br>`;
      });
      const div = document.createElement("div");
      div.innerHTML = steps
        .replaceAll('<script type="math/tex">', "")
        .replaceAll('<script type="math/tex; mode=display">', "")
        .replaceAll("</script>", "");
      div.style.display = "none";
      qbox.insertBefore(div, qbox.querySelector("div.desc"));
      qbox.querySelector("span.index").style.cursor = "pointer";
      qbox.querySelector("span.index").addEventListener("click", () => {
        div.style.display = div.style.display === "none" ? "block" : "none";
      });
      qid++;
    }
  }, 5000);
})();
