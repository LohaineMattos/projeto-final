const API_URL = "https://api-gelco.vercel.app";

// ==================== INICIALIZAÇÃO ====================
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Sessão expirada! Faça login novamente.");
    window.location.href = "index.html";
    return;
  }

  if (window.location.pathname.includes("lotes.html")) {
    inicializarLotes();
  }

  if (window.location.pathname.includes("unitarios.html")) {
    inicializarUnitarios();
  }
});

// ====================== LOTES ======================
function inicializarLotes() {
  const addBtn = document.getElementById("addLote");
  const modal = document.getElementById("loteModal");
  const closeBtn = modal.querySelector(".close");

  addBtn.addEventListener("click", () => {
    document.getElementById("loteForm").reset();
    document.getElementById("loteId").value = "";
    document.getElementById("modalTitle").textContent = "Adicionar Lote";
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  document.getElementById("loteForm").addEventListener("submit", salvarLote);
  carregarLotes();
}

async function carregarLotes() {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/lotes`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Erro ao buscar lotes: ${res.status}`);
    const lotes = await res.json();
    const tbody = document.querySelector("#lotesTable tbody");
    tbody.innerHTML = "";
    lotes.forEach(renderLote);
  } catch (err) {
    console.error("Erro carregarLotes:", err);
    alert(err.message);
  }
}

function renderLote(lote) {
  const tbody = document.querySelector("#lotesTable tbody");
  const row = document.createElement("tr");
  row.id = `lote-${lote.id}`;
  row.innerHTML = `
    <td>${new Date(lote.data).toLocaleDateString('pt-BR')}</td>
    <td>${lote.horario ?? "-"}</td>
    <td>${lote.turno ?? "-"}</td>
    <td>${lote.peso_vazio ?? 0}</td>
    <td>${lote.peso_cheio ?? 0}</td>
    <td>${lote.etiqueta ?? "-"}</td>
    <td>${lote.operador ?? "-"}</td>
    <td>
      <button onclick="editarLote(${lote.id})" class="action-btn">Editar</button>
      <button onclick="excluirLote(${lote.id})" class="action-btn">Excluir</button>
    </td>
  `;
  tbody.appendChild(row);
}


async function salvarLote(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const id = document.getElementById("loteId").value;

  const data = {
    data: document.getElementById("data").value,
    horario: document.getElementById("horario").value,
    turno: document.getElementById("turno").value,
    peso_vazio: parseFloat(document.getElementById("peso_vazio").value),
    peso_cheio: parseFloat(document.getElementById("peso_cheio").value),
    etiqueta: document.getElementById("etiqueta").value,
    operador: document.getElementById("operador").value,
    tipo: "Normal",
    autenticado: true,
    peso_embalagem: 0,
    qtd_sacos: 0
  };

  const method = id ? "PUT" : "POST";
  const endpoint = id ? `/lotes/${id}` : "/lotes";

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Erro ao salvar lote: ${res.status}`);
    const lote = await res.json();

    if (id) document.getElementById(`lote-${id}`).remove();
    renderLote(lote);
    document.getElementById("loteModal").style.display = "none";
  } catch (err) {
    console.error("Erro salvarLote:", err);
    alert(err.message);
  }
}

async function editarLote(id) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/lotes/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Erro ao buscar lote: ${res.status}`);
    const lote = await res.json();

    document.getElementById("loteId").value = lote.id;
    document.getElementById("data").value = lote.data.split("T")[0];
    document.getElementById("horario").value = lote.horario ?? "";
    document.getElementById("turno").value = lote.turno ?? "";
    document.getElementById("peso_vazio").value = lote.peso_vazio ?? 0;
    document.getElementById("peso_cheio").value = lote.peso_cheio ?? 0;
    document.getElementById("etiqueta").value = lote.etiqueta ?? "";
    document.getElementById("operador").value = lote.operador ?? "";

    document.getElementById("modalTitle").textContent = "Editar Lote";
    document.getElementById("loteModal").style.display = "block";
  } catch (err) {
    console.error("Erro editarLote:", err);
    alert(err.message);
  }
}

