import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LeftMenu from "./components/LeftMenu";
import Header from "./components/Header";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import HistoryPage from "./Pages/HistoryPage";
import Users from "./Pages/Users";
import Sensor from "./Pages/Sensor";

function App() {
  const location = useLocation();
  const showMenuAndHeader = location.pathname !== "/login";

  const getPageTitle = (pathname) => {
    const path = pathname.split("/").filter(Boolean);
    const rawTitle = path.length > 0 ? path[path.length - 1] : "lecturas";
    return rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
  };

  const title = getPageTitle(location.pathname);

  return (
    <div className="main-layout">
      {showMenuAndHeader && <LeftMenu />}
      <div className="content-layout">
        <div className="sticky-header-wrapper">
          {showMenuAndHeader && <Header title={title} />}
        </div>
        <Routes>
          <Route
            path="/lecturas"
            element={
              <ProtectedRoute
                element={Dashboard}
                allowedRoles={["master", "admin", "operator"]}
              />
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute
                element={Users}
                allowedRoles={["master", "admin"]}
              />
            }
          />
          <Route
            path="/historico"
            element={
              <ProtectedRoute
                element={HistoryPage}
                allowedRoles={["master", "admin", "operator"]}
              />
            }
          />
          <Route
            path="/sensores"
            element={
              <ProtectedRoute
                element={Sensor}
                allowedRoles={["master", "admin", "operator"]}
              />
            }
          />
          <Route path="*" element={<Navigate to="/lecturas" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
