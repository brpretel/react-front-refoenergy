import "../style/LeftMenu.css";
import image from "../logos/usr-image.jpg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faArrowUpRightDots,
  faBell,
  faUser,
  faGear,
  faAddressBook,
  faHandshake,
  faGraduationCap,
  faGauge,
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
        <div className={`company-card-info ${collapsedClass}`}>
          <h1>RefoEnergy</h1>
          <span>User Charge</span>
        </div>
      </div>
      <div className={`menu-element-container ${collapsedClass}`}>
        <ul className={`menu-items ${collapsedClass}`}>
          <li
            className={`menu-item ${collapsedClass}`}
            onClick={() => navigateTo("/Dashboard")}
          >
            <FontAwesomeIcon
              icon={faGauge}
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
              icon={faLayerGroup}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Cases</span>
            </div>
          </li>
          <li
            className={`menu-item ${collapsedClass}`}
            onClick={() => navigateTo("/Escalations")}
          >
            <FontAwesomeIcon
              icon={faArrowUpRightDots}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Escalations</span>
            </div>
          </li>
        </ul>
        <ul className={`menu-items ${collapsedClass}`}>
          <li
            className={`menu-item ${collapsedClass}`}
            onClick={() => navigateTo("/Learning-Portal")}
          >
            <FontAwesomeIcon
              icon={faGraduationCap}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Learning Portal</span>
            </div>
          </li>
          <li
            className={`menu-item ${collapsedClass}`}
            onClick={() => navigateTo("/Slack-Help")}
          >
            <FontAwesomeIcon
              icon={faHandshake}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Slack Help</span>
            </div>
          </li>
          <li
            className={`menu-item ${collapsedClass}`}
            onClick={() => navigateTo("/Contact")}
          >
            <FontAwesomeIcon
              icon={faAddressBook}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Contact</span>
            </div>
          </li>
        </ul>
        <ul className={`menu-items ${collapsedClass}`}>
          <li
            className={`menu-item ${collapsedClass}`}
            onClick={() => navigateTo("/Notifications")}
          >
            <FontAwesomeIcon
              icon={faBell}
              className={`menu-ico ${collapsedClass}`}
            />
            <div className={`text-menu ${collapsedClass}`}>
              <span>Notifications</span>
            </div>
          </li>
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