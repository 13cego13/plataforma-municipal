import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

  try {

    const authHeader = req.headers.authorization;

    // Verificar header
    if (!authHeader) {
      return res.status(401).json({
        ok: false,
        message: "Token no proporcionado",
      });
    }

    // Verificar formato Bearer
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        ok: false,
        message: "Formato de token inválido",
      });
    }

    // Extraer token
    const token = authHeader.split(" ")[1];

    // Verificar token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Guardar usuario en request
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado",
    });

  }

};