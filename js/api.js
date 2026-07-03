const API_BASE_URL = "http://localhost:3333";

function getToken() {
  return localStorage.getItem("token");
}

async function request(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Erro na requisição.");
  }

  return data;
}

const API = {
  // AUTH
  login(credentials) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  register(user) {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
    });
  },

  // PRODUTOS
  getProducts() {
    return request("/products");
  },

  getProduct(id) {
    return request(`/products/${id}`);
  },

  createProduct(product) {
    return request("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
  },

  updateProduct(id, product) {
    return request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });
  },

  deleteProduct(id) {
    return request(`/products/${id}`, {
      method: "DELETE",
    });
  },

  // CLIENTES
  getCustomers() {
    return request("/customers");
  },

  createCustomer(customer) {
    return request("/customers", {
      method: "POST",
      body: JSON.stringify(customer),
    });
  },

  updateCustomer(id, customer) {
    return request(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(customer),
    });
  },

  deleteCustomer(id) {
    return request(`/customers/${id}`, {
      method: "DELETE",
    });
  },

  // PEDIDOS
  getOrders() {
    return request("/orders");
  },

  createOrder(order) {
    return request("/orders", {
      method: "POST",
      body: JSON.stringify(order),
    });
  },

  updateOrder(id, order) {
    return request(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(order),
    });
  },

  // DASHBOARD
  getDashboard() {
    return request("/dashboard");
  },

  // CEP
  getCep(cep) {
    return request(`/cep/${cep}`);
  },
};