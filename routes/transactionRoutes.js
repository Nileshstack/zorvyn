const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/roleCheck");

//route for transaction
router.get("/", protect, allowRoles("viewer", "analyst", "admin"), getTransactions);
router.post("/", protect, allowRoles("admin"), createTransaction);
router.put("/:id", protect, allowRoles("admin"), updateTransaction);
router.delete("/:id", protect, allowRoles("admin"), deleteTransaction);

module.exports = router;