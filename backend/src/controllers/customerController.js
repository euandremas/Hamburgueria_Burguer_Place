const customerService = require("../services/customerService");
const asyncHandler = require("../middlewares/asyncHandler");

const list = asyncHandler(async (req, res) => {
  const data = await customerService.list();
  res.status(200).json({ success: true, data });
});

const findById = asyncHandler(async (req, res) => {
  const data = await customerService.findById(req.params.id);
  res.status(200).json({ success: true, data });
});

const create = asyncHandler(async (req, res) => {
  const data = await customerService.create(req.body);
  res.status(201).json({ success: true, data });
});

const update = asyncHandler(async (req, res) => {
  const data = await customerService.update(req.params.id, req.body);
  res.status(200).json({ success: true, data });
});

const remove = asyncHandler(async (req, res) => {
  const data = await customerService.remove(req.params.id);
  res.status(200).json({ success: true, data });
});

module.exports = { list, findById, create, update, remove };