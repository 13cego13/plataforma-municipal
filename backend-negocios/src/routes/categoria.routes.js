import { Router } from "express";

import {
  getPublicCategorias,
} from "../controllers/categoria.controller.js";

const router = Router();

router.get(
  "/",
  getPublicCategorias
);

export default router;