
(function () {
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

  const storageKey = "pocketfinance-language";
  const currentFile = location.pathname.split("/").pop() || "index.html";
  const isRussianPage = currentFile.startsWith("ru");
  const saved = localStorage.getItem(storageKey);
  const lang = saved || (isRussianPage ? "ru" : "en");

  const pageKey = Object.keys(pages.en).find(key =>
    pages.en[key] === currentFile || pages.ru[key] === currentFile
  ) || "home";

  if (saved && pages[saved][pageKey] !== currentFile) {
    location.replace(pages[saved][pageKey]);
    return;
  }

  document.querySelectorAll("a").forEach(link => {
    const text = link.textContent.trim().toLowerCase();
    for (const [key, names] of Object.entries(labels)) {
      if (names.includes(text)) {
        link.href = pages[lang][key];
        break;
      }
    }
  });

  const switcher = document.createElement("div");
  switcher.style.cssText =
    "position:fixed;top:12px;right:16px;z-index:999999;" +
    "padding:8px 12px;background:white;border:1px solid #ddd;" +
    "border-radius:12px;box-shadow:0 2px 8px #0002;font:600 14px Arial";

  ["EN", "RU"].forEach((name, index) => {
    const code = index === 0 ? "en" : "ru";
    const button = document.createElement("button");
    button.textContent = name;
    button.style.cssText =
      "border:0;border-radius:6px;padding:7px 10px;margin:0 2px;" +
      "cursor:pointer;font-weight:600;" +
      (lang === code
        ? "background:#e8edff;color:#243f9b;"
        : "background:white;color:#444;");

    button.onclick = () => {
      localStorage.setItem(storageKey, code);
      location.href = pages[code][pageKey];
    };

    switcher.appendChild(button);
  });

  document.body.appendChild(switcher);
})();
