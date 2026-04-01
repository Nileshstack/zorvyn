const Transaction = require("../models/Transaction");

// create transaction
const createTransaction = async (req, res) => {
  const { amount, type, category, date, notes } = req.body;

  if (!amount || !type || !category) {
    return res.status(400).json({ message: "amount, type, and category are required" });
  }

  if (!["income", "expense"].includes(type)) {
    return res.status(400).json({ message: "type must be income or expense" });
  }

  try {
    const transaction = await Transaction.create({
      amount,
      type,
      category,
      date: date || Date.now(),
      notes,
      createdBy: req.user._id,
    });

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Failed to create transaction", error: err.message });
  }
};

// get transactions
const getTransactions = async (req, res) => {
  const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query;

  const filter = { isDeleted: false };

  if (type) filter.type = type;
  if (category) filter.category = category;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  try {
    const total = await Transaction.countDocuments(filter);
    const transactions = await Transaction.find(filter)
      .populate("createdBy", "name email")
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: transactions,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

// update transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const { amount, type, category, date, notes } = req.body;

    if (type && !["income", "expense"].includes(type)) {
      return res.status(400).json({ message: "type must be income or expense" });
    }

    if (amount !== undefined) transaction.amount = amount;
    if (type) transaction.type = type;
    if (category) transaction.category = category;
    if (date) transaction.date = date;
    if (notes !== undefined) transaction.notes = notes;

    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Failed to update transaction" });
  }
};

// transactions per id delete
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.isDeleted = true;
    await transaction.save();

    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};