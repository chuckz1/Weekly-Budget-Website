// charts.js - Display saved expenses from IndexedDB

document.addEventListener("DOMContentLoaded", function () {
	if (typeof window.getAllExpenses === "function") {
		window
			.getAllExpenses()
			.then(function (expenses) {
				var list = document.getElementById("expenses-list");
				if (list) {
					list.innerHTML = "";
					if (expenses.length === 0) {
						list.innerHTML = "<li>No expenses found.</li>";
					} else {
						expenses.forEach(function (exp) {
							var li = document.createElement("li");
							li.textContent = `${
								exp.date.split("T")[0]
							}: $${exp.amount.toFixed(2)} - ${exp.category}`;
							list.appendChild(li);
						});
					}
				}
			})
			.catch(function (err) {
				console.error("Error loading expenses:", err);
			});
	}
});
