import express from "express";
import * as userService from "../services/userService.js"; // ✅ use * as
import { authenticateToken } from "../ middleware/authMiddleware.js"
import logger from "../logger.js"
const router = express.Router();
import multer from "multer";
import fs from "fs"
import videoService from "../services/videoService.js"
import { get } from "http";
import { connect } from "http2";
import videoRepo from "../repositories/videoRepo.js";

import s3 from "../filebaseStorage/filebasestorage.js"

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
});

const upload = multer({ storage: storage });


router.get("/videos", (req, res) => {
     logger.info("Listing all video Files.....")
    res.send("Get List of All Videos")
})


router.get("/video/:userId/:videoId", async( req, res) => {
    const {userId, videoId} = req.params
     if (!userId || !videoId) {
      return res.status(400).json({ message: "Missing userId or videoId" });
    }

    try {
        const data = await videoRepo.getVideoMetadata(userId, videoId)
        console.log(data)
        if(!data) {
            logger.info("Video Not Found")
            res.status(404).send("Video not Found")
        }

        const {video_key, mime_type} = data;
        // 2️⃣ Stream video directly from Filebase
        const params = { Bucket: "blazetubevideos", Key: video_key };
        const stream = s3.fileBaseStorage.getObject(params).createReadStream();

         res.setHeader("Content-Type", mime_type);
        stream.pipe(res);
        stream.on("error", (err) => {
            console.error("S3 stream error:", err);
             res.sendStatus(500);
         });

    }catch(err){
        console.error(err);
        res.sendStatus(500);
    }

    
})

router.post("/upload-video", upload.single("videoPath"), async (req, res) => {
    logger.info("Uploading video File.....")
    if(!req.body) res.send("No returned Body")
    const {userid } = req.body;
    const file = req.file
    if(!file) res.status(400).send("No file to Upload")

    try { 
        const video_url = await videoService.uploadVideo(userid, file )
        res.json({video_url})
    }catch(err){
        res.status(500).send("Uploading Failed")
        console.log(err)
    }
})

router.post("/download", () => {
     logger.info("Downloading video File.....")
    res.send("Downloading Video with id : 2")
})

export default router;