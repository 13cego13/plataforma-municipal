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
  ArrowRight,
} from "lucide-react";

function CategoriaNegociosPage() {

  // =====================================
  // PARAMS
  // =====================================

  const {
    id,
    id_categoria,
  } = useParams();

  // =====================================
  // NAVIGATE
  // =====================================

  const navigate =
    useNavigate();

  // =====================================
  // STATES
  // =====================================

  const [negocios,
    setNegocios] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  // =====================================
  // API
  // =====================================

  const ADMIN_API =
    import.meta.env.VITE_NEGOCIOS_API;

  // =====================================
  // LOAD
  // =====================================

  useEffect(() => {

    loadNegocios();

  }, [id, id_categoria]);

  const loadNegocios =
    async () => {

      try {

        const response =
          await fetch(
            `${ADMIN_API}/public/municipio/${id}/categoria/${id_categoria}`
          );

        const data =
          await response.json();

        setNegocios(
          data.negocios || []
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
          bg-gradient-to-r
          from-slate-900
          via-slate-800
          to-slate-900
          text-white
          relative
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            top-0
            right-0
            w-[500px]
            h-[500px]
            bg-white/5
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-20
            relative
            z-10
          "
        >

          <button
            onClick={
              () =>
                navigate(
                  `/municipio/${id}`
                )
            }
            className="
              flex
              items-center
              gap-3
              text-slate-300
              hover:text-white
              mb-10
            "
          >

            <ArrowLeft size={20} />

            Volver

          </button>

          <p
            className="
              uppercase
              tracking-[5px]
              text-slate-400
              text-sm
              mb-5
            "
          >
            Negocios
          </p>

          <h1
            className="
              text-6xl
              font-black
            "
          >
            Negocios disponibles
          </h1>

          <p
            className="
              text-slate-300
              text-xl
              mt-6
              max-w-2xl
            "
          >
            Explora los negocios
            disponibles en esta
            categoría.
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-24
        "
      >

        {/* EMPTY */}
        {
          negocios.length === 0
          && (

            <div
              className="
                bg-white
                border
                border-slate-200
                rounded-[36px]
                p-16
                text-center
              "
            >

              <h3
                className="
                  text-3xl
                  font-black
                  text-slate-800
                "
              >
                No hay negocios
              </h3>

              <p
                className="
                  text-slate-500
                  mt-4
                  text-lg
                "
              >
                Todavía no existen
                negocios aprobados
                en esta categoría.
              </p>

            </div>

          )
        }

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >

          {
            negocios.map(
              (negocio) => (

                <div
                  key={
                    negocio.id_negocio
                  }
                  className="
                    group
                    bg-white
                    border
                    border-slate-200
                    rounded-[36px]
                    overflow-hidden
                    hover:shadow-2xl
                    hover:-translate-y-2
                    transition-all
                    duration-300
                  "
                >

                  {/* IMAGE */}
                  <div
                    className="
                      h-64
                      overflow-hidden
                    "
                  >

                    {
                      negocio.url_imagen
                      ? (

                        <img
                          src={
                            negocio.url_imagen
                          }
                          alt={
                            negocio.nombre
                          }
                          className="
                            w-full
                            h-full
                            object-cover
                            group-hover:scale-110
                            transition-all
                            duration-500
                          "
                        />

                      ) : (

                        <div
                          className="
                            w-full
                            h-full
                            bg-slate-200
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <Store
                            size={50}
                            className="
                              text-slate-500
                            "
                          />

                        </div>

                      )
                    }

                  </div>

                  {/* CONTENT */}
                  <div className="p-8">

                    <h3
                      className="
                        text-3xl
                        font-black
                        text-slate-900
                      "
                    >
                      {
                        negocio.nombre
                      }
                    </h3>

                    <p
                      className="
                        text-slate-500
                        mt-4
                        leading-relaxed
                        line-clamp-3
                      "
                    >
                      {
                        negocio.descripcion
                      }
                    </p>

                    {/* INFO */}
                    <div
                      className="
                        mt-8
                        flex
                        flex-col
                        gap-4
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          text-slate-700
                        "
                      >

                        <MapPin size={18} />

                        {
                          negocio.direccion
                        }

                      </div>

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          text-slate-700
                        "
                      >

                        <Phone size={18} />

                        {
                          negocio.telefono
                        }

                      </div>

                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={
                        () =>
                          navigate(
                            `/negocio/${negocio.id_negocio}`
                          )
                      }
                      className="
                        mt-10
                        w-full
                        bg-slate-900
                        hover:bg-black
                        text-white
                        py-4
                        rounded-2xl
                        font-bold
                        flex
                        items-center
                        justify-center
                        gap-3
                      "
                    >

                      Ver negocio

                      <ArrowRight size={20} />

                    </button>

                  </div>

                </div>

              )
            )
          }

        </div>

      </section>

    </div>

  );

}

export default CategoriaNegociosPage;