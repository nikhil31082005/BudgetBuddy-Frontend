import React, { useEffect, useState } from 'react';
import Header from "../../components/Header";
import AddTransaction from '../../components/AddTransaction';
import ShowTransaction from '../../components/ShowTransaction';
import ProfileHeader from '../../components/ProfileHeader';
import Budget from '../../components/Budget_Component/Budget';
import Goal from '../../components/Goal_Component/Goal';
import axios from 'axios';
import PaymentChart from '../../components/Charts/PaymentChart';
import CategoryChart from '../../components/Charts/CategoryChart';

const ProfilePage = ({ user, setUser }) => {
    const [transactions, setTransactions] = useState([]);
    const [activeSection, setActiveSection] = useState('transactions'); // Manage active section
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // To control sidebar visibility
    const user_Id = user._id;

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/transaction/transactions`, { withCredentials: true });
                setTransactions(response.data.transactions);
            } catch (err) {
                console.error('Error fetching transactions:', err.response?.data || err.message);
            }
        };
        if (user && user._id) {
            fetchTransaction();
        }
    }, [user_Id]);

    const addTransaction = (newTransaction) => {
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    };

    return (
        <>
            <Header user={user} setUser={setUser} />
            <div className="flex min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100">
                {/* Sidebar */}
                <aside
                    className={`w-64 bg-gradient-to-b from-blue-500 to-blue-800 text-white flex flex-col p-6 space-y-6 shadow-lg transition-all duration-300 ease-in-out transform ${
                        isSidebarOpen ? 'block' : 'hidden sm:block'
                    }`}
                >
                    <h2 className="text-2xl font-semibold mb-4">Menu</h2>
                    <button
                        onClick={() => setActiveSection('transactions')}
                        className="bg-blue-600 hover:bg-blue-800 py-3 rounded-lg text-left px-4 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
                    >
                        Recent Transactions
                    </button>
                    <button
                        onClick={() => setActiveSection('goal')}
                        className="bg-blue-600 hover:bg-blue-800 py-3 rounded-lg text-left px-4 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
                    >
                        Goal
                    </button>
                    <button
                        onClick={() => setActiveSection('categoryChart')}
                        className="bg-blue-600 hover:bg-blue-800 py-3 rounded-lg text-left px-4 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
                    >
                        Category Chart
                    </button>
                    <button
                        onClick={() => setActiveSection('budget')}
                        className="bg-blue-600 hover:bg-blue-800 py-3 rounded-lg text-left px-4 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
                    >
                        Budget
                    </button>
                    <button
                        onClick={() => setActiveSection('trend')}
                        className="bg-blue-600 hover:bg-blue-800 py-3 rounded-lg text-left px-4 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
                    >
                        Trend
                    </button>
                    <button
                        onClick={() => setActiveSection('paymentMethodChart')}
                        className="bg-blue-600 hover:bg-blue-800 py-3 rounded-lg text-left px-4 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md"
                    >
                        Payment Method Chart
                    </button>

                    {/* Toggle Button */}
                    <button
                        className="sm:hidden text-white mt-6 px-4 py-2 bg-blue-600 rounded-lg focus:outline-none hover:bg-blue-700"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
                    </button>
                </aside>

                {/* Main Content */}
                <main className={`flex-1 p-8 ${isSidebarOpen ? 'ml-1' : ''} transition-all duration-300 ease-in-out`}>
                    {/* Profile Header */}
                    <ProfileHeader user={user} />

                    {/* Add Income / Expense */}
                    <AddTransaction addTransaction={addTransaction} transactions={transactions} />

                    {/* Conditional Rendering */}
                    <div className="mt-8">
                        {activeSection === 'transactions' && <ShowTransaction transactions={transactions} />}
                        {activeSection === 'paymentMethodChart' && <PaymentChart transactions={transactions} />}
                        {activeSection === 'goal' && <Goal user={user} />}
                        {activeSection === 'categoryChart' && <CategoryChart transactions={transactions} />}
                        {activeSection === 'budget' && <Budget user={user} />}
                    </div>
                </main>
            </div>
        </>
    );
};

export default ProfilePage;
