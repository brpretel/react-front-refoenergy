import "../style/SensorPopup.css";
import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function SensorPopup({ onClose, onSensorAdded }) {
  const [sensorNumber, setSensorNumber] = useState("");
  const [sensorLocation, setSensorLocation] = useState("");

  const handleSensorNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Validar solo números
      setSensorNumber(value);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (!sensorNumber) {
      alert("Sensor number must be a numeric value.");
      return;
    }
    try {
      const token = localStorage.getItem("access_token"); // Obtener token del almacenamiento local
      const response = await axios.post(
        `${API_URL}/admin/sensor/`,
        {
          sensor_number: sensorNumber,
          sensor_location: sensorLocation,
          status: "active",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Agregar el token de autenticación
          },
          withCredentials: true, // Incluir credenciales en la solicitud
        }
      );
      console.log(response.data);
      alert("Sensor Agregado!!");
      onSensorAdded(); // Call the function to refresh the sensor list
      onClose();
    } catch (error) {
      console.error("Error adding sensor", error);
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        if (error.response.status === 401) {
          alert("Session expired. Please log in again.");
          // Redirigir al login o manejar de otra manera
        } else {
          alert(
            `Error al agregar Sensor: ${
              error.response.data.message || "Sensor o locacion ya existen"
            }`
          );
        }
      } else {
        alert("Failed to add sensor. Network error or server is down.");
      }
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Crear Sensor</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Sensor Number"
            value={sensorNumber}
            onChange={handleSensorNumberChange}
            required
          />
          <input
            type="text"
            placeholder="Sensor Location"
            value={sensorLocation}
            onChange={(e) => setSensorLocation(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SensorPopup;
