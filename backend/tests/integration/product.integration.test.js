const request = require("supertest");
const app = require("../../src/app");
const prisma = require("../../src/config/prisma");

describe("Integração de produtos", () => {
    const suffix = Date.now();
    const username = `teste.produto.${suffix}`;
    const productName = `Produto Integração ${suffix}`;

    let token;
    let productId;

    beforeAll(async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Usuário Produto",
                username,
                password: "123456"
            });

        expect(response.status).toBe(201);
        token = response.body.data.token;
    });

    afterAll(async () => {
        if (productId) {
            await prisma.product.deleteMany({
                where: { id: productId }
            });
        }

        await prisma.activity.deleteMany({
            where: {
                subtitle: `Produto: ${productName}`
            }
        });

        await prisma.user.deleteMany({
            where: { username }
        });

        await prisma.$disconnect();
    });

    test("deve executar o CRUD completo de produtos", async () => {
        const createResponse = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${token}`)
            .send({
                type: "Hambúrguer",
                name: productName,
                description: "Produto criado pelo teste de integração",
                price: 29.9
            });

        expect(createResponse.status).toBe(201);
        expect(createResponse.body.success).toBe(true);

        productId = createResponse.body.data.id;

        const findResponse = await request(app)
            .get(`/products/${productId}`);

        expect(findResponse.status).toBe(200);
        expect(findResponse.body.data.name).toBe(productName);

        const listResponse = await request(app)
            .get("/products");

        expect(listResponse.status).toBe(200);
        expect(
            listResponse.body.data.some((product) => product.id === productId)
        ).toBe(true);

        const updateResponse = await request(app)
            .put(`/products/${productId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: `${productName} Atualizado`,
                price: 34.9
            });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.data.name).toBe(
            `${productName} Atualizado`
        );

        const deleteResponse = await request(app)
            .delete(`/products/${productId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.success).toBe(true);

        const deletedResponse = await request(app)
            .get(`/products/${productId}`);

        expect(deletedResponse.status).toBe(404);
        expect(deletedResponse.body.success).toBe(false);

        productId = null;
    });
});