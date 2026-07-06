const prisma = require("../src/config/prisma");

async function main() {
  await prisma.$executeRawUnsafe(`
    SELECT setval(pg_get_serial_sequence('orders', 'id'), COALESCE((SELECT MAX(id) FROM orders), 1), true);
  `);

  await prisma.$executeRawUnsafe(`
    SELECT setval(pg_get_serial_sequence('order_items', 'id'), COALESCE((SELECT MAX(id) FROM order_items), 1), true);
  `);

  console.log("Sequences de orders e order_items corrigidas.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });