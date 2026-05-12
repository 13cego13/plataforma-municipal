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
  ArrowRight,
  Tags,
} from "lucide-react";

function MunicipioPage() {

  // =====================================
  // PARAMS
  // =====================================

  const { id } =
    useParams();

  // =====================================
  // NAVIGATE
  // =====================================

  const navigate =
    useNavigate();

  // =====================================
  // STATES
  // =====================================

  const [categorias,
    setCategorias] =
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

    loadCategorias();

  }, [id]);

  const loadCategorias =
    async () => {

      try {

        const response =
          await fetch(
            `${ADMIN_API}/public/municipio/${id}/categorias`
          );

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

          {/* BACK */}
          <button
            onClick={
              () => navigate("/")
            }
            className="
              flex
              items-center
              gap-3
              text-slate-300
              hover:text-white
              mb-10
              transition-all
            "
          >

            <ArrowLeft size={20} />

            Volver al inicio

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
            Municipio
          </p>

          <h1
            className="
              text-6xl
              font-black
              leading-tight
            "
          >
            Explora categorías
          </h1>

          <p
            className="
              text-slate-300
              text-xl
              mt-6
              max-w-2xl
              leading-relaxed
            "
          >
            Descubre los negocios y
            servicios disponibles
            dentro de este municipio.
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

        <div
          className="
            flex
            items-center
            justify-between
            mb-12
          "
        >

          <div>

            <h2
              className="
                text-5xl
                font-black
                text-slate-900
              "
            >
              Categorías disponibles
            </h2>

            <p
              className="
                text-slate-500
                text-xl
                mt-4
              "
            >
              Selecciona una categoría
              para explorar negocios.
            </p>

          </div>

        </div>

        {/* EMPTY */}
        {
          categorias.length === 0
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
                No hay categorías
              </h3>

              <p
                className="
                  text-slate-500
                  mt-4
                  text-lg
                "
              >
                Este municipio todavía
                no tiene negocios aprobados.
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
            lg:grid-cols-3
            gap-8
          "
        >

          {
            categorias.map(
              (categoria) => (

                <button
                  key={
                    categoria.id_categoria
                  }
                  onClick={
                    () =>
                      navigate(
                        `/municipio/${id}/categoria/${categoria.id_categoria}`
                      )
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
                    text-left
                  "
                >

                  {/* IMAGE */}
                  <div
                    className="
                      h-64
                      overflow-hidden
                    "
                  >

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
                        group-hover:scale-110
                        transition-all
                        duration-500
                      "
                    />

                  </div>

                  {/* CONTENT */}
                  <div className="p-8">

                    <div
                      className="
                        w-16
                        h-16
                        rounded-3xl
                        bg-slate-100
                        flex
                        items-center
                        justify-center
                        mb-6
                      "
                    >

                      <Tags
                        size={30}
                        className="
                          text-slate-800
                        "
                      />

                    </div>

                    <h3
                      className="
                        text-3xl
                        font-black
                        text-slate-900
                      "
                    >
                      {
                        categoria.nombre
                      }
                    </h3>

                    <p
                      className="
                        text-slate-500
                        mt-4
                        leading-relaxed
                      "
                    >
                      {
                        categoria.descripcion
                      }
                    </p>

                    <div
                      className="
                        mt-8
                        flex
                        items-center
                        gap-3
                        font-bold
                        text-slate-900
                      "
                    >

                      Ver negocios

                      <ArrowRight size={20} />

                    </div>

                  </div>

                </button>

              )
            )
          }

        </div>

      </section>

    </div>

  );

}

export default MunicipioPage;