const dashboardService = require("../services/dashboardService");
const asyncHandler = require("../middlewares/asyncHandler");

const getDashboard = asyncHandler(async (req, res) => {
  const data = await dashboardService.getDashboard();

  res.status(200).json({
    success: true,
    data
  });
});

module.exports = {
  getDashboard
};
