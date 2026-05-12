import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {

  res.json({
    ok: true,
    message:
      "Backend ADMIN funcionando",
  });

});

export default router;