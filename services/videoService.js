import express from "express";

import cookieParser from "cookie-parser";
import { register } from "module";

import path from "path";
import Stream from "stream";
import { Buffer } from "buffer";
import fs, { read, stat } from "fs"
import { v4 as uuidv4 } from 'uuid';
import dbConnect from "../database/db.js"
const connection = await dbConnect();
import storage from "../filebaseStorage/filebasestorage.js"
import videoRepo from "../repositories/videoRepo.js"
import dotenv from "dotenv";
import logger from "../logger.js";


dotenv.config({ path: `/Users/user/Documents/BlazeTube/.env` });
logger.info(process.env.S3_BUCKETNAME)
async function uploadVideo(userId, file) {
    logger.info("Uploading Video to S3 Bucket")
    const bucketname = process.env.S3_BUCKETNAME
  const uniqueKey = `${userId}/${uuidv4()}_${file.originalname.replace(/\s+/g, "_")}.mp4`;
  const fileStream = fs.createReadStream(file.path);

  logger.info(bucketname)


  const params = {
    Bucket: bucketname,
    Key: uniqueKey,
    Body: fileStream,
    ContentType: file.mimetype
  };

  try {
    const result = await storage.fileBaseStorage.upload(params).promise();
    logger.info("✅ Video uploaded to S3 Bucket successfully successfully:", result.Location);
    // Store MetaData in MYSQL
     await videoRepo.storeVideo(file.path, userId, uniqueKey, result, file.originalname);
      logger.info("Storing Video File to the Database....")
     // Delete tempFile file after Upload

     fs.unlink(file.path, (err) => {
        if(err) logger.error("Error deleting temp file:", err);
     })
    return result.Location;
  } catch (err) {
    logger.error("Error uploading video:", err);
  }
}

export default {uploadVideo};