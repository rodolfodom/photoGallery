const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  // indicamos el metodo y la ruta a la que se accederá
  res.send("Hellow worls!");
});

module.exports = router;
