import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const SECRET_KEY = process.env.SECRET_KEY;
const CLOUDINARY_CONFIG = JSON.parse(process.env.CLOUDINARY_CONFIG);
const MONGODB = process.env.MONGODB;

export { SECRET_KEY, CLOUDINARY_CONFIG, MONGODB };
