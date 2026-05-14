import { useState } from "react";

function EditBusinessModal({
  editingBusiness,
  setEditingBusiness,
  handleUpdateBusiness,
  editFormData,
  handleEditChange,
  categorias,
  municipios,
  setEditSelectedImage,
}) {

  const [errors, setErrors] =
    useState({});

  const validateForm = () => {

    const newErrors = {};

    // NOMBRE
    if (
      !editFormData.nombre?.trim()
    ) {

      newErrors.nombre =
        "El nombre del negocio es obligatorio";

    }

    // TELEFONO
    if (
      !editFormData.telefono?.trim()
    ) {

      newErrors.telefono =
        "El teléfono es obligatorio";

    } else if (
      !/^[0-9]{7,15}$/.test(
        editFormData.telefono
      )
    ) {

      newErrors.telefono =
        "Ingrese un teléfono válido";

    }

    // DIRECCION
    if (
      !editFormData.direccion?.trim()
    ) {

      newErrors.direccion =
        "La dirección es obligatoria";

    }

    // CATEGORIA
    if (
      !editFormData.id_categoria
    ) {

      newErrors.id_categoria =
        "Debe seleccionar una categoría";

    }

    // MUNICIPIO
    if (
      !editFormData.id_municipio
    ) {

      newErrors.id_municipio =
        "Debe seleccionar un municipio";

    }

    // DESCRIPCION
    if (
      !editFormData.descripcion?.trim()
    ) {

      newErrors.descripcion =
        "La descripción es obligatoria";

    } else if (
      editFormData.descripcion
        .trim()
        .length < 20
    ) {

      newErrors.descripcion =
        "La descripción debe tener mínimo 20 caracteres";

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

    handleUpdateBusiness(e);

  };

  if (!editingBusiness) {

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

          <div>

            <h2
              className="
                text-3xl
                font-black
                text-slate-800
              "
            >
              Editar Negocio
            </h2>

            <p
              className="
                text-slate-500
                mt-1
              "
            >
              Actualiza la información del negocio
            </p>

          </div>

          <button
            onClick={
              () =>
                setEditingBusiness(
                  null
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

          {/* FORM */}
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
    text-slate-700
  "
>
  Nombre del negocio *
</label>

<input
  type="text"
  name="nombre"
  value={
    editFormData.nombre
  }
  onChange={
    handleEditChange
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    focus:outline-none
    ${
      errors.nombre
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
/>

<p
  className="
    text-sm
    text-slate-500
    mt-1
  "
>
  Ingresa un nombre claro y descriptivo.
</p>

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
    text-slate-700
  "
>
  Teléfono *
</label>

<input
  type="text"
  name="telefono"
  value={
    editFormData.telefono
  }
  onChange={
    handleEditChange
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    focus:outline-none
    ${
      errors.telefono
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
/>

<p
  className="
    text-sm
    text-slate-500
    mt-1
  "
>
  Solo números. Ejemplo: 3001234567
</p>

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
    text-slate-700
  "
>
  Dirección *
</label>

<input
  type="text"
  name="direccion"
  value={
    editFormData.direccion
  }
  onChange={
    handleEditChange
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    focus:outline-none
    ${
      errors.direccion
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
/>

<p
  className="
    text-sm
    text-slate-500
    mt-1
  "
>
  Incluye barrio, calle o referencia.
</p>

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
    text-slate-700
  "
>
  Categoría *
</label>

<select
  name="id_categoria"
  value={
    editFormData.id_categoria
  }
  onChange={
    handleEditChange
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    focus:outline-none
    ${
      errors.id_categoria
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
>

<option value="">
  Seleccione categoría
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
    text-slate-700
  "
>
  Municipio *
</label>

<select
  name="id_municipio"
  value={
    editFormData.id_municipio
  }
  onChange={
    handleEditChange
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    focus:outline-none
    ${
      errors.id_municipio
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
>

<option value="">
  Seleccione municipio
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

{/* IMAGEN */}
<div>

<label
  className="
    block
    mb-2
    font-semibold
    text-slate-700
  "
>
  Cambiar imagen principal
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

      if (
        !allowedTypes.includes(
          file.type
        )
      ) {

        setErrors(
          (prev) => ({
            ...prev,
            imagen:
              "Formato inválido. Solo PNG, JPG, JPEG y WEBP.",
          })
        );

        e.target.value = "";

        setEditSelectedImage(
          null
        );

        return;

      }

      setErrors(
        (prev) => ({
          ...prev,
          imagen: null,
        })
      );

      setEditSelectedImage(
        file
      );

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
    mt-1
  "
>
  Formatos permitidos:
  PNG, JPG, JPEG y WEBP.
</p>

{
  errors.imagen && (
    <p
      className="
        text-red-500
        text-sm
        mt-1
      "
    >
      {
        errors.imagen
      }
    </p>
  )
}

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
    text-slate-700
  "
>
  Descripción *
</label>

<textarea
  name="descripcion"
  value={
    editFormData.descripcion
  }
  onChange={
    handleEditChange
  }
  className={`
    w-full
    border
    rounded-2xl
    p-4
    h-32
    resize-none
    focus:outline-none
    ${
      errors.descripcion
        ? "border-red-500"
        : "border-slate-300"
    }
  `}
/>

<p
  className="
    text-sm
    text-slate-500
    mt-1
  "
>
  Describe el negocio,
  productos o servicios.
</p>

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

{/* BOTONES */}
<div
  className="
    md:col-span-2
    flex
    gap-4
    pt-2
  "
>

<button
  type="submit"
  className="
    flex-1
    bg-blue-600
    hover:bg-blue-700
    transition-all
    text-white
    p-4
    rounded-2xl
    font-bold
    text-lg
  "
>
  Guardar cambios
</button>

<button
  type="button"
  onClick={
    () =>
      setEditingBusiness(
        null
      )
  }
  className="
    flex-1
    bg-slate-200
    hover:bg-slate-300
    transition-all
    text-slate-700
    p-4
    rounded-2xl
    font-bold
    text-lg
  "
>
  Cancelar
</button>

</div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default EditBusinessModal;