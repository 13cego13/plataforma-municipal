import jwt from "jsonwebtoken";

export const generateToken = (user) => {

  return jwt.sign(
    {
      id_usuario: user.id_usuario,
      correo: user.correo,
      rol: user.rol,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

};