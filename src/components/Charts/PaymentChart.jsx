import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function PaymentChart({ transactions }) {
    // Process transactions to group by paymentMethod
    const paymentMethodData = transactions.reduce((acc, transaction) => {
        const method = transaction.paymentMethod || 'Unknown';
        acc[method] = (acc[method] || 0) + 1;
        return acc;
    }, {});

    // Extract labels and data for the chart
    const labels = Object.keys(paymentMethodData);
    const dataValues = Object.values(paymentMethodData);

    // Calculate the total for percentage calculation
    const totalTransactions = dataValues.reduce((total, value) => total + value, 0);

    // Colors for the chart
    const colors = [
        '#FF6384', // Pink
        '#36A2EB', // Blue
        '#FFCE56', // Yellow
        '#4BC0C0', // Teal
        '#9966FF', // Purple
        '#FF9F40', // Orange
    ];

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Payment Methods',
                data: dataValues,
                backgroundColor: colors.slice(0, labels.length),
                hoverBackgroundColor: colors.slice(0, labels.length),
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#333',
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
                        const percentage = ((value / totalTransactions) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Method Distribution</h2>
            <div className="relative h-96">
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    );
}

export default PaymentChart;
