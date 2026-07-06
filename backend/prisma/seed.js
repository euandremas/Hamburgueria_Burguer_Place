require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.product.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.createMany({
    data: [
      { name: "Administrador", username: "admin", passwordHash, role: "admin"},
      { name: "Maria Oliveira", username: "maria.oliveira", passwordHash, role: "admin" },
      { name: "Pedro Santos", username: "pedro.santos", passwordHash, role: "admin" },
      { name: "Ana Silva", username: "ana.silva", passwordHash, role: "admin" }
    ]
  });

  const maria = await prisma.customer.create({
    data: { name: "Maria Oliveira", phone: "(11) 98888-1111", email: "maria@email.com", zipCode: "01001000", street: "Praça da Sé", neighborhood: "Sé", city: "São Paulo", state: "SP", number: "100" }
  });
  const pedro = await prisma.customer.create({
    data: { name: "Pedro Santos", phone: "(11) 97777-2222", email: "pedro@email.com", zipCode: "01310000", street: "Avenida Paulista", neighborhood: "Bela Vista", city: "São Paulo", state: "SP", number: "1578" }
  });
  const ana = await prisma.customer.create({
    data: { name: "Ana Silva", phone: "(11) 96666-3333", email: "ana@email.com", zipCode: "20040020", street: "Rua da Assembleia", neighborhood: "Centro", city: "Rio de Janeiro", state: "RJ", number: "50" }
  });

  const xBacon = await prisma.product.create({ data: { type: "Hambúrguer", name: "X-Bacon", description: "Hambúrguer, bacon crocante, queijo cheddar, alface e tomate", price: 25.9 } });
  const xBurger = await prisma.product.create({ data: { type: "Hambúrguer", name: "X-Burger Especial", description: "Hambúrguer artesanal 180g, queijo suíço, cebola caramelizada e molho", price: 32.9 } });
  await prisma.product.create({ data: { type: "Hambúrguer", name: "X-Salada", description: "Hambúrguer, queijo, alface, tomate, cebola e maionese", price: 22.9 } });
await prisma.order.create({
  data: {
      customerId: maria.id,
      status: "Em preparação",
      etaMin: 25,
      items: { create: [{ productId: xBurger.id, productName: xBurger.name, unitPrice: xBurger.price, quantity: 2 }] }
    }
  });

  await prisma.order.create({
  data: {
      customerId: pedro.id,
      status: "Em preparação",
      etaMin: 15,
      items: { create: [{ productId: xBacon.id, productName: xBacon.name, unitPrice: xBacon.price, quantity: 2 }] }
    }
  });

  await prisma.order.create({
  data: {
      customerId: ana.id,
      status: "Entregue",
      etaMin: 0,
      items: { create: [
        { productId: xBurger.id, productName: xBurger.name, unitPrice: xBurger.price, quantity: 1 },
        { productId: xBacon.id, productName: xBacon.name, unitPrice: xBacon.price, quantity: 1 }
      ] }
    }
  });

  await prisma.activity.createMany({
  data: [
    {
      type: "done",
      title: "Pedido nº 003 entregue",
      subtitle: "Cliente: Ana Silva"
    },
    {
      type: "prep",
      title: "Pedido nº 002 em preparação",
      subtitle: "Cliente: Pedro Santos"
    },
    {
      type: "new",
      title: "Pedido nº 001 criado",
      subtitle: "Cliente: Maria Oliveira"
    }
  ]
});

  console.log("Seed concluído. Usuário demo: maria.oliveira / 123456");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
