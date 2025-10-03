const API_URL = "http://localhost:3000"; // troque pelo link da API online

// LOGIN
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      try {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha })
        });

        if (!res.ok) throw new Error("Usuário ou senha inválidos");
        const data = await res.json();

        localStorage.setItem("token", data.token);
        window.location.href = "menu.html";
      } catch (err) {
        alert(err.message);
      }
    });
  }

  // Verifica token nas páginas restritas
  const token = localStorage.getItem("token");
  if (!token && window.location.pathname.includes("restrito.html")) {
    alert("Sessão expirada! Faça login novamente.");
    window.location.href = "index.html";
  }
});

// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
