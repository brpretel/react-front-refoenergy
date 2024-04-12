import "../style/Dashboard.css";
import Chart from "../components/Chart";

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <div className="graph-container">
        <Chart />
      </div>
      <div className="graph-container">
        <Chart />
      </div>
      <div className="graph-container">
        <Chart />
      </div>
    </div>
  );
}

export default Dashboard;
