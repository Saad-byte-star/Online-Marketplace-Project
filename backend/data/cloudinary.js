
const cloudinary = require("cloudinary").v2

const fs = require("fs")
require("dotenv").config()


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

          


  const uploadOnCloudinary = async function (localFilePath) {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log(`File has been uploaded to Cloudinary. URL: ${response.url}`);
        fs.unlink(localFilePath, (err) => {
            if (err) {
                console.error(`Error deleting local file ${localFilePath}:`, err);
            } else {
                console.log(`Deleted local file: ${localFilePath}`);
            }
        });

        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return null;
    }
};


module.exports = uploadOnCloudinary