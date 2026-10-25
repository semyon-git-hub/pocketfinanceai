
(function () {
  "use strict";

  const base = "https://semyon-git-hub.github.io/pocketfinanceai/";
  const key = "pocketfinance-language";

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

  const file = location.pathname.split("/").pop() || "index.html";
  const isRu = file.startsWith("ru");

  let lang = localStorage.getItem(key) || (isRu ? "ru" : "en");

  if (lang !== "ru" && lang !== "en") {
    lang = isRu ? "ru" : "en";
  }

  const pageKey =
    Object.keys(pages.en).find(
      k => pages.en[k] === file || pages.ru[k] === file
    ) || "home";

  function getTarget(path, text) {
    const slug = path
      .replace(/\/+$/, "")
      .split("/")
      .pop()
      .replace(/\.html$/i, "")
      .toLowerCase();

    if (["use-cases", "use-cases-1", "cases", "ru-cases"].includes(slug)) {
      return "cases";
    }

    if (["updates", "updates-1", "ru-updates"].includes(slug)) {
      return "updates";
    }

    if (["faq", "faq-1", "ru-faq"].includes(slug)) {
      return "faq";
    }

    if (["", "pocketfinanceai", "home", "home-1", "index", "ru"].includes(slug)) {
      return "home";
    }

    if (text.includes("case") || text.includes("кейс")) return "cases";
    if (text.includes("update") || text.includes("обновлен")) return "updates";
    if (text.includes("faq") || text.includes("вопрос")) return "faq";
    if (text.includes("home") || text.includes("домой") || text.includes("главная")) return "home";

    return null;
  }

  function setup() {
    document.querySelectorAll("a[href]").forEach(link => {
      const href = link.getAttribute("href") || "";
      const text = link.textContent.trim().toLowerCase();

      let url;

      try {
        url = new URL(href, location.href);
      } catch {
        return;
      }

      const isOldWix =
        url.hostname.endsWith("wixsite.com") &&
        url.hostname.includes("pavelevsemyon");

      if (isOldWix) {
        const target = getTarget(url.pathname, text);

        if (target) {
          link.href = base + pages[lang][target];
        }
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
