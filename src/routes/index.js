const { Router } = require("express");
const Photo = require("../models/photo");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = Router();

router.get("/", (req, res) => {
  // indicamos el metodo y la ruta a la que se accederá
  res.render("images");
});

router.get("/images/add", (req, res) => {
  res.render("image_form");
});

router.post("/images/add", async (req, res) => {
  const { title, description } = req.body;

  const photoUploaded = await cloudinary.v2.uploader.upload(req.file.path);

  const newPhoto = new Photo({
    title,
    description,
    imageURL: photoUploaded.url,
    public_id: photoUploaded.public_id,
  });

  await newPhoto.save();
  await fs.unlink(req.file.path);

  res.send("Data received");
});

module.exports = router;
