import React, { useState, useEffect } from "react";
import { PiDotsThree } from "react-icons/pi";
import axios from "axios";

// Shimmer Effect Component
const Shimmer = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    {/* Header */}
    <div className="flex justify-between">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="h-8 w-8 rounded-full bg-gray-300 mt-1"></div>
    </div>

    {/* Sales Circular Chart and Info */}
    <div className="flex items-center justify-between">
      {/* Circular Chart Placeholder */}
      <div className="relative flex justify-start">
        <svg className="w-24 h-24" viewBox="0 0 36 36">
          <circle
            className="text-gray-200"
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
          />
          <circle
            className="text-gray-300"
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-semibold">
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Profit and Expense Info Placeholder */}
      <div className="ml-8">
        <div className="mb-4">
          <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    </div>
  </div>
);

const SalesOverview = () => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the provided API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://dummy-data-omega.vercel.app/getdata"
        );
        setSalesData(response.data.salesOverview || {}); // Adjust to match your data structure
        setLoading(false);
      } catch (err) {
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // If loading or error
  if (loading) return <Shimmer />;
  if (error) return <p className="text-red-500">{error}</p>;

  // Assuming the API returns values for total sales, profit, and expense
  const { totalSales = 400000, profit = 23450, expense = 23450 } = salesData;

  // Calculate percentages for the circular chart
  const total = profit + expense;
  const profitPercentage = (profit / total) * 100;
  const expensePercentage = (expense / total) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold mb-4">Sales Overview</h3>
        <span className="bg-gray-100 rounded-full mt-1 p-3 cursor-pointer">
          <PiDotsThree />
        </span>
      </div>

      {/* Sales Circular Chart and Info */}
      <div className="flex items-center justify-between ">
        {/* Circular Chart */}
        <div className="relative flex justify-start font-bold">
          <svg className="w-24 h-24" viewBox="0 0 36 36">
            {/* Background Circle */}
            <path
              className="text-gray-200"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            {/* First Segment (Profit) */}
            <path
              className="text-blue-500"
              strokeDasharray={`${profitPercentage}, 100`}
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            {/* Second Segment (Expense) */}
            <path
              className="text-green-500"
              strokeDasharray={`${expensePercentage}, 100`}
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
          </svg>

          {/* Center Text (Total Sales) */}
          <div className="absolute inset-0 flex items-center justify-center font-semibold">
            ${totalSales.toLocaleString()}
          </div>
        </div>

        {/* Profit and Expense Info */}
        <div className="ml-8">
          <div className="mb-4">
            <span className="text-blue-500">●</span>
            <span className="text-lg font-semibold ml-2">
              ${profit.toLocaleString()}
            </span>
            <p className="text-gray-500">Profit</p>
          </div>
          <div>
            <span className="text-green-500">●</span>
            <span className="text-lg font-semibold ml-2">
              ${expense.toLocaleString()}
            </span>
            <p className="text-gray-500">Expense</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;
