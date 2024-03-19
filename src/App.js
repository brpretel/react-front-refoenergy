import React, {useState} from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LeftMenu from "./components/LeftMenu";
import Header from "./components/Header";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Pages/Dashboard";

function App() {
  const location = useLocation(); // Obtiene la ubicación actual
  const showMenuAndHeader = location.pathname !== "/Login";

  // Función para obtener el título de la página actual
  const getPageTitle = (pathname) => {
    const path = pathname.split("/").filter(Boolean);
    return path.length > 0 ? path[path.length - 1] : "Dashboard";
  };

  const title = getPageTitle(location.pathname); // Obtiene el título basado en la ruta

  return (
    <div className="main-layout">
        {showMenuAndHeader && <LeftMenu/>}{" "}
      <div className="content-layout">
        {showMenuAndHeader && <Header title={title} />}{" "}
        <Routes>
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={Dashboard} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
