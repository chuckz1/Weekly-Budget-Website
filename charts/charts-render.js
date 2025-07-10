// charts-render.js - Handles rendering expenses with Chart.js and filtering

// Load Chart.js from CDN
(function loadChartJs() {
	if (!window.Chart) {
		var script = document.createElement("script");
		script.src = "https://cdn.jsdelivr.net/npm/chart.js";
		script.onload = function () {
			if (window.renderCharts) window.renderCharts();
		};
		document.head.appendChild(script);
	}
})();

function renderCharts(expenses) {
	// Prepare data for chart
	var ctx = document.getElementById("expenses-chart").getContext("2d");
	var labels = expenses.map((e) => e.category);
	var data = expenses.map((e) => e.amount);
	if (window.expensesChart) window.expensesChart.destroy();
	window.expensesChart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: labels,
			datasets: [
				{
					label: "Expenses",
					data: data,
					backgroundColor: "rgba(54, 162, 235, 0.5)",
					borderColor: "rgba(54, 162, 235, 1)",
					borderWidth: 1,
				},
			],
		},
		options: {
			responsive: true,
			scales: {
				y: { beginAtZero: true },
			},
		},
	});
}

window.renderCharts = renderCharts;
