const prisma = require("../config/prisma");

async function getDashboard() {
  const [
    totalProducts,
    totalCustomers,
    totalOrders,
    preparingOrders,
    deliveredOrders,
    recentActivities
  ] = await Promise.all([
    prisma.product.count(),
    prisma.customer.count(),
    prisma.order.count(),
    prisma.order.count({
      where: {
        status: "Em preparação"
      }
    }),
    prisma.order.count({
      where: {
        status: "Entregue"
      }
    }),
    prisma.activity.findMany({
      orderBy: {
        createdAt: "desc"
      },
      take: 5
    })
  ]);

  return {
    totalProducts,
    totalCustomers,
    totalOrders,
    preparingOrders,
    deliveredOrders,
    recentActivities
  };
}

module.exports = {
  getDashboard
};
