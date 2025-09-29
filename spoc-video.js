// ==UserScript==
// @name         SPOC-VIDEO
// @namespace    https://github.com/BUAASubnet
// @version      2025-05-24
// @description  BUAA SPOC Video Speed Hack
// @author       Li Haotong
// @match        https://spoc.buaa.edu.cn/spocnew/mycourse/coursecenter/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=buaa.edu.cn
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  setInterval(() => {
    let video = document.querySelector("video");
    if (video) {
      video.playbackRate = 3.5;
      video.pause = () => {};
    }
  }, 200);
})();
