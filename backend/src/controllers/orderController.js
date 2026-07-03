const orderService = require("../services/orderService");
const asyncHandler = require("../middlewares/asyncHandler");

const list = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await orderService.list() }));
const findById = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await orderService.findById(req.params.id) }));
const create = asyncHandler(async (req, res) => res.status(201).json({ success: true, data: await orderService.create(req.body) }));
const updateStatus = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await orderService.updateStatus(req.params.id, req.body.status) }));
const updateEta = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await orderService.updateEta(req.params.id, req.body.etaMin) }));
const remove = asyncHandler(async (req, res) => res.status(200).json({ success: true, data: await orderService.remove(req.params.id) }));

module.exports = { list, findById, create, updateStatus, updateEta, remove };
