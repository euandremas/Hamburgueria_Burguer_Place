const Admin = (() => {
  const s = Store.state;
  const API_BASE_URL = "http://localhost:3333";

  // views
  const viewMap = {
    dashboard: "view-dashboard",
    produtos: "view-produtos",
    clientes: "view-clientes", // ✅ NOVO
    usuarios: "view-usuarios",
    pedidos: "view-pedidos",
    config: "view-config",
  };

  // produtos: imagem
let currentProductImgDataUrl = "";

// produtos: edição
let editingProductId = null;

// pedidos: itens temporários do form
let pendingItems = [];
let orderSearchTerm = "";
let orderSortMode = "newest";
let orderStatusFilter = "all";
let ordersStatusChart = null;
let topProductsChart = null;
let revenueChart = null;

if (typeof Chart !== "undefined" && typeof ChartDataLabels !== "undefined") {
  Chart.register(ChartDataLabels);
}

  function mapProductFromApi(product) {
  return {
    id: product.id,
    tipo: product.type,
    nome: product.name,
    desc: product.description,
    preco: Number(product.price),
    imgDataUrl: product.imageUrl || "",
  };
}

function mapProductToApi(product) {
  return {
    type: product.tipo,
    name: product.nome,
    description: product.desc,
    price: product.preco,
    imageUrl: product.imgDataUrl || null,
  };
}

async function loadProdutosFromApi() {
  const response = await API.getProducts();
  s.produtos = (response.data || []).map(mapProductFromApi);

  renderProdutos();
  refreshOrderInputs();
  refreshDashboard();
}
function mapCustomerFromApi(customer) {
  return {
    id: customer.id,
    nome: customer.name,
    tel: customer.phone || "",
    email: customer.email,
    endereco: {
      cep: customer.zipCode,
      rua: customer.street,
      bairro: customer.neighborhood,
      cidade: customer.city,
      uf: customer.state,
      numero: customer.number,
    },
    createdAt: customer.createdAt,
  };
}

function mapCustomerToApi(customer) {
  return {
    name: customer.nome,
    phone: customer.tel || null,
    email: customer.email,
    zipCode: customer.endereco.cep,
    street: customer.endereco.rua,
    neighborhood: customer.endereco.bairro,
    city: customer.endereco.cidade,
    state: customer.endereco.uf,
    number: customer.endereco.numero,
  };
}

async function loadClientesFromApi() {
  const response = await API.getCustomers();

  s.clientes = (response.data || []).map(mapCustomerFromApi);

  renderClientes();
  refreshOrderInputs();
  refreshDashboard();
}
function mapOrderFromApi(order) {
  return {
    id: order.id,
    clienteId: order.customerId,
    status: order.status,
    etaMin: order.etaMin,
    createdAt: order.createdAt,
    timeLabel: Store.nowTime(),
    itens: (order.items || []).map((item) => ({
      produtoId: item.productId,
      nome: item.productName,
      preco: Number(item.unitPrice),
      qtd: item.quantity,
    })),
  };
}

async function loadOrdersFromApi() {
  const response = await API.getOrders();
  s.pedidos = (response.data || []).map(mapOrderFromApi);

  renderOrders();
  refreshDashboard();
}
  // ✅ NOVO: Mobile menu (protótipo)
  function setupMobileMenu() {
    const menuBtn = document.getElementById("menuToggle");
    const overlay = document.getElementById("overlay");
    const sidebar = document.querySelector(".sidebar");

    if (!menuBtn || !overlay || !sidebar) return;

    const mqMobile = window.matchMedia("(max-width: 768px)");

    const setBtn = (open) => {
      // troca ícone: ☰ <-> ✕ (igual protótipo)
      menuBtn.textContent = open ? "✕" : "☰";
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    };

    const open = () => {
      if (!mqMobile.matches) return; // só no mobile
      sidebar.classList.add("is-open");
      overlay.classList.add("is-active");
      document.body.classList.add("no-scroll"); // opcional (se existir no CSS)
      setBtn(true);
    };

    const close = () => {
      sidebar.classList.remove("is-open");
      overlay.classList.remove("is-active");
      document.body.classList.remove("no-scroll");
      setBtn(false);
    };

    const toggle = () => {
      const isOpen = sidebar.classList.contains("is-open");
      isOpen ? close() : open();
    };

    menuBtn.addEventListener("click", toggle);
    overlay.addEventListener("click", close);

    // ESC fecha
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });

    // Clicar em item do menu fecha no mobile (melhor UX)
    document.querySelectorAll(".nav__item").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (mqMobile.matches) close();
      });
    });

    // Se virar desktop, garante sidebar “normal”
    window.addEventListener("resize", () => {
      if (!mqMobile.matches) close();
    });

    // estado inicial do botão
    setBtn(false);
  }

  function setActiveView(name) {
    document.querySelectorAll(".nav__item").forEach((b) =>
      b.classList.toggle("is-active", b.dataset.view === name)
    );

    Object.entries(viewMap).forEach(([k, id]) => {
      const el = document.getElementById(id);
      el?.classList.toggle("is-active", k === name);
    });

    if (name === "pedidos") {
      refreshOrderInputs();
      renderOrders();
    }

    if (name === "clientes") {
    loadClientesFromApi();
}

    if (name === "dashboard") {
    loadDashboardFromApi();
  }
}

const centerTextPlugin = {
  id: "centerText",

  afterDraw(chart) {
    const { ctx, chartArea } = chart;

    if (!chartArea) return;

    const total = chart.data.datasets[0].data.reduce(
      (sum, value) => sum + Number(value || 0),
      0
    );

    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue("--text")
      .trim() || "#111";

    ctx.font = "900 32px Arial";
    ctx.fillText(String(total), centerX, centerY - 10);

    ctx.fillStyle = getComputedStyle(document.documentElement)
      .getPropertyValue("--muted")
      .trim() || "#666";

    ctx.font = "700 12px Arial";
    ctx.fillText(total === 1 ? "PEDIDO" : "PEDIDOS", centerX, centerY + 18);

    ctx.restore();
  },
};

