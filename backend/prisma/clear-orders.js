require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.activity.deleteMany();

  await prisma.$executeRawUnsafe(`
    SELECT setval(pg_get_serial_sequence('orders', 'id'), 1, false);
  `);

  await prisma.$executeRawUnsafe(`
    SELECT setval(pg_get_serial_sequence('order_items', 'id'), 1, false);
  `);

  await prisma.$executeRawUnsafe(`
    SELECT setval(pg_get_serial_sequence('activities', 'id'), 1, false);
  `);

  console.log("Pedidos, itens e atividades zerados. Clientes, produtos e usuários preservados.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });