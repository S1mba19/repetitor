(function () {
  // ===== Контакты: впишите свои — кнопка появится только у заполненных =====
  const CONTACTS = {
    telegram: "",   // ник без @, например "anna_math"
    whatsapp: "",   // номер цифрами с кодом страны, например "79001234567"
    phone: "",      // как показать на кнопке, например "+7 900 123-45-67"
    avito: "https://www.avito.ru/sankt-peterburg/predlozheniya_uslug/repetitor_po_matematike_5-11_klass_8403104016",
    profi: "https://profi.ru/profile/BudanovaAP2",
  };

  const buttons = [];
  if (CONTACTS.telegram) buttons.push(["Написать в Telegram", "https://t.me/" + CONTACTS.telegram, "btn--lime"]);
  if (CONTACTS.whatsapp) buttons.push(["Написать в WhatsApp", "https://wa.me/" + CONTACTS.whatsapp, "btn--ghost"]);
  if (CONTACTS.phone) buttons.push(["Позвонить: " + CONTACTS.phone, "tel:" + CONTACTS.phone.replace(/[^\d+]/g, ""), "btn--ghost"]);
  if (CONTACTS.avito) buttons.push(["Написать на Авито", CONTACTS.avito, buttons.length ? "btn--ghost" : "btn--lime"]);
  if (CONTACTS.profi) buttons.push(["Профиль и отзывы на Профи.ру", CONTACTS.profi, "btn--ghost"]);
  const box = document.getElementById("contacts");
  buttons.forEach(function (b) {
    const a = document.createElement("a");
    a.className = "btn " + b[2];
    a.textContent = b[0];
    a.href = b[1];
    if (b[1].indexOf("http") === 0) { a.target = "_blank"; a.rel = "noopener"; }
    box.appendChild(a);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  // ===== Меню на телефоне =====
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  function closeMenu() {
    nav.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  }
  burger.addEventListener("click", function () {
    const open = nav.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });

  // ===== Вкладки платформы =====
  const img = document.getElementById("platform-img");
  const caption = document.getElementById("platform-text");
  const tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      if (tab.classList.contains("is-active")) return;
      tabs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      img.classList.add("is-swapping");
      const next = new Image();
      next.onload = function () {
        img.src = tab.dataset.img;
        img.width = tab.dataset.w;
        img.height = tab.dataset.h;
        img.alt = "Скриншот платформы: " + tab.querySelector("b").textContent.toLowerCase();
        caption.textContent = tab.dataset.text;
        img.classList.remove("is-swapping");
      };
      next.src = tab.dataset.img;
    });
  });

  // ===== Появление блоков при прокрутке =====
  const items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  // ===== Кнопка внизу экрана на телефоне прячется у блока контактов =====
  const sticky = document.querySelector(".sticky-cta");
  const contact = document.getElementById("contact");
  if (sticky && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      sticky.classList.toggle("is-hidden", entries[0].isIntersecting);
    }, { threshold: 0.15 }).observe(contact);
  }
})();
