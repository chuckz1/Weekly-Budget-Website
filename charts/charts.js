// charts.js - Display saved expenses from IndexedDB

document.addEventListener("DOMContentLoaded", function () {
	var allExpenses = [];

	function populateCategoryFilter(categories) {
		var select = document.getElementById("category-filter");
		if (!select) return;
		select.innerHTML = '<option value="All">All</option>';
		if (Array.isArray(categories)) {
			categories.forEach(function (cat) {
				var opt = document.createElement("option");
				opt.value = cat;
				opt.textContent = cat;
				select.appendChild(opt);
			});
		}
	}

	function applyFiltersAndRender() {
		var category = document.getElementById("category-filter").value;
		var period = document.getElementById("period-filter").value;
		var refDate = document.getElementById("reference-date").value;
		var filtered = window.filterByCategory(allExpenses, category);
		filtered = window.filterByPeriod(filtered, period, refDate);
		renderList(filtered);
		// Also update grand total in case chart is not visible
		var grandTotalElem = document.getElementById("grand-total");
		var grandTotal = filtered.reduce(function (sum, exp) {
			return sum + (parseFloat(exp.amount) || 0);
		}, 0);
		if (grandTotalElem) grandTotalElem.textContent = grandTotal.toFixed(2);
		if (window.renderCharts) window.renderCharts(filtered);
	}

	function renderList(expenses) {
		var list = document.getElementById("expenses-list");
		if (list) {
			list.innerHTML = "";
			if (expenses.length === 0) {
				list.innerHTML = "<li>No expenses found.</li>";
			} else {
				expenses.forEach(function (exp) {
					var li = document.createElement("li");
					li.textContent = `${exp.date.split("T")[0]}: $${exp.amount.toFixed(
						2
					)} - ${exp.category}`;
					list.appendChild(li);
				});
			}
		}
	}

	if (typeof window.getAllExpenses === "function") {
		window
			.getAllExpenses()
			.then(function (expenses) {
				allExpenses = expenses;
				// Get all categories from expenses
				var categories = Array.from(new Set(expenses.map((e) => e.category)));
				populateCategoryFilter(categories);
				applyFiltersAndRender();
			})
			.catch(function (err) {
				console.error("Error loading expenses:", err);
			});
	}

	// Auto-update charts when filter settings change
	["category-filter", "period-filter", "reference-date"].forEach(function (id) {
		var el = document.getElementById(id);
		if (el) {
			el.addEventListener("change", applyFiltersAndRender);
		}
	});

	// Back to main form button
	var backBtn = document.getElementById("back-to-main");
	if (backBtn) {
		backBtn.addEventListener("click", function () {
			window.location.href = "../index.html";
		});
	}
});
