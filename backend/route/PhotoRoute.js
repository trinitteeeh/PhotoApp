// PhotoRoute.js
import express from "express";
import { uploadPhoto, getPhoto } from "../controllers/PhotoController.js"; // Ubah impor ini

const router = express.Router();

router.post("/upload", uploadPhoto);
router.get("/get", getPhoto);

export default router;
