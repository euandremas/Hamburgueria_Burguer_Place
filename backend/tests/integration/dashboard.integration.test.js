const request = require("supertest");
const app = require("../../src/app");
const prisma = require("../../src/config/prisma");

describe("Integração do dashboard", () => {
    const username = `teste.dashboard.${Date.now()}`;

    let token;

    beforeAll(async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Usuário Dashboard",
                username,
                password: "123456"
            });

        expect(response.status).toBe(201);
        token = response.body.data.token;
    });

    afterAll(async () => {
        await prisma.user.deleteMany({
            where: { username }
        });

        await prisma.$disconnect();
    });

    test("deve retornar os indicadores do dashboard", async () => {
        const response = await request(app)
            .get("/dashboard")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);

        expect(response.body.data).toEqual(
            expect.objectContaining({
                totalProducts: expect.any(Number),
                totalCustomers: expect.any(Number),
                totalOrders: expect.any(Number),
                preparingOrders: expect.any(Number),
                onTheWayOrders: expect.any(Number),
                deliveredOrders: expect.any(Number),
                totalRevenue: expect.any(Number),
                averageTicket: expect.any(Number),
                bestSeller: expect.any(Object),
                topCustomer: expect.any(Object),
                topProducts: expect.any(Array),
                recentActivities: expect.any(Array)
            })
        );
    });
});