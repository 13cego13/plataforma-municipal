import { Router } from "express";

import {
  verifyToken,
} from "../middlewares/auth.middleware.js";

import {
  verifyRole,
} from "../middlewares/role.middleware.js";

import {
  getPendingRequests,
} from "../controllers/solicitud.controller.js";

const router = Router();

router.get(
  "/pending",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  getPendingRequests
);

export default router;