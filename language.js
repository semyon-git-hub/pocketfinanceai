
(function () {
  "use strict";

  const base = "https://semyon-git-hub.github.io/pocketfinanceai/";
  const oldSite = "https://pavelevsemyon.wixsite.com/pocketfinanceai";

  const pages = {
    en: {
      home: "index.html",
      cases: "use-cases.html",
      updates: "updates.html",
      faq: "faq.html"
    },
    ru: {
      home: "ru.html",
      cases: "ru-cases.html",
      updates: "ru-updates.html",
      faq: "ru-faq.html"
    }
  };

  const key = "pocketfinance-language";
  const file = location.pathname.split("/").pop() || "index.html";
  const isRu = file.startsWith("ru");
  let lang = localStorage.getItem(key) || (isRu ? "ru" : "en");
  if (lang !== "ru" && lang !== "en") lang = isRu ? "ru" : "en";

  const pageKey = Object.keys(pages.en).find(
    k => pages.en[k] === file || pages.ru[k] === file
  ) || "home";

  function setup() {
    document.querySelectorAll("a[href]").forEach(link => {
      const href = link.getAttribute("href") || "";
      if (href.includes("pavelevsemyon.wixsite.com/pocketfinanceai")) {
        const url = new URL(href, location.href);
        const path = url.pathname.replace(
          "/pocketfinanceai/",
          ""
        ).replace(/^\/+/, "");

        const known = {
          "": pages[lang].home,
          "home": pages[lang].home,
          "use-cases": pages[lang].cases,
          "updates": pages[lang].updates,
          "faq": pages[lang].faq,
          "ru": pages.ru.home,
          "ru-cases": pages.ru.cases,
          "ru-updates": pages.ru.updates,
          "ru-faq": pages.ru.faq
        };

        const slug = path.replace(/\.html$/, "").replace(/\/$/, "");
        link.href = base + (known[slug] || pages[lang].home);
      }
    });

    let box = document.getElementById("pocketfinance-language-switch");
    if (box) box.remove();

    box = document.createElement("div");
    box.id = "pocketfinance-language-switch";
    box.style.cssText =
      "position:fixed;top:12px;right:16px;z-index:2147483647;" +
      "padding:6px;background:#fff;border:1px solid #ddd;" +
      "border-radius:10px;box-shadow:0 2px 8px #0002;" +
      "font:600 14px Arial,sans-serif;";

    ["EN", "RU"].forEach(name => {
      const code = name.toLowerCase();
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = name;
      btn.style.cssText =
        "border:0;border-radius:6px;padding:8px 12px;" +
        "margin:0 2px;cursor:pointer;font-weight:600;" +
        (lang === code
          ? "background:#e8edff;color:#243f9b;"
          : "background:#fff;color:#444;");

      btn.onclick = () => {
        localStorage.setItem(key, code);
        location.href = base + pages[code][pageKey];
      };

      box.appendChild(btn);
    });

    document.body.appendChild(box);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
