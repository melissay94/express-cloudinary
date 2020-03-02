require("dotenv").config();

const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const cloudinary = require("cloudinary");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "./uploads" });

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index');
});

app.post("/", upload.single("input-file"), (req, res) => {
  cloudinary.uploader.upload(req.file.path, result => {
    let cloudId = result.public_id;
    let imageLink = `https://res.cloudinary.com/mayday94/image/upload/c_scale,e_pixelate:10,h_166,r_0/a_0/v1582055921/${cloudId}.jpg`;
    res.render("result", { image: imageLink });
  });
});

app.listen(3000);
