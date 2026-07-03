const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

function signToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
}

async function register({ name, username, password, role = "admin" }) {
  if (!name || !username || !password) {
    throw new AppError("Nome, usuário e senha são obrigatórios.", 400, "VALIDATION_ERROR");
  }

  if (String(password).length < 6) {
    throw new AppError("A senha deve ter no mínimo 6 caracteres.", 400, "PASSWORD_TOO_SHORT");
  }

  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) {
    throw new AppError("Nome de usuário já cadastrado.", 409, "USERNAME_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, username, passwordHash, role },
    select: { id: true, name: true, username: true, role: true, createdAt: true }
  });

  return { user, token: signToken(user) };
}

async function login({ username, password }) {
  if (!username || !password) {
    throw new AppError("Usuário e senha são obrigatórios.", 400, "VALIDATION_ERROR");
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    throw new AppError("Credenciais inválidas.", 401, "INVALID_CREDENTIALS");
  }

  const passwordOk = await bcrypt.compare(password, user.passwordHash);
  if (!passwordOk) {
    throw new AppError("Credenciais inválidas.", 401, "INVALID_CREDENTIALS");
  }

  return {
    user: { id: user.id, name: user.name, username: user.username, role: user.role },
    token: signToken(user)
  };
}

async function me(userId) {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: { id: true, name: true, username: true, role: true, createdAt: true }
  });

  if (!user) throw new AppError("Usuário não encontrado.", 404, "USER_NOT_FOUND");
  return user;
}

module.exports = { register, login, me };
