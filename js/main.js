/* Creative Code — comportamento da página (menu, animações, WhatsApp) */
/* Depende de js/config.js (constante WHATSAPP) */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const wpp = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

$("#ano").textContent = new Date().getFullYear();

// cabeçalho
const header = $("header");
const onScroll = () => header.classList.toggle("scrolled", scrollY > 20);
onScroll(); addEventListener("scroll", onScroll, { passive: true });

// menu mobile
const burger = $(".burger");
const setMenu = (open) => {
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
};
burger.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
$$(".menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));

// animações ao rolar
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: .12 });
$$(".reveal").forEach(el => io.observe(el));

// botões de WhatsApp
$$("[data-wpp]").forEach(a => {
  a.addEventListener("click", (e) => {
    if (a.classList.contains("wpp") || a.hasAttribute("data-wpp")) {
      e.preventDefault();
      window.open(wpp("Olá! Vim pelo site da Creative Code e gostaria de saber mais."), "_blank", "noopener");
    }
  });
});

// formulário -> WhatsApp
$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target, nome = f.nome.value.trim();
  if (!nome) { f.nome.focus(); f.nome.style.borderColor = "var(--argila)"; return; }
  const msg = `Olá! Meu nome é ${nome}.\nTenho interesse em: ${f.servico.value}.` +
              (f.msg.value.trim() ? `\n\n${f.msg.value.trim()}` : "");
  window.open(wpp(msg), "_blank", "noopener");
});
