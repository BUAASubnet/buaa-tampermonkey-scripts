// ==UserScript==
// @name         MSA-Download-Video
// @namespace    https://github.com/BUAASubnet
// @version      2025-02-25
// @description  Download course video from BUAA MSA Classroom
// @author       Li Haotong
// @match        https://classroom.msa.buaa.edu.cn/coursedetail?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=buaa.edu.cn
// @grant        GM_openInTab
// @require      https://cdn.jsdelivr.net/npm/pptxgenjs@3.9.0/dist/pptxgen.bundle.js
// ==/UserScript==

(async function () {
  "use strict";
  const course_id = new URLSearchParams(window.location.search).get(
    "course_id"
  );
  const token = (() => {
    let token = decodeURIComponent(document.cookie).match(
      '"_token";.+"[a-zA-Z0-9-_.]+'
    )[0];
    token = token.substring(token.lastIndexOf('"') + 1);
    return token;
  })();
  const callApi = async (url) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  };
  const getUrl = async (u) => {
    const toMd5Hex = (text) => {
      var hexcase = 0;
      var chrsz = 8;
      const core_md5 = (x, len) => {
        x[len >> 5] |= 0x80 << len % 32;
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
          var olda = a;
          var oldb = b;
          var oldc = c;
          var oldd = d;
          a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
          d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
          b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
          a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
          a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
          a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
          d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
          c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
          a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
          d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
          a = safe_add(a, olda);
          b = safe_add(b, oldb);
          c = safe_add(c, oldc);
          d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
      };
      const md5_cmn = (q, a, b, x, s, t) =>
        safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
      const md5_ff = (a, b, c, d, x, s, t) =>
        md5_cmn((b & c) | (~b & d), a, b, x, s, t);
      const md5_gg = (a, b, c, d, x, s, t) =>
        md5_cmn((b & d) | (c & ~d), a, b, x, s, t);
      const md5_hh = (a, b, c, d, x, s, t) => md5_cmn(b ^ c ^ d, a, b, x, s, t);
      const md5_ii = (a, b, c, d, x, s, t) =>
        md5_cmn(c ^ (b | ~d), a, b, x, s, t);
      const safe_add = (x, y) => {
        var lsw = (x & 0xffff) + (y & 0xffff);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
      };
      const bit_rol = (num, cnt) => (num << cnt) | (num >>> (32 - cnt));
      const str2binl = (str) => {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz)
          bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << i % 32;
        return bin;
      };
      const binl2hex = (binarray) => {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
          str +=
            hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) +
            hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
        }
        return str;
      };
      return binl2hex(core_md5(str2binl(text), text.length * chrsz));
    };
    const userInfo = await callApi(
      "https://education.msa.buaa.edu.cn/eduuserapi/v1/infosimple"
    );
    const m = () => {
      return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
    };
    const v = () => {
      return (
        m() + m() + "-" + m() + "-" + m() + "-" + m() + "-" + m() + m() + m()
      );
    };
    const s = userInfo.params.phone;
    const h = s.split("").reverse().join("");
    const e = `${u}?clientUUID=${v()}`;
    const f = Math.floor(new Date().getTime() / 1e3);
    const d = new URL(e).pathname;
    const o = userInfo.params.tenant_id;
    const r = userInfo.params.id;
    const a = (e) => toMd5Hex(e);
    const url = `${e}&t=${r}-${f}-${a(d + r + o + h + f)}`;
    return url;
  };
  const getVideo = async (sub_id, callback) => {
    const video_data = (
      await callApi(
        `https://classroom.msa.buaa.edu.cn/courseapi/v3/portal-home-setting/get-sub-info?course_id=${course_id}&sub_id=${sub_id}`
      )
    ).data;
    for (const [k, v] of Object.entries(video_data.video_list)) {
      const video_url = await getUrl(v.preview_url);
      console.log(video_url);
      callback(video_url);
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 500, "");
      });
    }
  };
  const course_data = (
    await callApi(
      `https://yjapi.msa.buaa.edu.cn/courseapi/v3/multi-search/get-course-detail?course_id=${course_id}`
    )
  ).data;
  const getPPT = async (span, sub_id) => {
    const data = (
      await callApi(
        `https://classroom.msa.buaa.edu.cn/courseapi/v3/portal-home-setting/get-sub-info?course_id=${course_id}&sub_id=${sub_id}`
      )
    ).data;
    const title = `${data.course_title}${data.sub_title}`;
    const imgs = [];
    (
      await callApi(
        `https://classroom.msa.buaa.edu.cn/pptnote/v1/schedule/search-ppt?course_id=${course_id}&sub_id=${sub_id}&resource_guid=${data.resource_guid}`
      )
    ).list.forEach((li) => imgs.push(JSON.parse(li.content).pptimgurl));
    const ppt = new PptxGenJS();
    ppt.author = data.lecturer_name;
    ppt.title = title;
    ppt.subject = data.course_title;
    ppt.company = "BUAA";
    ppt.layout = "LAYOUT_16x9";
    imgs.forEach((img) => {
      const slide = ppt.addSlide();
      slide.background = { path: img };
    });
    span.innerText = "下载中";
    span.setAttribute("disabled", "disabled");
    await ppt.writeFile({ fileName: `${title}.pptx` });
    console.log("complete.");
    span.innerText = "PPT";
    span.removeAttribute("disabled");
  };
  const run = () => {
    const courseName = document.querySelector("div.info-title > p").innerText;
    let index = 0;
    for (const [_, yearData] of Object.entries(course_data.sub_list)) {
      for (const [_, monthData] of Object.entries(yearData)) {
        for (const [_, dayData] of Object.entries(monthData)) {
          for (const [_, data] of Object.entries(dayData)) {
            const title = data.sub_title;
            const sub_id = data.id;
            const teacher = data.lecturer_name;
            const name = `${courseName}${title}-${teacher}`;
            const element = elements[index];
            const downloadSpan = document.createElement("span");
            downloadSpan.innerText = "下载";
            downloadSpan.className = "colorStatus download-video";
            downloadSpan.setAttribute("data-v-0511e0d2", null);
            downloadSpan.onclick = async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await getVideo(sub_id, (url) => {
                const a = document.createElement("a");
                a.href = url;
                if (url.includes("ppt")) a.download = name + "-屏幕";
                else if (url.includes("tea")) a.download = name + "-黑板";
                else a.download = name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              });
            };
            const previewSpan = document.createElement("span");
            previewSpan.innerText = "预览";
            previewSpan.className = "colorStatus";
            previewSpan.setAttribute("data-v-0511e0d2", null);
            previewSpan.style = "margin-left: 10px; cursor: pointer;";
            previewSpan.onclick = async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await getVideo(sub_id, (url) => {
                const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>${name}</title><link rel="stylesheet" href="https://cdn.staticfile.net/twitter-bootstrap/4.3.1/css/bootstrap.min.css"></head><body><div class="container-fluid"><div class="embed-responsive embed-responsive-16by9"><video width="1920" height="1080" controls="controls"><source src="${url}" type="video/mp4"></video></div></div></body><script src="https://cdn.staticfile.net/jquery/3.2.1/jquery.min.js"></script><script src="https://cdn.staticfile.net/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script></html>`;
                const blob = new Blob([html], { type: "text/html" });
                const videoUrl = URL.createObjectURL(blob);
                GM_openInTab(videoUrl, {
                  active: true,
                  insert: true,
                  setParent: true,
                });
              });
            };
            const pptSpan = document.createElement("span");
            pptSpan.innerText = "PPT";
            pptSpan.className = "colorStatus download-ppt";
            pptSpan.setAttribute("data-v-0511e0d2", null);
            pptSpan.style = "margin-left: 10px; cursor: pointer;";
            pptSpan.onclick = async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await getPPT(pptSpan, sub_id);
            };
            if (data.status !== "6") {
              downloadSpan.setAttribute("disabled", "disabled");
              downloadSpan.classList.remove("colorStatus");
              previewSpan.setAttribute("disabled", "disabled");
              previewSpan.classList.remove("colorStatus");
              pptSpan.setAttribute("disabled", "disabled");
              pptSpan.classList.remove("colorStatus");
            }
            element.appendChild(downloadSpan);
            element.appendChild(previewSpan);
            element.appendChild(pptSpan);
            index++;
          }
        }
      }
    }
    const allVideoSpan = document.createElement("span");
    allVideoSpan.innerText = "下载全部";
    allVideoSpan.className = "tips";
    allVideoSpan.style = "float: right; cursor: pointer;";
    allVideoSpan.setAttribute("data-v-0511e0d2", null);
    allVideoSpan.onclick = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const elements = Array.from(document.querySelectorAll(".download-video"));
      for (const element of elements) {
        element.click();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
    const allPPTSpan = document.createElement("span");
    allPPTSpan.innerText = "下载全部PPT";
    allPPTSpan.className = "tips";
    allPPTSpan.style = "float: right; cursor: pointer;margin-left: 10px;";
    allPPTSpan.setAttribute("data-v-0511e0d2", null);
    allPPTSpan.onclick = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const elements = Array.from(document.querySelectorAll(".download-ppt"));
      for (const element of elements) {
        element.click();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
    document.querySelector("div.content-tips").appendChild(allVideoSpan);
    document.querySelector("div.content-tips").appendChild(allPPTSpan);
  };
  let elements = [];
  const interval = setInterval(() => {
    elements = document.querySelectorAll("div.content-inner-one > p");
    if (elements.length > 0) {
      clearInterval(interval);
      run();
    }
  }, 1000);
})();
