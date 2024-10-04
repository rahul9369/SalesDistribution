import React, { useState, useEffect } from "react";
import { CiExport } from "react-icons/ci";
import axios from "axios";

// Shimmer Placeholder Component
const Shimmer = () => {
  return (
    <div className="bg-white shadow-md rounded-lg col-span-2 p-4">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-300 rounded w-1/4 shimmer"></div>
        <div className="h-6 bg-gray-300 rounded-full w-8 shimmer"></div>
      </div>

      {/* Growth Placeholder */}
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-4 shimmer"></div>

      {/* Image Placeholder */}
      <div className="h-72 bg-gray-300 shimmer mb-4"></div>

      {/* Total Active Users Placeholder */}
      <div className="h-6 bg-gray-300 rounded w-1/4 mb-2 shimmer"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 shimmer"></div>
    </div>
  );
};

const ActiveUser = () => {
  const [activeUserData, setActiveUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    const fetchActiveUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://dummy-data-omega.vercel.app/getdata"
        );
        const activeUsers = response.data.activeUser;
        setActiveUserData(activeUsers);
        setLoading(false);
      } catch (err) {
        setError("Failed to load active user data.");
        setLoading(false);
      }
    };

    fetchActiveUserData();

    // Polling the backend every 30 seconds to update the data
    const interval = setInterval(() => {
      fetchActiveUserData();
      setUpdated(true); // Trigger the visual effect
      setTimeout(() => setUpdated(false), 1000); // Reset after 1 second
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return <Shimmer />; // Display shimmer while loading
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg col-span-2 p-4 transform hover:scale-105 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Active User</h3>
        <button className="text-gray-500 flex justify-center hover:text-gray-700">
          <span className="material-icons mr-1 bg-gray-100 rounded-full p-2">
            <CiExport />
          </span>
          Export
        </button>
      </div>
      <p className="text-blue-500 font-medium">
        {activeUserData.growth} Vs. previous month
      </p>
      <div className="flex justify-between ml-3 mr-3">
        <img
          src="https://media.istockphoto.com/id/1306153869/vector/simple-world-map-in-flat-style-isolated-on-white-background-vector-illustration.jpg?s=612x612&w=0&k=20&c=S-RFsXQWUuMhKXc2gZLjkQxSrjS9hu6ZZByIPITnB94="
          alt="World Map"
          className="w-screen h-72"
        />
      </div>
      <div className="mr-2">
        {/* Apply transition effect here */}
        <p
          className={`text-2xl font-semibold mt-2 transition-all duration-500 ${
            updated ? "text-green-500 scale-110" : ""
          }`}>
          {activeUserData.total}
        </p>
        <p className="text-gray-500">Total Active Users</p>
      </div>
    </div>
  );
};

export default ActiveUser;
