// ==UserScript==
// @name         We Learn
// @namespace    https://github.com/BUAASubnet
// @version      2025-03-09
// @description  We Learn Patch
// @author       Li Haotong
// @match        https://centercourseware.sflep.com/*/*/*.html?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sflep.com
// @grant        none
// ==/UserScript==

(function () {
  setInterval(() => {
    if ($(".start_reading").parent().css("display") !== "none")
      $(".start_reading").click();
  }, 1000);
  const run = () => {
    $("input[data-itemtype=input][data-solution]").each((_, e) => {
      $(e).attr("value", $(e).attr("data-solution"));
    });
    $("li[data-solution]").click();
    document
      .querySelectorAll("textarea")
      ?.forEach(
        (e) =>
          (e.value = document
            .querySelector(".white_area .gray_frame")
            .innerText.trim())
      );
    const video = document.querySelector("video");
    if (video) {
      video.play();
      video.pause = () => {};
      video.playbackRate = 16;
    } else {
      setTimeout(() => {
        $("a.cmd.cmd_submit[data-controltype=submit]").click();
        setTimeout(() => {
          $(
            "div[type=dialog] > div.layui-layer-btn > a.layui-layer-btn0"
          ).click();
        }, 2000);
      }, 500);
    }
  };
  $("div.divTopBar").css("cursor", "pointer").click(run);
  setInterval(() => {
    setTimeout(run, Math.ceil(Math.random() * 30000));
  }, 300 * 1000);
  setInterval(() => {
    setTimeout(() => {
      document.querySelector('a[href="javascript:NextSCO();"]').click();
    }, 35000);
  }, 300 * 1000);
})();
