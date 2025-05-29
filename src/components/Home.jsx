import React from "react";

function Home() {
  return (
    <>
      <div id="home" className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-20 px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Welcome to Personal Expense Tracker
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take control of your finances with our easy-to-use Personal
              Expense Tracker. Track your income and expenses, manage your
              savings, and gain insights into your spending habits. Whether
              you’re saving for a big goal or trying to stick to a budget, this
              app is designed to make financial management simple and efficient.
            </p>
          </div>

          <div className="mt-20">
            <h2 className="text-4xl font-semibold text-gray-800 text-center mb-10">
              Why Choose Our App?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  Real-Time Tracking
                </h3>
                <p className="text-gray-600">
                  Track your expenses and income in real-time with instant
                  updates and detailed breakdowns. Get a clear view of where
                  your money is going at any moment.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold text-green-600 mb-4">
                  Budget Planning
                </h3>
                <p className="text-gray-600">
                  Plan and manage your budget with our intuitive tools. Set
                  limits, track progress, and get notified when you’re close to
                  overspending.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold text-purple-600 mb-4">
                  Expense Categorization
                </h3>
                <p className="text-gray-600">
                  Automatically categorize your expenses to help you identify
                  spending patterns and make informed financial decisions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold text-red-600 mb-4">
                  Secure & Private
                </h3>
                <p className="text-gray-600">
                  Your financial data is securely encrypted, ensuring your
                  privacy and the protection of your personal information.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold text-yellow-600 mb-4">
                  Insightful Reports
                </h3>
                <p className="text-gray-600">
                  Generate detailed reports on your spending habits, savings,
                  and investments. Analyze your finances with our easy-to-read
                  graphs and statistics.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">
                  Multi-Device Sync
                </h3>
                <p className="text-gray-600">
                  Access your expense data across all your devices, with
                  real-time sync ensuring your financial records are always up
                  to date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
