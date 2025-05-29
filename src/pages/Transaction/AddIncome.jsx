import React, { useState } from 'react';
import axios from 'axios';

function AddIncome({ handleCloseAddIncome, addTransaction }) {
    const [income, setIncome] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false); // For loading state
    const [error, setError] = useState(''); // For error messages

    // Array of categories
    const categories = ["Salary", "Allowance", "Bonus", "Freelance", "Investments", "Pension", "Other Income"];

    // Array of payment methods
    const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Bank Transfer"];

    // Auto-fill current date and time
    const currentDate = new Date().toISOString().slice(0, 10); // format: YYYY-MM-DD
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Form data
        const formData = {
            amount: parseFloat(income),
            class: "income",
            category: category, // Fixed as "income"
            paymentMethod,
            description: notes,
            date: currentDate,
            time: currentTime,
        };

        try {
            // Post data to the backend
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/transaction/income`, formData, {
                withCredentials: true, // Include cookies for JWT
            });
            console.log('Income added successfully:', response.data);
            addTransaction(response.data.transaction);

            // Reset form on success
            setIncome('');
            setCategory('');
            setPaymentMethod('');
            setNotes('');
            alert('Income added successfully!');
            handleCloseAddIncome(); // Close the modal
        } catch (err) {
            console.error('Error adding income:', err.response?.data || err.message);
            setError(err.response?.data?.error || 'Failed to add income. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleCloseAddIncome}
        >
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
                className="w-full max-w-lg mx-auto bg-yellow-300 p-6 shadow-lg rounded-lg space-y-4 overflow-y-auto max-h-[90vh] sm:w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4"
            >
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Add Income</h2>

                {/* Error Message */}
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                {/* Income Input */}
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Income Amount</label>
                    <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>

                {/* Category Select */}
                <div>
                    <label className="block text-gray-600 font-medium mb-2">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Income'}
                </button>
            </form>
        </div>
    );
}

export default AddIncome;
