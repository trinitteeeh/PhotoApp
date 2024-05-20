// PhotoRoute.js

import { Router } from 'express';
import multer from 'multer';
import PhotoController from '../controllers/PhotoController.js'; // Ubah impor ini

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/photos');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage }); // Ubah konfigurasi multer

router.post('/upload', upload.single('photo'), PhotoController.uploadPhoto); // Ubah di sini

export default router;
