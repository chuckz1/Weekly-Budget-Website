// Basic script for Weekly Budget Website
console.log("Welcome to Weekly Budget Website");

document.addEventListener("DOMContentLoaded", function () {
	if (typeof window.populateCategorySelect === "function") {
		window.populateCategorySelect();
	}

	var form = document.getElementById("budget-form");
	if (form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			var amount = document.getElementById("amount").value;
			var category = document.getElementById("category").value;
			var expense = new Expense(amount, category, undefined, undefined);
			addExpense(expense)
				.then(function (id) {
					console.log("Expense saved:", expense, "ID:", id);
					// Optionally, call renderExpenses() here in the future
				})
				.catch(function (err) {
					console.error("Error saving expense:", err);
				});
		});
	}
});

// open charts page
document.addEventListener("DOMContentLoaded", function () {
	var chartsBtn = document.getElementById("open-charts");
	if (chartsBtn) {
		chartsBtn.addEventListener("click", function () {
			window.location.href = "charts/index.html";
		});
	}
});
