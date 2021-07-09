const app = require("./app");

// econ este método se enciende el servidor;
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});
