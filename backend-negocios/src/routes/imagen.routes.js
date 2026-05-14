import { Router } from "express";

import {
  verifyToken,
} from "../middlewares/auth.middleware.js";

import {
  verifyRole,
} from "../middlewares/role.middleware.js";

import {
  upload,
  handleUploadError,
} from "../middlewares/upload.middleware.js";

import {
  uploadMainImage,
  uploadGalleryImages,
    getGalleryImages,
} from "../controllers/imagen.controller.js";

const router = Router();

router.post(
  "/main/:id_negocio",
  verifyToken,
  verifyRole("DUENO_NEGOCIO"),
  upload.single("imagen"),
  handleUploadError,
  uploadMainImage
);

router.post(
  "/gallery/:id_negocio",
  verifyToken,
  verifyRole("DUENO_NEGOCIO"),
  upload.array("imagenes", 10),
  handleUploadError,
  uploadGalleryImages
);

router.get(
  "/gallery/:id_negocio",
  getGalleryImages
);

export default router;
