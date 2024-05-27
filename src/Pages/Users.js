import React, { useState, useEffect } from "react";
import "../style/Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedStatuses, setSelectedStatuses] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://refoenergyean-production.up.railway.app/admin/show_all_users/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
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
    }
  };

  const handleStatusChange = async (user, newStatus) => {
    const url = new URL(
      `https://refoenergyean-production.up.railway.app/admin/update_user_status/${user.id}`
    );
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
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("inactive")}>Inactive</button>
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
