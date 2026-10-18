
(function () {
  "use strict";

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

  const labels = {
    home: ["home", "дом"],
    cases: ["use cases", "кейсы"],
    updates: ["updates", "обновления"],
    faq: ["faq", "чаво"]
  };

  const key = "pocketfinance-language";
  const file = location.pathname.split("/").pop() || "index.html";
  const isRu = file.startsWith("ru");
  let lang = localStorage.getItem(key) || (isRu ? "ru" : "en");

  if (lang !== "en" && lang !== "ru") {
    lang = "en";
  }

  const pageKey = Object.keys(pages.en).find(
    k => pages.en[k] === file || pages.ru[k] === file
  ) || "home";

  if (localStorage.getItem(key) &&
      pages[lang][pageKey] !== file) {
    location.replace(pages[lang][pageKey]);
    return;
  }

  function setup() {
    document.querySelectorAll("a").forEach(link => {
      const text = link.textContent.trim().toLowerCase();

      for (const [k, names] of Object.entries(labels)) {
        if (names.includes(text)) {
          link.href = pages[lang][k];
          break;
        }
      }
    });

    const old = document.getElementById("pocketfinance-language-switch");
    if (old) old.remove();

    const box = document.createElement("div");
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
      btn.setAttribute("aria-label", "Switch language to " + name);
      btn.style.cssText =
        "border:0;border-radius:6px;padding:8px 12px;" +
        "margin:0 2px;cursor:pointer;font-weight:600;" +
        (lang === code
          ? "background:#e8edff;color:#243f9b;"
          : "background:#fff;color:#444;");

      btn.addEventListener("click", function () {
        localStorage.setItem(key, code);
        location.href = pages[code][pageKey];
      });

      box.appendChild(btn);
    });

    document.body.appendChild(box);

    const walker = document.createTreeWalker(
      document.body, NodeFilter.SHOW_TEXT
    );

    const datePattern =
      /\b(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\s+\d{4}\s+\d{2}:\d{2}:\d{2}\s+GMT[+-]\d{4}\s+\([^)]*\)/;

    const remove = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (datePattern.test(node.nodeValue)) {
        node.nodeValue = node.nodeValue.replace(datePattern, "").trim();
        if (!node.nodeValue && node.parentElement) {
          remove.push(node.parentElement);
        }
      }
    }

    remove.forEach(el => {
      if (el.tagName === "P" || el.tagName === "DIV" ||
          el.tagName === "SPAN") {
        el.remove();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
