import express from "express";
import cors from "cors";
import municipioRoutes
from "./routes/municipio.routes.js";
import testRoutes
from "./routes/test.routes.js";
import categoriaRoutes
from "./routes/categoria.routes.js";
import solicitudRoutes
from "./routes/solicitud.routes.js";
import negocioRoutes
from "./routes/negocio.routes.js";
import dashboardRoutes
from "./routes/dashboard.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/api/municipios",
  municipioRoutes
);
app.use(
  "/api/categorias",
  categoriaRoutes
);
app.use(
  "/api/solicitudes",
  solicitudRoutes
);
app.use(
  "/api/negocios",
  negocioRoutes
);
app.use("/api/test", testRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);

export default app;