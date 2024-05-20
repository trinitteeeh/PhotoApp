// PhotoController.js

import Photo from '../models/PhotoModel.js';

const PhotoController = {
  async createPhoto(req, res) {
    try {
      const { orderId, photoData } = req.body;
      const newPhoto = await Photo.create({
        orderId: orderId,
        Photo: photoData
      });
      res.status(201).json({ success: true, message: 'Photo created successfully', data: newPhoto });
    } catch (error) {
      console.error('Error creating photo:', error);
      res.status(500).json({ success: false, message: 'Failed to create photo', error: error.message });
    }
  },

  async uploadPhoto(req, res) {
    try {
      // Ensure the file is uploaded correctly
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Get information about the uploaded file
      const photo = req.file;

      // Do something with the photo, e.g., save it to the database or perform other operations
      const newPhoto = await Photo.create({
        Photo: photo.buffer // Using the uploaded photo buffer
      });

      // Send response with the uploaded image URL
      res.status(200).json({ success: true, message: 'Photo uploaded successfully', imageUrl: `path/to/${photo.originalname}`, data: newPhoto });
    } catch (error) {
      console.error('Error uploading photo:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

export default PhotoController;
