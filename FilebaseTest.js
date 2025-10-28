import express from "express";
import loginRoute from "./loginRoute.js";
import dashBoardRoute from "./dashboardRoute.js"
import cookieParser from "cookie-parser";
import { register } from "module";
import registerRoute from "./registerRoute.js"
import path from "path";
import Stream from "stream";
import { Buffer } from "buffer";
import fs, { read, stat } from "fs"
import { v4 as uuidv4 } from 'uuid';
import dbConnect from "../database/db.js"
const connection = await dbConnect();
import fileBaseStorage from "../filebaseStorage/filebasestorage.js"
// const app = express();
// const PORT = 4000;
// app.use(cookieParser());
// // Middleware to parse JSON
// app.use(express.json());



// // Use the router
// app.use("/", registerRoute)
// app.use("/login", loginRoute);
// app.use("/dashboard",  dashBoardRoute)

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// (async () => {
//     const readableStream = fs.createReadStream("/Users/user/Documents/BlazeTube/song.mp4");

//     readableStream.on("data", (chunk) => {
//        console.log(chunk)
//     })


//     // so my idea is i get a video name, video file from Request 
//     // Based on the Video name i generate a text file and store that
//     // 







// ALl i need here the users id, filePath, buck
// Usage
uploadVideo(
  "4659c2c8-df4f-42b0-8680-099c2139ca1f",
  "/Users/user/Documents/BlazeTube/song.mp4",
  "Hassan Adan Samatar"
)


// connection.end()