import { useState } from "react";

function CreateBusinessModal({
  showCreateModal,
  setShowCreateModal,
  handleCreateBusiness,
  formData,
  handleChange,
  categorias,
  municipios,
  setSelectedImage,
  setGalleryImages,
}) {

  const [errors, setErrors] =
    useState({});

  const [mainImage, setMainImage] =
    useState(null);

  const validateForm = () => {

    const newErrors = {};

    if (
      !formData.nombre?.trim()
    ) {
      newErrors.nombre =
        "El nombre es obligatorio";
    }

    if (
      !formData.telefono?.trim()
    ) {
      newErrors.telefono =
        "El teléfono es obligatorio";
    }

    if (
      !formData.direccion?.trim()
    ) {
      newErrors.direccion =
        "La dirección es obligatoria";
    }

    if (
      !formData.id_categoria
    ) {
      newErrors.id_categoria =
        "Debe seleccionar una categoría";
    }

    if (
      !formData.id_municipio
    ) {
      newErrors.id_municipio =
        "Debe seleccionar un municipio";
    }

    if (
      !formData.descripcion?.trim()
    ) {
      newErrors.descripcion =
        "La descripción es obligatoria";
    }

    if (!mainImage) {

      newErrors.imagen =
        "La imagen principal es obligatoria";

    }

    setErrors(newErrors);

    return (
      Object.keys(
        newErrors
      ).length === 0
    );

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    handleCreateBusiness(e);

  };

  if (!showCreateModal) {
    return null;
  }

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >

      <div
        className="
          bg-white
          rounded-3xl
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-hidden
          shadow-2xl
        "
      >

        {/* HEADER */}
        <div
          className="
            flex
            justify-between
            items-center
            p-6
            border-b
            sticky
            top-0
            bg-white
            z-10
          "
        >

          <h2
            className="
              text-3xl
              font-black
            "
          >
            Nuevo Negocio
          </h2>

          <button
            onClick={
              () =>
                setShowCreateModal(
                  false
                )
            }
            className="
              text-3xl
              text-slate-400
              hover:text-red-500
              transition-all
            "
          >
            ×
          </button>

        </div>

        {/* BODY */}
        <div
          className="
            overflow-y-auto
            max-h-[calc(90vh-90px)]
            p-6
          "
        >

          <form
            onSubmit={
              handleSubmit
            }
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

{/* NOMBRE */}
<div>

<label
  className="
    block
    mb-2
    font-semibold
  "
>
  Nombre *
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
  className={`
    w-full
    border
    rounded-2xl
    p-4
    outline-none
    ${
      errors.nombre
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
/>

{
  errors.nombre && (
    <p
      className="
        text-red-500
        text-sm
        mt-1
      "
    >
      {
        errors.nombre
      }
    </p>
  )
}

</div>

{/* TELEFONO */}
<div>

<label
  className="
    block
    mb-2
    font-semibold
  "
>
  Teléfono *
</label>

<input
  type="text"
  name="telefono"
  value={
    formData.telefono
  }
  onChange={
    handleChange
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    outline-none
    ${
      errors.telefono
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
/>

{
  errors.telefono && (
    <p
      className="
        text-red-500
        text-sm
        mt-1
      "
    >
      {
        errors.telefono
      }
    </p>
  )
}

</div>

{/* DIRECCION */}
<div>

<label
  className="
    block
    mb-2
    font-semibold
  "
>
  Dirección *
</label>

<input
  type="text"
  name="direccion"
  value={
    formData.direccion
  }
  onChange={
    handleChange
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    outline-none
    ${
      errors.direccion
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
/>

{
  errors.direccion && (
    <p
      className="
        text-red-500
        text-sm
        mt-1
      "
    >
      {
        errors.direccion
      }
    </p>
  )
}

</div>

{/* CATEGORIA */}
<div>

<label
  className="
    block
    mb-2
    font-semibold
  "
>
  Categoría *
</label>

<select
  name="id_categoria"
  value={
    formData.id_categoria
  }
  onChange={
    handleChange
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    outline-none
    ${
      errors.id_categoria
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
>

<option value="">
  Seleccione
</option>

{
  categorias.map(
    (
      categoria
    ) => (

      <option
        key={
          categoria.id_categoria
        }
        value={
          categoria.id_categoria
        }
      >
        {
          categoria.nombre
        }
      </option>

    )
  )
}

</select>

{
  errors.id_categoria && (
    <p
      className="
        text-red-500
        text-sm
        mt-1
      "
    >
      {
        errors.id_categoria
      }
    </p>
  )
}

</div>

{/* MUNICIPIO */}
<div>

<label
  className="
    block
    mb-2
    font-semibold
  "
>
  Municipio *
</label>

<select
  name="id_municipio"
  value={
    formData.id_municipio
  }
  onChange={
    handleChange
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    outline-none
    ${
      errors.id_municipio
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
>

<option value="">
  Seleccione
</option>

{
  municipios.map(
    (
      municipio
    ) => (

      <option
        key={
          municipio.id_municipio
        }
        value={
          municipio.id_municipio
        }
      >
        {
          municipio.nombre
        }
      </option>

    )
  )
}

</select>

{
  errors.id_municipio && (
    <p
      className="
        text-red-500
        text-sm
        mt-1
      "
    >
      {
        errors.id_municipio
      }
    </p>
  )
}

</div>

{/* IMAGEN PRINCIPAL */}
<div>

<label
  className="
    block
    mb-2
    font-semibold
  "
>
  Imagen principal *
</label>

<input
  type="file"
  accept="
    image/png,
    image/jpeg,
    image/jpg,
    image/webp
  "
  onChange={
    (e) => {

      const file =
        e.target.files[0];

      if (!file) {
        return;
      }

      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];

      // VALIDAR FORMATO
      if (
        !allowedTypes.includes(
          file.type
        )
      ) {

        setErrors(
          (prev) => ({
            ...prev,
            imagen:
              "Formato inválido. Solo se permiten imágenes PNG, JPG, JPEG o WEBP.",
          })
        );

        // LIMPIAR INPUT
        e.target.value = "";

        setMainImage(null);

        setSelectedImage(null);

        return;

      }

      // LIMPIAR ERROR
      setErrors(
        (prev) => ({
          ...prev,
          imagen: null,
        })
      );

      setMainImage(file);

      setSelectedImage(file);

    }
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    ${
      errors.imagen
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
/>

<p
  className="
    text-sm
    text-slate-500
    mt-2
  "
>
  Formatos permitidos:
  PNG, JPG, JPEG y WEBP
</p>

{
  errors.imagen && (
    <p
      className="
        text-red-500
        text-sm
        mt-2
        font-medium
      "
    >
      {
        errors.imagen
      }
    </p>
  )
}

</div>

{/* GALERIA */}
<div>

<label
  className="
    block
    mb-2
    font-semibold
  "
>
  Galería de imágenes
</label>

<input
  type="file"
  multiple
  accept="image/*"
  onChange={
    (e) =>
      setGalleryImages(
        Array.from(
          e.target.files
        )
      )
  }
  className="
    w-full
    border
    border-slate-300
    rounded-2xl
    p-4
  "
/>

<p
  className="
    text-sm
    text-slate-500
    mt-2
  "
>
  Puedes seleccionar múltiples imágenes
</p>

</div>

{/* DESCRIPCION */}
<div
  className="
    md:col-span-2
  "
>

<label
  className="
    block
    mb-2
    font-semibold
  "
>
  Descripción *
</label>

<textarea
  name="descripcion"
  value={
    formData.descripcion
  }
  onChange={
    handleChange
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    h-32
    outline-none
    ${
      errors.descripcion
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
/>

{
  errors.descripcion && (
    <p
      className="
        text-red-500
        text-sm
        mt-1
      "
    >
      {
        errors.descripcion
      }
    </p>
  )
}

</div>

{/* BOTON */}
<button
  type="submit"
  className="
    md:col-span-2
    bg-blue-600
    hover:bg-blue-700
    transition-all
    text-white
    p-4
    rounded-2xl
    font-bold
    text-lg
    shadow-lg
  "
>
  Crear Negocio
</button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default CreateBusinessModal;