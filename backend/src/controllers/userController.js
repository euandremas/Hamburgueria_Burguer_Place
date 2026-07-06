const userService = require("../services/userService");
const asyncHandler = require("../middlewares/asyncHandler");

const list = asyncHandler(async (req, res) => {
  const data = await userService.list();
  res.status(200).json({ success: true, data });
});

const create = asyncHandler(async (req, res) => {
  const data = await userService.create(req.body);
  res.status(201).json({ success: true, data });
});

const remove = asyncHandler(async (req, res) => {
  const data = await userService.remove(req.params.id);
  res.status(200).json({ success: true, data });
});

module.exports = { list, create, remove };