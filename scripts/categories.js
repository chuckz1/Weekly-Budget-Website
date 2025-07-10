// Category management with versioning
const CATEGORY_STORAGE_KEY = "budget_categories";
const CATEGORY_VERSION = 4; // Update this to force new defaults
const DEFAULT_CATEGORIES = {
	version: CATEGORY_VERSION,
	categories: ["Food", "Transport", "Entertainment", "Utilities", "Other"],
};

function loadCategories() {
	let stored = localStorage.getItem(CATEGORY_STORAGE_KEY);
	let categoriesObj;
	if (stored) {
		try {
			categoriesObj = JSON.parse(stored);
		} catch (e) {
			categoriesObj = null;
		}
	}
	if (
		!categoriesObj ||
		!categoriesObj.version ||
		categoriesObj.version < CATEGORY_VERSION
	) {
		localStorage.setItem(
			CATEGORY_STORAGE_KEY,
			JSON.stringify(DEFAULT_CATEGORIES)
		);
		categoriesObj = DEFAULT_CATEGORIES;
	}
	return categoriesObj.categories;
	// ...existing code...

	// Make functions globally accessible
	window.loadCategories = loadCategories;
	window.populateCategorySelect = populateCategorySelect;
}

function populateCategorySelect() {
	const select = document.getElementById("category");
	if (!select) return;
	// Remove all except first option
	while (select.options.length > 1) {
		select.remove(1);
	}
	const categories = loadCategories();
	categories.forEach((cat) => {
		const opt = document.createElement("option");
		opt.value = cat;
		opt.textContent = cat;
		select.appendChild(opt);
	});
}
