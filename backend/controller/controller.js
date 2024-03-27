// const Appointment = require("../models/appointment");
const Expense  = require("../models/appointment")
exports.createExpense = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    console.log(name,price,description);
    const expense = await Expense.create({ name,price,description });
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    console.log("get expense ran ");
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const id = req.params.id; // Extract the id from request parameters
  console.log("delete ran");
  try {
    // Find the appointment by id and delete it
    const deletedExpense = await Expense.destroy({ where: { id } });
    if (deletedExpense) {
      res.json({ message: "Appointment deleted successfully" });
    } else {
      res.status(404).json({ error: "Appointment not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
