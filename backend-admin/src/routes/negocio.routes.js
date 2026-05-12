import { Router } from "express";

import {
  verifyToken,
} from "../middlewares/auth.middleware.js";

import {
  verifyRole,
} from "../middlewares/role.middleware.js";

import {
  getPendingNegociosController,
  approveNegocioController,
  rejectNegocioController,
  getAllNegociosController,
} from "../controllers/negocio.controller.js";

const router = Router();

router.get(
  "/pending",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  getPendingNegociosController
);

router.put(
  "/approve/:id",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  approveNegocioController
);

router.put(
  "/reject/:id",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  rejectNegocioController
);

router.get(
  "/",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  getAllNegociosController
);



export default router;