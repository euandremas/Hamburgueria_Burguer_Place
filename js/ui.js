const UI = (() => {
  function toast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.remove("is-hidden");
    setTimeout(() => el.classList.add("is-hidden"), 2200);
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = () => reject(new Error("Falha ao ler arquivo"));
      r.readAsDataURL(file);
    });
  }

  return { toast, escapeHtml, readFileAsDataURL };
})();
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".togglePassword");
  if (!btn) return;

  const input = document.getElementById(btn.dataset.target);
  if (!input) return;

  const show = input.type === "password";

  input.type = show ? "text" : "password";
  btn.textContent = show ? "🙈" : "👁️";
});
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".togglePassword");
    if (!btn) return;

    const input = document.getElementById(btn.dataset.target);
    if (!input) return;

    const mostrando = input.type === "password";

    input.type = mostrando ? "text" : "password";

    btn.innerHTML = mostrando
        ? `
        <svg class="eyeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C5 19 1 12 1 12a21.76 21.76 0 0 1 5.06-5.94"/>
            <path d="M9.9 4.24A10.92 10.92 0 0 1 12 5c7 0 11 7 11 7a21.77 21.77 0 0 1-3.17 4.36"/>
            <path d="M1 1l22 22"/>
        </svg>`
        : `
        <svg class="eyeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
            <circle cx="12" cy="12" r="3"/>
        </svg>`;
});