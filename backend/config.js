import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const AT_SECRET_KEY = process.env.AT_SECRET_KEY;
const RT_SECRET_KEY = process.env.RT_SECRET_KEY;
const CLOUDINARY_CONFIG = JSON.parse(process.env.CLOUDINARY_CONFIG);
const MONGODB = process.env.MONGODB;

export { AT_SECRET_KEY, RT_SECRET_KEY, CLOUDINARY_CONFIG, MONGODB };
