const { Router } = require("express");
const cepController = require("../controllers/cepController");

const router = Router();

// Endpoint proxy para a BrasilAPI usado pelo cadastro de clientes.
router.get("/:cep", cepController.lookup);

module.exports = router;
