const cloudinary= require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
}); 

exports.upload_image = async (imagePath) => {
    try{
        const result = await cloudinary.uploader.upload(imagePath, {
            folder:"beauty-booking",
        });
        return result.secure_url;
    } catch(err){
        console.log(err);
    }
}