import { Router } from "express";
import {
  verifyToken,
} from "../middlewares/auth.middleware.js";

import {
  verifyRole,
} from "../middlewares/role.middleware.js";

import {
  getCategorias,createCategoria,getCategoriaById,updateCategoria,updateCategoriaStatus,
} from "../controllers/categoria.controller.js";

const router = Router();

router.get("/", getCategorias);
router.post(
  "/",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  createCategoria
);
router.get("/:id", getCategoriaById);
router.put(
  "/:id",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  updateCategoria
);
router.patch(
  "/:id/status",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  updateCategoriaStatus
);

export default router;