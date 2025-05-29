import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({ transactions }) {
    // Filter transactions for income and expenses
    const incomeTransactions = transactions.filter(
        (transaction) => transaction.class === 'income'
    );
    const expenseTransactions = transactions.filter(
        (transaction) => transaction.class === 'expense'
    );

    // Helper function to process chart data
    const processChartData = (transactionGroup) => {
        const categoryCounts = transactionGroup.reduce((acc, transaction) => {
            const { category } = transaction;
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(categoryCounts);
        const data = Object.values(categoryCounts);
        const colors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ];

        return {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: colors.slice(0, labels.length),
                    hoverBackgroundColor: colors.slice(0, labels.length),
                },
            ],
        };
    };

    // Chart data for income and expense
    const incomeChartData = processChartData(incomeTransactions);
    const expenseChartData = processChartData(expenseTransactions);

    // Options for both charts
    const options = (totalTransactions) => ({
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                    },
                    generateLabels: (chart) => {
                        return chart.data.labels.map((label, index) => {
                            const value = chart.data.datasets[0].data[index];
                            const percentage = ((value / totalTransactions) * 100).toFixed(1);
                            return {
                                text: `${label} (${percentage}%)`,
                                fillStyle: chart.data.datasets[0].backgroundColor[index],
                            };
                        });
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const percentage = (
                            (value / totalTransactions) *
                            100
                        ).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    });

    const totalIncome = incomeTransactions.length;
    const totalExpense = expenseTransactions.length;

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Category Distribution</h2>

            {/* Income Chart */}
            <div className="mb-10">
                <h3 className="text-lg font-medium text-green-600 mb-4">Income Distribution</h3>
                <div className="relative h-96">
                    <Doughnut
                        data={incomeChartData}
                        options={options(totalIncome)}
                    />
                </div>
            </div>

            {/* Expense Chart */}
            <div>
                <h3 className="text-lg font-medium text-red-600 mb-4">Expense Distribution</h3>
                <div className="relative h-96">
                    <Doughnut
                        data={expenseChartData}
                        options={options(totalExpense)}
                    />
                </div>
            </div>
        </div>
    );
}

export default CategoryChart;
