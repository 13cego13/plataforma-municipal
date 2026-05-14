import {
  findUserByEmail,
  createUser,
  createBusinessOwner,
} from "../models/auth.model.js";

import {
  getPendingUsers,
  approveUserModel,
  rejectUserModel,
} from "../models/auth.model.js";

import { hashPassword } from "../utils/hashPassword.js";
import { comparePassword } from "../utils/hashPassword.js";

import { generateToken } from "../utils/generateToken.js";

import {
  findUserWithRoleByEmail,
} from "../models/auth.model.js";

export const registerService = async (data) => {
  const {
    nombre,
    correo,
    contrasena,
    razon_social,
    documento,
    telefono,
  } = data;

  const cleanData = {
    nombre:
      nombre.trim(),
    correo:
      correo.trim(),
    contrasena,
    razon_social:
      razon_social.trim(),
    documento:
      documento.trim(),
    telefono:
      telefono.trim(),
  };

  // Verificar correo duplicado
  const existingUser = await findUserByEmail(
    cleanData.correo
  );

  if (existingUser) {

    const error =
      new Error(
        "El correo ya esta registrado"
      );

    error.statusCode = 409;

    throw error;

  }

  // Hash password
  const hashedPassword = await hashPassword(
    cleanData.contrasena
  );

  // ID rol dueño negocio
  // luego lo haremos dinámico
  const OWNER_ROLE_ID = "45e875f8-39a0-42e7-81bc-9630b6ca1ed7";

  // Crear usuario
  const user = await createUser({
    nombre:
      cleanData.nombre,
    correo:
      cleanData.correo,
    contrasena: hashedPassword,
    id_rol: OWNER_ROLE_ID,
  });

  // Crear dueño negocio
  await createBusinessOwner({
    id_usuario: user.id_usuario,
    razon_social:
      cleanData.razon_social,
    documento:
      cleanData.documento,
    telefono:
      cleanData.telefono,
  });

  return {
    message: "Usuario registrado correctamente",
    user,
  };
};

export const loginService = async ({
  correo,
  contrasena,
}) => {

  // Buscar usuario
  const user = await findUserWithRoleByEmail(correo);

  if (!user) {
    throw new Error("Credenciales incorrectas");
  }

  // Comparar password
  const validPassword = await comparePassword(
    contrasena,
    user.contrasena
  );

  if (!validPassword) {
    throw new Error("Credenciales incorrectas");
  }

  // Validar estado
  if (user.estado_usuario !== "APROBADO") {
    throw new Error(
      "Tu usuario aún no ha sido aprobado"
    );
  }

  // Generar token
  const token = generateToken(user);

  return {
    token,
    user: {
      id_usuario: user.id_usuario,
      nombre: user.nombre,
      correo: user.correo,
      rol: user.rol,
    },
  };
};

export const getPendingUsersService =
  async () => {

    return await getPendingUsers();

};

export const approveUserService =
  async (id_usuario) => {

    const user =
      await approveUserModel(id_usuario);

    if (!user) {
      throw new Error(
        "Usuario no encontrado"
      );
    }

    return user;

};

export const rejectUserService =
  async (id_usuario) => {

    const user =
      await rejectUserModel(id_usuario);

    if (!user) {
      throw new Error(
        "Usuario no encontrado"
      );
    }

    return user;

};
