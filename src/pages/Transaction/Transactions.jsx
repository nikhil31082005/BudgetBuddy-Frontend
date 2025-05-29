import React from 'react'

function Transactions({ transactions, handleCloseTransaction }) {
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={handleCloseTransaction}>
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-lg p-6 sm:p-8 overflow-y-auto max-h-[90vh] w-full sm:max-w-lg lg:max-w-2xl xl:max-w-3xl"
            >
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-4">Transaction History</h2>
                {transactions && transactions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border border-gray-200 rounded-lg">
                            <thead className="bg-blue-50 border-b">
                                <tr>
                                    {["Date", "Description", "Amount", "Category", "Payment Method", "Time"].map((header, idx) => (
                                        <th key={idx} className="text-left py-3 px-4 font-semibold text-gray-600 uppercase text-sm sm:text-base">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={index} className="hover:bg-gray-100 border-b transition-colors duration-150 ease-in-out">
                                        <td className="py-3 px-4 text-sm sm:text-base">{transaction.date}</td>
                                        <td className="py-3 px-4 text-sm sm:text-base">{transaction.description}</td>
                                        <td
                                            className={`py-3 px-4 text-sm sm:text-base font-semibold ${transaction.class === 'expense' ? 'text-red-600' : 'text-green-600'}`}
                                        >
                                            {transaction.class === 'expense' ? '-' : '+'}₹{transaction.amount}
                                        </td>
                                        <td className="py-3 px-4 text-sm sm:text-base capitalize">{transaction.category}</td>
                                        <td className="py-3 px-4 text-sm sm:text-base capitalize">{transaction.paymentMethod}</td>
                                        <td className="py-3 px-4 text-sm sm:text-base">{transaction.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">No transactions found.</p>
                )}
            </div>
        </div>
    )
}

export default Transactions
