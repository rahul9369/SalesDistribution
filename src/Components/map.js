import React from "react";
import ActiveUser from "./ActiveUsers";
import PaymentGateways from "./PaymentGateways";

const Dashboard = () => {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-3 gap-6 p-6 ">
      <ActiveUser className="col-span-2" />
      <PaymentGateways className="col-span-1" />
    </div>
  );
};

export default Dashboard;
