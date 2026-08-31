const cepService = require("../../src/services/cepService");
const { cepValido } = require("../fixtures/cepFixture");

describe("cepService", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("deve rejeitar CEP com quantidade inválida de dígitos", async () => {
        await expect(cepService.lookup("12345")).rejects.toMatchObject({
            statusCode: 400,
            code: "INVALID_ZIP_CODE"
        });
    });

    test("deve consultar a BrasilAPI e retornar o endereço para um CEP válido", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => cepValido
        });

        const result = await cepService.lookup("01001-000");

        expect(global.fetch).toHaveBeenCalledWith(
            "https://brasilapi.com.br/api/cep/v1/01001000"
        );

        expect(result).toEqual({
            cep: "01001000",
            street: "Praça da Sé",
            neighborhood: "Sé",
            city: "São Paulo",
            state: "SP",
            source: "BrasilAPI"
        });
    });
    test("deve retornar erro quando o CEP não for encontrado", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 404
        });

        await expect(cepService.lookup("99999999")).rejects.toMatchObject({
            statusCode: 404,
            code: "ZIP_CODE_NOT_FOUND"
        });
    });

    test("deve retornar erro quando a BrasilAPI falhar", async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 500
        });

        await expect(cepService.lookup("01001000")).rejects.toMatchObject({
            statusCode: 502,
            code: "BRASIL_API_ERROR"
        });
    });
});