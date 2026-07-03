const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");
const { createActivity } = require("./activityService");

const VALID_STATUSES = ["Em preparação", "A caminho", "Entregue"];

function serializeOrder(order) {
  const total = order.items.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);
  return { ...order, total };
}

async function list() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true, items: true }
  });
  return orders.map(serializeOrder);
}

async function findById(id) {
  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: { customer: true, items: true }
  });
  if (!order) throw new AppError("Pedido não encontrado.", 404, "ORDER_NOT_FOUND");
  return serializeOrder(order);
}

async function create(data) {
  const customerId = Number(data.customerId);
  const items = Array.isArray(data.items) ? data.items : [];

  if (!customerId) throw new AppError("Cliente é obrigatório para criar pedido.", 400, "CUSTOMER_REQUIRED");
  if (!items.length) throw new AppError("Pedido deve possuir ao menos um item.", 400, "ORDER_ITEMS_REQUIRED");

  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) throw new AppError("Cliente informado não existe.", 404, "CUSTOMER_NOT_FOUND");

  const productIds = items.map((item) => Number(item.productId));
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  if (products.length !== productIds.length) {
    throw new AppError("Um ou mais produtos do pedido não foram encontrados.", 404, "PRODUCT_NOT_FOUND");
  }

  const productsById = new Map(products.map((p) => [p.id, p]));
  const etaMin = Number(data.etaMin || 20);

  const order = await prisma.order.create({
    data: {
      customerId,
      status: data.status && VALID_STATUSES.includes(data.status) ? data.status : "Em preparação",
      etaMin: etaMin > 0 ? etaMin : 20,
      items: {
        create: items.map((item) => {
          const product = productsById.get(Number(item.productId));
          const quantity = Number(item.quantity || item.qtd || 1);
          if (quantity < 1) throw new AppError("Quantidade deve ser maior que zero.", 400, "INVALID_QUANTITY");
          return {
            productId: product.id,
            productName: product.name,
            unitPrice: product.price,
            quantity
          };
        })
      }
    },
    include: { customer: true, items: true }
  });

  await createActivity({ type: "new", title: "Novo pedido", subtitle: `Cliente: ${customer.name}` });
  return serializeOrder(order);
}

async function updateStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new AppError("Status inválido.", 400, "INVALID_STATUS");
  }

  const current = await findById(id);
  const order = await prisma.order.update({
    where: { id: Number(id) },
    data: { status, etaMin: status === "Entregue" ? 0 : current.etaMin },
    include: { customer: true, items: true }
  });

  await createActivity({
    type: status === "Entregue" ? "done" : "prep",
    title: `Pedido nº ${String(order.id).padStart(3, "0")} ${status.toLowerCase()}`,
    subtitle: `Cliente: ${order.customer.name}`
  });

  return serializeOrder(order);
}

async function updateEta(id, etaMin) {
  const value = Number(etaMin);
  if (!Number.isInteger(value) || value < 0) {
    throw new AppError("ETA deve ser um número inteiro maior ou igual a zero.", 400, "INVALID_ETA");
  }
  await findById(id);
  const order = await prisma.order.update({
    where: { id: Number(id) },
    data: { etaMin: value },
    include: { customer: true, items: true }
  });
  return serializeOrder(order);
}

async function remove(id) {
  await findById(id);
  await prisma.order.delete({ where: { id: Number(id) } });
  return { message: "Pedido removido com sucesso." };
}

module.exports = { list, findById, create, updateStatus, updateEta, remove };
