import multer from "multer";

const storage =
  multer.memoryStorage();

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
];

const allowedExtensions =
  /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i;

const isAllowedImage =
  (file) => (
    allowedMimeTypes.includes(
      file.mimetype
    )
    &&
    allowedExtensions.test(
      file.originalname
    )
  );

const fileFilter =
  (req, file, cb) => {

    if (!isAllowedImage(file)) {

      const error =
        new Error(
          `El archivo "${file.originalname}" no tiene un formato de imagen valido. Usa JPG, PNG, WEBP, GIF, SVG o AVIF.`
        );

      error.statusCode = 400;

      return cb(error);

    }

    return cb(null, true);

  };

export const upload =
  multer({
    storage,
    fileFilter,
    limits: {
      fileSize:
        5 * 1024 * 1024,
    },
  });

export const handleUploadError =
  (error, req, res, next) => {

    if (!error) {

      return next();

    }

    if (
      error instanceof multer.MulterError &&
      error.code === "LIMIT_FILE_SIZE"
    ) {

      return res.status(400).json({
        ok: false,
        message:
          "La imagen supera el tamano maximo permitido de 5 MB",
      });

    }

    return res.status(
      error.statusCode || 400
    ).json({
      ok: false,
      message:
        error.message
        || "No se pudo cargar la imagen",
    });

  };
