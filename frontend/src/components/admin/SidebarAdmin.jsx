import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaStore,
  FaTags,
  FaMapMarkedAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  useAuth,
} from "../../context/AuthContext";

const SidebarAdmin = () => {

  const navigate =
    useNavigate();

  const {
    logout,
  } = useAuth();

  const handleLogout =
    () => {

      logout();

      navigate("/login");

  };

  const linkClass =
    ({ isActive }) =>

      `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`;

  return (

    <aside
      className="
        w-64
        bg-white
        shadow-lg
        min-h-screen
        p-4
        flex
        flex-col
      "
    >

      {/* LOGO */}
      <div
        className="
          mb-10
        "
      >

        <h1
          className="
            text-2xl
            font-bold
            text-blue-600
          "
        >
          Admin Panel
        </h1>

      </div>

      {/* NAVIGATION */}
      <nav
        className="
          flex
          flex-col
          gap-2
        "
      >

        <NavLink
          to="/admin"
          end
          className={linkClass}
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/usuarios"
          className={linkClass}
        >
          <FaUsers />
          Usuarios
        </NavLink>

        <NavLink
          to="/admin/negocios"
          className={linkClass}
        >
          <FaStore />
          Negocios
        </NavLink>

        <NavLink
          to="/admin/categorias"
          className={linkClass}
        >
          <FaTags />
          Categorías
        </NavLink>

        <NavLink
          to="/admin/municipios"
          className={linkClass}
        >
          <FaMapMarkedAlt />
          Municipios
        </NavLink>

      </nav>

      {/* LOGOUT */}
      <button
        onClick={
          handleLogout
        }
        className="
  flex
  items-center
  gap-3
  px-4
  py-3
  rounded-lg
  bg-red-500
  hover:bg-red-600
  text-white
  transition
  mt-4
"
      >
        <FaSignOutAlt />
        Cerrar sesión
      </button>

    </aside>

  );

};

export default SidebarAdmin;