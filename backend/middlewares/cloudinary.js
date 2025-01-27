const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Set up Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Set up multer and Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'dish_posts', // Folder in Cloudinary
        allowed_formats: ['jpg', 'png'],
    },
});

const upload = multer({ storage });

// Middleware to upload image to Cloudinary
const uploadImageToCloudinary = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        // The Cloudinary result is already attached to req.file.path, so just pass it along
        req.cloudinaryResult = { secure_url: req.file.path };
        next();
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error.message);
        res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
    }
};

module.exports = { upload, uploadImageToCloudinary };
