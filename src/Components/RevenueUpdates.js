import React, { useState, useEffect } from "react";
import { PiDotsThree } from "react-icons/pi";
import axios from "axios";

// Shimmer Effect Component
const Shimmer = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    {/* Header */}
    <div className="flex justify-between">
      <div className="h-6 bg-gray-300 rounded w-2/3 shimmer"></div>
      <div className="h-6 bg-gray-300 rounded-full w-8 shimmer"></div>
    </div>

    {/* Shimmer Chart */}
    <div className="flex items-center mt-6">
      {/* Left Side Labels (Shimmer) */}
      <div className="mr-4 flex flex-col justify-between h-24">
        <span className="h-4 bg-gray-300 rounded w-8 shimmer"></span>
        <span className="h-4 bg-gray-300 rounded w-6 shimmer"></span>
        <span className="h-4 bg-gray-300 rounded w-4 shimmer"></span>
        <span className="h-4 bg-gray-300 rounded w-2 shimmer"></span>
      </div>

      {/* Shimmer Bars */}
      <div className="flex-grow">
        <svg className="w-full h-24">
          <rect x="10%" y="30%" width="10%" height="50%" fill="#E5E7EB" />
          <rect x="25%" y="40%" width="10%" height="40%" fill="#E5E7EB" />
          <rect x="40%" y="20%" width="10%" height="60%" fill="#E5E7EB" />
          <rect x="55%" y="50%" width="10%" height="30%" fill="#E5E7EB" />
          <rect x="70%" y="35%" width="10%" height="45%" fill="#E5E7EB" />
        </svg>
      </div>
    </div>
  </div>
);

const RevenueUpdates = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the provided API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://dummy-data-omega.vercel.app/getdata"
      );
      setChartData(response.data.revenveUpdate || []); // Adjust to match your data structure
      setLoading(false);
    } catch (err) {
      setError("Failed to load data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Poll the API every 30 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 30000); // 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Determine the max value to normalize chart heights
  const maxValue = Math.max(...chartData, 120); // 120 as fallback if API data is empty

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold mb-4">Revenue Updates</h3>
        <span className="bg-gray-100 rounded-full mt-1 p-3 cursor-pointer">
          <PiDotsThree />
        </span>
      </div>

      {/* Loading and Error Handling */}
      {loading ? (
        <Shimmer />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        /* Chart with Labels */
        <div className="flex items-center">
          {/* Left Side Labels */}
          <div className="mr-4 flex flex-col justify-between h-24">
            <span className="text-gray-500 text-sm">{maxValue}</span>
            <span className="text-gray-500 text-sm">{(maxValue * 2) / 3}</span>
            <span className="text-gray-500 text-sm">{maxValue / 3}</span>
            <span className="text-gray-500 text-sm">0</span>
          </div>

          {/* Full Width Bar Chart */}
          <div className="flex-grow">
            <svg
              className="w-full h-24"
              viewBox="0 0 100 100"
              preserveAspectRatio="none">
              {/* Dynamic Data from API */}
              {chartData.length > 0 &&
                chartData.map((data, index) => (
                  <rect
                    key={index}
                    x={`${index * (100 / chartData.length) + 5}%`} // Dynamically positioning the bars based on number of data points
                    y={`${100 - (data / maxValue) * 100}%`} // Correctly calculating the y position for the bars
                    width={`${90 / chartData.length}%`} // Ensure bar width adjusts to fit all bars
                    height={`${(data / maxValue) * 100}%`} // Scale height to match the max value
                    fill={index % 2 === 0 ? "#E0E7FF" : "#A5B4FC"} // Alternating colors
                  />
                ))}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueUpdates;
