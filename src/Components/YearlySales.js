import React, { useState, useEffect } from "react";
import { PiDotsThree } from "react-icons/pi";
import axios from "axios";

const YearlySales = () => {
  const [salesData, setSalesData] = useState({}); // State to store sales data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://dummy-data-omega.vercel.app/getdata" // Your API URL
        );
        const yearlySales = response.data.yearlySales; // Accessing 'yearlySales' object
        setSalesData(yearlySales); // Store the fetched data in state
        setLoading(false);
      } catch (err) {
        setError("Failed to load sales data.");
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Loading state with shimmer effect
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="w-1/2 h-6 shimmer"></div>
        <div className="w-8 h-8 shimmer rounded-full"></div>
      </div>

      {/* Sales Graph */}
      <div className="relative flex justify-center items-center h-40 mt-4 shimmer"></div>

      {/* Sales Values */}
      <div className="flex justify-between mt-6">
        <div className="flex items-center space-x-2">
          <span
            className="text-blue-500 shimmer"
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
            }}></span>
          <div>
            <div className="w-16 h-6 shimmer"></div>
            <div className="w-10 h-4 shimmer"></div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className="text-blue-300 shimmer"
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
            }}></span>
          <div>
            <div className="w-16 h-6 shimmer"></div>
            <div className="w-10 h-4 shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Inline CSS for shimmer effect
  const shimmerStyle = `
    .shimmer {
      position: relative;
      overflow: hidden;
      background-color: #f6f7f8;
    }

    .shimmer::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0) 100%);
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }
  `;

  // Append style to head for shimmer effect
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = shimmerStyle;
  document.head.appendChild(styleSheet);

  if (loading) return <LoadingSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold mb-4">Yearly Sales</h3>
        <span className="bg-gray-100 rounded-full mt-1 p-3 cursor-pointer">
          <PiDotsThree />
        </span>
      </div>

      {/* Sales Graph */}
      <div className="relative flex justify-center items-center h-40">
        <svg
          className="w-full h-full"
          viewBox="0 0 500 100"
          preserveAspectRatio="none">
          {/* Background Gradient Fill */}
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0.2" />
          </linearGradient>

          {/* Smooth Curved Line with Shaded Area */}
          <path
            d="M0,80 C100,20 200,90 300,50 C400,10 500,90 500,100 L0,100 Z"
            fill="url(#gradient)"
            stroke="none"
          />

          {/* Top Line */}
          <path
            d="M0,80 C100,20 200,90 300,50 C400,10 500,90"
            stroke="#818CF8"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Sales Values */}
      <div className="flex justify-between mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-blue-500">●</span>
          <div>
            <p className="text-blue-500 font-bold">
              ${salesData["2023"] || "5476"} {/* Fetched value for 2023 */}
            </p>
            <p className="text-gray-500 text-sm">2023</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-blue-300">●</span>
          <div>
            <p className="text-gray-500 font-bold">
              ${salesData["2022"] || "4476"} {/* Fetched value for 2022 */}
            </p>
            <p className="text-gray-500 text-sm">2022</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlySales;
