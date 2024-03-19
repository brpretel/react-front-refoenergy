import "../style/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faQuestion,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

function Header({ title }) {
  return (
    <div className="container">
      <div className="left-container">
        <h2>{title}</h2>
      </div>
      <div className="mid-container">
        <FontAwesomeIcon icon={faSearch} className="faSearch" />
        <input className="search-bar"></input>
      </div>
      <div className="right-container">
        <FontAwesomeIcon icon={faBell} className="faBell" />
        <FontAwesomeIcon icon={faQuestion} className="faQuestion" />
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="faEllipsisVertical"
        />
      </div>
    </div>
  );
}

export default Header;