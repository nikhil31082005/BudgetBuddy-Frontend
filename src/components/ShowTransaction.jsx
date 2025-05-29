import React from "react";

function ShowTransaction({ transactions }) {
  // Get the last 10 transactions
  const lastTenTransactions = transactions.slice(-10).reverse();

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 border-b pb-4">
        Recent Transactions
      </h2>
      {lastTenTransactions && lastTenTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-50 border-b">
              <tr>
                {[
                  "Date",
                  "Description",
                  "Amount",
                  "Category",
                  "Payment Method",
                  "Time",
                ].map((header, idx) => (
                  <th
                    key={idx}
                    className="text-left py-4 px-6 font-semibold text-gray-600 uppercase text-sm sm:text-base"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lastTenTransactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-100 border-b transition-colors duration-150 ease-in-out"
                >
                  <td className="py-4 px-6 text-sm sm:text-base">
                    {transaction.date}
                  </td>
                  <td className="py-4 px-6 text-sm sm:text-base">
                    {transaction.description}
                  </td>
                  <td
                    className={`py-4 px-6 font-semibold text-sm sm:text-base ${
                      transaction.class === "expense"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {transaction.class === "expense" ? "-" : "+"}₹
                    {transaction.amount}
                  </td>
                  <td className="py-4 px-6 text-sm sm:text-base capitalize">
                    {transaction.category}
                  </td>
                  <td className="py-4 px-6 text-sm sm:text-base capitalize">
                    {transaction.paymentMethod}
                  </td>
                  <td className="py-4 px-6 text-sm sm:text-base">
                    {transaction.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No transactions found.</p>
      )}
    </div>
  );
}

export default ShowTransaction;
