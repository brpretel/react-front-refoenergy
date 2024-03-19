import "../style/Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightDots,
  faArrowUpRightFromSquare,
  faChartSimple,
  faDashboard,
  faPlus,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
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
      <div className="dashboard-data-container">
        <div className="data-container-1">
          <div
            className="left-data-container"
            onClick={() => navigate("/cases")}
          >
            <h2>{temperature.length}</h2> {/* Muestra la cantidad de elementos en cases */}
            <p>Cantidad de Sensores</p>
          </div>
          <div className="right-data-container">
            <FontAwesomeIcon
              icon={faDashboard}
              className="data-container-ico"
            />
          </div>
        </div>
        <div className="data-container-2">
          <div className="left-data-container">
            <h2>Pending data field</h2> {/* Muestra el total de escalaciones */}
            <p>Pendiente por definir</p>
          </div>
          <div className="right-data-container">
            <FontAwesomeIcon
              icon={faArrowUpRightDots}
              className="data-container-ico"
            />
          </div>
        </div>
        <div className="data-container-3">
          <div className="left-data-container">
            {latestTemperature !== null && <h2>{latestTemperature}</h2>} {/* Muestra la temperatura más reciente */}
            <p>Ultima temperatura tomada</p>
          </div>
          <div className="right-data-container">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="data-container-ico"
            />
          </div>
        </div>
      </div>
      <div className="tasks-layout">
        <p>
          Bienvenido a RefoEnergy, elige que tarea deseas realizar para comenzar!
        </p>
        <div className="tasks-container">
          <div className="task-box">
            <div className="left-task-item">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="right-task-item">Tomar Medidas</div>
          </div>
          <div className="task-box">
            <div className="left-task-item">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </div>
            <div className="right-task-item">Generar Reporte</div>
          </div>
          <div className="task-box">
            <div className="left-task-item">
              <FontAwesomeIcon icon={faChartSimple} />
            </div>
            <div className="right-task-item">Resumen de Reporte</div>
          </div>
        </div>
      </div>
      <div className="graph-container">
        <Chart />
      </div>
    </div>
  );
}

export default Dashboard;
