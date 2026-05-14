import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

import {
  getCategorias,
  getMunicipios,
} from "../services/catalog.service";

import {
  getMyBusinesses,
  createBusiness,
  uploadMainImage,
  uploadGalleryImages,
  updateBusiness,
  deactivateBusiness,
  activateBusiness,
} from "../services/owner.service";

import CreateBusinessModal
  from "../components/owner/CreateBusinessModal";

import EditBusinessModal
  from "../components/owner/EditBusinessModal";

import BusinessTable
  from "../components/owner/BusinessTable";

import Toast
  from "../components/common/Toast";

function OwnerDashboard() {

  const navigate =
    useNavigate();

  const {
    logout,
    user,
  } = useAuth();

  const [businesses,
    setBusinesses] =
      useState([]);

  const [categorias,
    setCategorias] =
      useState([]);

  const [municipios,
    setMunicipios] =
      useState([]);

  const [search,
    setSearch] =
      useState("");

  const [showCreateModal,
    setShowCreateModal] =
      useState(false);

  const [selectedImage,
    setSelectedImage] =
      useState(null);

      const [galleryImages,
  setGalleryImages] =
    useState([]);

  const [editingBusiness,
    setEditingBusiness] =
      useState(null);

  const [formData,
    setFormData] =
      useState({
        nombre: "",
        descripcion: "",
        direccion: "",
        telefono: "",
        id_categoria: "",
        id_municipio: "",
      });

  const [editFormData,
    setEditFormData] =
      useState({
        nombre: "",
        descripcion: "",
        direccion: "",
        telefono: "",
        id_categoria: "",
        id_municipio: "",
      });

  const [fieldErrors,
    setFieldErrors] =
      useState({});

  const [notification,
    setNotification] =
      useState(null);

  const loadBusinesses =
    async () => {

      try {

        const data =
          await getMyBusinesses();

        setBusinesses(
          data.negocios || []
        );

        const categoriasData =
          await getCategorias();

        setCategorias(
          categoriasData.categorias || []
        );

        const municipiosData =
          await getMunicipios();

        setMunicipios(
          municipiosData.municipios || []
        );

      } catch (error) {

        console.log(error);

      }

  };

  useEffect(() => {

    loadBusinesses();

  }, []);

  useEffect(() => {

    if (!notification) {

      return;

    }

    const timer =
      setTimeout(() => {

        setNotification(null);

      }, 5000);

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

  const filteredBusinesses =
    useMemo(() => {

      return businesses.filter(
        (business) =>
          business.nombre
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

  }, [
    businesses,
    search,
  ]);

  const handleLogout =
    () => {

      logout();

      navigate("/login");

  };

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

  const handleEditChange =
    (e) => {

      setEditFormData({
        ...editFormData,
        [e.target.name]:
          e.target.value,
      });

  };

  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
    "image/avif",
  ];

  const isValidImageFile =
    (file) => {

      if (!file) {

        return true;

      }

      return allowedImageTypes
        .includes(file.type);

  };

  const getImageError =
    (file) =>
      `El archivo "${file.name}" no tiene un formato de imagen valido. Usa JPG, PNG, WEBP, GIF, SVG o AVIF.`;

  const validateCreateBusiness =
    () => {

      const errors = {};

      const labels = {
        nombre: "El nombre es obligatorio",
        descripcion:
          "La descripcion es obligatoria",
        direccion:
          "La direccion es obligatoria",
        telefono:
          "El telefono es obligatorio",
        id_categoria:
          "Selecciona una categoria",
        id_municipio:
          "Selecciona un municipio",
      };

      Object.entries(labels)
        .forEach(([
          field,
          message,
        ]) => {

          if (!formData[field]?.trim()) {

            errors[field] = message;

          }

        });

      if (!selectedImage) {

        errors.selectedImage =
          "La imagen principal es obligatoria";

      } else if (
        !isValidImageFile(
          selectedImage
        )
      ) {

        errors.selectedImage =
          getImageError(selectedImage);

      }

      const invalidGalleryImage =
        galleryImages.find(
          (image) =>
            !isValidImageFile(image)
        );

      if (invalidGalleryImage) {

        errors.galleryImages =
          getImageError(
            invalidGalleryImage
          );

      }

      setFieldErrors(errors);

      if (
        Object.keys(errors).length > 0
      ) {

        showNotification(
          "error",
          "Revisa los campos obligatorios y los archivos seleccionados"
        );

        return false;

      }

      return true;

  };

  const getCleanBusinessData =
    () => ({
      nombre:
        formData.nombre.trim(),
      descripcion:
        formData.descripcion.trim(),
      direccion:
        formData.direccion.trim(),
      telefono:
        formData.telefono.trim(),
      id_categoria:
        formData.id_categoria,
      id_municipio:
        formData.id_municipio,
    });

  const handleMainImageChange =
    (file) => {

      setSelectedImage(file || null);

      setFieldErrors({
        ...fieldErrors,
        selectedImage: "",
      });

  };

  const handleGalleryImagesChange =
    (files) => {

      setGalleryImages(files);

      setFieldErrors({
        ...fieldErrors,
        galleryImages: "",
      });

  };

  const handleCreateBusiness =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await createBusiness(
            formData
          );

       // MAIN IMAGE
if (selectedImage) {

  const imageData =
    new FormData();

  imageData.append(
    "imagen",
    selectedImage
  );

  await uploadMainImage(
    response.negocio.id_negocio,
    imageData
  );

}

// GALLERY
if (
  galleryImages.length > 0
) {

  const galleryData =
    new FormData();

  galleryImages.forEach(
    (image) => {

      galleryData.append(
        "imagenes",
        image
      );

    }
  );

  await uploadGalleryImages(
    response.negocio.id_negocio,
    galleryData
  );

}

        setFormData({
          nombre: "",
          descripcion: "",
          direccion: "",
          telefono: "",
          id_categoria: "",
          id_municipio: "",
        });

        setSelectedImage(null);
        setGalleryImages([]);

        setShowCreateModal(
          false
        );
        alert(
  "Negocio creado correctamente y enviado para aprobación"
);

        loadBusinesses();

      } catch (error) {

        console.log(error);

      }

  };

  const handleEditClick =
    (business) => {

      setEditingBusiness(
        business
      );

      setEditFormData({
        nombre:
          business.nombre || "",
        descripcion:
          business.descripcion || "",
        direccion:
          business.direccion || "",
        telefono:
          business.telefono || "",
        id_categoria:
          business.id_categoria || "",
        id_municipio:
          business.id_municipio || "",
      });

  };

  const handleUpdateBusiness =
    async (e) => {

      e.preventDefault();

      try {

        await updateBusiness(
          editingBusiness.id_negocio,
          editFormData
        );

        setEditingBusiness(
          null
        );

        loadBusinesses();

      } catch (error) {

        console.log(error);

      }

  };

  const handleDeactivateBusiness =
    async (id_negocio) => {

      const confirmDelete =
        window.confirm(
          "¿Desactivar negocio?"
        );

      if (!confirmDelete) {

        return;

      }

      try {

        await deactivateBusiness(
          id_negocio
        );

        loadBusinesses();

      } catch (error) {

        console.log(error);

      }

  };

  const handleActivateBusiness =
    async (id_negocio) => {

      try {

        await activateBusiness(
          id_negocio
        );

        loadBusinesses();

      } catch (error) {

        console.log(error);

      }

  };

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        p-8
      "
    >

      {/* HEADER */}
      <div
        className="
          bg-white
          rounded-3xl
          shadow-sm
          p-8
          mb-8
          flex
          flex-col
          lg:flex-row
          justify-between
          items-start
          lg:items-center
          gap-6
        "
      >

        <div>

          <h1
            className="
              text-4xl
              font-black
              text-slate-800
            "
          >
            Dashboard Owner
          </h1>

          <p
            className="
              text-slate-500
              mt-2
            "
          >
            Bienvenido,
            {" "}
            {user?.correo}
          </p>

        </div>

        <div
          className="
            flex
            gap-4
          "
        >

          <button
            onClick={
              () =>
                setShowCreateModal(
                  true
                )
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              transition-all
              text-white
              px-6
              py-3
              rounded-2xl
              font-semibold
              shadow-lg
            "
          >
            + Nuevo Negocio
          </button>

          <button
            onClick={
              handleLogout
            }
            className="
              bg-red-500
              hover:bg-red-600
              transition-all
              text-white
              px-6
              py-3
              rounded-2xl
              font-semibold
            "
          >
            Cerrar sesión
          </button>

        </div>

      </div>

      {/* STATS */}
<div
  className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-6
    mb-8
  "
>

  {/* TOTAL */}
  <div
    className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-6
      shadow-sm
    "
  >

    <p
      className="
        text-slate-500
        text-sm
        font-medium
      "
    >
      Total negocios
    </p>

    <h2
      className="
        text-4xl
        font-black
        text-slate-800
        mt-3
      "
    >
      {businesses.length}
    </h2>

  </div>

  {/* APROBADOS */}
  <div
    className="
      bg-white
      border
      border-emerald-200
      rounded-3xl
      p-6
      shadow-sm
    "
  >

    <p
      className="
        text-emerald-600
        text-sm
        font-medium
      "
    >
      Aprobados
    </p>

    <h2
      className="
        text-4xl
        font-black
        text-emerald-600
        mt-3
      "
    >
      {
        businesses.filter(
          (business) =>
            business.estado_negocio ===
            "APROBADO"
        ).length
      }
    </h2>

  </div>

  {/* PENDIENTES */}
  <div
    className="
      bg-white
      border
      border-amber-200
      rounded-3xl
      p-6
      shadow-sm
    "
  >

    <p
      className="
        text-amber-600
        text-sm
        font-medium
      "
    >
      Pendientes
    </p>

    <h2
      className="
        text-4xl
        font-black
        text-amber-500
        mt-3
      "
    >
      {
        businesses.filter(
          (business) =>
            business.estado_negocio ===
            "PENDIENTE"
        ).length
      }
    </h2>

  </div>

</div>

      {/* TABLA */}
      <BusinessTable
        businesses={
          filteredBusinesses
        }
        search={
          search
        }
        setSearch={
          setSearch
        }
        handleEditClick={
          handleEditClick
        }
        handleActivateBusiness={
          handleActivateBusiness
        }
        handleDeactivateBusiness={
          handleDeactivateBusiness
        }
      />

      {/* MODAL CREAR */}
      <CreateBusinessModal
        showCreateModal={
          showCreateModal
        }
        setShowCreateModal={
          setShowCreateModal
        }
        handleCreateBusiness={
          handleCreateBusiness
        }
        formData={
          formData
        }
        handleChange={
          handleChange
        }
        categorias={
          categorias
        }
        municipios={
          municipios
        }
        setSelectedImage={
  setSelectedImage
}

setGalleryImages={
  setGalleryImages
}
      />

      {/* MODAL EDIT */}
      <EditBusinessModal
        editingBusiness={
          editingBusiness
        }
        setEditingBusiness={
          setEditingBusiness
        }
        handleUpdateBusiness={
          handleUpdateBusiness
        }
        editFormData={
          editFormData
        }
        handleEditChange={
          handleEditChange
        }
        categorias={
          categorias
        }
        municipios={
          municipios
        }
      />

    </div>

  );

}

export default OwnerDashboard;
