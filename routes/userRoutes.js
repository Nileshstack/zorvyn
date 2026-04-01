const express = require("express");
const router = express.Router();
const { getAllUsers, updateUserRole, updateUserStatus } = require("../controllers/userController");
const { protect } = require("../middleware/auth");
const { allowRoles } = require("../middleware/roleCheck");

router.get("/", protect, allowRoles("admin"), getAllUsers);
router.put("/:id/role", protect, allowRoles("admin"), updateUserRole);
router.put("/:id/status", protect, allowRoles("admin"), updateUserStatus);

module.exports = router;