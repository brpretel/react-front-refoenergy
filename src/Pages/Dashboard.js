import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../style/Dashboard.css";
import Chart from "../components/Chart";

function Dashboard() {
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (location.pathname === "/lecturas") {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [location.pathname]);

  return (
    <div className="dashboard-layout">
      <div className="graph-container">
        <Chart type="humidity" color="#0cb14a" isMounted={isMounted} />
      </div>
      <div className="graph-container">
        <Chart type="weight" color="#ff9100" isMounted={isMounted} />
      </div>
      <div className="graph-container">
        <Chart type="temperature" color="#ffb800" isMounted={isMounted} />
      </div>
    </div>
  );
}

export default Dashboard;
