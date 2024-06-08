import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ element: Component, allowedRoles }) {
  const location = useLocation();
  const token = localStorage.getItem("access_token");

  const getUserRoleFromToken = () => {
    if (!token) return null;
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.user_role;
  };

  const userRole = getUserRoleFromToken();
  const isAuthenticated = Boolean(token) && userRole;

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem("access_token");
          window.location = "/login";
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Elimina el interceptor cuando el componente se desmonte
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const isTokenExpired = () => {
    if (!token) return true;
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expDate = new Date(decodedToken.exp * 1000); // Convertir el tiempo Unix a una fecha JavaScript
    console.log("Fecha de expiración del token:", expDate);
    return decodedToken.exp < Date.now() / 1000;
  };

  if (!isAuthenticated || isTokenExpired()) {
    // Si no está autenticado o el token ha expirado, redirecciona a la página de inicio de sesión
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Si el rol del usuario no está permitido, redirecciona a una página de acceso denegado o a la página principal
    return <Navigate to="/lecturas" replace />;
  }

  return <Component />;
}

export default ProtectedRoute;
