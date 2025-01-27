
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

export default {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});