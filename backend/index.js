import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";


dotenv.config({path: ".env.local"});

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello from the server")
} )

server.listen(process.env.PORT, ()=> {
  console.log(`Server is running at port ${process.env.PORT}`)
})


console.log(process.env.API_KEY)