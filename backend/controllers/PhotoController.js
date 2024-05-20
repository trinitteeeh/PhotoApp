import Photo from "../models/PhotoModel.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure public/uploads directory exists
const publicDir = path.join(__dirname, "..", "public", "uploads");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

export const uploadPhoto = async (req, res) => {
  try {
    const dataUrl = req.body.imageUrl;
    const matches = dataUrl.match(/^data:.+\/(.+);base64,(.*)$/);
    const ext = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, "base64");

    const filename = `upload-${Date.now()}.${ext}`;
    const filePath = path.join(publicDir, filename);

    // Save the image data to a file in the public/uploads directory
    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        throw err;
      }

      // Assuming you want to save the file path to the database
      Photo.create({
        photo: filePath,
        orderId: 4,
      })
        .then((savedPhoto) => {
          res.status(201).json({ photoId: savedPhoto.photoId });
        })
        .catch((error) => {
          throw error;
        });
    });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ error: "Failed to upload photo" });
  }
};

export const getLatestPhoto = async (req, res) => {
  try {
    // Ambil photoId terbaru
    const latestPhotoId = await Photo.max("photoId");

    // Ambil URL gambar dari database berdasarkan photoId terbaru
    const latestPhoto = await Photo.findOne({ where: { photoId: latestPhotoId } });

    if (!latestPhoto) {
      return res.status(404).json({ error: "Latest image URL not found" });
    }

    res.status(200).json({ imageUrl: latestPhoto.photo });
  } catch (error) {
    console.error("Error getting latest image URL:", error);
    res.status(500).json({ error: "Failed to get latest image URL" });
  }
};

export const getPhoto = async (req, res) => {
  try {
    // Ambil URL gambar dari database
    const savedPhoto = await Photo.findOne({ where: { photoId: 37 } });
    if (!savedPhoto) {
      return res.status(404).json({ error: "Image URL not found" });
    }
    res.status(200).json({ imageUrl: savedPhoto });
  } catch (error) {
    console.error("Error getting image URL:", error);
    res.status(500).json({ error: "Failed to get image URL" });
  }
};

export default uploadPhoto;
