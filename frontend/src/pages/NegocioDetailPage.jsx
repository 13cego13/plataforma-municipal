import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  MapPin,
  Phone,
  Store,
  ImageIcon,
} from "lucide-react";

function NegocioDetailPage() {

  // =====================================
  // PARAMS
  // =====================================

  const { id_negocio } =
    useParams();

  // =====================================
  // NAVIGATE
  // =====================================

  const navigate =
    useNavigate();

  // =====================================
  // STATES
  // =====================================

  const [negocio,
    setNegocio] =
      useState(null);

  const [galeria,
    setGaleria] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  // =====================================
  // API
  // =====================================

  const NEGOCIOS_API =
    import.meta.env
      .VITE_NEGOCIOS_API;

  // =====================================
  // LOAD
  // =====================================

  useEffect(() => {

    loadNegocio();

  }, [id_negocio]);

  const loadNegocio =
    async () => {

      try {

        // DETAIL
        const detailResponse =
          await fetch(
            `${NEGOCIOS_API}/negocios/detail/${id_negocio}`
          );

        const detailData =
          await detailResponse.json();

        // GALLERY
        const galleryResponse =
          await fetch(
            `${NEGOCIOS_API}/imagenes/gallery/${id_negocio}`
          );

        const galleryData =
          await galleryResponse.json();

        setNegocio(
          detailData.negocio
        );

        setGaleria(
          galleryData.imagenes
          || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div
        className="
          h-screen
          flex
          items-center
          justify-center
          bg-slate-100
        "
      >

        <div
          className="
            w-16
            h-16
            border-4
            border-slate-200
            border-t-slate-900
            rounded-full
            animate-spin
          "
        />

      </div>

    );

  }

  // =====================================
  // NOT FOUND
  // =====================================

  if (!negocio) {

    return (

      <div
        className="
          h-screen
          flex
          items-center
          justify-center
          bg-slate-100
        "
      >

        <div
          className="
            bg-white
            p-12
            rounded-[36px]
            text-center
            border
            border-slate-200
          "
        >

          <h1
            className="
              text-4xl
              font-black
              text-slate-900
            "
          >
            Negocio no encontrado
          </h1>

        </div>

      </div>

    );

  }

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
      "
    >

      {/* HERO */}
      <section
        className="
          relative
          h-[500px]
          overflow-hidden
        "
      >

        {
          negocio.imagen_principal
          ? (

            <img
              src={
                negocio.imagen_principal
              }
              alt={
                negocio.nombre
              }
              className="
                w-full
                h-full
                object-cover
              "
            />

          ) : (

            <div
              className="
                w-full
                h-full
                bg-slate-300
                flex
                items-center
                justify-center
              "
            >

              <Store
                size={80}
                className="
                  text-slate-500
                "
              />

            </div>

          )
        }

        {/* OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-black/50
          "
        />

        {/* CONTENT */}
        <div
          className="
            absolute
            inset-0
            flex
            items-end
          "
        >

          <div
            className="
              max-w-7xl
              mx-auto
              w-full
              px-6
              pb-16
              text-white
            "
          >

            <button
              onClick={
                () => navigate(-1)
              }
              className="
                flex
                items-center
                gap-3
                mb-10
                text-slate-200
                hover:text-white
              "
            >

              <ArrowLeft size={20} />

              Volver

            </button>

            <h1
              className="
                text-6xl
                font-black
              "
            >
              {
                negocio.nombre
              }
            </h1>

            <div
              className="
                flex
                flex-wrap
                gap-6
                mt-8
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <MapPin size={20} />

                {
                  negocio.municipio
                }

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <Phone size={20} />

                {
                  negocio.telefono
                }

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-20
        "
      >

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-10
          "
        >

          {/* MAIN */}
          <div
            className="
              xl:col-span-2
              space-y-10
            "
          >

            {/* DESCRIPTION */}
            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-[36px]
                p-10
              "
            >

              <h2
                className="
                  text-4xl
                  font-black
                  text-slate-900
                  mb-8
                "
              >
                Descripción
              </h2>

              <p
                className="
                  text-slate-600
                  text-lg
                  leading-relaxed
                "
              >
                {
                  negocio.descripcion
                }
              </p>

            </div>

            {/* GALLERY */}
            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-[36px]
                p-10
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                  mb-8
                "
              >

                <ImageIcon
                  size={32}
                  className="
                    text-slate-900
                  "
                />

                <h2
                  className="
                    text-4xl
                    font-black
                    text-slate-900
                  "
                >
                  Galería
                </h2>

              </div>

              {
                galeria.length === 0
                ? (

                  <div
                    className="
                      bg-slate-100
                      rounded-[30px]
                      p-16
                      text-center
                    "
                  >

                    <p
                      className="
                        text-slate-500
                        text-lg
                      "
                    >
                      No hay imágenes
                    </p>

                  </div>

                ) : (

                  <div
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-2
                      gap-6
                    "
                  >

                    {
                      galeria.map(
                        (imagen) => (

                          <img
                            key={
                              imagen.id_imagen
                            }
                            src={
                              imagen.url_imagen
                            }
                            alt="Imagen negocio"
                            className="
                              w-full
                              h-72
                              object-cover
                              rounded-[28px]
                            "
                          />

                        )
                      )
                    }

                  </div>

                )
              }

            </div>

          </div>

          {/* SIDEBAR */}
          <div>

            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-[36px]
                p-10
                sticky
                top-10
              "
            >

              <h2
                className="
                  text-3xl
                  font-black
                  text-slate-900
                  mb-8
                "
              >
                Información
              </h2>

              <div
                className="
                  space-y-8
                "
              >

                <div>

                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[3px]
                      text-slate-400
                      mb-3
                    "
                  >
                    Categoría
                  </p>

                  <p
                    className="
                      text-xl
                      font-bold
                      text-slate-900
                    "
                  >
                    {
                      negocio.categoria
                    }
                  </p>

                </div>

                <div>

                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[3px]
                      text-slate-400
                      mb-3
                    "
                  >
                    Dirección
                  </p>

                  <p
                    className="
                      text-lg
                      text-slate-700
                    "
                  >
                    {
                      negocio.direccion
                    }
                  </p>

                </div>

                <div>

                  <p
                    className="
                      text-sm
                      uppercase
                      tracking-[3px]
                      text-slate-400
                      mb-3
                    "
                  >
                    Teléfono
                  </p>

                  <p
                    className="
                      text-lg
                      text-slate-700
                    "
                  >
                    {
                      negocio.telefono
                    }
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>

  );

}

export default NegocioDetailPage;