import { Router } from "express";
import {
  verifyToken,
} from "../middlewares/auth.middleware.js";

import {
  verifyRole,
} from "../middlewares/role.middleware.js";

import {
  getMunicipios, createMunicipio, getMunicipioById, updateMunicipio, updateMunicipioStatus, getPublicMunicipios
} from "../controllers/municipio.controller.js";



const router = Router();

router.get("/", getMunicipios);
router.get(
  "/public",
  getPublicMunicipios
);
router.post(
  "/",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  createMunicipio
);
router.get("/:id", getMunicipioById);
router.put(
  "/:id",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  updateMunicipio
);
router.patch(
  "/:id/status",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  updateMunicipioStatus
);




export default router;