async function excluirLote(id) {
  const token = localStorage.getItem("token");
  if (!confirm("Deseja excluir este lote?")) return;

  try {
    const res = await fetch(`${API_URL}/lotes/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Erro ao excluir lote: ${res.status}`);
    document.getElementById(`lote-${id}`).remove();
  } catch (err) {
    console.error("Erro excluirLote:", err);
    alert(err.message);
  }
}

// ====================== UNITÁRIOS ======================
function inicializarUnitarios() {
  const addBtn = document.getElementById("addUnitario");
  const modal = document.getElementById("unitarioModal");
  const closeBtn = modal.querySelector(".close");

  addBtn.addEventListener("click", () => {
    document.getElementById("unitarioForm").reset();
    document.getElementById("unitarioId").value = "";
    document.getElementById("modalTitle").textContent = "Adicionar Registro Unitário";
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  document.getElementById("unitarioForm").addEventListener("submit", salvarUnitario);
  carregarUnitarios();
}

async function carregarUnitarios() {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/unitarios`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Erro ao buscar registros: ${res.status}`);
    const unitarios = await res.json();
    const tbody = document.querySelector("#unitariosTable tbody");
    tbody.innerHTML = "";
    unitarios.forEach(renderUnitario);
  } catch (err) {
    console.error("Erro carregarUnitarios:", err);
    alert(err.message);
  }
}

function renderUnitario(u) {
  const tbody = document.querySelector("#unitariosTable tbody");
  const row = document.createElement("tr");
  row.id = `unitario-${u.id}`;
  const chartId = `chart-${u.id}`;

  row.innerHTML = `
    <td>${new Date(u.data).toLocaleDateString()}</td>
    <td>${u.turno}</td>
    <td>${u.peso}</td>
    <td>${u.operador}</td>
    <td>${u.etiqueta ?? "-"}</td>
    <td>
      <button onclick="editarUnitario(${u.id})" class="action-btn">Editar</button>
      <button onclick="excluirUnitario(${u.id})" class="action-btn">Excluir</button>
    </td>
    <td><canvas id="${chartId}" width="100" height="100"></canvas></td>
  `;
  tbody.appendChild(row);

  const ctx = document.getElementById(chartId).getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Peso", "Restante"],
      datasets: [{ data: [u.peso, Math.max(0, 100 - u.peso)], backgroundColor: ["#3498db", "#ecf0f1"] }]
    }
  });
}

async function salvarUnitario(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const id = document.getElementById("unitarioId").value;

  const data = {
    data: document.getElementById("data").value,
    turno: document.getElementById("turno").value,
    peso: parseFloat(document.getElementById("peso").value),
    operador: document.getElementById("operador").value,
    etiqueta: document.getElementById("etiqueta").value
  };

  const method = id ? "PUT" : "POST";
  const endpoint = id ? `/unitarios/${id}` : "/unitarios";

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Erro ao salvar registro: ${res.status}`);
    const u = await res.json();

    if (id) document.getElementById(`unitario-${id}`).remove();
    renderUnitario(u);

    document.getElementById("unitarioModal").style.display = "none";
  } catch (err) {
    console.error("Erro salvarUnitario:", err);
    alert(err.message);
  }
}

async function editarUnitario(id) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${API_URL}/unitarios/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Erro ao buscar registro: ${res.status}`);
    const u = await res.json();

    document.getElementById("unitarioId").value = u.id;
    document.getElementById("data").value = u.data.split("T")[0];
    document.getElementById("turno").value = u.turno;
    document.getElementById("peso").value = u.peso;
    document.getElementById("operador").value = u.operador;
    document.getElementById("etiqueta").value = u.etiqueta ?? "";

    document.getElementById("modalTitle").textContent = "Editar Registro Unitário";
    document.getElementById("unitarioModal").style.display = "block";
  } catch (err) {
    console.error("Erro editarUnitario:", err);
    alert(err.message);
  }
}

async function excluirUnitario(id) {
  const token = localStorage.getItem("token");
  if (!confirm("Deseja excluir este registro?")) return;

  try {
    const res = await fetch(`${API_URL}/unitarios/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(`Erro ao excluir registro: ${res.status}`);
    document.getElementById(`unitario-${id}`).remove();
  } catch (err) {
    console.error("Erro excluirUnitario:", err);
    alert(err.message);
  }
}
