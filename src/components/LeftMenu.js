import "../style/LeftMenu.css";
import image from "../logos/logo-refoenergy.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faHome,
  faDotCircle,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function LeftMenu() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("lecturas");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

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
        <img
          className="company-logo"
          src={image}
          alt="Grapefruit slice atop a pile of other slices"
        />
      </div>
      <div className={`menu-element-container ${collapsedClass}`}>
        <ul className={`menu-items ${collapsedClass}`}>
          <li
            className={`menu-item ${collapsedClass} ${activeMenuItem === "lecturas" ? "active" : ""}`}
            onClick={() => navigateTo("/lecturas")}
          >
            <FontAwesomeIcon
              icon={faHome}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Lecturas</span>
            </div>
          </li>
          <li
            className={`menu-item ${collapsedClass} ${activeMenuItem === "vivo" ? "active" : ""}`}
            onClick={() => navigateTo("/vivo")}
          >
            <FontAwesomeIcon
              icon={faDotCircle}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>En Vivo</span>
            </div>
          </li>
          <li
            className={`menu-item ${collapsedClass} ${activeMenuItem === "historico" ? "active" : ""}`}
            onClick={() => navigateTo("/history")}
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
            className={`menu-item ${collapsedClass} ${activeMenuItem === "perfil" ? "active" : ""}`}
            onClick={() => navigateTo("/perfil")}
          >
            <FontAwesomeIcon
              icon={faUser}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Perfil</span>
            </div>
          </li>
          <li
            className={`menu-item ${collapsedClass} ${activeMenuItem === "configuracion" ? "active" : ""}`}
            onClick={() => navigateTo("/configuracion")}
          >
            <FontAwesomeIcon
              icon={faGear}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Configuracion</span>
            </div>
          </li>
        </ul>
      </div>
      <div className={`menu-footer ${collapsedClass}`}>
        <FontAwesomeIcon
          icon={faUser}
          className={`ft-ico ${collapsedClass}`}
        />
        <div className={`profile-card-info ${collapsedClass}`}>
          <h1>{username}</h1>
        </div>
      </div>
    </nav>
  );
}

export default LeftMenu;
