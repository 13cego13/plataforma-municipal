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
          p-8
          w-full
          max-w-2xl
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
            mb-8
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
            "
          >
            ×
          </button>

        </div>

        <form
          onSubmit={
            handleCreateBusiness
          }
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >

          <div>

            <label
              className="
                block
                mb-2
                font-semibold
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
              className="
                w-full
                border
                rounded-2xl
                p-4
              "
            />

          </div>

          <div>

            <label
              className="
                block
                mb-2
                font-semibold
              "
            >
              Teléfono
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
              className="
                w-full
                border
                rounded-2xl
                p-4
              "
            />

          </div>

          <div>

            <label
              className="
                block
                mb-2
                font-semibold
              "
            >
              Dirección
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
              className="
                w-full
                border
                rounded-2xl
                p-4
              "
            />

          </div>

          <div>

            <label
              className="
                block
                mb-2
                font-semibold
              "
            >
              Categoría
            </label>

            <select
              name="id_categoria"
              value={
                formData.id_categoria
              }
              onChange={
                handleChange
              }
              className="
                w-full
                border
                rounded-2xl
                p-4
              "
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

          </div>

          <div>

            <label
              className="
                block
                mb-2
                font-semibold
              "
            >
              Municipio
            </label>

            <select
              name="id_municipio"
              value={
                formData.id_municipio
              }
              onChange={
                handleChange
              }
              className="
                w-full
                border
                rounded-2xl
                p-4
              "
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

          </div>

          <div>

  <label
    className="
      block
      mb-2
      font-semibold
    "
  >
    Imagen principal
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={
      (e) =>
        setSelectedImage(
          e.target.files[0]
        )
    }
    className="
      w-full
      border
      rounded-2xl
      p-4
    "
  />

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
              Descripción
            </label>

            <textarea
              name="descripcion"
              value={
                formData.descripcion
              }
              onChange={
                handleChange
              }
              className="
                w-full
                border
                rounded-2xl
                p-4
                h-32
              "
            />

          </div>

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
            "
          >
            Crear Negocio
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateBusinessModal;