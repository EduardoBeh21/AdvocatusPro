const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sizeOf = require('image-size');

// Configuração do armazenamento de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filtro para permitir apenas arquivos de imagem
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Arquivo não suportado'));
};

// Configuração do multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter, 
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Middleware para verificar a resolução da imagem
const checkImageResolution = (req, res, next) => {
  if (!req.file) return next();

  try {
    // Verifica as dimensões da imagem
    const dimensions = sizeOf(req.file.path);

    if (dimensions.width > 2000 || dimensions.height > 2000) {
      fs.unlinkSync(req.file.path); // Remove o arquivo se exceder as dimensões
      return res.status(400).json({ message: 'A resolução da imagem não pode exceder 2000x2000 pixels.' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { upload, checkImageResolution };
