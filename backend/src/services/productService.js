const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");
const { createActivity } = require("./activityService");

function validateProduct(data) {
  if (!data.type || !data.name || !data.description) {
    throw new AppError("Tipo, nome e descrição são obrigatórios.", 400, "VALIDATION_ERROR");
  }
  const price = Number(data.price);
  if (!Number.isFinite(price) || price <= 0) {
    throw new AppError("Preço deve ser um número maior que zero.", 400, "INVALID_PRICE");
  }
  return price;
}

async function list() {
  return prisma.product.findMany({ orderBy: { id: "asc" } });
}

async function findById(id) {
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!product) throw new AppError("Produto não encontrado.", 404, "PRODUCT_NOT_FOUND");
  return product;
}

async function create(data) {
  const price = validateProduct(data);
  const product = await prisma.product.create({
    data: {
      type: data.type,
      name: data.name,
      description: data.description,
      price,
      imageUrl: data.imageUrl || null
    }
  });
  await createActivity({ type: "new", title: "Produto cadastrado", subtitle: `Produto: ${product.name}` });
  return product;
}

async function update(id, data) {
  await findById(id);
  const price = validateProduct(data);
  return prisma.product.update({
    where: { id: Number(id) },
    data: {
      type: data.type,
      name: data.name,
      description: data.description,
      price,
      imageUrl: data.imageUrl || null
    }
  });
}

async function remove(id) {
  const product = await findById(id);
  await prisma.product.delete({ where: { id: Number(id) } });
  await createActivity({ type: "new", title: "Produto removido", subtitle: `Produto: ${product.name}` });
  return { message: "Produto removido com sucesso." };
}

module.exports = { list, findById, create, update, remove };
