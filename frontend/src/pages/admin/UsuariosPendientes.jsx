import {
  useEffect,
  useState,
} from "react";

import {
  Users,
  Search,
  User,
  Mail,
  Shield,
  CheckCircle2,
  XCircle,
  UserX,
  UserCheck,
  Pencil,
  Plus,
} from "lucide-react";

import {
  getAllUsers,
  approveUser,
  rejectUser,
  activateUser,
  deactivateUser,
  createUser,
  updateUser,
} from "../../services/admin/usuarios.service";

function UsuariosPendientes() {

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [showEditModal,
    setShowEditModal] =
      useState(false);

  const [selectedUser,
    setSelectedUser] =
      useState(null);

 const [formData,
  setFormData] =
    useState({
      nombre: "",
      correo: "",
      contrasena: "",
      razon_social: "",
      documento: "",
      telefono: "",
      rol: "DUENO_NEGOCIO",
    });

  useEffect(() => {

    loadUsers();

  }, []);

  // ========================================
  // LOAD USERS
  // ========================================

  const loadUsers =
    async () => {

      try {

        setLoading(true);

        const data =
          await getAllUsers();

        setUsers(
          data.users || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

  };

  // ========================================
  // ACTIONS
  // ========================================

  const handleApprove =
    async (id_usuario) => {

      try {

        await approveUser(
          id_usuario
        );

        loadUsers();

      } catch (error) {

        console.log(error);

      }

  };

  const handleReject =
    async (id_usuario) => {

      try {

        await rejectUser(
          id_usuario
        );

        loadUsers();

      } catch (error) {

        console.log(error);

      }

  };

  const handleDeactivate =
    async (id_usuario) => {

      try {

        await deactivateUser(
          id_usuario
        );

        loadUsers();

      } catch (error) {

        console.log(error);

      }

  };

  const handleActivate =
    async (id_usuario) => {

      try {

        await activateUser(
          id_usuario
        );

        loadUsers();

      } catch (error) {

        console.log(error);

      }

  };

  // ========================================
  // CREATE USER
  // ========================================

  const handleCreateUser =
    async (e) => {

      e.preventDefault();

      try {

        await createUser(
          formData
        );

        setShowModal(false);

        setFormData({
          nombre: "",
          correo: "",
          contrasena: "",
          razon_social: "",
          documento: "",
          telefono: "",
          rol: "DUENO_NEGOCIO",
        });

        loadUsers();

      } catch (error) {

        console.log(error);

      }

  };

  // ========================================
  // EDIT USER
  // ========================================

  const handleEditUser =
    async (e) => {

      e.preventDefault();

      try {

        await updateUser(
          selectedUser.id_usuario,
          selectedUser
        );

        setShowEditModal(false);

        setSelectedUser(null);

        loadUsers();

      } catch (error) {

        console.log(error);

      }

  };

  // ========================================
  // FILTER
  // ========================================

  const filteredUsers =
    users.filter((user) => {

      return (
        user.nombre
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
        ||
        user.correo
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

  });

  // ========================================
  // STATUS COLORS
  // ========================================

  const getStatusStyles =
    (estado) => {

      if (
        estado === "APROBADO"
      ) {

        return `
          bg-green-100
          text-green-700
        `;

      }

      if (
        estado === "RECHAZADO"
      ) {

        return `
          bg-red-100
          text-red-700
        `;

      }

      if (
        estado === "INACTIVO"
      ) {

        return `
          bg-slate-200
          text-slate-700
        `;

      }

      return `
        bg-yellow-100
        text-yellow-700
      `;

  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (

      <div
        className="
          h-[70vh]
          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            w-14
            h-14
            border-4
            border-slate-200
            border-t-slate-800
            rounded-full
            animate-spin
          "
        />

      </div>

    );

  }

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        p-6
        rounded-3xl
      "
    >

      {/* HERO */}
      <div
        className="
          bg-gradient-to-r
          from-slate-900
          via-slate-800
          to-slate-900
          rounded-[32px]
          p-10
          text-white
          shadow-2xl
          mb-8
          relative
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            top-0
            right-0
            w-96
            h-96
            bg-white/5
            rounded-full
            blur-3xl
          "
        />

        <div className="relative z-10">

          <p
            className="
              uppercase
              tracking-[5px]
              text-slate-300
              text-sm
              mb-4
            "
          >
            Administración
          </p>

          <h1
            className="
              text-5xl
              font-black
            "
          >
            Gestión de Usuarios
          </h1>

          <p
            className="
              text-slate-300
              mt-4
              text-lg
              max-w-2xl
            "
          >
            Administra usuarios,
            permisos, estados y
            accesos dentro de la
            plataforma.
          </p>

        </div>

      </div>

      {/* MAIN CARD */}
      <div
        className="
          bg-white
          rounded-[32px]
          shadow-sm
          border
          border-slate-200
          overflow-hidden
        "
      >

        {/* HEADER */}
        <div
          className="
            p-8
            border-b
            border-slate-100
            flex
            flex-col
            xl:flex-row
            justify-between
            items-center
            gap-5
          "
        >

          <div>

            <h2
              className="
                text-3xl
                font-black
                text-slate-800
              "
            >
              Usuarios Registrados
            </h2>

            <p
              className="
                text-slate-500
                mt-2
              "
            >
              Total usuarios:
              {" "}
              {users.length}
            </p>

          </div>

          <div
            className="
              flex
              flex-col
              lg:flex-row
              gap-4
              w-full
              xl:w-auto
            "
          >

            {/* SEARCH */}
            <div
              className="
                relative
                w-full
                lg:w-96
              "
            >

              <Search
                size={20}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder="Buscar usuario..."
                value={search}
                onChange={
                  (e) =>
                    setSearch(
                      e.target.value
                    )
                }
                className="
                  w-full
                  bg-slate-100
                  border
                  border-slate-200
                  rounded-2xl
                  pl-12
                  pr-5
                  py-4
                  outline-none
                  focus:ring-2
                  focus:ring-slate-300
                "
              />

            </div>

            {/* BUTTON */}
            <button
              onClick={
                () =>
                  setShowModal(true)
              }
              className="
                bg-slate-900
                hover:bg-black
                text-white
                px-6
                py-4
                rounded-2xl
                font-bold
                flex
                items-center
                justify-center
                gap-3
                transition-all
              "
            >

              <Plus size={20} />

              Crear Usuario

            </button>

          </div>

        </div>

        {/* TABLE */}
        <div
          className="
            overflow-x-auto
          "
        >

          <table className="w-full">

            <thead
              className="
                bg-slate-50
              "
            >

              <tr>

                <th className="p-6 text-left">
                  Usuario
                </th>

                <th className="p-6 text-left">
                  Rol
                </th>

                <th className="p-6 text-left">
                  Estado
                </th>

                <th className="p-6 text-left">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody>

              {
                filteredUsers.map(
                  (user) => (

                    <tr
                      key={
                        user.id_usuario
                      }
                      className="
                        border-t
                        hover:bg-slate-50
                        transition-all
                      "
                    >

                      {/* USER */}
                      <td className="p-6">

                        <div
                          className="
                            flex
                            items-center
                            gap-4
                          "
                        >

                          <div
                            className="
                              w-14
                              h-14
                              rounded-2xl
                              bg-slate-100
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <User
                              className="
                                text-slate-700
                              "
                            />

                          </div>

                          <div>

                            <p
                              className="
                                font-bold
                                text-slate-800
                              "
                            >
                              {user.nombre}
                            </p>

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-slate-500
                                text-sm
                                mt-1
                              "
                            >

                              <Mail size={14} />

                              {user.correo}

                            </div>

                          </div>

                        </div>

                      </td>

                      {/* ROLE */}
                      <td className="p-6">

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-2
                            bg-purple-100
                            text-purple-700
                            px-4
                            py-2
                            rounded-2xl
                            font-semibold
                            text-sm
                          "
                        >

                          <Shield size={16} />

                          {user.rol}

                        </span>

                      </td>

                      {/* STATUS */}
                      <td className="p-6">

                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-2xl
                            font-semibold
                            text-sm
                            ${getStatusStyles(
                              user.estado_usuario
                            )}
                          `}
                        >

                          {
                            user.estado_usuario
                          }

                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td className="p-6">

                        <div
                          className="
                            flex
                            gap-3
                            flex-wrap
                          "
                        >

                          {/* EDIT */}
                          <button
                            onClick={
                              () => {

                                setSelectedUser(user);

                                setShowEditModal(true);

                              }
                            }
                            className="
                              bg-slate-800
                              hover:bg-black
                              text-white
                              px-4
                              py-3
                              rounded-2xl
                              font-semibold
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <Pencil size={16} />

                            Editar

                          </button>

                          {/* APPROVE */}
                          {
                            user.estado_usuario ===
                            "PENDIENTE"
                            && (

                              <button
                                onClick={
                                  () =>
                                    handleApprove(
                                      user.id_usuario
                                    )
                                }
                                className="
                                  bg-green-600
                                  hover:bg-green-700
                                  text-white
                                  px-4
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  flex
                                  items-center
                                  gap-2
                                "
                              >

                                <CheckCircle2
                                  size={16}
                                />

                                Aprobar

                              </button>

                            )
                          }

                          {/* REJECT */}
                          {
                            user.estado_usuario ===
                            "PENDIENTE"
                            && (

                              <button
                                onClick={
                                  () =>
                                    handleReject(
                                      user.id_usuario
                                    )
                                }
                                className="
                                  bg-red-500
                                  hover:bg-red-600
                                  text-white
                                  px-4
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  flex
                                  items-center
                                  gap-2
                                "
                              >

                                <XCircle
                                  size={16}
                                />

                                Rechazar

                              </button>

                            )
                          }

                          {/* DEACTIVATE */}
                          {
                            user.estado_usuario ===
                            "APROBADO"
                            && (

                              <button
                                onClick={
                                  () =>
                                    handleDeactivate(
                                      user.id_usuario
                                    )
                                }
                                className="
                                  bg-orange-500
                                  hover:bg-orange-600
                                  text-white
                                  px-4
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  flex
                                  items-center
                                  gap-2
                                "
                              >

                                <UserX
                                  size={16}
                                />

                                Desactivar

                              </button>

                            )
                          }

                          {/* ACTIVATE */}
                          {
                            user.estado_usuario ===
                            "INACTIVO"
                            && (

                              <button
                                onClick={
                                  () =>
                                    handleActivate(
                                      user.id_usuario
                                    )
                                }
                                className="
                                  bg-blue-600
                                  hover:bg-blue-700
                                  text-white
                                  px-4
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  flex
                                  items-center
                                  gap-2
                                "
                              >

                                <UserCheck
                                  size={16}
                                />

                                Activar

                              </button>

                            )
                          }

                        </div>

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>
          {/* CREATE MODAL */}
      {
        showModal && (

          <div
            className="
              fixed
              inset-0
              bg-black/60
              backdrop-blur-sm
              flex
              items-center
              justify-center
              z-50
              p-6
            "
          >

            <div
              className="
                bg-white
                rounded-[32px]
                w-full
                max-w-2xl
                p-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-8
                "
              >

                <div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      text-slate-800
                    "
                  >
                    Crear Usuario
                  </h2>

                  <p
                    className="
                      text-slate-500
                      mt-2
                    "
                  >
                    Registra un nuevo usuario
                  </p>

                </div>

                <button
                  onClick={
                    () =>
                      setShowModal(false)
                  }
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-slate-100
                    hover:bg-slate-200
                    text-xl
                    font-bold
                  "
                >
                  ×
                </button>

              </div>

              <form
                onSubmit={
                  handleCreateUser
                }
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-5
                "
              >

                <input
                  type="text"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={
                    (e) =>
                      setFormData({
                        ...formData,
                        nombre:
                          e.target.value,
                      })
                  }
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                  required
                />

                <input
                  type="email"
                  placeholder="Correo"
                  value={formData.correo}
                  onChange={
                    (e) =>
                      setFormData({
                        ...formData,
                        correo:
                          e.target.value,
                      })
                  }
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                  required
                />

                <input
                  type="password"
                  placeholder="Contraseña"
                  value={formData.contrasena}
                  onChange={
                    (e) =>
                      setFormData({
                        ...formData,
                        contrasena:
                          e.target.value,
                      })
                  }
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                  required
                />

                <input
                  type="text"
                  placeholder="Documento"
                  value={formData.documento}
                  onChange={
                    (e) =>
                      setFormData({
                        ...formData,
                        documento:
                          e.target.value,
                      })
                  }
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

                <input
                  type="text"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={
                    (e) =>
                      setFormData({
                        ...formData,
                        telefono:
                          e.target.value,
                      })
                  }
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

                <input
                  type="text"
                  placeholder="Razón social"
                  value={formData.razon_social}
                  onChange={
                    (e) =>
                      setFormData({
                        ...formData,
                        razon_social:
                          e.target.value,
                      })
                  }
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

                <select
  value={formData.rol}
  onChange={
    (e) =>
      setFormData({
        ...formData,
        rol:
          e.target.value,
      })
  }
  className="
    bg-slate-100
    rounded-2xl
    px-5
    py-4
    outline-none
    md:col-span-2
  "
>

  <option value="DUENO_NEGOCIO">
    DUENO_NEGOCIO
  </option>

  <option value="ADMINISTRADOR">
    ADMINISTRADOR
  </option>

</select>

                <div
                  className="
                    md:col-span-2
                    flex
                    justify-end
                    gap-4
                    mt-4
                  "
                >

                  <button
                    type="button"
                    onClick={
                      () =>
                        setShowModal(false)
                    }
                    className="
                      px-6
                      py-4
                      rounded-2xl
                      bg-slate-200
                      font-semibold
                    "
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="
                      px-6
                      py-4
                      rounded-2xl
                      bg-slate-900
                      hover:bg-black
                      text-white
                      font-bold
                    "
                  >
                    Crear Usuario
                  </button>

                </div>

              </form>

            </div>

          </div>

        )
      }

      {/* EDIT MODAL */}
      {
        showEditModal
        &&
        selectedUser
        && (

          <div
            className="
              fixed
              inset-0
              bg-black/60
              backdrop-blur-sm
              flex
              items-center
              justify-center
              z-50
              p-6
            "
          >

            <div
              className="
                bg-white
                rounded-[32px]
                w-full
                max-w-2xl
                p-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-8
                "
              >

                <div>

                  <h2
                    className="
                      text-3xl
                      font-black
                      text-slate-800
                    "
                  >
                    Editar Usuario
                  </h2>

                  <p
                    className="
                      text-slate-500
                      mt-2
                    "
                  >
                    Actualiza la información
                  </p>

                </div>

                <button
                  onClick={
                    () => {

                      setShowEditModal(false);

                      setSelectedUser(null);

                    }
                  }
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-slate-100
                    hover:bg-slate-200
                    text-xl
                    font-bold
                  "
                >
                  ×
                </button>

              </div>

              <form
                onSubmit={
                  handleEditUser
                }
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-5
                "
              >

                <input
                  type="text"
                  value={selectedUser.nombre}
                  onChange={
                    (e) =>
                      setSelectedUser({
                        ...selectedUser,
                        nombre:
                          e.target.value,
                      })
                  }
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

                <input
                  type="email"
                  value={selectedUser.correo}
                  onChange={
                    (e) =>
                      setSelectedUser({
                        ...selectedUser,
                        correo:
                          e.target.value,
                      })
                  }
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

                <input
                  type="text"
                  value={
                    selectedUser.telefono || ""
                  }
                  onChange={
                    (e) =>
                      setSelectedUser({
                        ...selectedUser,
                        telefono:
                          e.target.value,
                      })
                  }
                  placeholder="Teléfono"
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

                <input
                  type="text"
                  value={
                    selectedUser.documento || ""
                  }
                  onChange={
                    (e) =>
                      setSelectedUser({
                        ...selectedUser,
                        documento:
                          e.target.value,
                      })
                  }
                  placeholder="Documento"
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

                <input
                  type="text"
                  value={
                    selectedUser.razon_social || ""
                  }
                  onChange={
                    (e) =>
                      setSelectedUser({
                        ...selectedUser,
                        razon_social:
                          e.target.value,
                      })
                  }
                  placeholder="Razón social"
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                />

                <select
                  value={selectedUser.rol}
                  onChange={
                    (e) =>
                      setSelectedUser({
                        ...selectedUser,
                        rol:
                          e.target.value,
                      })
                  }
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                  "
                >

                  <option value="ADMINISTRADOR">
                    ADMINISTRADOR
                  </option>

                  <option value="DUENO_NEGOCIO">
                    DUENO_NEGOCIO
                  </option>

                </select>

                <select
                  value={
                    selectedUser.estado_usuario
                  }
                  onChange={
                    (e) =>
                      setSelectedUser({
                        ...selectedUser,
                        estado_usuario:
                          e.target.value,
                      })
                  }
                  className="
                    bg-slate-100
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    md:col-span-2
                  "
                >

                  <option value="PENDIENTE">
                    PENDIENTE
                  </option>

                  <option value="APROBADO">
                    APROBADO
                  </option>

                  <option value="RECHAZADO">
                    RECHAZADO
                  </option>

                  <option value="INACTIVO">
                    INACTIVO
                  </option>

                </select>

                <div
                  className="
                    md:col-span-2
                    flex
                    justify-end
                    gap-4
                    mt-4
                  "
                >

                  <button
                    type="button"
                    onClick={
                      () => {

                        setShowEditModal(false);

                        setSelectedUser(null);

                      }
                    }
                    className="
                      px-6
                      py-4
                      rounded-2xl
                      bg-slate-200
                      font-semibold
                    "
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="
                      px-6
                      py-4
                      rounded-2xl
                      bg-slate-900
                      hover:bg-black
                      text-white
                      font-bold
                    "
                  >
                    Guardar Cambios
                  </button>

                </div>

              </form>

            </div>

          </div>

        )
      }          
    </div>

  );

}

export default UsuariosPendientes;