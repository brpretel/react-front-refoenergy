import "../style/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Header({ title }) {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date()); // Estado inicial para la hora

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('activeMenuItem');
    navigate("/login");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const bogotaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota' }));
      setTime(bogotaTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <div className="left-container">
        <h2>{title}</h2>
        <p>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</p>
      </div>
      <div className="right-container">
        <FontAwesomeIcon
          icon={faSignOut}
          onClick={logout}
          className="logout-icon"
        />
      </div>
    </div>
  );
}

export default Header;
