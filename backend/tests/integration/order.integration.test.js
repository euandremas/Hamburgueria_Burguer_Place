const request = require("supertest");
const app = require("../../src/app");
const prisma = require("../../src/config/prisma");

describe("Integração de pedidos", () => {
    const suffix = Date.now();
    const username = `teste.pedido.${suffix}`;
    const customerName = `Cliente Pedido ${suffix}`;
    const productName = `Produto Pedido ${suffix}`;

    let token;
    let customerId;
    let productId;
    let orderId;

    beforeAll(async () => {
        const authResponse = await request(app)
            .post("/auth/register")
            .send({
                name: "Usuário Pedido",
                username,
                password: "123456"
            });

        expect(authResponse.status).toBe(201);
        token = authResponse.body.data.token;

        const customer = await prisma.customer.create({
            data: {
                name: customerName,
                phone: "11999999999",
                email: `pedido.${suffix}@teste.com`,
                zipCode: "01001000",
                street: "Praça da Sé",
                neighborhood: "Sé",
                city: "São Paulo",
                state: "SP",
                number: "100"
            }
        });

        customerId = customer.id;

        const product = await prisma.product.create({
            data: {
                type: "Hambúrguer",
                name: productName,
                description: "Produto utilizado no teste de pedido",
                price: "19.90"
            }
        });

        productId = product.id;
    });

    afterAll(async () => {
        if (orderId) {
            await prisma.orderItem.deleteMany({
                where: { orderId }
            });

            await prisma.order.deleteMany({
                where: { id: orderId }
            });
        }

        await prisma.activity.deleteMany({
            where: {
                subtitle: {
                    contains: customerName
                }
            }
        });

        if (productId) {
            await prisma.product.deleteMany({
                where: { id: productId }
            });
        }

        if (customerId) {
            await prisma.customer.deleteMany({
                where: { id: customerId }
            });
        }

        await prisma.user.deleteMany({
            where: { username }
        });

        await prisma.$disconnect();
    });

    test("deve rejeitar pedido sem cliente", async () => {
        const response = await request(app)
            .post("/orders")
            .set("Authorization", `Bearer ${token}`)
            .send({
                items: [
                    {
                        productId,
                        quantity: 1
                    }
                ]
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.error.code).toBe("CUSTOMER_REQUIRED");
    });

    test("deve rejeitar pedido sem itens", async () => {
        const response = await request(app)
            .post("/orders")
            .set("Authorization", `Bearer ${token}`)
            .send({
                customerId,
                items: []
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.error.code).toBe("ORDER_ITEMS_REQUIRED");
    });

    test("deve executar o fluxo completo de um pedido", async () => {
        const createResponse = await request(app)
            .post("/orders")
            .set("Authorization", `Bearer ${token}`)
            .send({
                customerId,
                etaMin: 25,
                items: [
                    {
                        productId,
                        quantity: 2
                    }
                ]
            });

        expect(createResponse.status).toBe(201);
        expect(createResponse.body.success).toBe(true);
        expect(createResponse.body.data.customerId).toBe(customerId);
        expect(createResponse.body.data.items).toHaveLength(1);
        expect(createResponse.body.data.total).toBeCloseTo(39.8);

        orderId = createResponse.body.data.id;

        const findResponse = await request(app)
            .get(`/orders/${orderId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(findResponse.status).toBe(200);
        expect(findResponse.body.data.id).toBe(orderId);

        const listResponse = await request(app)
            .get("/orders")
            .set("Authorization", `Bearer ${token}`);

        expect(listResponse.status).toBe(200);
        expect(
            listResponse.body.data.some((order) => order.id === orderId)
        ).toBe(true);

        const invalidStatusResponse = await request(app)
            .put(`/orders/${orderId}/status`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                status: "Status inexistente"
            });

        expect(invalidStatusResponse.status).toBe(400);
        expect(invalidStatusResponse.body.error.code).toBe("INVALID_STATUS");

        const statusResponse = await request(app)
            .put(`/orders/${orderId}/status`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                status: "A caminho"
            });

        expect(statusResponse.status).toBe(200);
        expect(statusResponse.body.data.status).toBe("A caminho");

        const invalidEtaResponse = await request(app)
            .put(`/orders/${orderId}/eta`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                etaMin: -1
            });

        expect(invalidEtaResponse.status).toBe(400);
        expect(invalidEtaResponse.body.error.code).toBe("INVALID_ETA");

        const etaResponse = await request(app)
            .put(`/orders/${orderId}/eta`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                etaMin: 10
            });

        expect(etaResponse.status).toBe(200);
        expect(etaResponse.body.data.etaMin).toBe(10);

        const deliveredResponse = await request(app)
            .put(`/orders/${orderId}/status`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                status: "Entregue"
            });

        expect(deliveredResponse.status).toBe(200);
        expect(deliveredResponse.body.data.status).toBe("Entregue");
        expect(deliveredResponse.body.data.etaMin).toBe(0);

        const deleteResponse = await request(app)
            .delete(`/orders/${orderId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.success).toBe(true);

        const deletedResponse = await request(app)
            .get(`/orders/${orderId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(deletedResponse.status).toBe(404);
        expect(deletedResponse.body.error.code).toBe("ORDER_NOT_FOUND");

        orderId = null;
    });
});