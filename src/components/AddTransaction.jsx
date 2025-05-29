import React, { useState } from "react";
import AddIncome from "../pages/Transaction/AddIncome";
import AddExpence from "../pages/Transaction/AddExpence";
import Transactions from "../pages/Transaction/Transactions";

function AddTransaction({ transactions, addTransaction }) {
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const handleOpenAddIncome = () => setShowAddIncomeModal(true);
  const handleCloseAddIncome = () => setShowAddIncomeModal(false);

  const handleOpenAddExpense = () => setShowAddExpenseModal(true);
  const handleCloseAddExpense = () => setShowAddExpenseModal(false);

  const handleOpenTransaction = () => setShowTransactionModal(true);
  const handleCloseTransaction = () => setShowTransactionModal(false);

  return (
    <div className="flex flex-col items-center p-4 gap-6">
      {/* Transaction Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        <button
          className="flex items-center justify-center gap-3 w-full h-20 sm:h-24 text-white bg-green-500 rounded-lg text-lg font-semibold transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 hover:bg-green-600"
          onClick={handleOpenAddIncome}
        >
          Add Income
        </button>

        <button
          className="flex items-center justify-center gap-3 w-full h-20 sm:h-24 text-white bg-red-500 rounded-lg text-lg font-semibold transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300 hover:bg-red-600"
          onClick={handleOpenAddExpense}
        >
          Add Expense
        </button>

        <button className="flex items-center justify-center gap-3 w-full h-20 sm:h-24 text-white bg-orange-500 rounded-lg text-lg font-semibold transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 hover:bg-orange-600">
          Transfer
        </button>

        <button
          className="flex items-center justify-center gap-3 w-full h-20 sm:h-24 text-white bg-cyan-500 rounded-lg text-lg font-semibold transition-transform duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-300 hover:bg-cyan-600"
          onClick={handleOpenTransaction}
        >
          Transactions
        </button>
      </div>

      {/* Modals */}
      {showAddIncomeModal && (
        <AddIncome
          handleCloseAddIncome={handleCloseAddIncome}
          addTransaction={addTransaction}
        />
      )}
      {showAddExpenseModal && (
        <AddExpence
          handleCloseAddExpense={handleCloseAddExpense}
          addTransaction={addTransaction}
        />
      )}
      {showTransactionModal && (
        <Transactions
          transactions={transactions}
          handleCloseTransaction={handleCloseTransaction}
          addTransaction={addTransaction}
        />
      )}
    </div>
  );
}

export default AddTransaction;
