import { Router } from "express";
import {
  verifyRole,
} from "../middlewares/role.middleware.js";

import {
  verifyToken,
} from "../middlewares/auth.middleware.js";

import {
  register, profile, login, adminPanel
} from "../controllers/auth.controller.js";

import {
  getPendingUsersController,
  approveUserController,
  rejectUserController,
    getAllUsersController,
    activateUserController,
deactivateUserController,
updateUserController,
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/test", (req, res) => {
  res.json({
    ok: true,
    message: "Auth funcionando correctamente",
  });
});

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, profile);
router.get("/admin", verifyToken, verifyRole("ADMINISTRADOR"), adminPanel);
router.get(
  "/pending-users",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  getPendingUsersController
);

router.put(
  "/approve-user/:id",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  approveUserController
);

router.put(
  "/reject-user/:id",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  rejectUserController
);

router.get(
  "/users",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  getAllUsersController
);

router.patch(
  "/activate-user/:id",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  activateUserController
);

router.patch(
  "/deactivate-user/:id",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  deactivateUserController
);

router.put(
  "/users/:id",
  verifyToken,
  verifyRole("ADMINISTRADOR"),
  updateUserController
);

export default router;