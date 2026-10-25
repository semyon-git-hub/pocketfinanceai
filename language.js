
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
  // Сначала определяем назначение по тексту кнопки
  if (text.includes("use cases") || text.includes("use-cases") ||
      text.includes("case") || text.includes("кейс")) {
    return "cases";
  }

  if (text.includes("updates") || text.includes("обновлен")) {
    return "updates";
  }

  if (text.includes("faq") || text.includes("вопрос")) {
    return "faq";
  }

  if (text.includes("home") || text.includes("главная") ||
      text.includes("домой")) {
    return "home";
  }

  // Если текст не распознан, проверяем адрес
  const slug = path
    .replace(/\/+$/, "")
    .split("/")
    .pop()
    .replace(/\.html$/i, "")
    .toLowerCase();

  if (["use-cases", "use-cases-1", "cases", "ru-cases"].includes(slug)) return "cases";
  if (["updates", "updates-1", "ru-updates"].includes(slug)) return "updates";
  if (["faq", "faq-1", "ru-faq"].includes(slug)) return "faq";
  if (["", "pocketfinanceai", "home", "home-1", "index", "ru"].includes(slug)) return "home";

  return null;
}
