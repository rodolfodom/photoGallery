if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // permite ller los archivos .env para poder usar las varibles definidas en ellas
}

const app = require("./app");

// econ este método se enciende el servidor;
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
