import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ element: Component }) {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("access_token");

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem("access_token");
          window.location = "lLogin";
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
    const token = localStorage.getItem("access_token");
    if (!token) return true;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const expDate = new Date(decodedToken.exp * 1000); // Convertir el tiempo Unix a una fecha JavaScript
    console.log("Fecha de expiración del token:", expDate);
    return decodedToken.exp < Date.now() / 1000;
  };

  if (!isAuthenticated || isTokenExpired()) {
    // Si no está autenticado o el token ha expirado, redirecciona a la página de inicio de sesión
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Component />;
}

export default ProtectedRoute;
