import { Router } from "express";

import {
  verifyToken,
} from "../middlewares/auth.middleware.js";

import {
  verifyRole,
} from "../middlewares/role.middleware.js";

import {
  createNegocio,
  getNegociosByCategoria,
  getNegocioDetail,
  getMyNegocios,
    updateMyNegocio,
    deactivateNegocio,
    activateNegocio,
} from "../controllers/negocio.controller.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  verifyRole("DUENO_NEGOCIO"),
  createNegocio
);

router.get(
  "/categoria/:id_categoria",
  getNegociosByCategoria
);

router.get(
  "/detail/:id_negocio",
  getNegocioDetail
);

router.get(
  "/my-business",
  verifyToken,
  verifyRole("DUENO_NEGOCIO"),
  getMyNegocios
);

router.put(
  "/my-business/:id_negocio",
  verifyToken,
  verifyRole("DUENO_NEGOCIO"),
  updateMyNegocio
);
router.put(
  "/deactivate/:id_negocio",
  verifyToken,
  verifyRole("DUENO_NEGOCIO"),
  deactivateNegocio
);

router.put(
  "/activate/:id_negocio",
  verifyToken,
  verifyRole("DUENO_NEGOCIO"),
  activateNegocio
);

export default router;