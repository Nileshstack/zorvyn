const express = require("express");
const router = express.Router();
const {
  getSummary,
  getCategoryTotals,
  getRecentActivity,
  getMonthlyTrends,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/roleCheck");
//route for dashboard
router.get("/summary", protect, allowRoles("analyst", "admin"), getSummary);
router.get("/category-totals", protect, allowRoles("analyst", "admin"), getCategoryTotals);
router.get("/recent", protect, allowRoles("analyst", "admin"), getRecentActivity);
router.get("/monthly-trends", protect, allowRoles("analyst", "admin"), getMonthlyTrends);

module.exports = router;