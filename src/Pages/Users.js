import React, { useState, useEffect, useCallback } from "react";
import "../style/Users.css";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedStatuses, setSelectedStatuses] = useState({});

  const API_URL = process.env.REACT_APP_API_URL;

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token"); // Obtener token del almacenamiento local
      const response = await axios.get(`${API_URL}/admin/show_all_users/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token de autenticación
        },
        withCredentials: true, // Incluir credenciales en la solicitud
      });
      const data = response.data;
      if (Array.isArray(data)) {
        setUsers(data);
        setSelectedStatuses(
          data.reduce((acc, user) => {
            acc[user.id] = getOppositeStatus(user.status);
            return acc;
          }, {})
        );
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        if (error.response.status === 401) {
          alert("Session expired. Please log in again.");
          // Redirigir al login o manejar de otra manera
        } else {
          alert(
            `Error al obtener los datos: ${
              error.response.data.message || "Error desconocido"
            }`
          );
        }
      } else {
        alert("Failed to fetch data. Network error or server is down.");
      }
    }
  }, [API_URL]); // `fetchData` will only change if `API_URL` changes

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Add `fetchData` to the dependency array

  const handleStatusChange = async (userId) => {
    const newStatus = selectedStatuses[userId];
    console.log(`Updating user ${userId} to status: ${newStatus}`); // Agregar log para ver el estado que se está enviando
    const url = new URL(`${API_URL}/admin/update_user_status/${userId}`);
    url.searchParams.append("status", newStatus);

    try {
      const token = localStorage.getItem("access_token"); // Obtener token del almacenamiento local
      const response = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Agregar el token de autenticación
        },
        credentials: "include",
      });
      if (response.ok) {
        console.log("Status updated successfully");
        fetchData();
      } else {
        console.error("Failed to update status:", await response.text());
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSelectChange = (userId, value) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [userId]: value,
    }));
    console.log(`User ${userId} status changed to: ${value}`); // Agregar log para ver el cambio de estado
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.status === filter;
  });

  const getOppositeStatus = (currentStatus) => {
    return currentStatus === "active" ? "inactive" : "active";
  };

  return (
    <div className="dashboard-layout">
      <h1>Gestor de Usuarios</h1>
      <br />
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>Todos</button>
        <button onClick={() => setFilter("pending")}>Pendiente</button>
        <button onClick={() => setFilter("active")}>Activo</button>
        <button onClick={() => setFilter("inactive")}>Inactivo</button>
      </div>
      <br />
      <div className="user-section">
        <ul className="user-list">
          {filteredUsers.length === 0 ? (
            <p>No hay usuarios en esta categoria</p>
          ) : (
            filteredUsers.map((user) => (
              <li key={user.id} className="user-item">
                <div>
                  <p>
                    <strong>Usuario:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Estado:</strong> {user.status}
                  </p>
                  <p>
                    <strong>Posicion:</strong> {user.user_role}
                  </p>
                </div>
                <div className="user-config-selector">
                  <select
                    id={`status-select-${user.id}`}
                    value={selectedStatuses[user.id]}
                    onChange={(e) =>
                      handleSelectChange(user.id, e.target.value)
                    }
                    className="status-dropdown"
                  >
                    {user.status === "pending" ? (
                      <>
                        <option value="active">Habilitar</option>
                        <option value="inactive">Inhabilitar</option>
                      </>
                    ) : (
                      <option value={getOppositeStatus(user.status)}>
                        {user.status === "active" ? "Inhabilitar" : "Habilitar"}
                      </option>
                    )}
                  </select>
                  <button onClick={() => handleStatusChange(user.id)}>
                    Actualizar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Users;
