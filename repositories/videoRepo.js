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
import fileBaseStorage from "../filebaseStorage/filebasestorage.js"
import logger from "../logger.js";




async function storeVideo(videoPath, userId, uniqueKey, result, videoName) {
  
  try {
     const video_id = uuidv4()
  const query = `
      INSERT INTO videos (id, user_id, video_name, video_key, video_url, size, mime_type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  const stats = fs.statSync(videoPath); // get file size
  await connection.execute(query, [
    video_id,
    userId,
    videoName,
    uniqueKey,
    result.Location,
    stats.size,
    "video/mp4",
  ]);

  console.log("✅ Video metadata saved in DB!");
  }catch(err){
    console.log(err.sqlMessage)
  }
}



async function getVideoMetadata(userId, videoId) {
    try{
        const [rows] = await connection.execute(
             "SELECT video_key, mime_type FROM videos WHERE user_id = ? AND id = ?",
            [userId, videoId]
        )


        return rows[0];
    }catch(err){
        logger.error(err)

    }
    
}

export default {storeVideo, getVideoMetadata}