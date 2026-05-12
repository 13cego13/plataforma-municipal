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
          p-8
          w-full
          max-w-2xl
        "
      >

        {/* HEADER */}
        <div
          className="
            flex
            justify-between
            items-center
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
              hover:text-slate-600
              transition-all
            "
          >
            ×
          </button>

        </div>

        {/* FORM */}
        <form
          onSubmit={
            handleUpdateBusiness
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
              Nombre del negocio
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
              className="
                w-full
                border
                border-slate-300
                rounded-2xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

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
              Teléfono
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
              className="
                w-full
                border
                border-slate-300
                rounded-2xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

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
              Dirección
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
              className="
                w-full
                border
                border-slate-300
                rounded-2xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

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
              Categoría
            </label>

            <select
              name="id_categoria"
              value={
                editFormData.id_categoria
              }
              onChange={
                handleEditChange
              }
              className="
                w-full
                border
                border-slate-300
                rounded-2xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
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
              Municipio
            </label>

            <select
              name="id_municipio"
              value={
                editFormData.id_municipio
              }
              onChange={
                handleEditChange
              }
              className="
                w-full
                border
                border-slate-300
                rounded-2xl
                p-4
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
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
              onChange={
                (e) =>
                  setEditSelectedImage(
                    e.target.files[0]
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
              Descripción
            </label>

            <textarea
              name="descripcion"
              value={
                editFormData.descripcion
              }
              onChange={
                handleEditChange
              }
              className="
                w-full
                border
                border-slate-300
                rounded-2xl
                p-4
                h-32
                resize-none
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

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

  );

}

export default EditBusinessModal;