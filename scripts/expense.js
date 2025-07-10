// Expense object constructor
function Expense(amount, category, date) {
	this.amount = parseFloat(amount);
	this.category = category;
	this.date = date || new Date().toISOString();
}

window.Expense = Expense;
