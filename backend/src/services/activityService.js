const prisma = require("../config/prisma");

async function createActivity({ type = "new", title, subtitle }) {
  if (!title) return null;
  return prisma.activity.create({ data: { type, title, subtitle } });
}

async function listRecent(limit = 8) {
  return prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
    take: Number(limit) || 8
  });
}

module.exports = { createActivity, listRecent };
