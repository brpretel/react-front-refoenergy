import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import logoRefoEnergy from "../logos/logo-refoenergy.png"
import "../style/login.css"; // Asegúrate de que la ruta es correcta

function Login() {
  const [mode, setMode] = useState("");
  const navigate = useNavigate();
  const toggleMode = (newMode) => {
    setMode(mode === newMode ? "" : newMode);
  };

  async function handleRegister(username, password) {
    try {
      const response = await axios.post("https://refoenergyean-production.up.railway.app/auth/register", {
        headers: {
          "Content-Type": "application/json",
        },
        username,
        password,
        body: JSON.stringify(username, password),
      });
      console.log(response.data);
      localStorage.setItem("access_token", response.data.access_token); // Maneja la respuesta aquí
      alert("Usuario creado con éxito. Por favor, inicia sesión.");
      toggleMode("sign-in-mode");
    } catch (error) {
      console.error("Error al registrar", error);
    }
  }

  async function handleLogin(username, password) {
  try {
    const response = await axios.post("https://refoenergyean-production.up.railway.app/auth/logi", {
      username,
      password
    }, {
      withCredentials: true // Añade esta línea para enviar las cookies con la solicitud
    });
    console.log(response.data); // Maneja la respuesta aquí
    localStorage.setItem("access_token", response.data.access_token);
    navigate("/app");
  } catch (error) {
    console.error("Error al iniciar sesión", error);
  }
}

  function checkPasswordMatch() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("password2").value;
    var message = document.getElementById("passwordMatchMessage");
    var SignUpButton = document.getElementById("SignUpButton");

    if (password === confirmPassword) {
      message.innerHTML = "Passwords match!";
      SignUpButton.disable=false;
    } else {
      message.innerHTML = "Passwords do not match!";
      SignUpButton.disable=true;    }
  }


  return (

    <div className={`login-container ${mode}`}>

      <div className="signin-signup">
        {/* Formulario de Inicio de Sesión */}
        <form
          className="sign-in-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleLogin(formData.get("username"), formData.get("password"));
          }}
        >
          <div className="logo">
            <img src={logoRefoEnergy}></img>
          </div>
          <h2 className="title">Iniciar Sesión</h2>
          <div className="input-field">
            <FontAwesomeIcon icon={faUser} />
            <input name="username" type="text" placeholder="Usuario" />
          </div>
          <div className="input-field">
            <FontAwesomeIcon icon={faLock} />
            <input name="password" type="password" placeholder="Contraseña" />
          </div>
          <input type="submit" value="Iniciar" className="btn" />

          <p className="account-text">
            Don't have an account?{" "}
            <a href="#" onClick={() => toggleMode("sign-up-mode")}>
              Sign up
            </a>
          </p>
        </form>

        {/* Formulario de Registro */}
        <form
          className="sign-up-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleRegister(
              formData.get("username"),
              formData.get("password"),
              formData.get("user_vertical")
            );
          }}
        >
           <div className="logo">
            <img src={logoRefoEnergy}></img>
          </div>
          <h2 className="title">Registro de usuarios</h2>

          <div className="input-field">
            <FontAwesomeIcon icon={faUser} />
            <input
              name="username"
              type="text"
              placeholder="Usuario"
              required
            />
          </div>
          <div className="input-field">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              name="email"
              type="email"
              placeholder="Correo Electrónico"
              required
            />
          </div>
          <div className="input-field">
            <FontAwesomeIcon icon={faLock} />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="input-field">
            <FontAwesomeIcon icon={faLock} />
            <input onChange={checkPasswordMatch}
              id="password2"
              name="password2"
              type="password"
              placeholder="Confirmar Contraseña"
              required
            />
             <span id="passwordMatchMessage"></span>
          </div>
          <div className="input-field">
            <FontAwesomeIcon icon={faEnvelope} />
            <select name="user_vertical" required>
              <option value="">Seleccione su departamento</option>
              <option value="Platform">Departamento 1</option>
              <option value="Payment">Departamento 2</option>
              <option value="Procure">Departamento 3</option>
              <option value="Payment">Departamento 4</option>
            </select>
          </div>
          <input type="submit" value="Sign up" className="btn" id="SignUpButton"/>


        </form>
      </div>

      <div className="panels-container">
        {/* Panel Izquierdo */}
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Ya tiene una cuenta?</h3>
            <p>Por favor use sus credenciales para inciar sesión</p>
            <button className="btn" onClick={() => toggleMode("sign-in-mode")}>
              Iniciar sesión
            </button>
          </div>
          <img src="signin.svg" alt="" className="image" />
        </div>

        {/* Panel Derecho */}
        <div className="panel right-panel">
          <div className="content">
            <h3>¿Necesita registrarse?</h3>
            <p>
              Por favor contacte a su administrador o cree una cuenta con sus credenciales corporativas
            </p>
            <button className="btn" onClick={() => toggleMode("sign-up-mode")}>
              Registrarse
            </button>
          </div>
          <img src="signup.svg" alt="" className="image" />
        </div>
      </div>
    </div>
  );
}

export default Login;