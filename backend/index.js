import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });
mongoose.connect(process.env.MONGODB);

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

server.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
