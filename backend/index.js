import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import { RootRouteV1 } from "./routes/index.js";

dotenv.config({ path: ".env.local" });
await mongoose.connect(process.env.MONGODB);

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.use("", RootRouteV1);

server.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
