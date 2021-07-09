// en este archivo se configura el servidor
const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const exphbs = require("express-handlebars");

// INICIALIZACIONES

// inicializae express

const app = express(); // esta constante respresenta nuestro servidor

// SETTINGS

app.set("port", 3000); // indicacion del puerto que debe usar el server

app.set("views", path.join(__dirname, "views")); // indica la ruta en la que se encuentra la carpeta de las vistas

// inicia configuracion del motor de vistas (e este caso handlebars)

app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);

// termina configuracion del motor de vistas

app.set("view engine", ".hbs"); // indica que motor de vistas debe usar (handlebars)

//MIDDLEWARES
app.use(morgan("dev")); //mogan muestra en la consola detalles sobre las peticiones que se le hacen al servidor

app.use(express.json()); //permite a express entender y procesar datos en formato json

app.use(express.urlencoded({ extended: false })); //Permite a express entender datos emviados, extended false envita que procese archvios pesados (como imagenes) ya que serán manejados por multer

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"), // configuracion del directorio al que se subiran las imagenes
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname)); // cb recibe dos parametros (error, nombre) esta funciona renombra nuestras imagenes al momento de subirlas
  },
});

app.use(multer({ storage }).single("image"));

// ROUTES

app.use(require("./routes")); // indicamos el archvio en el que se encuentran las rutas

module.exports = app;
