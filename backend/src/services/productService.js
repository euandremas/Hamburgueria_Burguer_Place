const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");
const { createActivity } = require("./activityService");

function normalizeProductData(data, isPartial = false) {
  const hasType = data.type !== undefined;
  const hasName = data.name !== undefined;
  const hasDescription = data.description !== undefined;
  const hasPrice = data.price !== undefined;

  if (!isPartial && (!data.type || !data.name || !data.description || data.price === undefined)) {
    throw new AppError("Tipo, nome, descrição e preço são obrigatórios.", 400, "VALIDATION_ERROR");
  }

  const payload = {};

  if (hasType) {
    if (!String(data.type).trim()) throw new AppError("Tipo é obrigatório.", 400, "VALIDATION_ERROR");
    payload.type = String(data.type).trim();
  }

  if (hasName) {
    if (!String(data.name).trim()) throw new AppError("Nome é obrigatório.", 400, "VALIDATION_ERROR");
    payload.name = String(data.name).trim();
  }

  if (hasDescription) {
    if (!String(data.description).trim()) throw new AppError("Descrição é obrigatória.", 400, "VALIDATION_ERROR");
    payload.description = String(data.description).trim();
  }

  if (hasPrice) {
    const price = Number(data.price);

    if (!Number.isFinite(price) || price <= 0) {
      throw new AppError("Preço deve ser um número maior que zero.", 400, "INVALID_PRICE");
    }

    payload.price = price.toFixed(2);
  }

  if (data.imageUrl !== undefined) {
    payload.imageUrl = data.imageUrl || null;
  }

  return payload;
}

async function list() {
  return prisma.product.findMany({ orderBy: { id: "asc" } });
}

async function findById(id) {
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });

  if (!product) {
    throw new AppError("Produto não encontrado.", 404, "PRODUCT_NOT_FOUND");
  }

  return product;
}

async function create(data) {
  const productData = normalizeProductData(data);

  const product = await prisma.product.create({ data: productData });

  await createActivity({
    type: "new",
    title: "Produto cadastrado",
    subtitle: `Produto: ${product.name}`
  });

  return product;
}

async function update(id, data) {
  await findById(id);

  const productData = normalizeProductData(data, true);

  if (!Object.keys(productData).length) {
    throw new AppError("Nenhum dado válido informado para atualização.", 400, "VALIDATION_ERROR");
  }

  return prisma.product.update({
    where: { id: Number(id) },
    data: productData
  });
}

async function remove(id) {
  const product = await findById(id);

  await prisma.product.delete({ where: { id: Number(id) } });

  await createActivity({
    type: "new",
    title: "Produto removido",
    subtitle: `Produto: ${product.name}`
  });

  return { message: "Produto removido com sucesso." };
}

module.exports = { list, findById, create, update, remove };