import React, { useState, useEffect, useCallback } from "react";
import "../style/Sensor.css";
import SensorPopup from "../components/Sensor-Popup";

function Sensor() {
  const [sensors, setSensors] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/admin/sensor/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setSensors(data);
        setSelectedStatuses(
          data.reduce((acc, sensor) => {
            acc[sensor.id] = sensor.status;
            return acc;
          }, {})
        );
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (sensor, newStatus) => {
    const url = new URL(`${API_URL}/admin/sensor/${sensor.id}`);
    url.searchParams.append("status", newStatus);

    console.log(`URL: ${url.toString()}`);
    try {
      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        fetchData();
      } else {
        console.error("Failed to update status:", await response.text());
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSelectChange = (sensorId, value) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [sensorId]: value,
    }));
  };

  const filteredSensors = sensors.filter((sensor) => {
    if (filter === "all") return true;
    return sensor.status === filter;
  });

  return (
    <div className="dashboard-layout">
      <h1>Gestor de Sensores</h1>
      <br />
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>Todos</button>
        <button onClick={() => setFilter("pending")}>Pendiente</button>
        <button onClick={() => setFilter("active")}>Activo</button>
        <button onClick={() => setFilter("inactive")}>Inactivo</button>
        <button
          className="crear-sensor-button"
          onClick={() => setIsPopupOpen(true)}
        >
          Crear Sensor
        </button>
      </div>
      <br />
      <div className="sensor-section">
        <ul className="sensor-list">
          {filteredSensors.length === 0 ? (
            <p>No se encontraron sensores en esta categoria</p>
          ) : (
            filteredSensors.map((sensor) => (
              <li key={sensor.id} className="sensor-item">
                <div>
                  <p>
                    <strong>Numero de Sensor:</strong> {sensor.sensor_number}
                  </p>
                  <p>
                    <strong>Estado:</strong> {sensor.status}
                  </p>
                  <p>
                    <strong>Ubicación:</strong> {sensor.sensor_location}
                  </p>
                </div>
                <div className="sensor-config-selector">
                  <select
                    id={`status-select-${sensor.id}`}
                    value={selectedStatuses[sensor.id] || sensor.status}
                    onChange={(e) =>
                      handleSelectChange(sensor.id, e.target.value)
                    }
                    className="status-dropdown"
                  >
                    <option value="active">Activar</option>
                    <option value="inactive">Desactivar</option>
                  </select>
                  <button
                    onClick={() =>
                      handleStatusChange(
                        sensor,
                        selectedStatuses[sensor.id] || sensor.status
                      )
                    }
                  >
                    Actualizar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      {isPopupOpen && (
        <SensorPopup
          onClose={() => setIsPopupOpen(false)}
          onSensorAdded={fetchData} // Pass the fetchData function as a prop
        />
      )}
    </div>
  );
}

export default Sensor;
