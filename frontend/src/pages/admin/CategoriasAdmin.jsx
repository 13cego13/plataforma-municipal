import {
  useEffect,
  useState,
} from "react";

import {
  Tag,
  Search,
  Plus,
  Pencil,
  Power,
  Image as ImageIcon,
} from "lucide-react";

import Toast
from "../../components/common/Toast";

function CategoriasAdmin() {

  const API =
    `${import.meta.env.VITE_ADMIN_API}/categorias`;

  const [categorias,
    setCategorias] =
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

  const [selectedCategoria,
    setSelectedCategoria] =
      useState(null);

  const [formData,
    setFormData] =
      useState({
        nombre: "",
        descripcion: "",
        imagen_url: "",
      });

  const [fieldErrors,
    setFieldErrors] =
      useState({});

  const [notification,
    setNotification] =
      useState(null);

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    loadCategorias();

  }, []);

  useEffect(() => {

    if (!notification) {

      return;

    }

    const timer =
      setTimeout(() => {

        setNotification(null);

      }, 4200);

    return () =>
      clearTimeout(timer);

  }, [notification]);

  const showNotification =
    (type, message, title) => {

      setNotification({
        type,
        message,
        title,
      });

  };

  const isValidImageUrl =
    (value) => {

      try {

        const url =
          new URL(value);

        if (
          !["http:", "https:"]
            .includes(url.protocol)
        ) {

          return false;

        }

        return /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i
          .test(url.pathname);

      } catch {

        return false;

      }

  };

  const validateForm =
    () => {

      const errors = {};

      if (!formData.nombre.trim()) {

        errors.nombre =
          "El nombre es obligatorio";

      }

      if (!formData.descripcion.trim()) {

        errors.descripcion =
          "La descripcion es obligatoria";

      }

      if (!formData.imagen_url.trim()) {

        errors.imagen_url =
          "La URL de la imagen es obligatoria";

      } else if (
        !isValidImageUrl(
          formData.imagen_url.trim()
        )
      ) {

        errors.imagen_url =
          "Ingresa una URL de imagen valida (JPG, PNG, WEBP, GIF, SVG o AVIF)";

      }

      setFieldErrors(errors);

      if (
        Object.keys(errors).length > 0
      ) {

        showNotification(
          "error",
          "Revisa los campos marcados antes de guardar"
        );

        return false;

      }

      return true;

  };

  const getCleanFormData =
    () => ({
      nombre:
        formData.nombre.trim(),
      descripcion:
        formData.descripcion.trim(),
      imagen_url:
        formData.imagen_url.trim(),
    });

  const getCategoriaErrorMessage =
    (message) => {

      const normalizedMessage =
        message?.toLowerCase() || "";

      if (
        normalizedMessage.includes(
          "categoria ya existe"
        )
        ||
        normalizedMessage.includes(
          "categoría ya existe"
        )
        ||
        normalizedMessage.includes(
          "ya existe una categoria"
        )
        ||
        normalizedMessage.includes(
          "ya existe una categoría"
        )
      ) {

        return "No se puede registrar una categoria que ya existe";

      }

      if (
        normalizedMessage.includes(
          "imagen"
        )
        &&
        normalizedMessage.includes(
          "url"
        )
      ) {

        return "Ingresa una URL de imagen valida";

      }

      return (
        message
        || "No se pudo completar la operacion"
      );

  };

  const closeModal =
    () => {

      setShowModal(false);

      setFieldErrors({});

  };

  // =========================================
  // CARGAR CATEGORIAS
  // =========================================

  const loadCategorias =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(API);

        const data =
          await response.json();

        setCategorias(
          data.categorias || []
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

      const {
        name,
        value,
      } = e.target;

      setFormData({
        ...formData,
        [name]:
          value,
      });

      if (fieldErrors[name]) {

        setFieldErrors({
          ...fieldErrors,
          [name]: "",
        });

      }

  };

  // =========================================
  // CREAR
  // =========================================

  const handleCreate =
    async (e) => {

      e.preventDefault();

      if (!validateForm()) {

        return;

      }

      try {

        const cleanFormData =
          getCleanFormData();

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
                cleanFormData
              ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          return showNotification(
            "error",
            getCategoriaErrorMessage(
              data.message
            )
          );

        }

        showNotification(
          "success",
          data.message
          || "Categoria creada correctamente"
        );

        closeModal();

        setFormData({
          nombre: "",
          descripcion: "",
          imagen_url: "",
        });

        loadCategorias();

      } catch (error) {

        console.log(error);

        showNotification(
          "error",
          "Ocurrio un error interno. Intentalo nuevamente."
        );

      }

  };

  // =========================================
  // EDITAR
  // =========================================

  const handleEdit =
    async (e) => {

      e.preventDefault();

      if (!validateForm()) {

        return;

      }

      try {

        const cleanFormData =
          getCleanFormData();

        const response =
          await fetch(
            `${API}/${selectedCategoria.id_categoria}`,
            {
              method: "PUT",
              headers: {
                "Content-Type":
                  "application/json",
                authorization:
                  `Bearer ${token}`,
              },
              body: JSON.stringify(
                cleanFormData
              ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          return showNotification(
            "error",
            getCategoriaErrorMessage(
              data.message
            )
          );

        }

        showNotification(
          "success",
          data.message
          || "Categoria actualizada correctamente"
        );

        closeModal();

        loadCategorias();

      } catch (error) {

        console.log(error);

        showNotification(
          "error",
          "Ocurrio un error interno. Intentalo nuevamente."
        );

      }

  };

  // =========================================
  // CAMBIAR ESTADO
  // =========================================

  const handleStatus =
    async (categoria) => {

      try {

        const response =
          await fetch(
            `${API}/${categoria.id_categoria}/status`,
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
                  !categoria.estado,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          return showNotification(
            "error",
            data.message
            || "Error al actualizar estado"
          );

        }

        showNotification(
          "success",
          data.message
          || "Estado actualizado correctamente"
        );

        loadCategorias();

      } catch (error) {

        console.log(error);

        showNotification(
          "error",
          "Ocurrio un error interno. Intentalo nuevamente."
        );

      }

  };

  // =========================================
  // MODAL CREAR
  // =========================================

  const openCreateModal =
    () => {

      setModoEdicion(false);

      setSelectedCategoria(
        null
      );

      setFormData({
        nombre: "",
        descripcion: "",
        imagen_url: "",
      });

      setFieldErrors({});

      setShowModal(true);

  };

  // =========================================
  // MODAL EDITAR
  // =========================================

  const openEditModal =
    (categoria) => {

      setModoEdicion(true);

      setSelectedCategoria(
        categoria
      );

      setFormData({
        nombre:
          categoria.nombre || "",
        descripcion:
          categoria.descripcion || "",
        imagen_url:
          categoria.imagen_url || "",
      });

      setFieldErrors({});

      setShowModal(true);

  };

  // =========================================
  // FILTRO
  // =========================================

  const filteredCategorias =
    categorias.filter(
      (categoria) => {

        return (
          categoria.nombre
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

      <Toast
        notification={notification}
        onClose={
          () =>
            setNotification(null)
        }
      />

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
              Gestión de Categorías
            </h1>

            <p
              className="
                text-slate-300
                mt-4
                text-lg
                max-w-2xl
              "
            >
              Administra todas las
              categorías registradas
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
                Lista de Categorías
              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >
                Total registradas:
                {" "}
                {
                  categorias.length
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
                  placeholder="Buscar categoría..."
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

                Nueva

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
                    Categoría
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
                  filteredCategorias
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
                        No hay categorías
                        registradas
                      </td>

                    </tr>

                  )
                  : (

                    filteredCategorias.map(
                      (
                        categoria
                      ) => (

                        <tr
                          key={
                            categoria.id_categoria
                          }
                          className="
                            border-t
                            border-slate-100
                            hover:bg-slate-50
                            transition-all
                          "
                        >

                          {/* CATEGORIA */}
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
                                  overflow-hidden
                                  bg-slate-100
                                  border
                                  border-slate-200
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                {
                                  categoria.imagen_url
                                  ? (

                                    <img
                                      src={
                                        categoria.imagen_url
                                      }
                                      alt={
                                        categoria.nombre
                                      }
                                      className="
                                        w-full
                                        h-full
                                        object-cover
                                      "
                                    />

                                  )
                                  : (

                                    <Tag
                                      className="
                                        text-slate-600
                                      "
                                    />

                                  )
                                }

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
                                    categoria.nombre
                                  }
                                </p>

                                <p
                                  className="
                                    text-sm
                                    text-slate-500
                                  "
                                >
                                  {
                                    categoria.id_categoria
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
                                categoria.descripcion
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
                                  categoria.estado
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
                                categoria.estado
                                ? "ACTIVA"
                                : "INACTIVA"
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
                                      categoria
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
                                      categoria
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
                                    categoria.estado
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
                                  categoria.estado
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
              items-start
              justify-center
              z-50
              p-6
              overflow-y-auto
            "
          >

            <div
              className="
                bg-white
                rounded-[32px]
                w-full
                max-w-2xl
                my-4
                max-h-[calc(100vh-2rem)]
                overflow-y-auto
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
                        ? "Editar Categoría"
                        : "Nueva Categoría"
                      }
                    </h2>

                  </div>

                  <button
                    onClick={
                      closeModal
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
                noValidate
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
                      flex
                      items-center
                      gap-1
                      mb-2
                      font-semibold
                      text-slate-700
                    "
                  >
                    Nombre
                    <span
                      className="text-red-500"
                      aria-hidden="true"
                    >
                      *
                    </span>
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
                    aria-invalid={
                      Boolean(
                        fieldErrors.nombre
                      )
                    }
                    className={`
                      w-full
                      border
                      rounded-2xl
                      px-5
                      py-4
                      outline-none
                      focus:ring-2

                      ${
                        fieldErrors.nombre
                        ? `
                          bg-red-50
                          border-red-300
                          focus:ring-red-200
                        `
                        : `
                          bg-slate-100
                          border-slate-200
                          focus:ring-slate-300
                        `
                      }
                    `}
                  />

                  {
                    fieldErrors.nombre
                    && (

                      <p
                        className="
                          mt-2
                          text-sm
                          font-semibold
                          text-red-600
                        "
                      >
                        {
                          fieldErrors.nombre
                        }
                      </p>

                    )
                  }

                </div>

                {/* DESCRIPCION */}
                <div>

                  <label
                    className="
                      flex
                      items-center
                      gap-1
                      mb-2
                      font-semibold
                      text-slate-700
                    "
                  >
                    Descripción
                    <span
                      className="text-red-500"
                      aria-hidden="true"
                    >
                      *
                    </span>
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
                    aria-invalid={
                      Boolean(
                        fieldErrors.descripcion
                      )
                    }
                    className={`
                      w-full
                      border
                      rounded-2xl
                      px-5
                      py-4
                      outline-none
                      focus:ring-2
                      resize-none

                      ${
                        fieldErrors.descripcion
                        ? `
                          bg-red-50
                          border-red-300
                          focus:ring-red-200
                        `
                        : `
                          bg-slate-100
                          border-slate-200
                          focus:ring-slate-300
                        `
                      }
                    `}
                  />

                  {
                    fieldErrors.descripcion
                    && (

                      <p
                        className="
                          mt-2
                          text-sm
                          font-semibold
                          text-red-600
                        "
                      >
                        {
                          fieldErrors.descripcion
                        }
                      </p>

                    )
                  }

                </div>

                {/* IMAGEN */}
                <div>

                  <label
                    className="
                      flex
                      items-center
                      gap-1
                      mb-2
                      font-semibold
                      text-slate-700
                    "
                  >
                    URL Imagen
                    <span
                      className="text-red-500"
                      aria-hidden="true"
                    >
                      *
                    </span>
                  </label>

                  <div className="relative">

                    <ImageIcon
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
                      name="imagen_url"
                      value={
                        formData.imagen_url
                      }
                    onChange={
                      handleChange
                    }
                    required
                    aria-invalid={
                      Boolean(
                        fieldErrors.imagen_url
                      )
                    }
                    className={`
                      w-full
                      border
                      rounded-2xl
                      pl-12
                      pr-5
                      py-4
                      outline-none
                      focus:ring-2

                      ${
                        fieldErrors.imagen_url
                        ? `
                          bg-red-50
                          border-red-300
                          focus:ring-red-200
                        `
                        : `
                          bg-slate-100
                          border-slate-200
                          focus:ring-slate-300
                        `
                      }
                    `}
                  />

                </div>

                {
                  fieldErrors.imagen_url
                  && (

                    <p
                      className="
                        mt-2
                        text-sm
                        font-semibold
                        text-red-600
                      "
                    >
                      {
                        fieldErrors.imagen_url
                      }
                    </p>

                  )
                }

              </div>

                {/* PREVIEW */}
                {
                  isValidImageUrl(
                    formData.imagen_url.trim()
                  )
                  && (

                    <div>

                      <p
                        className="
                          font-semibold
                          text-slate-700
                          mb-3
                        "
                      >
                        Vista previa
                      </p>

                      <img
                        src={
                          formData.imagen_url
                        }
                        alt="preview"
                        className="
                          w-full
                          h-40
                          object-cover
                          rounded-3xl
                          border
                          border-slate-200
                        "
                      />

                    </div>

                  )
                }

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
                      closeModal
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
                      : "Crear Categoría"
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

export default CategoriasAdmin;
