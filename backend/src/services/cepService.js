const AppError = require("../utils/AppError");

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

async function lookup(cepInput) {
  const cep = onlyDigits(cepInput);

  if (cep.length !== 8) {
    throw new AppError("CEP inválido. Informe exatamente 8 dígitos.", 400, "INVALID_ZIP_CODE");
  }

  const url = `https://brasilapi.com.br/api/cep/v1/${cep}`;
  const response = await fetch(url);

  if (response.status === 404) {
    throw new AppError("CEP não encontrado na BrasilAPI.", 404, "ZIP_CODE_NOT_FOUND");
  }

  if (!response.ok) {
    throw new AppError("Falha ao consultar a BrasilAPI.", 502, "BRASIL_API_ERROR");
  }

  const data = await response.json();

  return {
    cep: data.cep || cep,
    street: data.street || "",
    neighborhood: data.neighborhood || "",
    city: data.city || "",
    state: data.state || "",
    source: "BrasilAPI"
  };
}

module.exports = { lookup };
