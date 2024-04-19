import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

// store image in memory as a buffer object
const storage = new multer.memoryStorage();
export const upload = multer({
  storage,
});

cloudinary.config({
  cloud_name: "unique-wares",
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
  secure: true,
});

export async function handleImageUpload(file, vendorId) {
  const res = await cloudinary.uploader.upload(file, {
    folder: `products/${vendorId}`,
    resource_type: "image",
    width: 750,
    height: 500,
    format: "jpg",
  });
  return res;
}

export async function handleImageDelete(public_id) {
  try {
    const res = await cloudinary.uploader.destroy(public_id);
    return res;
  } catch (err) {
    console.log(err);
  }
}
