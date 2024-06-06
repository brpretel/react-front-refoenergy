import "../style/LeftMenu.css";
import image from "../logos/logo-refoenergy.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDotCircle,
  faHistory,
  faCamera,
  faPerson,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function LeftMenu() {
  const API_URL = process.env.REACT_APP_API_URL;

  const initialActiveItem =
    localStorage.getItem("activeMenuItem") || "/lecturas";
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(initialActiveItem);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("activeMenuItem", activeMenuItem);
  }, [activeMenuItem]);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const collapsedClass = isExpanded ? "" : "collapsed";
  const navigateTo = (path) => {
    setActiveMenuItem(path);
    navigate(path);
  };

  async function handleFileChange(event) {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const token = localStorage.getItem("access_token"); // Obtener token del almacenamiento local
        const response = await axios.post(
          `${API_URL}/admin/upload-csv`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Agregar el token de autenticación
            },
            withCredentials: true, // Incluir credenciales en la solicitud
          }
        );
        console.log("Archivo procesado correctamente:", response.data);
        alert("Archivo procesado correctamente");
      } catch (error) {
        console.error("Error al procesar el archivo:", error);
        if (error.response) {
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
          if (error.response.status === 401) {
            alert("Session expired. Please log in again.");
            // Redirigir al login o manejar de otra manera
          } else {
            alert(
              `Error al procesar el archivo: ${
                error.response.data.message || "Error desconocido"
              }`
            );
          }
        } else {
          alert("Failed to process file. Network error or server is down.");
        }
      }
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <nav
      className={`left-menu ${isExpanded ? "" : "collapsed"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`menu-header ${collapsedClass}`}>
        <img className="company-logo" src={image} alt="Company Logo" />
      </div>
      <div className={`menu-element-container ${collapsedClass}`}>
        <ul className={`menu-items ${collapsedClass}`}>
          <li
            className={`menu-item ${collapsedClass} ${
              activeMenuItem === "/lecturas" ? "active" : ""
            }`}
            onClick={() => navigateTo("/lecturas")}
          >
            <FontAwesomeIcon
              icon={faDotCircle}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Lecturas</span>
            </div>
          </li>
          <li
            className={`menu-item ${collapsedClass} ${
              activeMenuItem === "/historico" ? "active" : ""
            }`}
            onClick={() => navigateTo("/historico")}
          >
            <FontAwesomeIcon
              icon={faHistory}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Historico</span>
            </div>
          </li>
        </ul>
        <ul className={`menu-items2 ${collapsedClass}`}>
          <li
            className={`menu-item ${collapsedClass} ${
              activeMenuItem === "/usuarios" ? "active" : ""
            }`}
            onClick={() => navigateTo("/usuarios")}
          >
            <FontAwesomeIcon
              icon={faPerson}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Usuarios</span>
            </div>
          </li>
          <li
            className={`menu-item ${collapsedClass} ${
              activeMenuItem === "/sensores" ? "active" : ""
            }`}
            onClick={() => navigateTo("/sensores")}
          >
            <FontAwesomeIcon
              icon={faCamera}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Sensores</span>
            </div>
          </li>
          <li
            className={`menu-item ${collapsedClass}`}
            onClick={handleUploadClick}
          >
            <FontAwesomeIcon
              icon={faUpload}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Cargar Datos</span>
              <input
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                id="file-upload"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </li>
        </ul>
      </div>
      <div className={`menu-footer ${collapsedClass}`}>
        <FontAwesomeIcon icon={faUser} className={`ft-ico ${collapsedClass}`} />
        <div className={`profile-card-info ${collapsedClass}`}>
          <h1>{username}</h1>
        </div>
      </div>
    </nav>
  );
}

export default LeftMenu;