function renderTopProductsChart(topProducts) {
  const canvas = document.getElementById("topProductsChart");

  if (!canvas || typeof Chart === "undefined") return;

  const products = Array.isArray(topProducts)
    ? topProducts
        .map((product) => ({
          name: product.name,
          quantity: Number(product.quantity) || 0,
        }))
        .sort((a, b) => b.quantity - a.quantity)
    : [];

  const labels = products.map((product) => product.name);
  const values = products.map((product) => product.quantity);

  const totalSold = values.reduce((sum, value) => sum + value, 0);

  if (topProductsChart) {
    topProductsChart.data.labels = labels;
    topProductsChart.data.datasets[0].data = values;
    topProductsChart.update();
    return;
  }

  topProductsChart = new Chart(canvas, {
    type: "bar",

    data: {
      labels,
      datasets: [
        {
          label: "Unidades vendidas",
          data: values,
          backgroundColor: "#ff5a00",
          borderRadius: 14,
          borderSkipped: false,
          barThickness: 34,
          maxBarThickness: 38,
        },
      ],
    },

    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,

      layout: {
        padding: {
          right: 44,
        },
      },

      plugins: {
        legend: {
          display: false,
        },

        datalabels: {
          anchor: "end",
          align: "end",
          clamp: true,
          color: "#111827",
          font: {
            size: 13,
            weight: "bold",
          },
          formatter(value) {
            return value;
          },
        },

        tooltip: {
          callbacks: {
            title(items) {
              return `🍔 ${items[0].label}`;
            },

            label(context) {
              const value = Number(context.raw) || 0;

              return `${value} ${
                value === 1 ? "unidade vendida" : "unidades vendidas"
              }`;
            },

            afterLabel(context) {
              const value = Number(context.raw) || 0;

              const percentage = totalSold
                ? Math.round((value / totalSold) * 100)
                : 0;

              return `${percentage}% das vendas`;
            },
          },
        },
      },

      scales: {
        x: {
          beginAtZero: true,

          ticks: {
            precision: 0,
            stepSize: 1,
          },

          grid: {
            color: "rgba(15, 23, 42, 0.06)",
          },

          border: {
            display: false,
          },
        },

        y: {
          grid: {
            display: false,
          },

          border: {
            display: false,
          },

          ticks: {
            color: "#4f5a70",
            font: {
              size: 13,
              weight: "600",
            },
          },
        },
      },
    },
  });
}

