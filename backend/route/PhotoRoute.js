// PhotoRoute.js
import express from "express";
import {uploadPhoto, getPhoto, getLatestPhoto} from '../controllers/PhotoController.js'; // Ubah impor ini

const router = express.Router();


router.post('/upload',uploadPhoto);
router.get('/get',getPhoto);
router.get('/lastphoto',getLatestPhoto);


export default router;
