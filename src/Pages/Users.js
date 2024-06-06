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
            acc[user.id] = user.status;
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

  const handleStatusChange = async (user, newStatus) => {
    const url = new URL(`${API_URL}/admin/update_user_status/${user.id}`);
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

  const handleSelectChange = (userId, value) => {
    setSelectedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [userId]: value,
    }));
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.status === filter;
  });

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
                    value={selectedStatuses[user.id] || user.status}
                    onChange={(e) =>
                      handleSelectChange(user.id, e.target.value)
                    }
                    className="status-dropdown"
                  >
                    <option value="active">Habilitar</option>
                    <option value="inactive">Inhabilitar</option>
                  </select>
                  <button
                    onClick={() =>
                      handleStatusChange(
                        user,
                        selectedStatuses[user.id] || user.status
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
    </div>
  );
}

export default Users;
