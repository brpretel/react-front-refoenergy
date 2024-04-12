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
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const collapsedClass = isExpanded ? "" : "collapsed";
  const navigateTo = (path) => {
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
            className={`menu-item ${collapsedClass}`}
            onClick={() => navigateTo("/dashboard")}
          >
            <FontAwesomeIcon
              icon={faHome}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Dashboard</span>
            </div>
          </li>
          <li
            className={`menu-item ${collapsedClass}`}
            onClick={() => navigateTo("/Cases")}
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
            className={`menu-item ${collapsedClass}`}
            onClick={() => navigateTo("/Escalations")}
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
            className={`menu-item ${collapsedClass}`}
            onClick={() => navigateTo("/Profile")}
          >
            <FontAwesomeIcon
              icon={faUser}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Profile</span>
            </div>
          </li>
          <li
            className={`menu-item ${collapsedClass}`}
            onClick={() => navigateTo("/Settings")}
          >
            <FontAwesomeIcon
              icon={faGear}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Settings</span>
            </div>
          </li>
        </ul>
      </div>
      <div className={`menu-footer ${collapsedClass}`}>
        <img
          className={`profile-img ${collapsedClass}`}
          src={image}
          alt="Grapefruit slice atop a pile of other slices"
        />
        <div className={`profile-card-info ${collapsedClass}`}>
          <h1>a</h1>
          <span>User Type</span>
        </div>
      </div>
    </nav>
  );
}

export default LeftMenu;
