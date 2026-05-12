import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import UsuariosPendientes
from "./admin/UsuariosPendientes";

import NegociosPendientes
from "./admin/NegociosPendientes";

function AdminDashboard() {

  const navigate =
    useNavigate();

  const {
    logout,
    user,
  } = useAuth();

  const [activeSection,
    setActiveSection] =
      useState("Usuarios");

  const handleLogout =
    () => {

      logout();

      navigate("/login");

  };

  return (

    <div
      className="
        h-screen
        bg-slate-100
        flex
        overflow-hidden
      "
    >

      {/* SIDEBAR */}
      <aside
        className="
          w-72
          h-screen
          bg-slate-900
          text-white
          p-6
          flex
          flex-col
          shrink-0
        "
      >

        {/* LOGO */}
        <div
          className="
            mb-8
          "
        >

          <h1
            className="
              text-3xl
              font-black
            "
          >
            Admin Panel
          </h1>

          <p
            className="
              text-slate-400
              mt-2
              text-sm
              break-all
            "
          >
            {user?.correo}
          </p>

        </div>

        {/* MENU */}
        <nav
  className="
    flex
    flex-col
    gap-3
  "
>

  <button
    className="
      w-full
      bg-blue-600
      text-white
      px-5
      py-4
      rounded-2xl
    "
  >
    Usuarios
  </button>

  <button
    className="
      w-full
      bg-blue-600
      text-white
      px-5
      py-4
      rounded-2xl
    "
  >
    Negocios
  </button>

  <button
    className="
      w-full
      bg-blue-600
      text-white
      px-5
      py-4
      rounded-2xl
    "
  >
    Categorías
  </button>

  <button
    className="
      w-full
      bg-blue-600
      text-white
      px-5
      py-4
      rounded-2xl
    "
  >
    Municipios
  </button>

  <button
    onClick={handleLogout}
    className="
      w-full
      bg-red-600
      text-white
      px-5
      py-4
      rounded-2xl
      text-left
      border-4
      border-white
    "
  >
    CERRAR SESIÓN
  </button>

</nav>

      </aside>

      {/* CONTENT */}
      <main
        className="
          flex-1
          h-screen
          overflow-y-auto
          p-10
        "
      >

        {
          activeSection ===
          "Usuarios"
          &&
          <UsuariosPendientes />
        }

        {
          activeSection ===
          "Negocios"
          &&
          <NegociosPendientes />
        }

        {
          activeSection ===
          "Categorias"
          &&
          (
            <div
              className="
                bg-white
                rounded-3xl
                p-10
                shadow-sm
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                  text-slate-800
                "
              >
                Categorías
              </h2>

            </div>
          )
        }

        {
          activeSection ===
          "Municipios"
          &&
          (
            <div
              className="
                bg-white
                rounded-3xl
                p-10
                shadow-sm
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                  text-slate-800
                "
              >
                Municipios
              </h2>

            </div>
          )
        }

      </main>

    </div>

  );

}

export default AdminDashboard;