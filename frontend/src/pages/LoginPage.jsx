import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  loginRequest,
} from "../services/auth.service";

import {
  useAuth,
} from "../context/AuthContext";

function LoginPage() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [formData,
    setFormData] =
      useState({
        correo: "",
        contrasena: "",
      });

  const [error,
    setError] =
      useState("");

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setError("");

        const data =
          await loginRequest(
            formData
          );

        login(
          data.user,
          data.token
        );

        // Redirección por rol
        if (
          data.user.rol ===
          "ADMINISTRADOR"
        ) {

          navigate("/admin");

        } else {

          navigate("/owner");

        }

      } catch (error) {

        setError(
          error.response?.data
            ?.message ||
          "Error login"
        );

      }

  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-lg
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
            text-center
          "
        >
          Iniciar Sesión
        </h1>

        {
          error && (

            <p
              className="
                text-red-500
                mb-4
              "
            >
              {error}
            </p>

          )
        }

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={
            formData.correo
          }
          onChange={
            handleChange
          }
          className="
            w-full
            p-3
            border
            rounded-lg
            mb-4
          "
        />

        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={
            formData.contrasena
          }
          onChange={
            handleChange
          }
          className="
            w-full
            p-3
            border
            rounded-lg
            mb-4
          "
        />

        <button
          type="submit"
          className="
            w-full
            bg-blue-600
            text-white
            p-3
            rounded-lg
            font-bold
          "
        >
          Ingresar
        </button>

        <button
          type="button"
          onClick={
            () =>
              navigate("/register")
          }
          className="
            w-full
            mt-4
            text-blue-700
            font-semibold
            hover:text-blue-900
          "
        >
          Registrarme como dueño de negocio
        </button>

      </form>

    </div>

  );

}

export default LoginPage;
