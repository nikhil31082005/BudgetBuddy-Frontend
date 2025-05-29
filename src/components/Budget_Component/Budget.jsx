import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Budget = ({ user }) => {
    const [budgets, setBudgets] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const categories = [
        "Rent", "Utilities", "Groceries", "Transportation", "Dining Out", "Entertainment", "Healthcare",
        "Insurance", "Education", "Childcare", "Debt Repayment", "Savings", "Personal Care", "Fitness",
        "Subscriptions", "Clothing", "Gifts", "Travel", "Household Supplies", "Maintenance", "Pets",
        "Charity", "Taxes", "Miscellaneous"
    ];

    // Fetch budgets from API
    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const userId = user._id;
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/budget/${userId}`, { withCredentials: true });
                setBudgets(response.data.Budgets);
            } catch (error) {
                console.error('Error fetching budgets:', error);
            }
        };

        fetchBudgets();
    }, [user]);

    // Add new budget
    const handleAddBudget = async (e) => {
        e.preventDefault();
        try {
            const formData = { user, category, amount, startDate, endDate };
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/budget/addBudget`, formData, { withCredentials: true });
            setBudgets((prev) => [...prev, response.data.budget]);
            setCategory('');
            setAmount('');
            setStartDate('');
            setEndDate('');
            setShowForm(false);
        } catch (error) {
            console.error('Error adding budget:', error);
        }
    };

    // Delete budget
    const handleDeleteBudget = async (budgetId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/budget/deleteBudget/${budgetId}`, { withCredentials: true });
            setBudgets((prev) => prev.filter((budget) => budget._id !== budgetId));
        } catch (error) {
            console.error('Error deleting budget:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-700">Budget</h1>
                <button
                    onClick={() => setShowForm((prev) => !prev)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
                >
                    {showForm ? 'Close' : 'Add Budget'}
                </button>
            </header>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Add a New Budget</h2>
                    <form onSubmit={handleAddBudget}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-600 font-bold mb-1">Amount</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-bold mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-bold mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
                        >
                            Save Budget
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">💰 Your Budgets</h2>
                {budgets.length > 0 ? (
                    <ul className="space-y-5">
                        {budgets.map((budget) => (
                            <li
                                key={budget._id}
                                className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-indigo-300 transition-transform transform hover:-translate-y-1 duration-300 ease-in-out"
                            >
                                <div className="flex flex-col sm:flex-row">
                                    <h3 className="text-xl font-bold text-indigo-600">{budget.category}</h3>
                                    <p className="text-gray-700 text-sm mt-1 sm:mt-0 sm:ml-4 flex items-center space-x-2">
                                        <span>₹{budget.amount}</span>
                                        <span className="text-gray-500">
                                            {new Date(budget.startDate).toLocaleDateString()} -{' '}
                                            {new Date(budget.endDate).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex items-center space-x-3 mt-3 sm:mt-0">
                                    <button
                                        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition-all duration-200 ease-in-out focus:outline-none"
                                        onClick={() => handleDeleteBudget(budget._id)}
                                    >
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">No budgets available. Start by adding one!</p>
                )}
            </div>
        </div>
    );
};

export default Budget;
