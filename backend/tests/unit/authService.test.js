jest.mock("../../src/config/prisma", () => ({
    user: {
        findUnique: jest.fn(),
        create: jest.fn()
    }
}));

jest.mock("bcryptjs", () => ({
    hash: jest.fn(),
    compare: jest.fn()
}));

jest.mock("jsonwebtoken", () => ({
    sign: jest.fn()
}));

const prisma = require("../../src/config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authService = require("../../src/services/authService");

describe("authService", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        process.env.JWT_SECRET = "test-secret";
        process.env.JWT_EXPIRES_IN = "1d";

        jwt.sign.mockReturnValue("token-teste");
    });

    test("deve rejeitar cadastro sem campos obrigatórios", async () => {
        await expect(
            authService.register({
                name: "",
                username: "",
                password: ""
            })
        ).rejects.toMatchObject({
            statusCode: 400,
            code: "VALIDATION_ERROR"
        });
    });

    test("deve rejeitar senha com menos de 6 caracteres", async () => {
        await expect(
            authService.register({
                name: "Usuário Teste",
                username: "teste",
                password: "123"
            })
        ).rejects.toMatchObject({
            statusCode: 400,
            code: "PASSWORD_TOO_SHORT"
        });
    });

    test("deve rejeitar nome de usuário já cadastrado", async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            username: "admin"
        });

        await expect(
            authService.register({
                name: "Administrador",
                username: "admin",
                password: "123456"
            })
        ).rejects.toMatchObject({
            statusCode: 409,
            code: "USERNAME_ALREADY_EXISTS"
        });
    });

    test("deve cadastrar usuário e gerar token", async () => {
        prisma.user.findUnique.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue("senha-hash");

        prisma.user.create.mockResolvedValue({
            id: 1,
            name: "Usuário Teste",
            username: "teste",
            role: "admin"
        });

        const result = await authService.register({
            name: "Usuário Teste",
            username: "teste",
            password: "123456"
        });

        expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
        expect(result.token).toBe("token-teste");
        expect(result.user.username).toBe("teste");
    });

    test("deve rejeitar login quando o usuário não existir", async () => {
        prisma.user.findUnique.mockResolvedValue(null);

        await expect(
            authService.login({
                username: "inexistente",
                password: "123456"
            })
        ).rejects.toMatchObject({
            statusCode: 401,
            code: "INVALID_CREDENTIALS"
        });
    });

    test("deve rejeitar login quando a senha estiver incorreta", async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            username: "admin",
            passwordHash: "senha-hash"
        });

        bcrypt.compare.mockResolvedValue(false);

        await expect(
            authService.login({
                username: "admin",
                password: "errada"
            })
        ).rejects.toMatchObject({
            statusCode: 401,
            code: "INVALID_CREDENTIALS"
        });
    });

    test("deve realizar login e gerar token para credenciais válidas", async () => {
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            name: "Administrador",
            username: "admin",
            role: "admin",
            passwordHash: "senha-hash"
        });

        bcrypt.compare.mockResolvedValue(true);

        const result = await authService.login({
            username: "admin",
            password: "123456"
        });

        expect(bcrypt.compare).toHaveBeenCalledWith("123456", "senha-hash");
        expect(result.token).toBe("token-teste");
        expect(result.user.username).toBe("admin");
    });

    test("deve retornar erro quando o usuário autenticado não existir", async () => {
        prisma.user.findUnique.mockResolvedValue(null);

        await expect(authService.me(999)).rejects.toMatchObject({
            statusCode: 404,
            code: "USER_NOT_FOUND"
        });
    });
});