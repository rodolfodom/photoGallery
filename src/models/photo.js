//en este archvio se diseñara la estructura que tendran los documentos dentro de nuestra db

const { Schema, model } = require("mongoose");

const Photo = new Schema({
  title: String,
  description: String,
  imageURL: String,
  public_id: String,
});

module.exports = model("Photo", Photo); //para poder usar nuestros esquemas es necesario pasarlos por la funcion model
