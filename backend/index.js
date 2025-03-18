import express from "express";
import cors from "cors";
import { MONGODB } from "./config.js";
import http from "http";
import mongoose from "mongoose";
import { RootRouteV1 } from "./routes/index.js";

await mongoose.connect(MONGODB);

const app = express();
const server = http.createServer(app);

app.use(express.json()); // Only used for JSON payloads (not needed for form-data)
app.use(express.urlencoded({ extended: true })); // Same, for urlencoded only
app.use(cors());

app.use("", RootRouteV1);

server.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
