import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Goal = ({ user }) => {
    const [goals, setGoals] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [currentAmount, setCurrentAmount] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');
    const [amountToAdd, setAmountToAdd] = useState({});

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const userId = user._id;
                const response = await axios.get(`http://localhost:8000/goal/${userId}`, { withCredentials: true });
                setGoals(response.data.goals);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchGoals();
    }, [user]);

    const handleAddGoal = async (e) => {
        e.preventDefault();
        try {
            const formData = { user, name, targetAmount, currentAmount, deadline, description };
            const response = await axios.post('http://localhost:8000/goal/addGoal', formData, { withCredentials: true });
            setGoals((prev) => [...prev, response.data.Goal]);
            setName('');
            setTargetAmount('');
            setCurrentAmount('');
            setDeadline('');
            setDescription('');
            setShowForm(false);
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    const handleAddToCurrentAmount = async (goalId) => {
        try {
            const amount = parseFloat(amountToAdd[goalId] || 0);
            if (isNaN(amount) || amount <= 0) return;

            const goal = goals.find((goal) => goal._id === goalId);
            const newAmount = goal.currentAmount + amount;

            await axios.put(`http://localhost:8000/goal/update/${goalId}`, { currentAmount: newAmount }, { withCredentials: true });

            setGoals((prevGoals) =>
                prevGoals.map((goal) =>
                    goal._id === goalId ? { ...goal, currentAmount: newAmount } : goal
                )
            );
            setAmountToAdd((prev) => ({ ...prev, [goalId]: '' }));
        } catch (error) {
            console.error('Error updating current amount:', error);
        }
    };

    const handleSubToCurrentAmount = async (goalId) => {
        try {
            const amount = parseFloat(amountToAdd[goalId] || 0);
            if (isNaN(amount) || amount <= 0) return;

            const goal = goals.find((goal) => goal._id === goalId);
            const newAmount = goal.currentAmount - amount;

            if (newAmount >= 0) {
                await axios.put(`http://localhost:8000/goal/update/${goalId}`, { currentAmount: newAmount }, { withCredentials: true });

                setGoals((prevGoals) =>
                    prevGoals.map((goal) =>
                        goal._id === goalId ? { ...goal, currentAmount: newAmount } : goal
                    )
                );
                setAmountToAdd((prev) => ({ ...prev, [goalId]: '' }));
            }
            else {
                alert("amount can not be less than zero");
            }
        } catch (error) {
            console.error('Error updating current amount:', error);
        }
    };

    const getGoalStatus = (goal) => {
        const now = new Date();
        const deadline = new Date(goal.deadline);

        if (goal.currentAmount >= goal.targetAmount) {
            return 'Completed';
        } else if (deadline < now) {
            return 'Failed';
        } else {
            return 'In Progress';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-700">Goals</h1>
                <button
                    onClick={() => setShowForm((prev) => !prev)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
                >
                    {showForm ? 'Close' : 'Add Goal'}
                </button>
            </header>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Add a New Goal</h2>
                    <form onSubmit={handleAddGoal}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Goal Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="E.g., Save for Vacation"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Target Amount</label>
                                <input
                                    type="number"
                                    value={targetAmount}
                                    onChange={(e) => setTargetAmount(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-500"
                                    placeholder="E.g., 5000"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Current Amount</label>
                                <input
                                    type="number"
                                    value={currentAmount}
                                    onChange={(e) => setCurrentAmount(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-500"
                                    placeholder="E.g., 1000"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Deadline</label>
                                <input
                                    type="date"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Goal Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="E.g., Save for Vacation"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
                        >
                            Save Goal
                        </button>
                    </form>
                </div>
            )}

            <div className="bg-gradient-to-b from-gray-50 to-white p-8 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">🎯 Your Goals</h2>
                {goals.length > 0 ? (
                    <ul className="space-y-5">
                        {goals.slice().reverse().map((goal) => {
                            return (
                                <li
                                    key={goal._id}
                                    className="flex flex-col sm:flex-row justify-between items-center p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-indigo-300 transition-transform transform hover:-translate-y-1 duration-300 ease-in-out"
                                >
                                    <div className="flex flex-col mb-4 sm:mb-0">
                                        <h3 className="text-xl font-bold text-indigo-600">{goal.name}</h3>
                                        <p className="text-gray-700 text-sm mt-1">
                                            <b>Target Amount:</b> ₹{goal.targetAmount}
                                            <br />
                                            <b>Current Amount:</b> ₹{goal.currentAmount || 0}
                                            <br />
                                            <b>Deadline:</b> {formatDate(goal.deadline)}
                                        </p>
                                        <div className="mt-2">
                                            <span
                                                className={`px-3 py-1 text-sm font-semibold rounded-full ${getGoalStatus(goal) === 'Completed'
                                                    ? 'bg-green-500 text-white'
                                                    : getGoalStatus(goal) === 'Failed'
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-yellow-500 text-white'
                                                }`}
                                            >
                                                {getGoalStatus(goal)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-3">
                                        <input
                                            type="number"
                                            value={amountToAdd[goal._id] || ''}
                                            onChange={(e) =>
                                                setAmountToAdd((prev) => ({
                                                    ...prev,
                                                    [goal._id]: e.target.value,
                                                }))
                                            }
                                            className="w-full sm:w-40 px-4 p-2 border rounded-lg focus:ring focus:ring-indigo-500"
                                            placeholder="Amount"
                                        />
                                        <button
                                            onClick={() => handleAddToCurrentAmount(goal._id)}
                                            className="w-full sm:w-32 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 mt-2 sm:mt-0"
                                        >
                                            Add Amount
                                        </button>

                                        <button
                                            onClick={() => handleSubToCurrentAmount(goal._id)}
                                            className="w-full sm:w-32 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 mt-2 sm:mt-0"
                                        >
                                            Decrease Amount
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">No goals available. Start by adding one!</p>
                )}
            </div>
        </div>
    );
};

export default Goal;
