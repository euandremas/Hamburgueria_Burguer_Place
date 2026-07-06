const bcrypt = require("bcryptjs");

const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

async function list() {
  return prisma.user.findMany({
    orderBy: { id: "asc" },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function create(data) {
  const name = String(data.name || "").trim();
  const username = String(data.username || "").trim().toLowerCase();
  const password = String(data.password || "");

  if (!name || !username || password.length < 6) {
    throw new AppError("Nome, usuário e senha mínima de 6 caracteres são obrigatórios.", 400, "VALIDATION_ERROR");
  }

  const exists = await prisma.user.findUnique({
    where: { username },
  });

  if (exists) {
    throw new AppError("Usuário indisponível. Escolha outro.", 400, "USERNAME_UNAVAILABLE");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      name,
      username,
      passwordHash,
      role: data.role || "admin",
    },
    select: {
      id: true,
      name: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

async function remove(id) {
  const userId = Number(id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("Usuário não encontrado.", 404, "USER_NOT_FOUND");
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  return { message: "Usuário removido com sucesso." };
}

module.exports = { list, create, remove };