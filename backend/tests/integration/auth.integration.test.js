const request = require("supertest");
const app = require("../../src/app");
const prisma = require("../../src/config/prisma");

describe("Integração de autenticação", () => {
    const username = `teste.integracao.${Date.now()}`;
    const password = "123456";

    afterAll(async () => {
        await prisma.user.deleteMany({
            where: {
                username: {
                    startsWith: "teste.integracao."
                }
            }
        });

        await prisma.$disconnect();
    });

    test("deve cadastrar usuário, autenticar e acessar rota protegida", async () => {
        const registerResponse = await request(app)
            .post("/auth/register")
            .send({
                name: "Usuário Integração",
                username,
                password
            });

        expect(registerResponse.status).toBe(201);
        expect(registerResponse.body.success).toBe(true);
        expect(registerResponse.body.data.user.username).toBe(username);

        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                username,
                password
            });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.success).toBe(true);

        const token = loginResponse.body.data.token;

        const meResponse = await request(app)
            .get("/auth/me")
            .set("Authorization", `Bearer ${token}`);

        expect(meResponse.status).toBe(200);
        expect(meResponse.body.success).toBe(true);
        expect(meResponse.body.data.username).toBe(username);
    });
});