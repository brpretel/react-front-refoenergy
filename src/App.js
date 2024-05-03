import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LeftMenu from "./components/LeftMenu";
import Header from "./components/Header";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import Configuration from "./Pages/Configuration";

function App() {
  const location = useLocation(); // Obtiene la ubicación actual
  const showMenuAndHeader = location.pathname !== "/login";

  // Función para obtener el título de la página actual
  const getPageTitle = (pathname) => {
    const path = pathname.split("/").filter(Boolean);
    const rawTitle = path.length > 0 ? path[path.length - 1] : "leturas";
    return rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
  };

  const title = getPageTitle(location.pathname); // Obtiene el título basado en la ruta

  return (
    <div className="main-layout">
      {showMenuAndHeader && <LeftMenu />}{" "}
      <div className="content-layout">
        <div className="sticky-header-wrapper">
          {showMenuAndHeader && <Header title={title} />}{" "}
        </div>
        <Routes>
          <Route
            path="/lecturas"
            element={<ProtectedRoute element={Dashboard} />}
          />
          <Route
            path="/configuracion"
            element={<ProtectedRoute element={Configuration} />}
          />
          <Route path="*" element={<Navigate to="/lecturas" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
