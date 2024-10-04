import React from "react";
// import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import SalesDistribution from "./Components/SalesDistribution";
import Grap from "./Components/Grap";
import Map from "./Components/map";
const App = () => {
  return (
    <div className="flex h-screen 	">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
          <SalesDistribution />
          <Grap />
          <Map />
        </div>
      </div>
    </div>
  );
};

export default App;
