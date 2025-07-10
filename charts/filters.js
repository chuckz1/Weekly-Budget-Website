// Utility functions for filtering expenses by category and date

function filterByCategory(expenses, category) {
	if (!category || category === "All") return expenses;
	return expenses.filter((exp) => exp.category === category);
}

function filterByPeriod(expenses, period, referenceDate) {
	const ref = referenceDate ? new Date(referenceDate) : new Date();
	return expenses.filter((exp) => {
		const expDate = new Date(exp.date);
		switch (period) {
			case "week":
				// Get Sunday of the week
				const startOfWeek = new Date(ref);
				startOfWeek.setDate(ref.getDate() - ref.getDay());
				startOfWeek.setHours(0, 0, 0, 0);
				// Get Saturday of the week
				const endOfWeek = new Date(startOfWeek);
				endOfWeek.setDate(startOfWeek.getDate() + 6);
				endOfWeek.setHours(23, 59, 59, 999);
				return expDate >= startOfWeek && expDate <= endOfWeek;
			case "month":
				return (
					expDate.getFullYear() === ref.getFullYear() &&
					expDate.getMonth() === ref.getMonth()
				);
			case "year":
				return expDate.getFullYear() === ref.getFullYear();
			default:
				return true;
		}
	});
}

window.filterByCategory = filterByCategory;
window.filterByPeriod = filterByPeriod;
