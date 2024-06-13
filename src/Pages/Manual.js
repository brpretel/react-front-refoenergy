import React from "react";
import "../style/Manual.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHistory,
  faCamera,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

function Manual() {
  const manuals = [
    {
      title: "Registro y Acceso de Usuarios",
      description: "Aprende cómo registrar y acceder a los usuarios.",
      icon: faUser,
      filename:
        "https://drive.google.com/file/d/1hOYx2qpQeDO4b-0nrj4NWnkDdw00B6i0/view?usp=sharing",
    },
    {
      title: "Visualización y Creación de Sensores",
      description:
        "Descubre cómo visualizar modificar y crear nuevos sensores.",
      icon: faCamera,
      filename:
        "https://drive.google.com/file/d/1f4XAR_mKPNU_NDXx36diKQaJs3x4SJHL/view?usp=sharing",
    },
    {
      title: "Guía de Lecturas",
      description:
        "Una guía para leer y entender la estructura de la información recolectada.",
      icon: faBook,
      filename:
        "https://drive.google.com/file/d/1Rio-Xj83vqZFGVQxSDtJSGKcDOGAwfV0/view?usp=sharing",
    },
    {
      title: "Histórico de Medidas",
      description: "Consulta el histórico de todas las medidas realizadas.",
      icon: faHistory,
      filename:
        "https://drive.google.com/file/d/12hckTXEXzSYYZ7IbQ6LVfkjscCHNTWhT/view?usp=sharing",
    },
  ];

  return (
    <div className="manual-container">
      <ul className="manual-list">
        {manuals.map((manual, index) => (
          <li key={index} className="manual-item">
            <FontAwesomeIcon icon={manual.icon} className="manual-icon" />
            <div>
              <a
                href={manual.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="manual-link"
              >
                {manual.title}
              </a>
              <p className="manual-description">{manual.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Manual;
