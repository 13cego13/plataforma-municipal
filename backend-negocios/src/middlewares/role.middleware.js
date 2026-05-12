export const verifyRole =
  (...roles) => {

    return (req, res, next) => {

      try {

        const userRole =
          req.user.rol;

        if (
          !roles.includes(userRole)
        ) {

          return res.status(403).json({
            ok: false,
            message:
              "No tienes permisos",
          });

        }

        next();

      } catch (error) {

        return res.status(500).json({
          ok: false,
          message:
            "Error verificando rol",
        });

      }

    };

};