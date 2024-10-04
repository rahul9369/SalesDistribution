import React, { useState, useEffect } from "react";
import { FaPaypal, FaWallet, FaCreditCard } from "react-icons/fa";
import { PiDotsThree } from "react-icons/pi";
import axios from "axios";

// Shimmer Placeholder Component
const Shimmer = () => (
  <div className="bg-white rounded-lg shadow-md col-span-1/3 p-4 animate-pulse">
    <div className="flex justify-between">
      <div className="h-6 bg-gray-300 rounded w-1/3 shimmer"></div>
      <div className="h-6 bg-gray-300 rounded-full w-8 shimmer"></div>
    </div>
    <div className="space-y-4 mt-4">
      <div className="flex items-center justify-between shadow rounded-sm p-3 shimmer">
        <div className="flex items-center space-x-4">
          <span className="h-10 w-10 bg-gray-300 rounded-full shimmer"></span>
          <div>
            <div className="h-4 bg-gray-300 rounded w-24 shimmer"></div>
            <div className="h-3 bg-gray-300 rounded w-16 shimmer mt-2"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-12 shimmer"></div>
      </div>
      <div className="flex items-center justify-between shadow rounded-sm p-3 shimmer">
        <div className="flex items-center space-x-4">
          <span className="h-10 w-10 bg-gray-300 rounded-full shimmer"></span>
          <div>
            <div className="h-4 bg-gray-300 rounded w-24 shimmer"></div>
            <div className="h-3 bg-gray-300 rounded w-16 shimmer mt-2"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-12 shimmer"></div>
      </div>
    </div>
    <div className="h-8 bg-gray-300 rounded w-full mt-6 shimmer"></div>
  </div>
);

const PaymentGateways = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false); // For polling shimmer effect
  const [error, setError] = useState(null);

  // Function to fetch data
  const fetchPaymentData = async () => {
    try {
      setIsFetching(true); // Activate shimmer effect during data fetch
      const response = await axios.get(
        "https://dummy-data-omega.vercel.app/getdata"
      );
      const paymentGateways = response.data.paymentGateway;

      // Format the data from API
      const formattedData = [
        {
          name: "Paypal",
          amount: paymentGateways.paypal.value,
          description: paymentGateways.paypal.discription,
          icon: <FaPaypal />,
          bgColor: "bg-pink-500",
        },
        {
          name: "Credit Card",
          amount: paymentGateways.craditcard.value,
          description: paymentGateways.craditcard.discription,
          icon: <FaCreditCard />,
          bgColor: "bg-blue-500",
        },
        {
          name: "Wallet",
          amount: paymentGateways.wallet.value,
          description: paymentGateways.wallet.discription,
          icon: <FaWallet />,
          bgColor: "bg-yellow-500",
        },
      ];

      setPaymentData(formattedData);
      setLoading(false); // Stop initial loading
      setIsFetching(false); // Stop shimmer effect
    } catch (err) {
      setError("Failed to load payment gateways data.");
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchPaymentData();

    // Poll the backend every 30 seconds to update the data
    const interval = setInterval(() => {
      fetchPaymentData();
    }, 30000); // 30 seconds (same as in ActiveUser component)

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  // If loading for the first time or fetching during polling
  if (loading || isFetching) return <Shimmer />;

  // If error
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-md col-span-1/3 p-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-semibold">Payment Gateways</h3>
        <span className="bg-gray-100 rounded-full mt-1 p-3 cursor-pointer">
          <PiDotsThree />
        </span>
      </div>

      {/* Dynamic Payment Data */}
      <div className="space-y-4">
        {paymentData.map((gateway, index) => (
          <div
            key={index}
            className="flex items-center shadow rounded-sm p-3 justify-between transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-4">
              <span
                className={`material-icons p-3 rounded-full ${gateway.bgColor} text-white`}>
                {gateway.icon}
              </span>
              <div>
                <p className="font-semibold text-xl">{gateway.name}</p>
                <p className="text-gray-500 text-sm">{gateway.description}</p>
              </div>
            </div>
            <p
              className={`font-semibold ${
                gateway.amount < 0 ? "text-red-500" : "text-black"
              }`}>
              {gateway.amount >= 0
                ? `+$${gateway.amount}`
                : `-$${Math.abs(gateway.amount)}`}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full bg-blue-500 text-xl text-white py-2 rounded-lg hover:bg-blue-600 transition">
          View all transactions
        </button>
      </div>
    </div>
  );
};

export default PaymentGateways;
