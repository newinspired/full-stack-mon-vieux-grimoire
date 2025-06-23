const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');  // dossier où stocker (crée-le si besoin)
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const ext = path.extname(file.originalname);
    callback(null, name + Date.now() + ext);
  }
});



const fileFilter = (req, file, callback) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);

  if (ext && mime) {
    callback(null, true);
  } else {
    callback(new Error('Only images are allowed'));
  }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single('image');