import "../style/Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "../components/Chart";

function Dashboard() {
  const navigate = useNavigate();
  const [temperature, setTemperature] = useState([]);
  const [latestTemperature, setLatestTemperature] = useState(null); // Estado para almacenar la temperatura más reciente

  const fetchSensorData = async () => {
    try {
      const response = await axios.get(
        "https://refoenergyean-production.up.railway.app/temperature_sensor/show_all_temperatures/",
        { withCredentials: true }
      );
      setTemperature(response.data);

      // Establecer la temperatura más reciente
      if (response.data.length > 0) {
        const latestTemp = response.data[response.data.length - 1].temperature;
        setLatestTemperature(latestTemp);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();
  }, []);

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
