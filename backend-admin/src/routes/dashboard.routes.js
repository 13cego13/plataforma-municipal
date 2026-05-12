import { Router }
from "express";

import {
  verifyToken,
} from "../middlewares/auth.middleware.js";

import {
  verifyRole,
} from "../middlewares/role.middleware.js";

import {
  getDashboardStatsController,
} from "../controllers/dashboard.controller.js";

const router = Router();

router.get(
  "/stats",
  verifyToken,
  verifyRole(
    "ADMINISTRADOR"
  ),
  getDashboardStatsController
);

export default router;