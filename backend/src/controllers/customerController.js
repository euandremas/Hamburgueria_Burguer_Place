const customerService = require("../services/customerService");
const asyncHandler = require("../middlewares/asyncHandler");

const list = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await customerService.list() }));
const findById = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await customerService.findById(req.params.id) }));
const create = asyncHandler(async (req, res) => res.status(201).json({ success: true, data: await customerService.create(req.body) }));
const update = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await customerService.update(req.params.id, req.body) }));
const remove = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await customerService.remove(req.params.id) }));

module.exports = { list, findById, create, update, remove };
