const User = require("../models/User");

// get-user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

//update-user-role
const updateUserRole = async (req, res) => {
  const { role } = req.body;
  const validRoles = ["viewer", "analyst", "admin"];

  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Role updated", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update role" });
  }
};

// update-status
const updateUserStatus = async (req, res) => {
  const { isActive } = req.body;

  if (typeof isActive !== "boolean") {
    return res.status(400).json({ message: "isActive must be true or false" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Status updated", user });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

module.exports = { getAllUsers, updateUserRole, updateUserStatus };