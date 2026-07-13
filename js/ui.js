const UI = (() => {
  function toast(message) {
    const el = document.getElementById("toast");
    if (!el) return;

    el.textContent = message;
    el.classList.remove("is-hidden");

    setTimeout(() => {
      el.classList.add("is-hidden");
    }, 2200);
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
      const reader = new FileReader();

      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Falha ao ler arquivo"));
      reader.readAsDataURL(file);
    });
  }

  function showLoading(message = "Preparando...") {
    const loading = document.getElementById("globalLoading");
    const text = document.getElementById("globalLoadingText");

    if (!loading) return;
    if (text) text.textContent = message;

    loading.classList.remove("is-hidden");
  }

  function hideLoading() {
    const loading = document.getElementById("globalLoading");
    if (!loading) return;

    loading.classList.add("is-hidden");
  }

  function highlightField(element) {
    if (!element) return;

    element.classList.add("is-invalid");
    element.focus();
  }

  function clearHighlight(element) {
    if (!element) return;

    element.classList.remove("is-invalid");
  }

  function confirm({
    title = "Confirmação",
    message = "Deseja continuar?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    danger = true,
  } = {}) {
    const modal = document.getElementById("confirmModal");
    const titleElement = document.getElementById("confirmTitle");
    const messageElement = document.getElementById("confirmMessage");
    const confirmButton = document.getElementById("confirmOk");
    const cancelButton = document.getElementById("confirmCancel");

    if (!modal || !titleElement || !messageElement || !confirmButton || !cancelButton) {
      return Promise.resolve(window.confirm(message));
    }

    titleElement.textContent = title;
    messageElement.textContent = message;
    confirmButton.textContent = confirmText;
    cancelButton.textContent = cancelText;

    confirmButton.classList.toggle("btnDanger", danger);
    modal.classList.remove("is-hidden");

    return new Promise((resolve) => {
      function closeModal(result) {
        modal.classList.add("is-hidden");

        confirmButton.removeEventListener("click", handleConfirm);
        cancelButton.removeEventListener("click", handleCancel);
        modal.removeEventListener("click", handleOverlayClick);
        document.removeEventListener("keydown", handleKeydown);

        resolve(result);
      }

      function handleConfirm() {
        closeModal(true);
      }

      function handleCancel() {
        closeModal(false);
      }

      function handleOverlayClick(e) {
        if (e.target === modal) {
          closeModal(false);
        }
      }

      function handleKeydown(e) {
        if (e.key === "Escape") {
          closeModal(false);
        }

        if (e.key === "Enter") {
          closeModal(true);
        }
      }

      confirmButton.addEventListener("click", handleConfirm);
      cancelButton.addEventListener("click", handleCancel);
      modal.addEventListener("click", handleOverlayClick);
      document.addEventListener("keydown", handleKeydown);

      confirmButton.focus();
    });
  }

  return {
    toast,
    escapeHtml,
    readFileAsDataURL,
    showLoading,
    hideLoading,
    highlightField,
    clearHighlight,
    confirm,
  };
})();

document.addEventListener("input", (e) => {
  if (e.target.classList.contains("is-invalid")) {
    UI.clearHighlight(e.target);
  }
});

document.addEventListener("change", (e) => {
  if (e.target.classList.contains("is-invalid")) {
    UI.clearHighlight(e.target);
  }
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".togglePassword");
  if (!btn) return;

  const input = document.getElementById(btn.dataset.target);
  if (!input) return;

  const isHidden = input.type === "password";

  input.type = isHidden ? "text" : "password";
  btn.title = isHidden ? "Ocultar senha" : "Mostrar senha";
  btn.setAttribute("aria-label", btn.title);

  btn.innerHTML = isHidden
    ? `
      <svg class="eyeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C5 19 1 12 1 12a21.76 21.76 0 0 1 5.06-5.94"></path>
        <path d="M9.9 4.24A10.92 10.92 0 0 1 12 5c7 0 11 7 11 7a21.77 21.77 0 0 1-3.17 4.36"></path>
        <path d="M1 1l22 22"></path>
      </svg>
    `
    : `
      <svg class="eyeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    `;
});