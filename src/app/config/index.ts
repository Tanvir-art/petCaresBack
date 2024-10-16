import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  port: process.env.PORT,
  database_url: process.env.DATABSE_URL,
  jwt_secret: process.env.JWT_SECRET_KEY,
  NODE_ENV: process.env.NODE_ENV,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
