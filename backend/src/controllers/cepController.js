const cepService = require("../services/cepService");
const asyncHandler = require("../middlewares/asyncHandler");

const lookup = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: await cepService.lookup(req.params.cep) });
});

module.exports = { lookup };
