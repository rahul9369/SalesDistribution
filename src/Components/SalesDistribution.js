import React, { useState, useEffect } from "react";
import axios from "axios";

// Shimmer Effect Component
const Shimmer = () => (
  <div className="bg-blue-50 py-6 m-2 rounded-2xl px-4 sm:px-6 animate-pulse">
    <div className="text-2xl font-semibold mb-4">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-2 shimmer"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 shimmer"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center transform transition-all duration-300">
          <div className="h-8 bg-gray-300 rounded shimmer mb-2"></div>
          <div className="h-4 bg-gray-200 rounded shimmer"></div>
        </div>
      ))}
    </div>
  </div>
);

const SalesDistribution = () => {
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    websiteSales: 0,
    mobileSales: 0,
    marketSales: 0,
    agentSales: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://dummy-data-omega.vercel.app/getdata"
        );
        const data = response.data.saleDistribution || {}; // Adjust based on your API response structure
        setSalesData({
          totalSales: data.totalSale || 0,
          websiteSales: data.byWebsite || 0,
          mobileSales: data.byMobile || 0,
          marketSales: data.byMarket || 0,
          agentSales: data.byAgent || 0,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to load sales distribution data.");
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // If loading or error
  if (loading) return <Shimmer />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-blue-50 py-6 m-2 rounded-2xl px-4 sm:px-6">
      <div className="text-2xl font-semibold mb-4">
        <h1>Sales Distribution</h1>
        <p className="text-gray-500 text-sm">
          This is all over Platform Sales Generated
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-all duration-300">
          <p className="text-2xl font-bold">
            ${salesData.totalSales.toLocaleString()}K
          </p>
          <p className="text-gray-500">Total Sales</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-all duration-300">
          <p className="text-xl font-bold">
            ${salesData.websiteSales.toLocaleString()}K
          </p>
          <p className="text-gray-500">By Website (40%)</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-all duration-300">
          <p className="text-xl font-bold">
            ${salesData.mobileSales.toLocaleString()}K
          </p>
          <p className="text-gray-500">By Mobile (25%)</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-all duration-300">
          <p className="text-xl font-bold">
            ${salesData.marketSales.toLocaleString()}K
          </p>
          <p className="text-gray-500">By Market (20%)</p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-all duration-300">
          <p className="text-xl font-bold">
            ${salesData.agentSales.toLocaleString()}K
          </p>
          <p className="text-gray-500">By Agent (15%)</p>
        </div>
      </div>
    </div>
  );
};

export default SalesDistribution;
