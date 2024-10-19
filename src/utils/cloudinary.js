import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: "dw9qarv8z", 
  api_key: "281323722872765", 
  api_secret: "-j45Ptxu2Wg6SXpLAihls7tVJqs" 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: 'auto'
        });
        // File has been uploaded successfully
        fs.unlinkSync(localFilePath);
        return response;
      } catch (error) {
        fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation failed
        return null;
      }
}



export {uploadOnCloudinary}