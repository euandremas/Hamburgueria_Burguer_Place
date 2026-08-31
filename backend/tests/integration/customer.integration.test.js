const request = require("supertest");
const app = require("../../src/app");
const prisma = require("../../src/config/prisma");

describe("Integração de clientes", () => {
    const suffix = Date.now();
    const username = `teste.cliente.${suffix}`;
    const customerName = `Cliente Integração ${suffix}`;

    let token;
    let customerId;

    beforeAll(async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Usuário Cliente",
                username,
                password: "123456"
            });

        expect(response.status).toBe(201);
        token = response.body.data.token;
    });

    afterAll(async () => {
        if (customerId) {
            await prisma.customer.deleteMany({
                where: { id: customerId }
            });
        }

        await prisma.activity.deleteMany({
            where: {
                subtitle: {
                    contains: customerName
                }
            }
        });

        await prisma.user.deleteMany({
            where: { username }
        });

        await prisma.$disconnect();
    });

    test("deve executar o CRUD completo de clientes", async () => {
        const createResponse = await request(app)
            .post("/customers")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: customerName,
                phone: "11999999999",
                email: `cliente.${suffix}@teste.com`,
                zipCode: "01001000",
                street: "Praça da Sé",
                neighborhood: "Sé",
                city: "São Paulo",
                state: "SP",
                number: "100"
            });

        expect(createResponse.status).toBe(201);
        expect(createResponse.body.success).toBe(true);

        customerId = createResponse.body.data.id;

        const findResponse = await request(app)
            .get(`/customers/${customerId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(findResponse.status).toBe(200);
        expect(findResponse.body.data.name).toBe(customerName);

        const listResponse = await request(app)
            .get("/customers")
            .set("Authorization", `Bearer ${token}`);

        expect(listResponse.status).toBe(200);
        expect(
            listResponse.body.data.some(
                (customer) => customer.id === customerId
            )
        ).toBe(true);

        const updateResponse = await request(app)
            .put(`/customers/${customerId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: `${customerName} Atualizado`,
                phone: "11888888888",
                email: `cliente.atualizado.${suffix}@teste.com`,
                zipCode: "01001000",
                street: "Praça da Sé",
                neighborhood: "Sé",
                city: "São Paulo",
                state: "SP",
                number: "200"
            });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.data.name).toBe(
            `${customerName} Atualizado`
        );

        const deleteResponse = await request(app)
            .delete(`/customers/${customerId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.success).toBe(true);

        const deletedResponse = await request(app)
            .get(`/customers/${customerId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(deletedResponse.status).toBe(404);

        customerId = null;
    });
});