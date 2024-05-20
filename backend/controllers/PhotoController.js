import Photo from '../models/PhotoModel.js';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

export const uploadPhoto = async (req, res) => {
  try {
    const { imageUrl } = req.body; // Ambil imageUrl dari body request

    // Simpan foto ke database
    const savedPhoto = await Photo.create({
      photo: imageUrl, // Simpan URL gambar ke dalam database
      orderId: 4
    });

    console.log("image >>>>>>> database :       " , imageUrl)

    res.status(201).json({ photoId: savedPhoto.photoId });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
};


export const getLatestPhoto = async (req, res) => {
  try {
    // Ambil photoId terbaru
    const latestPhotoId = await Photo.max('photoId');

    // Ambil URL gambar dari database berdasarkan photoId terbaru
    const latestPhoto = await Photo.findOne({ where: { photoId: latestPhotoId } });

    if (!latestPhoto) {
      return res.status(404).json({ error: 'Latest image URL not found' });
    }

    res.status(200).json({ imageUrl: latestPhoto.photo });
  } catch (error) {
    console.error('Error getting latest image URL:', error);
    res.status(500).json({ error: 'Failed to get latest image URL' });
  }
};


export const getPhoto = async (req, res) => {
  
  try {
    // Ambil URL gambar dari database
    const savedPhoto = await Photo.findOne({ where: { photoId: 37 } });
    if (!savedPhoto) {
      return res.status(404).json({ error: 'Image URL not found' });
    }
    res.status(200).json({ imageUrl: savedPhoto });
  } catch (error) {
    console.error('Error getting image URL:', error);
    res.status(500).json({ error: 'Failed to get image URL' });
  }
};




export default uploadPhoto;
