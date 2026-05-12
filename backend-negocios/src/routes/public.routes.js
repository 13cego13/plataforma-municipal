import { Router } from "express";

import {
  getCategoriasByMunicipio,
  getNegociosByMunicipioCategoria,
} from "../controllers/public.controller.js";

const router = Router();

router.get(
  "/municipio/:id/categorias",
  getCategoriasByMunicipio
);

router.get(
  "/municipio/:id/categoria/:id_categoria",
  getNegociosByMunicipioCategoria
);

export default router;