function renderRevenueChart(revenueByDay) {
  const canvas = document.getElementById("revenueChart");

  if (!canvas || typeof Chart === "undefined") return;

  const labels = revenueByDay.map((item) => item.label);
  const values = revenueByDay.map((item) => Number(item.revenue));

  if (revenueChart) {
    revenueChart.data.labels = labels;
    revenueChart.data.datasets[0].data = values;
    revenueChart.update();
    return;
  }

  revenueChart = new Chart(canvas, {
    type: "line",

    data: {
      labels,

      datasets: [
        {
          label: "Receita",

          data: values,

          borderColor: "#ff6500",

          backgroundColor: "rgba(255,101,0,.15)",

          fill: true,

          tension: .35,

          pointRadius: 5,

          pointHoverRadius: 7,

          pointBackgroundColor: "#ff6500",

          pointBorderWidth: 2,

          pointBorderColor: "#ffffff",
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          callbacks: {
            label(context) {
              return "Receita: " + Store.moneyBR(context.raw);
            },
          },
        },
      },

      scales: {
        y: {
          beginAtZero: true,

          ticks: {
            callback(value) {
              return "R$ " + value;
            },
          },

          grid: {
            color: "rgba(15,23,42,.06)",
          },
        },

        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

function renderOrdersStatusChart(dashboard) {
  const canvas = document.getElementById("ordersStatusChart");

  if (!canvas || typeof Chart === "undefined") return;

  const chartData = [
    Number(dashboard.preparingOrders) || 0,
    Number(dashboard.onTheWayOrders) || 0,
    Number(dashboard.deliveredOrders) || 0,
  ];

  if (ordersStatusChart) {
    ordersStatusChart.data.datasets[0].data = chartData;
    ordersStatusChart.update();
    return;
  }

  ordersStatusChart = new Chart(canvas, {
    type: "doughnut",

    plugins: [centerTextPlugin],

    data: {
      labels: ["Em preparação", "A caminho", "Entregues"],
      datasets: [
        {
          data: chartData,
          radius: "72%",
          backgroundColor: ["#f97316", "#2563eb", "#16a34a"],
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",

      plugins: {
        legend: {
          position: "right",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 18,
          },
        },

        tooltip: {
          callbacks: {
            label(context) {
              const value = Number(context.raw) || 0;

              const total = context.dataset.data.reduce(
                (sum, item) => sum + Number(item || 0),
                0
              );

              const percentage = total
                ? Math.round((value / total) * 100)
                : 0;

              return `${context.label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
    },
  });
}

function setupNav() {
    document.querySelectorAll(".nav__item").forEach((btn) => {
      btn.addEventListener("click", () => setActiveView(btn.dataset.view));
    });
  }

  function setupLogout() {
    document.getElementById("btnLogout")?.addEventListener("click", () => Auth.logout());
  }

  function refreshDashboard() {
  const list = document.getElementById("activityList");
  if (!list) return;

  const icon = (type) => {
    if (type === "done") return "✓";
    if (type === "prep") return "⏱";
    return "🛒";
  };

  const items = (s.activities || []).slice(0, 5);

  if (!items.length) {
    list.innerHTML = `
      <div class="emptyState">
        <strong>Nenhuma atividade recente.</strong>
        <span>As movimentações do sistema aparecerão aqui.</span>
      </div>
    `;
    return;
  }

  list.innerHTML = items
    .map((activity) => {
      const className =
        activity.type === "done"
          ? "act--green"
          : activity.type === "prep"
            ? "act--orange"
            : "act--blue";

      return `
        <div class="actItem ${className}">
          <div class="actItem__ico">${icon(activity.type)}</div>

          <div>
            <div class="actItem__t">
              ${UI.escapeHtml(activity.title)}
            </div>

            <div class="actItem__s">
              ${UI.escapeHtml(activity.subtitle || "")}
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

  // ---------- PRODUTOS ----------
  function renderProdutos() {
    document.getElementById("prodCount").textContent = String(s.produtos.length);

    const tbody = document.querySelector("#tableProdutos tbody");
    if (!tbody) return;

    tbody.innerHTML = s.produtos
      .map(
        (p) => `
      <tr>
        <td>
          ${
            p.imgDataUrl
              ? `<img class="imgThumb" src="${p.imgDataUrl}" alt="Imagem ${UI.escapeHtml(
                  p.nome
                )}" />`
              : `<div class="imgThumb" style="display:grid;place-items:center;color:var(--muted)">—</div>`
          }
        </td>
        <td>${UI.escapeHtml(p.tipo)}</td>
        <td><strong>${UI.escapeHtml(p.nome)}</strong></td>
        <td class="trunc" title="${UI.escapeHtml(p.desc)}">${UI.escapeHtml(p.desc)}</td>
        <td class="right"><strong style="color: var(--green)">${Store.moneyBR(p.preco)}</strong></td>
        <td class="right">
         <button class="iconBtn" data-edit-product="${p.id}" title="Editar">✏️</button>
         <button class="iconBtn" data-del-product="${p.id}" title="Excluir">🗑</button>  
        </td>
      </tr>
    `
      )
      .join("");

    tbody.querySelectorAll("[data-del-product]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const id = Number(btn.dataset.delProduct);
    const prod = s.produtos.find((item) => item.id === id);

    if (!prod) {
      UI.toast("Produto não encontrado.");
      return;
    }

    const confirmed = await UI.confirm({
      title: "Excluir produto",
      message: `Deseja realmente excluir o produto "${prod.nome}"?`,
      confirmText: "Excluir",
      cancelText: "Cancelar",
      danger: true,
    });

    if (!confirmed) return;

    try {
      await API.deleteProduct(id);
      UI.toast("Produto removido.");
      await loadProdutosFromApi();
      await loadDashboardFromApi();
    } catch (err) {
      UI.toast(err.message || "Erro ao remover produto.");
    }
  });
});

tbody.querySelectorAll("[data-edit-product]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = Number(btn.dataset.editProduct);
    const product = s.produtos.find((item) => item.id === id);

    if (!product) {
      UI.toast("Produto não encontrado.");
      return;
    }

    editingProductId = product.id;

    document.getElementById("pTipo").value = product.tipo;
    document.getElementById("pNome").value = product.nome;
    document.getElementById("pPreco").value = product.preco;
    document.getElementById("pDesc").value = product.desc;

    currentProductImgDataUrl = product.imgDataUrl || "";

    const preview = document.getElementById("dropPreview");
    const dropzone = document.getElementById("dropzone");

    if (preview) {
      preview.innerHTML = currentProductImgDataUrl
        ? `<img src="${currentProductImgDataUrl}" alt="Preview do produto" />`
        : "";
    }

    dropzone?.classList.toggle("is-valid", Boolean(currentProductImgDataUrl));

    const submitBtn = document.querySelector("#formProduto button[type='submit']");

    if (submitBtn) {
      submitBtn.dataset.createText ||= submitBtn.textContent;
      submitBtn.textContent = "Salvar alterações";
    }

    const cancelEditBtn = document.getElementById("btnCancelProductEdit");
    cancelEditBtn?.classList.remove("is-hidden");

    document.getElementById("view-produtos")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    UI.toast("Produto carregado para edição.");
  });
});
}

  function setupDropzone() {
    const dz = document.getElementById("dropzone");
    const input = document.getElementById("pImagem");
    const preview = document.getElementById("dropPreview");

    if (!dz || !input || !preview) return;

    const openPicker = () => input.click();

    dz.addEventListener("click", openPicker);

    // teclado (acessibilidade e UX)
    dz.setAttribute("tabindex", "0");
    dz.setAttribute("role", "button");
    dz.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openPicker();
      }
    });

    input.addEventListener("change", async () => {
  dz.classList.remove("is-drag");

  const file = input.files?.[0];
  if (!file) return;

  await handleProductFile(file);
});

dz.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dz.classList.add("is-drag");
});

dz.addEventListener("dragover", (e) => {
  e.preventDefault();
  dz.classList.add("is-drag");
});

dz.addEventListener("dragleave", () => {
  dz.classList.remove("is-drag");
});

dz.addEventListener("drop", async (e) => {
  e.preventDefault();
  dz.classList.remove("is-drag");

  const file = e.dataTransfer.files?.[0];
  if (!file) return;

  await handleProductFile(file);
});

  async function handleProductFile(file) {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    UI.toast("Envie um arquivo de imagem.");
    return;
  }

  currentProductImgDataUrl = await UI.readFileAsDataURL(file);
  preview.innerHTML = `<img src="${currentProductImgDataUrl}" alt="Preview" />`;

  const dropzone = document.getElementById("dropzone");

  UI.clearHighlight(dz);
  dz.classList.add("is-valid");

  UI.toast("Imagem carregada com sucesso!");
  }
 }

  function setupProdutoForm() {
  const form = document.getElementById("formProduto");
  const cancelEditBtn = document.getElementById("btnCancelProductEdit");

  if (!form) return;

  cancelEditBtn?.addEventListener("click", () => {
    editingProductId = null;
    currentProductImgDataUrl = "";

    form.reset();

    const preview = document.getElementById("dropPreview");
    const dropzone = document.getElementById("dropzone");
    const submitBtn = form.querySelector("button[type='submit']");

    if (preview) preview.innerHTML = "";

    dropzone?.classList.remove("is-valid", "is-invalid", "is-drag");

    if (submitBtn) {
      submitBtn.textContent = submitBtn.dataset.createText || "+ Produto";
    }

    cancelEditBtn.classList.add("is-hidden");

    UI.toast("Edição cancelada.");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const tipo = document.getElementById("pTipo").value.trim();
    const nome = document.getElementById("pNome").value.trim();
    const preco = Number(document.getElementById("pPreco").value);
    const desc = document.getElementById("pDesc").value.trim();

    if (!tipo) {
      UI.highlightField(document.getElementById("pTipo"));
      UI.toast("Informe o tipo do produto.");
      return;
    }

const nomeValido = nome.replace(/[^a-zA-ZÀ-ÿ]/g, "").length >= 3;

if (!nomeValido) {
  UI.highlightField(document.getElementById("pNome"));
  UI.toast("Informe um nome com pelo menos 3 letras ou números.");
  return;
}

if (!Number.isFinite(preco) || preco <= 0) {
  UI.highlightField(document.getElementById("pPreco"));
  UI.toast("Informe um preço válido maior que zero.");
  return;
}

if (preco > 999.99) {
  UI.highlightField(document.getElementById("pPreco"));
  UI.toast("O preço informado está muito alto. Verifique o valor.");
  return;
}

if (!desc || desc.length < 10) {
  UI.highlightField(document.getElementById("pDesc"));
  UI.toast("Informe uma descrição com pelo menos 10 caracteres.");
  return;
}

if (!currentProductImgDataUrl) {
  UI.highlightField(document.getElementById("dropzone"));
  UI.toast("Selecione uma imagem para o produto.");
  return;
}
    const btn = form.querySelector("button[type='submit']");

if (btn) {
  btn.disabled = true;
  btn.dataset.text = btn.textContent;
  btn.textContent = "Salvando...";
}

try {
  UI.showLoading("Cadastrando produto...");

  const productData = mapProductToApi({
  tipo,
  nome,
  preco,
  desc,
  imgDataUrl: currentProductImgDataUrl,
});

if (editingProductId) {
  await API.updateProduct(editingProductId, productData);
  UI.toast("Produto atualizado com sucesso!");
} else {
  await API.createProduct(productData);
  UI.toast("Produto cadastrado com sucesso!");
}

  form.reset();
currentProductImgDataUrl = "";
editingProductId = null;

const dropzone = document.getElementById("dropzone");
dropzone?.classList.remove("is-valid");
UI.clearHighlight(dropzone);

const preview = document.getElementById("dropPreview");
if (preview) preview.innerHTML = "";

await loadProdutosFromApi();
await loadDashboardFromApi();

 
} catch (err) {
  UI.toast(err.message || "Erro ao cadastrar produto.");
} finally {
  UI.hideLoading();

 if (btn) {
  btn.disabled = false;
  btn.textContent = btn.dataset.createText || "Cadastrar";
  }
}

  });
}        // fecha o addEventListener

  // ---------- CLIENTES (NOVO + BRASILAPI + MÁSCARA TELEFONE) ----------
  function setupClientes() {
  setupCepLookup();
  setupTelefoneMask();
  setupClienteForm();
}

  // --- ✅ MÁSCARA TELEFONE (11) 99999-9999 ---
  function setupTelefoneMask() {
    const telInput = document.getElementById("cTel");
    if (!telInput) return;

    // tamanho exato do formato: (11) 99999-9999 => 15 chars
    telInput.setAttribute("maxlength", "15");

    telInput.addEventListener("input", (e) => {
      let v = (e.target.value || "").replace(/\D/g, "");

      // limita em 11 dígitos (DDD + 9 + 4)
      if (v.length > 11) v = v.slice(0, 11);

      if (v.length > 6) {
        // (11) 99999-9999
        v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
      } else if (v.length > 2) {
        // (11) 99999
        v = v.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
      } else if (v.length > 0) {
        // (11
        v = v.replace(/^(\d{0,2}).*/, "($1");
      }

      e.target.value = v;
    });
  }

function renderClientes() {
    const elCount = document.getElementById("clientCount");
    if (elCount) elCount.textContent = String((s.clientes || []).length);

    const tbody = document.querySelector("#tableClientes tbody");
    if (!tbody) return;

    const list = s.clientes || [];

    tbody.innerHTML = list
      .map((c) => {
        const addr = c.endereco
          ? `${c.endereco.rua}, ${c.endereco.numero} — ${c.endereco.bairro} — ${c.endereco.cidade}/${c.endereco.uf} (CEP ${c.endereco.cep})`
          : "—";

        return `
          <tr>
            <td><strong>${UI.escapeHtml(c.nome)}</strong></td>
            <td>${UI.escapeHtml(c.email)}</td>
            <td class="trunc" title="${UI.escapeHtml(addr)}">${UI.escapeHtml(addr)}</td>
            <td class="right">
              <button class="iconBtn" data-del-cli="${c.id}" title="Excluir">🗑</button>
            </td>
          </tr>
        `;
      })
      .join("");

    tbody.querySelectorAll("[data-del-cli]").forEach((btn) => {
      btn.addEventListener("click", async () => {
  const id = Number(btn.getAttribute("data-del-cli"));
  const cli = (s.clientes || []).find((x) => x.id === id);
  if (!cli) return;

  const confirmed = confirm(`Deseja excluir o cliente "${cli.nome}"?`);
  if (!confirmed) return;

  try {
    await API.deleteCustomer(id);
    UI.toast("Cliente removido.");
    await loadClientesFromApi();
    await loadDashboardFromApi();
  } catch (err) {
  UI.toast(err.message || "Erro ao remover cliente.");
}
});
});
}

  function setupClienteForm() {
  const form = document.getElementById("formCliente");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("cNome").value.trim();
    const tel = document.getElementById("cTel").value.trim();
    const email = document.getElementById("cEmail").value.trim();

    const cepRaw = document.getElementById("cCep").value;
    const cepDigits = onlyDigits(cepRaw);

    const numero = document.getElementById("cNumero").value.trim();

    if (!nome || !email) {
      UI.toast("Preencha nome e e-mail.");
      return;
    }

    if (cepDigits.length !== 8) {
      UI.toast("Informe um CEP válido (8 dígitos).");
      return;
    }

    if (!document.getElementById("cCidade").value || !document.getElementById("cUf").value) {
      const ok = await fetchCepAndFill();
      if (!ok) return;
    }

    if (!numero) {
      UI.toast("Preencha o número do endereço.");
      return;
    }

    const endereco = {
      cep: formatCep(cepRaw),
      rua: document.getElementById("cRua").value.trim(),
      bairro: document.getElementById("cBairro").value.trim(),
      cidade: document.getElementById("cCidade").value.trim(),
      uf: document.getElementById("cUf").value.trim(),
      numero,
    };

    const customer = {
      nome,
      tel,
      email,
      endereco,
    };
      const btn = form.querySelector("button[type='submit']");

if (btn) {
  btn.disabled = true;
  btn.dataset.text = btn.textContent;
  btn.textContent = "Salvando...";
}
    try {
  UI.showLoading("Cadastrando cliente...");

  await API.createCustomer(mapCustomerToApi(customer));

  UI.toast("Cliente cadastrado!");

  form.reset();
  clearAddressFields();
  setCepHint("Digite o CEP e clique em Buscar. Endereço vem automático 😎", "muted");

  await loadClientesFromApi();
  await loadDashboardFromApi();

} catch (err) {
  UI.toast(err.message || "Erro ao cadastrar cliente.");
} finally {
  UI.hideLoading();

  if (btn) {
    btn.disabled = false;
    btn.textContent = btn.dataset.text || "Cadastrar";
  }
}
  });
}
  // --- CEP helpers ---
  function onlyDigits(str) {
    return (str || "").replace(/\D/g, "");
  }

  function formatCep(value) {
    const d = onlyDigits(value).slice(0, 8);
    if (d.length <= 5) return d;
    return `${d.slice(0, 5)}-${d.slice(5)}`;
  }

  function setCepHint(text, mode = "muted") {
    const hint = document.getElementById("cepHint");
    if (!hint) return;
    hint.textContent = text;
    hint.style.color =
      mode === "ok" ? "var(--green)" : mode === "err" ? "var(--danger)" : "var(--muted)";
  }

  function clearAddressFields() {
    const ids = ["cRua", "cBairro", "cCidade", "cUf"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
  }

  function setCepLoading(isLoading) {
    const btn = document.getElementById("btnBuscarCep");
    const inp = document.getElementById("cCep");

    if (btn) {
      btn.disabled = isLoading;
      btn.textContent = isLoading ? "Buscando..." : "Buscar";
    }
    if (inp) inp.disabled = isLoading;
  }

  async function fetchCepAndFill() {
    const cCep = document.getElementById("cCep");
    const raw = cCep?.value || "";
    const cep = onlyDigits(raw);

    if (cep.length !== 8) {
      clearAddressFields();
      setCepHint("❌ CEP inválido. Use 8 dígitos (ex.: 01001000).", "err");
      return false;
    }

    setCepLoading(true);
    setCepHint("Consultando CEP na BrasilAPI...", "muted");

    try {
      const res = await fetch(`${API_BASE_URL}/cep/${cep}`);
      if (!res.ok) {
        clearAddressFields();
        setCepHint("❌ CEP não encontrado. Confere e tenta novamente.", "err");
        return false;
      }

      const data = await res.json();

      const address = data.data || data;

      document.getElementById("cRua").value = address.street || "";
      document.getElementById("cBairro").value = address.neighborhood || "";
      document.getElementById("cCidade").value = address.city || "";
      document.getElementById("cUf").value = address.state || "";

      setCepHint("✅ Endereço preenchido! Agora só digitar o número.", "ok");
      UI.toast("CEP consultado com sucesso!");
      return true;
    } catch {
      clearAddressFields();
      setCepHint("❌ Falha ao consultar a API. Verifique sua conexão.", "err");
      return false;
    } finally {
      setCepLoading(false);
      if (cCep) cCep.value = formatCep(cCep.value);
    }
  }

  function setupCepLookup() {
    const cCep = document.getElementById("cCep");
    const btn = document.getElementById("btnBuscarCep");

    if (!cCep || !btn) return;

    cCep.addEventListener("input", () => {
      cCep.value = formatCep(cCep.value);
      setCepHint("Digite o CEP e clique em Buscar. Endereço vem automático 😎", "muted");
    });

    btn.addEventListener("click", fetchCepAndFill);

    cCep.addEventListener("blur", () => {
      if (onlyDigits(cCep.value).length === 8) fetchCepAndFill();
    });
  }

  // ---------- USUÁRIOS ----------
  function mapUserFromApi(user) {

  return {

    id: user.id,

    nome: user.name,

    username: user.username,

    role: user.role,

    createdAt: user.createdAt,

  };

}

async function loadUsuariosFromApi() {

  const response = await API.getUsers();

  s.usuarios = (response.data || []).map(mapUserFromApi);

  renderUsuarios();

  refreshDashboard();

}
async function loadDashboardFromApi() {
  try {
    const response = await API.getDashboard();
    const dashboard = response.data;

    document.getElementById("kpiTotalPedidos").textContent = String(dashboard.totalOrders);
    document.getElementById("kpiPreparacao").textContent = String(dashboard.preparingOrders);
    document.getElementById("kpiEntregues").textContent = String(dashboard.deliveredOrders);
    document.getElementById("kpiProdutos").textContent = String(dashboard.totalProducts);
    document.getElementById("kpiOnTheWay").textContent = String(dashboard.onTheWayOrders);
    document.getElementById("kpiCustomers").textContent = String(dashboard.totalCustomers);
    document.getElementById("kpiRevenue").textContent = Store.moneyBR(dashboard.totalRevenue);
    document.getElementById("kpiAverageTicket").textContent = Store.moneyBR(dashboard.averageTicket);
    document.getElementById("kpiBestSeller").textContent =
  dashboard.bestSeller.name;

document.getElementById("kpiBestSellerQty").textContent =
  `${dashboard.bestSeller.quantity} vendidos`;

document.getElementById("kpiTopCustomer").textContent =
  dashboard.topCustomer.name;

document.getElementById("kpiTopCustomerOrders").textContent =
  `${dashboard.topCustomer.orders} pedidos`;

  renderOrdersStatusChart(dashboard);
  renderTopProductsChart(dashboard.topProducts);
  renderRevenueChart(dashboard.revenueByDay);   
  
    s.activities = dashboard.recentActivities || [];
    refreshDashboard();
  } catch (err) {
    UI.toast(err.message || "Erro ao carregar o dashboard.");
  }
}
function renderUsuarios() {

  const users = s.usuarios || [];

  document.getElementById("userCount").textContent = String(users.length);

  const tbody = document.querySelector("#tableUsuarios tbody");

  if (!tbody) return;

  tbody.innerHTML = users

    .map(

      (u) => `

        <tr>

          <td><strong>${UI.escapeHtml(u.nome)}</strong></td>

          <td>${UI.escapeHtml(u.username)}</td>

          <td class="right">

            <button class="iconBtn" data-del-user="${u.id}" title="Excluir">🗑</button>

          </td>

        </tr>

      `

    )

    .join("");



  tbody.querySelectorAll("[data-del-user]").forEach((btn) => {

    btn.addEventListener("click", async () => {

      const id = Number(btn.getAttribute("data-del-user"));

      const user = users.find((x) => x.id === id);

      if (!user) return;

      const confirmed = confirm(`Deseja excluir o usuário "${user.username}"?`);

      if (!confirmed) return;

      try {

        await API.deleteUser(id);

        UI.toast("Usuário removido.");

        await loadUsuariosFromApi();

      } catch (err) {

        UI.toast(err.message || "Erro ao remover usuário.");

      }

    });

  });

}

  function setupUserSuggest() {
    const nome = document.getElementById("uNome");
    const user = document.getElementById("uUser");
    const hint = document.getElementById("userHint");
    const btnCheck = document.getElementById("btnCheckUser");

    if (!nome || !user || !hint || !btnCheck) return;

    nome.addEventListener("input", () => {
      const sug = Store.suggestUsername(nome.value);
      if (!sug) return;
      user.value = sug;
      hint.textContent = `Sugestão: "${sug}". Você pode editar e verificar disponibilidade.`;
      hint.style.color = "var(--muted)";
    });

    btnCheck.addEventListener("click", () => {
      const raw = user.value.trim();
      const val = Store.slugifyUser(raw);

      if (!val) {
        hint.textContent = "❌ Informe um usuário válido.";
        hint.style.color = "var(--danger)";
        UI.toast("Informe um usuário válido.");
        return;
      }

      user.value = val; // normaliza
      hint.textContent = "A disponibilidade será validada ao cadastrar.";
hint.style.color = "var(--muted)";
    });

    user.addEventListener("input", () => {
      hint.textContent = "Clique em “Verificar” para checar disponibilidade.";
      hint.style.color = "var(--muted)";
    });
  }

  function setupUsuarioForm() {
  const form = document.getElementById("formUsuario");
  const passwordInput = document.getElementById("uSenha");
  const capsWarning = document.getElementById("capsLockWarning");
  if (!form) return;

  document.getElementById("btnGeneratePassword")?.addEventListener("click", () => {
    const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const lower = "abcdefghijkmnopqrstuvwxyz";
    const numbers = "23456789";
    const special = "!@#$%&*";
    const all = upper + lower + numbers + special;

    let password =
      upper[Math.floor(Math.random() * upper.length)] +
      lower[Math.floor(Math.random() * lower.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      special[Math.floor(Math.random() * special.length)];

    while (password.length < 12) {
      password += all[Math.floor(Math.random() * all.length)];
    }

    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    const input = document.getElementById("uSenha");

if (input) {
  input.value = password;
  input.dispatchEvent(new Event("input"));
}

UI.toast("Senha forte gerada.");
  });
document.getElementById("btnCopyPassword")?.addEventListener("click", async () => {
  const input = document.getElementById("uSenha");
  const password = input?.value || "";

  if (!password) {
    UI.toast("Gere ou digite uma senha primeiro.");
    return;
  }

  try {
    await navigator.clipboard.writeText(password);
    UI.toast("Senha copiada.");
  } catch {
    UI.toast("Não foi possível copiar a senha.");
  }
});
const senhaInput = document.getElementById("uSenha");

senhaInput?.addEventListener("input", () => {
  const value = senhaInput.value || "";

  const rules = {
    length: value.length >= 8,
    upper: /[A-Z]/.test(value),
    lower: /[a-z]/.test(value),
    number: /\d/.test(value),
    special: /[!@#$%&*]/.test(value),
  };

  document.getElementById("ruleLength")?.classList.toggle("is-valid", rules.length);
  document.getElementById("ruleUpper")?.classList.toggle("is-valid", rules.upper);
  document.getElementById("ruleLower")?.classList.toggle("is-valid", rules.lower);
  document.getElementById("ruleNumber")?.classList.toggle("is-valid", rules.number);
  document.getElementById("ruleSpecial")?.classList.toggle("is-valid", rules.special);

  const score = Object.values(rules).filter(Boolean).length;
  const bar = document.getElementById("passwordStrengthBar");
  const text = document.getElementById("passwordStrengthText");

 if (bar) {
  bar.style.width = `${score * 20}%`;

  if (score <= 2) {
    bar.style.background = "#ef4444";
  } else if (score <= 4) {
    bar.style.background = "#f59e0b";
  } else {
    bar.style.background = "#22c55e";
  }
}
  if (text) {
    text.textContent =
      score <= 2
        ? "Força da senha: fraca"
        : score <= 4
          ? "Força da senha: média"
          : "Força da senha: forte";
  }
});

passwordInput?.addEventListener("keyup", (e) => {
  if (!capsWarning) return;

  capsWarning.style.display =
    e.getModifierState("CapsLock") ? "block" : "none";
});

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("uNome").value.trim();
    const username = document.getElementById("uUser").value.trim();
    const password = document.getElementById("uSenha").value;
    const role = document.getElementById("uRole")?.value || "operator";

    const senhaValida =
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /\d/.test(password) &&
  /[!@#$%&*]/.test(password);

if (!name || !username || !senhaValida) {
  UI.toast("A senha deve atender todos os requisitos.");
  return;
}
const btn = form.querySelector("button[type='submit']");

if (btn) {
  btn.disabled = true;
  btn.dataset.text = btn.textContent;
  btn.textContent = "Salvando...";
}
    try {
  UI.showLoading("Cadastrando usuário...");

  await API.createUser({
    name,
    username,
    password,
    role,
  });

  UI.toast("Usuário cadastrado!");

  form.reset();

  const strengthBar = document.getElementById("passwordStrengthBar");
  const strengthText = document.getElementById("passwordStrengthText");

  if (strengthBar) {
    strengthBar.style.width = "0%";
    strengthBar.style.background = "#ef4444";
  }

  if (strengthText) {
    strengthText.textContent = "Força da senha: fraca";
  }

  ["ruleLength", "ruleUpper", "ruleLower", "ruleNumber", "ruleSpecial"].forEach((id) => {
    document.getElementById(id)?.classList.remove("is-valid");
  });

  await loadUsuariosFromApi();
} catch (err) {
  UI.toast(err.message || "Erro ao cadastrar usuário.");
} finally {
  UI.hideLoading();

  if (btn) {
    btn.disabled = false;
    btn.textContent = btn.dataset.text || "Usuário";
  }
}
  });
}

  // ---------- PEDIDOS ----------
  function refreshOrderInputs() {
    const selCliente = document.getElementById("oCliente");
    const selProduto = document.getElementById("oProduto");

    // ✅ agora pedidos usam CLIENTES (não usuários)
    if (selCliente) {
      const clientes = s.clientes || [];

      if (!clientes.length) {
        selCliente.innerHTML = `<option value="">Cadastre um cliente</option>`;
        selCliente.disabled = true;
      } else {
        selCliente.disabled = false;
        selCliente.innerHTML =
          `<option value="">Selecione um cliente</option>` +
          clientes.map((c) => `<option value="${c.id}">${UI.escapeHtml(c.nome)}</option>`).join("");
      }
    }

    if (selProduto) {
      if (!s.produtos.length) {
        selProduto.innerHTML = `<option value="">Cadastre um produto</option>`;
        selProduto.disabled = true;
      } else {
        selProduto.disabled = false;
        selProduto.innerHTML = s.produtos
          .map((p) => `<option value="${p.id}">${UI.escapeHtml(p.nome)}</option>`)
          .join("");
      }
    }

    renderPendingItems();
  }

  function addItemToPending(prodId) {
    const p = s.produtos.find((x) => x.id === Number(prodId));
    if (!p) return;

    const found = pendingItems.find((i) => i.produtoId === p.id);
    if (found) found.qtd += 1;
    else pendingItems.push({ produtoId: p.id, nome: p.nome, preco: p.preco, qtd: 1 });

    renderPendingItems();
  }

  function removePendingItem(prodId) {
    const idx = pendingItems.findIndex((i) => i.produtoId === prodId);
    if (idx >= 0) pendingItems.splice(idx, 1);
    renderPendingItems();
  }

  function renderPendingItems() {
    const box = document.getElementById("orderItems");
    if (!box) return;

    if (!pendingItems.length) {
      box.innerHTML = `<span class="hint">Nenhum item adicionado ainda.</span>`;
      return;
    }

    box.innerHTML = pendingItems
      .map(
        (i) => `
      <span class="chip">
        ${UI.escapeHtml(i.nome)} x${i.qtd}
        <button type="button" data-rm="${i.produtoId}" title="Remover">×</button>
      </span>
    `
      )
      .join("");

    box.querySelectorAll("[data-rm]").forEach((b) => {
      b.addEventListener("click", () => removePendingItem(Number(b.getAttribute("data-rm"))));
    });
  }

  function orderTotal(o) {
    return o.itens.reduce((acc, i) => acc + i.preco * i.qtd, 0);
  }

  function statusKey(status) {
    if (status === "Entregue") return "done";
    if (status === "A caminho") return "way";
    return "prep";
  }

  function renderOrders() {
  const list = document.getElementById("ordersList");
  if (!list) return;

  const normalizedSearch = orderSearchTerm.trim().toLowerCase();

 const filteredOrders = s.pedidos.filter((order) => {
  const matchesStatus =
    orderStatusFilter === "all" || order.status === orderStatusFilter;

  if (!matchesStatus) return false;
  if (!normalizedSearch) return true;

  const customerName =
    (s.clientes || []).find((customer) => customer.id === order.clienteId)?.nome || "";

  const orderNumber = String(order.id).padStart(3, "0");
  const productNames = order.itens.map((item) => item.nome).join(" ");

  return [orderNumber, customerName, productNames, order.status]
    .join(" ")
    .toLowerCase()
    .includes(normalizedSearch);
});

  const sortedOrders = filteredOrders.slice().sort((a, b) => {
    if (orderSortMode === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (orderSortMode === "highest") {
      return orderTotal(b) - orderTotal(a);
    }

    if (orderSortMode === "lowest") {
      return orderTotal(a) - orderTotal(b);
    }

    if (orderSortMode === "status") {
      return a.status.localeCompare(b.status, "pt-BR");
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  document.getElementById("orderCount").textContent = String(filteredOrders.length);

  if (!sortedOrders.length) {
  list.innerHTML = `
    <div class="emptyState">
      <strong>Nenhum pedido encontrado.</strong>
      <span>Tente ajustar a busca ou os filtros.</span>
    </div>
  `;
  return;
}

  list.innerHTML = sortedOrders
    .map((o) => {
      
    const key = statusKey(o.status);

      const cls =
        key === "done"
          ? "orderCard--done"
          : key === "way"
            ? "orderCard--way"
            : "orderCard--prep";

      const badgeCls =
        key === "done"
          ? "badge--done"
          : key === "way"
            ? "badge--way"
            : "badge--prep";

      const cliente = (s.clientes || []).find((c) => c.id === o.clienteId)?.nome || "—";
      const total = Store.moneyBR(orderTotal(o));
     const itens = o.itens
  .map((item) => `${item.qtd} x ${highlightSearchText(item.nome, orderSearchTerm)}`)
  .join("<br/>");

      const showEta = o.status !== "Entregue";

      const etaLine = showEta
        ? `
          <div class="orderMeta">
            <strong>ETA:</strong>
            <input
              class="etaInput"
              data-eta="${o.id}"
              type="number"
              min="1"
              max="240"
              value="${o.etaMin}"
            />
            min
          </div>
        `
        : `<div class="orderMeta"><strong>ETA:</strong> entregue</div>`;

      // Será ativado quando o controle de perfis estiver implementado.
      const canReopenOrder = false;

      const nextButtons =
        o.status === "Em preparação"
          ? `
            <button
              class="btnStatus btnStatus--way"
              data-status="${o.id}"
              data-to="A caminho"
              type="button"
            >
              Marcar como A caminho
            </button>
          `
          : o.status === "A caminho"
            ? `
              <button
                class="btnStatus btnStatus--done"
                data-status="${o.id}"
                data-to="Entregue"
                type="button"
              >
                Marcar como Entregue
              </button>
            `
            : canReopenOrder
              ? `
                <span class="orderFinished">Pedido finalizado</span>

                <button
                  class="btnStatus btnStatus--reopen"
                  data-reopen-order="${o.id}"
                  type="button"
                >
                  Reabrir pedido
                </button>
              `
              : `<span class="orderFinished">Pedido finalizado</span>`;

      return `
        <article class="orderCard ${cls}">
          <div class="orderTop">
            <div>
              <div class="orderTitle">
                Pedido nº ${highlightSearchText(String(o.id).padStart(3, "0"), orderSearchTerm)}
                <span class="badge ${badgeCls}">${UI.escapeHtml(o.status)}</span>
              </div>

              <div class="orderMeta">
                Cliente: ${highlightSearchText(cliente, orderSearchTerm)}
              </div>
            </div>

            <div style="text-align: right">
              <div style="font-weight: 900; color: var(--green)">
                ${total}
              </div>

              <div class="orderMeta">
                ${UI.escapeHtml(o.timeLabel || Store.nowTime())}
              </div>
            </div>
          </div>

          <div class="orderBody">
            <div class="orderMeta">
              <strong>Produtos:</strong>
            </div>

            <div style="margin-top: 8px; color: var(--muted)">
              ${itens || "—"}
            </div>

            ${etaLine}
          </div>

          <div class="orderActions">
            ${nextButtons}
          </div>
        </article>
      `;
    })
    .join("");

  // Atualização de status
  list.querySelectorAll("[data-status]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = Number(btn.dataset.status);
      const to = btn.dataset.to;
      const order = s.pedidos.find((item) => item.id === id);

      if (!order) {
        UI.toast("Pedido não encontrado.");
        return;
      }

      const validTransitions = {
        "Em preparação": "A caminho",
        "A caminho": "Entregue",
      };

      if (validTransitions[order.status] !== to) {
        UI.toast("Transição de status inválida.");
        return;
      }

      if (to === "Entregue") {
  const confirmed = await UI.confirm({
    title: "Finalizar pedido",
    message: `Confirma a entrega do pedido nº ${String(order.id).padStart(3, "0")}? Após finalizar, o pedido não poderá ser alterado pelo operador.`,
    confirmText: "Finalizar",
    cancelText: "Cancelar",
    danger: false,
  });

  if (!confirmed) return;
}

      const originalText = btn.textContent;

      btn.disabled = true;
      btn.textContent = "Atualizando...";

      try {
        await API.updateOrderStatus(id, to);

        UI.toast(`Pedido marcado como "${to}".`);
        await loadOrdersFromApi();
        await loadDashboardFromApi();
      } catch (err) {
        UI.toast(err.message || "Erro ao atualizar status.");

        btn.disabled = false;
        btn.textContent = originalText;
      }
    });
  });

    // Atualização do ETA
  list.querySelectorAll("[data-eta]").forEach((input) => {
    input.addEventListener("change", async () => {
      const id = Number(input.dataset.eta);
      const etaMin = Number(input.value);
      const order = s.pedidos.find((item) => item.id === id);

      if (!order) {
        UI.toast("Pedido não encontrado.");
        return;
      }

      if (!Number.isInteger(etaMin) || etaMin < 1 || etaMin > 240) {
        UI.highlightField(input);
        UI.toast("Informe um ETA entre 1 e 240 minutos.");
        input.value = order.etaMin;
        return;
      }

      const originalValue = order.etaMin;
      input.disabled = true;

      try {
        await API.updateOrderEta(id, etaMin);
        UI.toast("Tempo estimado atualizado.");
        await loadOrdersFromApi();       
      } catch (err) {
        input.value = originalValue;
        UI.toast(err.message || "Erro ao atualizar o tempo estimado.");
      } finally {
        input.disabled = false;
      }
    });
  });

  // Reabertura administrativa futura
  list.querySelectorAll("[data-reopen-order]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = Number(btn.dataset.reopenOrder);
      const order = s.pedidos.find((item) => item.id === id);

      if (!order) {
        UI.toast("Pedido não encontrado.");
        return;
      }

      const confirmed = await UI.confirm({
        title: "Reabrir pedido",
        message: `Deseja reabrir o pedido nº ${String(order.id).padStart(3, "0")} e voltar para "A caminho"?`,
        confirmText: "Reabrir",
        cancelText: "Cancelar",
        danger: false,
      });

      if (!confirmed) return;

      try {
        btn.disabled = true;
        btn.textContent = "Reabrindo...";

        await API.updateOrderStatus(id, "A caminho");

        UI.toast("Pedido reaberto com sucesso.");
        await loadOrdersFromApi();
        await loadDashboardFromApi();
      } catch (err) {
        UI.toast(err.message || "Erro ao reabrir pedido.");

        btn.disabled = false;
        btn.textContent = "Reabrir pedido";
      }
    });
  });
}

function setupOrderFilters() {
  const searchInput = document.getElementById("orderSearch");
  const sortSelect = document.getElementById("orderSort");
  const statusButtons = document.querySelectorAll("[data-order-filter]");

  if (sortSelect) sortSelect.value = orderSortMode;

  searchInput?.addEventListener("input", () => {
    orderSearchTerm = searchInput.value;
    renderOrders();
  });

  sortSelect?.addEventListener("change", () => {
    orderSortMode = sortSelect.value;
    renderOrders();
  });

  statusButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      orderStatusFilter = btn.dataset.orderFilter;

      statusButtons.forEach((item) => {
        item.classList.toggle("is-active", item === btn);
      });

      renderOrders();
    });
  });
}

function highlightSearchText(text, searchTerm) {
  const safeText = UI.escapeHtml(text);
  const term = String(searchTerm || "").trim();

  if (!term) return safeText;

  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedTerm})`, "gi");

  return safeText.replace(regex, "<mark>$1</mark>");
}

  function setupOrderForm() {
  document.getElementById("btnAddItem")?.addEventListener("click", () => {
    const select = document.getElementById("oProduto");
    const productId = select?.value;

    if (!productId) {
      UI.highlightField(select);
      UI.toast("Selecione um produto.");
      return;
    }

    addItemToPending(productId);
  });

  const form = document.getElementById("formPedido");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const clienteId = Number(document.getElementById("oCliente").value);
    const etaMin = Number(document.getElementById("oEta").value);
    const btn = form.querySelector("button[type='submit']");

    if (!clienteId) {
      UI.highlightField(document.getElementById("oCliente"));
      UI.toast("Selecione um cliente.");
      return;
    }

    if (!pendingItems.length) {
      UI.highlightField(document.getElementById("oProduto"));
      UI.toast("Adicione ao menos 1 produto.");
      return;
    }

    if (!Number.isInteger(etaMin) || etaMin < 1 || etaMin > 240) {
      UI.highlightField(document.getElementById("oEta"));
      UI.toast("Informe um ETA entre 1 e 240 minutos.");
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.dataset.text ||= btn.textContent;
      btn.textContent = "Criando...";
    }

    try {
      UI.showLoading("Criando pedido...");

      await API.createOrder({
        customerId: clienteId,
        etaMin,
        items: pendingItems.map((item) => ({
          productId: item.produtoId,
          quantity: item.qtd,
        })),
      });

      UI.toast("Pedido criado com sucesso.");

      pendingItems = [];
      form.reset();

      const etaField = document.getElementById("oEta");
      if (etaField) etaField.value = "20";

      refreshOrderInputs();
      await loadOrdersFromApi();
      await loadDashboardFromApi();
    } catch (err) {
      UI.toast(err.message || "Erro ao criar pedido.");
    } finally {
      UI.hideLoading();

      if (btn) {
        btn.disabled = false;
        btn.textContent = btn.dataset.text || "Criar Pedido";
      }
    }
  });
}
  // ---------- SETTINGS ----------
  function setupDarkMode() {
    const toggle = document.getElementById("darkToggle");
    if (!toggle) return;

    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", saved);
    toggle.checked = saved === "dark";

    toggle.addEventListener("change", () => {
      const theme = toggle.checked ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      UI.toast(theme === "dark" ? "Modo escuro ativado." : "Modo claro ativado.");
    });
  }

  function init() {
    Store.seedDemoIfEmpty();

    setupNav();
    setupLogout();

    setupMobileMenu(); // ✅ NOVO (menu mobile + overlay)

    setupDropzone();
    setupProdutoForm();

    setupClientes(); // ✅ NOVO

    setupUserSuggest();
    setupUsuarioForm();
       
    setupOrderForm();
    setupOrderFilters()
    setupDarkMode();

   loadProdutosFromApi();
   loadClientesFromApi();

   loadUsuariosFromApi();
   loadOrdersFromApi();
   loadDashboardFromApi();
  }

  return { init };
})();
