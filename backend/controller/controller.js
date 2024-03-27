const Expense = require("../models/appointment")
exports.createExpense = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const expense = await Expense.create({ name, price, description });
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const id = req.params.id; 
  console.log("delete ran");
  try {
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


exports.editExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedName = req.body.name;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    expense.name = updatedName;
    expense.price = updatedPrice;
    expense.description = updatedDescription;

    await expense.save();

    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
