const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, {
    //la cadena de conección cambiara es la misma solo si esta en local sino será dada por el proveedor de base de datos
    useNewUrlParser: true, // este parametro es necesario para le funcionamiento de mongoose
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("db is connceted");
  })
  .catch((err) => {
    console.error(err);
  });
