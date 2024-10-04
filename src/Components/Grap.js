import React from "react";
import SalesOverview from "./SalesOverview";
import RevenueUpdates from "./RevenueUpdates";
import YearlySales from "./YearlySales";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <SalesOverview />
      <RevenueUpdates />
      <YearlySales />
    </div>
  );
};

export default Dashboard;
