const Auth = (() => {
  const AUTH_KEY = "auth";
  const TOKEN_KEY = "token";
  const USER_KEY = "user";

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === "true" && !!getToken();
  }

  async function login(username, password) {
    const { data } = await API.login({ username, password });

    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));

    return true;
  }

  function logout() {
    localStorage.clear();
    window.location.replace("index.html");
  }

  function requireAuth() {
    if (!isLoggedIn()) logout();
  }

  function redirectIfLoggedIn() {
    if (isLoggedIn()) window.location.replace("admin.html");
  }

  document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username")?.value.trim();
    const password = document.getElementById("password")?.value;

    if (!username || !password) {
      UI.toast("Informe usuário e senha.");
      return;
    }

    const btn = form.querySelector("button[type='submit']");

    if (btn) {
      btn.disabled = true;
      btn.dataset.text = btn.textContent;
      btn.textContent = "Entrando...";
    }

    UI.showLoading("Entrando no sistema...");

    try {
      await login(username, password);

      UI.toast("Login realizado com sucesso!");

      setTimeout(() => {
        window.location.replace("admin.html");
      }, 800);
    } catch (err) {
      UI.toast(err.message || "Falha ao realizar login.");
    } finally {
      UI.hideLoading();

      if (btn) {
        btn.disabled = false;
        btn.textContent = btn.dataset.text || "Entrar";
      }
    }
    });
});

return {
  isLoggedIn,
  login,
  logout,
  requireAuth,
  redirectIfLoggedIn,
  getToken
};
})();