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
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function LeftMenu() {
  // Initialize from localStorage or default to "/lecturas"
  const initialActiveItem =
    localStorage.getItem("activeMenuItem") || "/lecturas";
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(initialActiveItem);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // Update localStorage when activeMenuItem changes
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
