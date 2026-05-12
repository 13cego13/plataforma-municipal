import express from "express";
import cors from "cors";

import testRoutes
from "./routes/test.routes.js";
import negocioRoutes
from "./routes/negocio.routes.js";
import categoriaRoutes
from "./routes/categoria.routes.js";
import imagenRoutes
from "./routes/imagen.routes.js";

import publicRoutes
from "./routes/public.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/test", testRoutes);
app.use(
  "/api/negocios",
  negocioRoutes
);
app.use(
  "/api/categorias",
  categoriaRoutes
);
app.use(
  "/api/imagenes",
  imagenRoutes
);

app.use(
  "/api/public",
  publicRoutes
);

export default app;