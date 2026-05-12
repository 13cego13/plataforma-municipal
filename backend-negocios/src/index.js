import dotenv from "dotenv";

import "./config/db.js";

import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {

  console.log(
    `Servidor NEGOCIOS corriendo en puerto ${PORT}`
  );

});