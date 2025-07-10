// Expense data storage using IndexedDB

const DB_NAME = "WeeklyBudgetDB";
const DB_VERSION = 1;
const STORE_NAME = "expenses";

function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onupgradeneeded = function (e) {
			const db = e.target.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, {
					keyPath: "id",
					autoIncrement: true,
				});
			}
		};
		request.onsuccess = function (e) {
			resolve(e.target.result);
		};
		request.onerror = function (e) {
			reject(e.target.error);
		};
	});
}

function addExpense(expense) {
	return openDB().then((db) => {
		return new Promise((resolve, reject) => {
			const tx = db.transaction(STORE_NAME, "readwrite");
			const store = tx.objectStore(STORE_NAME);
			const req = store.add(expense);
			req.onsuccess = () => resolve(req.result);
			req.onerror = () => reject(req.error);
		});
	});
}

function getAllExpenses() {
	return openDB().then((db) => {
		return new Promise((resolve, reject) => {
			const tx = db.transaction(STORE_NAME, "readonly");
			const store = tx.objectStore(STORE_NAME);
			const req = store.getAll();
			req.onsuccess = () => resolve(req.result);
			req.onerror = () => reject(req.error);
		});
	});
}

window.addExpense = addExpense;
window.getAllExpenses = getAllExpenses;
