import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadImage(file: string) {
  const res = await cloudinary.uploader.upload(file, {
    folder: "cars",
    resource_type: "image",
    format: "auto",   // webp / avif
    quality: "auto",
  });

  return {
    url: res.secure_url,
    publicId: res.public_id,
  };
}
