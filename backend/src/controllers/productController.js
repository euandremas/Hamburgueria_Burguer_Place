const productService = require("../services/productService");
const asyncHandler = require("../middlewares/asyncHandler");

const list = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await productService.list() }));
const findById = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await productService.findById(req.params.id) }));
const create = asyncHandler(async (req, res) => res.status(201).json({ success: true, data: await productService.create(req.body) }));
const update = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await productService.update(req.params.id, req.body) }));
const remove = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await productService.remove(req.params.id) }));

module.exports = { list, findById, create, update, remove };
