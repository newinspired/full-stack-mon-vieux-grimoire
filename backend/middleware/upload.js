const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// CREATION CONFIGURATION MULTER (UPLOADS LES FICHIERS DANS L'APP EXPRESS)

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.replace(/[\s.]+/g, '_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const upload = multer({ storage: storage }).single('image');


// MIDDLEWARE DE REDIMENSIONNEMENT D'IMAGE

const resizeImage = (req, res, next) => {
  if (!req.file) return next();

  const filePath = req.file.path;
  const fileName = req.file.filename;
  const outputFilePath = path.join('images', `resized_${fileName}`);

  sharp(filePath)
    .resize({ width: 206, height: 260 })
    .toFile(outputFilePath)
    .then(() => {
      fs.unlink(filePath, () => { // SUPPRIME L IMAGE ORIGINALE (NON OPTIMISÉE)
        req.file.path = outputFilePath; // MET À JOUR LE CHEMIN DU FICHIER DANS LA REQUÊTE
        next();
      });
    })
    .catch(err => {
      console.log(err);
      return next();
    });
};

module.exports = {
  upload,
  resizeImage
};