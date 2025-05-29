import React, { useState } from 'react';
import axios from 'axios';

function AddExpense({ handleCloseAddExpense, addTransaction }) {
    const [expense, setExpense] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [notes, setNotes] = useState('');

    const categories = [
        "Rent", "Utilities", "Groceries", "Transportation", "Dining Out", "Entertainment", "Healthcare",
        "Insurance", "Education", "Childcare", "Debt Repayment", "Savings", "Personal Care", "Fitness",
        "Subscriptions", "Clothing", "Gifts", "Travel", "Household Supplies", "Maintenance", "Pets",
        "Charity", "Taxes", "Miscellaneous"
    ];

    const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Bank Transfer"];

    const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            amount: expense,
            class: 'expense',
            category: category, // Expense type
            paymentMethod,
            description: notes,
            date: currentDate,
            time: currentTime,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/transaction/expence`, 
                formData, 
                { withCredentials: true } // Include credentials for cookies
            );
            // console.log('Expense added successfully:', response.data);
            alert('Expense added successfully!');
            addTransaction(response.data.transaction);
            handleCloseAddExpense(); // Close the modal on success
        } catch (error) {
            console.error('Error adding expense:', error.response?.data || error.message);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleCloseAddExpense} // Close when clicking outside
        >
            <form
                onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to outer div
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-yellow-300 p-6 shadow-lg rounded-lg space-y-4 overflow-y-auto max-h-[90vh]"
            >
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Expense</h2>
    
                {/* Expense Input */}
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Expense Amount</label>
                    <input
                        type="number"
                        value={expense}
                        onChange={(e) => setExpense(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                </div>
    
                {/* Category Select */}
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
    
                {/* Payment Method Select */}
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    >
                        <option value="">Select Payment Method</option>
                        {paymentMethods.map((method, index) => (
                            <option key={index} value={method}>{method}</option>
                        ))}
                    </select>
                </div>
    
                {/* Notes Input */}
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add any notes"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
    
                {/* Date Field */}
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Date</label>
                    <input
                        type="text"
                        value={currentDate}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                    />
                </div>
    
                {/* Time Field */}
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Time</label>
                    <input
                        type="text"
                        value={currentTime}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                    />
                </div>
    
                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
    
    
    
}

export default AddExpense;
