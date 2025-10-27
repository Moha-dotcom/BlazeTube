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
import storage from "../filebaseStorage/filebasestorage.js"

const app = express();
const PORT = 4000;
app.use(cookieParser());
// Middleware to parse JSON
app.use(express.json());



// Use the router
app.use("/", registerRoute)
app.use("/login", loginRoute);
app.use("/dashboard",  dashBoardRoute)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


