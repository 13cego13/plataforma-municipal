import {
  useEffect,
  useState,
} from "react";

import {
  MapPin,
  Search,
  Plus,
  Pencil,
  Power,
} from "lucide-react";

function MunicipiosAdmin() {

  const API =
    `${import.meta.env.VITE_ADMIN_API}/municipios`;

  const [municipios,
    setMunicipios] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  const [search,
    setSearch] =
      useState("");

  const [showModal,
    setShowModal] =
      useState(false);

  const [modoEdicion,
    setModoEdicion] =
      useState(false);

  const [selectedMunicipio,
    setSelectedMunicipio] =
      useState(null);

  const [formData,
    setFormData] =
      useState({
        nombre: "",
        descripcion: "",
      });

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    loadMunicipios();

  }, []);

  // =========================================
  // CARGAR MUNICIPIOS
  // =========================================

  const loadMunicipios =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(API);

        const data =
          await response.json();

        setMunicipios(
          data.municipios || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

  };

  // =========================================
  // INPUTS
  // =========================================

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

  };

  // =========================================
  // CREAR
  // =========================================

  const handleCreate =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await fetch(
            API,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
                authorization:
                  `Bearer ${token}`,
              },
              body: JSON.stringify(
                formData
              ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          return alert(
            data.message
            || "Error al crear municipio"
          );

        }

        alert(
          "Municipio creado correctamente"
        );

        setShowModal(false);

        setFormData({
          nombre: "",
          descripcion: "",
        });

        loadMunicipios();

      } catch (error) {

        console.log(error);

        alert(
          "Error del servidor"
        );

      }

  };

  // =========================================
  // EDITAR
  // =========================================

  const handleEdit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await fetch(
            `${API}/${selectedMunicipio.id_municipio}`,
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
                authorization:
                  `Bearer ${token}`,
              },
              body: JSON.stringify(
                formData
              ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          return alert(
            data.message
            || "Error al editar"
          );

        }

        alert(
          "Municipio actualizado"
        );

        setShowModal(false);

        loadMunicipios();

      } catch (error) {

        console.log(error);

        alert(
          "Error del servidor"
        );

      }

  };

  // =========================================
  // CAMBIAR ESTADO
  // =========================================

  const handleStatus =
    async (municipio) => {

      try {

        const response =
          await fetch(
            `${API}/${municipio.id_municipio}/status`,
            {
              method: "PATCH",
              headers: {
                "Content-Type":
                  "application/json",
                authorization:
                  `Bearer ${token}`,
              },
              body: JSON.stringify({
                estado:
                  !municipio.estado,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          return alert(
            data.message
            || "Error al actualizar estado"
          );

        }

        loadMunicipios();

      } catch (error) {

        console.log(error);

        alert(
          "Error del servidor"
        );

      }

  };

  // =========================================
  // MODAL CREAR
  // =========================================

  const openCreateModal =
    () => {

      setModoEdicion(false);

      setSelectedMunicipio(
        null
      );

      setFormData({
        nombre: "",
        descripcion: "",
      });

      setShowModal(true);

  };

  // =========================================
  // MODAL EDITAR
  // =========================================

  const openEditModal =
    (municipio) => {

      setModoEdicion(true);

      setSelectedMunicipio(
        municipio
      );

      setFormData({
        nombre:
          municipio.nombre || "",
        descripcion:
          municipio.descripcion || "",
      });

      setShowModal(true);

  };

  // =========================================
  // FILTRO
  // =========================================

  const filteredMunicipios =
    municipios.filter(
      (municipio) => {

        return (
          municipio.nombre
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );

      }
    );

  // =========================================
  // LOADING
  // =========================================

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

    <>

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
            relative
            overflow-hidden
            mb-8
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
              Gestión de Municipios
            </h1>

            <p
              className="
                text-slate-300
                mt-4
                text-lg
                max-w-2xl
              "
            >
              Administra todos los
              municipios registrados
              en la plataforma.
            </p>

          </div>

        </div>

        {/* CONTENIDO */}
        <div
          className="
            bg-white
            rounded-[30px]
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
              lg:flex-row
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
                Lista de Municipios
              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >
                Total registrados:
                {" "}
                {
                  municipios.length
                }
              </p>

            </div>

            <div
              className="
                flex
                gap-4
                w-full
                lg:w-auto
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
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Buscar municipio..."
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

              {/* BTN */}
              <button
                onClick={
                  openCreateModal
                }
                className="
                  bg-slate-900
                  hover:bg-slate-800
                  text-white
                  px-6
                  py-4
                  rounded-2xl
                  font-bold
                  flex
                  items-center
                  gap-2
                  transition-all
                "
              >

                <Plus size={20} />

                Nuevo

              </button>

            </div>

          </div>

          {/* TABLA */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead
                className="
                  bg-slate-50
                "
              >

                <tr>

                  <th className="p-6 text-left">
                    Municipio
                  </th>

                  <th className="p-6 text-left">
                    Descripción
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
                  filteredMunicipios
                    .length === 0
                  ? (

                    <tr>

                      <td
                        colSpan="4"
                        className="
                          text-center
                          py-20
                          text-slate-500
                        "
                      >
                        No hay municipios
                        registrados
                      </td>

                    </tr>

                  )
                  : (

                    filteredMunicipios.map(
                      (
                        municipio
                      ) => (

                        <tr
                          key={
                            municipio.id_municipio
                          }
                          className="
                            border-t
                            border-slate-100
                            hover:bg-slate-50
                            transition-all
                          "
                        >

                          {/* MUNICIPIO */}
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
                                  w-16
                                  h-16
                                  rounded-2xl
                                  bg-slate-100
                                  border
                                  border-slate-200
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <MapPin
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
                                    text-lg
                                  "
                                >
                                  {
                                    municipio.nombre
                                  }
                                </p>

                                <p
                                  className="
                                    text-sm
                                    text-slate-500
                                  "
                                >
                                  {
                                    municipio.id_municipio
                                  }
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* DESCRIPCION */}
                          <td className="p-6">

                            <p
                              className="
                                text-slate-700
                              "
                            >
                              {
                                municipio.descripcion
                                || "Sin descripción"
                              }
                            </p>

                          </td>

                          {/* ESTADO */}
                          <td className="p-6">

                            <span
                              className={`
                                px-4
                                py-2
                                rounded-2xl
                                text-sm
                                font-bold

                                ${
                                  municipio.estado
                                  ? `
                                    bg-green-100
                                    text-green-700
                                  `
                                  : `
                                    bg-red-100
                                    text-red-700
                                  `
                                }
                              `}
                            >

                              {
                                municipio.estado
                                ? "ACTIVO"
                                : "INACTIVO"
                              }

                            </span>

                          </td>

                          {/* ACCIONES */}
                          <td className="p-6">

                            <div
                              className="
                                flex
                                gap-3
                                flex-wrap
                              "
                            >

                              {/* EDITAR */}
                              <button
                                onClick={
                                  () =>
                                    openEditModal(
                                      municipio
                                    )
                                }
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  bg-blue-600
                                  hover:bg-blue-700
                                  text-white
                                  px-5
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  transition-all
                                "
                              >

                                <Pencil
                                  size={18}
                                />

                                Editar

                              </button>

                              {/* ESTADO */}
                              <button
                                onClick={
                                  () =>
                                    handleStatus(
                                      municipio
                                    )
                                }
                                className={`
                                  flex
                                  items-center
                                  gap-2
                                  text-white
                                  px-5
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  transition-all

                                  ${
                                    municipio.estado
                                    ? `
                                      bg-red-500
                                      hover:bg-red-600
                                    `
                                    : `
                                      bg-green-600
                                      hover:bg-green-700
                                    `
                                  }
                                `}
                              >

                                <Power
                                  size={18}
                                />

                                {
                                  municipio.estado
                                  ? "Desactivar"
                                  : "Activar"
                                }

                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* MODAL */}
      {
        showModal
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
                overflow-hidden
                shadow-2xl
              "
            >

                {/* HEADER */}
                <div
                  className="
                    bg-gradient-to-r
                    from-slate-900
                    to-slate-800
                    text-white
                    p-8
                  "
                >

                  <div
                    className="
                      flex
                      justify-between
                      items-start
                    "
                  >

                    <div>

                      <p
                        className="
                          uppercase
                          tracking-[4px]
                          text-slate-300
                          text-xs
                          mb-3
                        "
                      >
                        Administración
                      </p>

                      <h2
                        className="
                          text-4xl
                          font-black
                        "
                      >
                        {
                          modoEdicion
                          ? "Editar Municipio"
                          : "Nuevo Municipio"
                        }
                      </h2>

                    </div>

                    <button
                      onClick={
                        () =>
                          setShowModal(
                            false
                          )
                      }
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-white/10
                        hover:bg-white/20
                        transition-all
                        text-xl
                        font-bold
                      "
                    >
                      ×
                    </button>

                  </div>

                </div>

                {/* FORM */}
                <form
                  onSubmit={
                    modoEdicion
                    ? handleEdit
                    : handleCreate
                  }
                  className="
                    p-8
                    flex
                    flex-col
                    gap-6
                  "
                >

                  {/* NOMBRE */}
                  <div>

                    <label
                      className="
                        block
                        mb-2
                        font-semibold
                        text-slate-700
                      "
                    >
                      Nombre
                    </label>

                    <input
                      type="text"
                      name="nombre"
                      value={
                        formData.nombre
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="
                        w-full
                        bg-slate-100
                        border
                        border-slate-200
                        rounded-2xl
                        px-5
                        py-4
                        outline-none
                        focus:ring-2
                        focus:ring-slate-300
                      "
                    />

                  </div>

                  {/* DESCRIPCION */}
                  <div>

                    <label
                      className="
                        block
                        mb-2
                        font-semibold
                        text-slate-700
                      "
                    >
                      Descripción
                    </label>

                    <textarea
                      name="descripcion"
                      rows="4"
                      value={
                        formData.descripcion
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="
                        w-full
                        bg-slate-100
                        border
                        border-slate-200
                        rounded-2xl
                        px-5
                        py-4
                        outline-none
                        focus:ring-2
                        focus:ring-slate-300
                        resize-none
                      "
                    />

                  </div>

                  {/* BOTONES */}
                  <div
                    className="
                      flex
                      justify-end
                      gap-4
                      pt-4
                    "
                  >

                    <button
                      type="button"
                      onClick={
                        () =>
                          setShowModal(
                            false
                          )
                      }
                      className="
                        px-6
                        py-4
                        rounded-2xl
                        bg-slate-200
                        hover:bg-slate-300
                        font-semibold
                        transition-all
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
                        hover:bg-slate-800
                        text-white
                        font-bold
                        transition-all
                      "
                    >
                      {
                        modoEdicion
                        ? "Guardar Cambios"
                        : "Crear Municipio"
                      }
                    </button>

                  </div>

                </form>

            </div>

          </div>

        )
      }

    </>

  );

}

export default MunicipiosAdmin;