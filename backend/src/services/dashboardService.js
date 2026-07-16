const prisma = require("../config/prisma");

function calculateRevenue(orders) {
  return orders.reduce((sum, order) => {
    const orderTotal = order.items.reduce((subtotal, item) => {
      return subtotal + item.quantity * Number(item.product.price);
    }, 0);

    return sum + orderTotal;
  }, 0);
}

function calculateAverageTicket(totalRevenue, totalOrders) {
  if (totalOrders === 0) return 0;

  return totalRevenue / totalOrders;
}
function calculateBestSeller(orders) {
  const productTotals = new Map();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const current = productTotals.get(item.productId) || {
        name: item.product.name,
        quantity: 0,
      };

      current.quantity += item.quantity;
      productTotals.set(item.productId, current);
    });
  });

  return (
    [...productTotals.values()].sort((a, b) => b.quantity - a.quantity)[0] || {
      name: "Nenhum produto",
      quantity: 0,
    }
  );
}

function calculateTopCustomer(orders) {
  const customerTotals = new Map();

  orders.forEach((order) => {
    if (!order.customer) return;

    const current = customerTotals.get(order.customerId) || {
      name: order.customer.name,
      orders: 0,
    };

    current.orders += 1;
    customerTotals.set(order.customerId, current);
  });

  return (
    [...customerTotals.values()].sort((a, b) => b.orders - a.orders)[0] || {
      name: "Nenhum cliente",
      orders: 0,
    }
  );
}
function calculateTopProducts(orders, limit = 5) {
  const productTotals = new Map();

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const current = productTotals.get(item.productId) || {
        name: item.product.name,
        quantity: 0,
      };

      current.quantity += item.quantity;
      productTotals.set(item.productId, current);
    });
  });

  return [...productTotals.values()]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
}
function calculateRevenueByDay(orders, days = 7) {
  const now = new Date();

  const result = Array.from({ length: days }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (days - 1 - index));
    date.setHours(0, 0, 0, 0);

    return {
      date,
      label: date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      revenue: 0,
    };
  });

  orders.forEach((order) => {
    const orderDate = new Date(order.createdAt);
    orderDate.setHours(0, 0, 0, 0);

    const day = result.find(
      (item) => item.date.getTime() === orderDate.getTime()
    );

    if (!day) return;

    const orderTotal = order.items.reduce((sum, item) => {
      return sum + item.quantity * Number(item.product.price);
    }, 0);

    day.revenue += orderTotal;
  });

  return result.map((item) => ({
    label: item.label,
    revenue: Number(item.revenue.toFixed(2)),
  }));
}
async function getDashboard() {
  const [
    totalProducts,
    totalCustomers,
    totalOrders,
    preparingOrders,
    onTheWayOrders,
    deliveredOrders,
    orders,
    recentActivities,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.customer.count(),
    prisma.order.count(),
    prisma.order.count({
      where: {
        status: "Em preparação",
      },
    }),
    prisma.order.count({
      where: {
        status: "A caminho",
      },
    }),
    prisma.order.count({
      where: {
        status: "Entregue",
      },
    }),
    prisma.order.findMany({
  include: {
    customer: true,
    items: {
      include: {
        product: true,
      },
    },
  },
}),
    prisma.activity.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  const totalRevenue = calculateRevenue(orders);
  const averageTicket = calculateAverageTicket(totalRevenue, totalOrders);
  const bestSeller = calculateBestSeller(orders);
  const topCustomer = calculateTopCustomer(orders);
  const topProducts = calculateTopProducts(orders);
  const revenueByDay = calculateRevenueByDay(orders);

return {
  totalProducts,
  totalCustomers,
  totalOrders,
  preparingOrders,
  onTheWayOrders,
  deliveredOrders,
  totalRevenue,
  averageTicket,
  bestSeller,
  topCustomer,
  topProducts,
  revenueByDay,
  recentActivities,
};
}

module.exports = {
  getDashboard,
};