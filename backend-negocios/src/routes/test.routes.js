import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {

  res.json({
    ok: true,
    message:
      "Backend NEGOCIOS funcionando",
  });

});

export default router;