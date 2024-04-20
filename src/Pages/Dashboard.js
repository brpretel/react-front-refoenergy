import "../style/Dashboard.css";
import Chart from "../components/Chart";

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <div className="graph-container">
        <Chart type="humedad" color="#0cb14a"/>
      </div>
      <div className="graph-container">
        <Chart type="weight" color="#ff9100"/>
      </div>
      <div className="graph-container">
        <Chart type="temperature" color="#ffb800"/>
      </div>
    </div>
  );
}

export default Dashboard;
