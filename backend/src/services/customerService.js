const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");
const { createActivity } = require("./activityService");

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function validateCustomer(data) {
  if (!data.name || !data.email) {
    throw new AppError("Nome e e-mail são obrigatórios.", 400, "VALIDATION_ERROR");
  }
  if (onlyDigits(data.zipCode).length !== 8) {
    throw new AppError("CEP deve conter 8 dígitos.", 400, "INVALID_ZIP_CODE");
  }
  if (!data.street || !data.neighborhood || !data.city || !data.state || !data.number) {
    throw new AppError("Endereço completo é obrigatório.", 400, "ADDRESS_REQUIRED");
  }
}

function normalize(data) {
  return {
    name: data.name,
    phone: data.phone || null,
    email: data.email,
    zipCode: onlyDigits(data.zipCode),
    street: data.street,
    neighborhood: data.neighborhood,
    city: data.city,
    state: String(data.state || "").toUpperCase(),
    number: String(data.number)
  };
}

async function list() {
  return prisma.customer.findMany({ orderBy: { id: "asc" } });
}

async function findById(id) {
  const customer = await prisma.customer.findUnique({ where: { id: Number(id) } });
  if (!customer) throw new AppError("Cliente não encontrado.", 404, "CUSTOMER_NOT_FOUND");
  return customer;
}

async function create(data) {
  validateCustomer(data);
  const customer = await prisma.customer.create({ data: normalize(data) });
  await createActivity({ type: "new", title: "Cliente cadastrado", subtitle: `Cliente: ${customer.name}` });
  return customer;
}

async function update(id, data) {
  await findById(id);
  validateCustomer(data);
  return prisma.customer.update({ where: { id: Number(id) }, data: normalize(data) });
}

async function remove(id) {
  const customer = await findById(id);
  const hasOrders = await prisma.order.count({ where: { customerId: Number(id) } });

  if (hasOrders > 0) {
    throw new AppError("Não é possível excluir: cliente possui pedidos vinculados.", 409, "CUSTOMER_HAS_ORDERS");
  }

  await prisma.customer.delete({ where: { id: Number(id) } });
  await createActivity({ type: "new", title: "Cliente removido", subtitle: `Cliente: ${customer.name}` });
  return { message: "Cliente removido com sucesso." };
}

module.exports = { list, findById, create, update, remove };
