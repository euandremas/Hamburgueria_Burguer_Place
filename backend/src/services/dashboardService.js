const prisma = require("../config/prisma");
const { listRecent } = require("./activityService");

async function getSummary() {
  const [totalOrders, inProgressOrders, deliveredOrders, totalProducts, activities] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: { not: "Entregue" } } }),
    prisma.order.count({ where: { status: "Entregue" } }),
    prisma.product.count(),
    listRecent(8)
  ]);

  return { totalOrders, inProgressOrders, deliveredOrders, totalProducts, activities };
}

module.exports = { getSummary };
