const { Router } = require("express");
const Photo = require("../models/photo");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");
const photo = require("../models/photo");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const router = Router();

router.get("/", async (req, res) => {
  // indicamos el metodo y la ruta a la que se accederá
  const photos = await Photo.find().lean();

  res.render("images", { photos });
});

router.get("/images/add", async (req, res) => {
  const photos = await Photo.find().lean();
  res.render("image_form", { photos });
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

  res.redirect("/");
});

router.get("/images/delete/:photo_id", async (req, res) => {
  const { photo_id } = req.params;
  const imageDeleted = await Photo.findByIdAndDelete(photo_id);
  const result = await cloudinary.v2.uploader.destroy(imageDeleted.public_id);
  console.log(result);
  res.redirect("/images/add");
});
module.exports = router;
