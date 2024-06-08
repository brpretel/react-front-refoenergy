import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import logoRefoEnergy from "../logos/logo-refoenergy.png";
import "../style/login.css"; // Asegúrate de que la ruta es correcta

function Login() {
  const [mode, setMode] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [messageClass, setMessageClass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const toggleMode = (newMode) => {
    setMode(mode === newMode ? "" : newMode);
  };

  const API_URL = process.env.REACT_APP_API_URL;

  async function handleRegister(username, password, email, special_code) {
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        {
          username,
          password,
          email,
          special_code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true, // Añade esta línea para enviar las cookies con la solicitud
        }
      );
      console.log(response.data); // Maneja la respuesta aquí
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("username", username);
      navigate("/app");
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      if (error.response && error.response.status === 401) {
        setErrorMessage(
          "Usuario o contraseña incorrectos, o el usuario no está activo o no existe."
        );
      } else {
        setErrorMessage(
          "Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo nuevamente."
        );
      }
    }
  }

  function checkPasswordMatch() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password2").value;
    const signUpButton = document.getElementById("SignUpButton");
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordMessage(
        "La contraseña debe tener al menos 10 caracteres, incluyendo una mayúscula, un número y un carácter especial."
      );
      setMessageClass("error-message");
      signUpButton.disabled = true;
    } else if (password !== confirmPassword) {
      setPasswordMessage("¡Las contraseñas no coinciden!");
      setMessageClass("error-message");
      signUpButton.disabled = true;
    } else {
      setPasswordMessage("¡Las contraseñas coinciden!");
      setMessageClass("success-message");
      signUpButton.disabled = false;
    }
  }

  function handleBlur() {
    setPasswordMessage("");
    setMessageClass("");
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
            <img src={logoRefoEnergy} alt="RefoEnergy Logo" />
          </div>
          <h2 className="title">Iniciar Sesión</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="input-field">
            <FontAwesomeIcon icon={faUser} />
            <input name="username" type="text" placeholder="Usuario" required />
          </div>
          <div className="input-field">
            <FontAwesomeIcon icon={faLock} />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              required
            />
          </div>
          <input type="submit" value="Iniciar" className="btn" />

          <p className="account-text">
            ¿No tienes una cuenta?{" "}
            <a href="#!" onClick={() => toggleMode("sign-up-mode")}>
              Regístrate
            </a>
          </p>
        </form>

        {/* Formulario de Registro */}
        <form
          className="sign-up-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const password = formData.get("password");

            if (
              !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(
                password
              )
            ) {
              alert(
                "La contraseña debe tener al menos 10 caracteres, incluyendo una mayúscula, un número y un carácter especial."
              );
              return;
            }

            handleRegister(
              formData.get("username"),
              password,
              formData.get("email"),
              formData.get("special_code")
            );
          }}
        >
          <div className="logo">
            <img src={logoRefoEnergy} alt="RefoEnergy Logo" />
          </div>
          <h2 className="title">Registro de usuarios</h2>
          <div className="input-field">
            <FontAwesomeIcon icon={faUser} />
            <input name="username" type="text" placeholder="Usuario" required />
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
              onChange={checkPasswordMatch}
              onBlur={handleBlur}
              onFocus={checkPasswordMatch}
            />
          </div>
          <div className="input-field">
            <FontAwesomeIcon icon={faLock} />
            <input
              id="password2"
              name="password2"
              type="password"
              placeholder="Confirmar Contraseña"
              onChange={checkPasswordMatch}
              onBlur={handleBlur}
              onFocus={checkPasswordMatch}
              required
            />
          </div>
          <div className="input-field">
            <FontAwesomeIcon icon={faKey} />
            <input name="special_code" type="text" placeholder="Token" />
          </div>
          <div className={`password-message ${messageClass}`}>
            {passwordMessage}
          </div>
          <p className="account-text-mobile">
            ¿Ya tienes una cuenta?{" "}
            <a href="#!" onClick={() => toggleMode("sign-in-mode")}>
              Inicia sesión aquí
            </a>
          </p>
          <input
            type="submit"
            value="Registrarse"
            className="btn"
            id="SignUpButton"
          />
        </form>
      </div>

      <div className="panels-container">
        {/* Panel Izquierdo */}
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Ya tienes una cuenta?</h3>
            <p>Por favor, usa tus credenciales para iniciar sesión</p>
            <button className="btn" onClick={() => toggleMode("sign-in-mode")}>
              Iniciar sesión
            </button>
          </div>
        </div>

        {/* Panel Derecho */}
        <div className="panel right-panel">
          <div className="content">
            <h3>¿Necesitas registrarte?</h3>
            <p>
              Por favor, contacta a tu administrador o crea una cuenta con tus
              credenciales corporativas
            </p>
            <button className="btn" onClick={() => toggleMode("sign-up-mode")}>
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
