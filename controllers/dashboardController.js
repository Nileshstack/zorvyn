const Transaction = require("../models/Transaction");

// dashboard summary
const getSummary = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let totalIncome = 0;
    let totalExpenses = 0;

    result.forEach((item) => {
      if (item._id === "income") totalIncome = item.total;
      if (item._id === "expense") totalExpenses = item.total;
    });

    res.json({
      totalIncome,
      totalExpenses,
      netBalance: totalIncome - totalExpenses,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch summary" });
  }
};

// total catagory-wise
const getCategoryTotals = async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: { type: "$type", category: "$category" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch category totals" });
  }
};

// recent 
const getRecentActivity = async (req, res) => {
  try {
    const recent = await Transaction.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "name");

    res.json(recent);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch recent activity" });
  }
};

// monthly-trends
const getMonthlyTrends = async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch monthly trends" });
  }
};

module.exports = { getSummary, getCategoryTotals, getRecentActivity, getMonthlyTrends };