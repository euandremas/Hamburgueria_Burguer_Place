const dashboardService = require("../services/dashboardService");
const asyncHandler = require("../middlewares/asyncHandler");

const getSummary = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: await dashboardService.getSummary() });
});

module.exports = { getSummary };
