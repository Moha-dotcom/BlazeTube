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
import {fileBaseStorage} from "../filebaseStorage/filebasestorage.js"
import { EventEmitter } from "events";
import e from "express";
import {log, error} from "console"
import path from "path";
import swig from "swig"
import { BucketManager, ObjectManager } from "@filebase/sdk";
const params = { Bucket: "blazetubevideos" };

const objectManager = new ObjectManager(process.env.FILEBASE_ACCESSKEY,  process.env.FILEBASE_SECRETKEY, {
  bucket: "blazetubevideos"
});



const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
});

const upload = multer({ storage: storage });


function loginMiddleware (req, res, next) {
    console.log("Login Middleware in Action")
    next()

}

function userAuthentication (req, res, next) {
    console.log("User Auth  in Action")
    next()

}


router.get('/delete-videos', async(req, res) => {
      const result = await objectManager.delete("blazetubevideos")
  res.status(201).send(result)
})


router.get("/", (req, res) => {
    res.render('dashboard.html')
})

router.get("/videos", [loginMiddleware, userAuthentication], (req, res) => {

  fileBaseStorage.listObjectsV2(params, (err, data) => {
    if (err) {
      logger.error("Error Listing Files", err);
      return res.status(500).send("Error fetching videos");
    } else {
        const videoListWithUrls = data.Contents.map((file) => ({
             name: file.Key.split('/').pop(),
           url: fileBaseStorage.getSignedUrl("getObject", {
        Bucket: params.Bucket,
        Key: file.Key,
        Expires: 60 * 5 // 5 minutes
      }),
             size: file.Size,
            lastModified: file.LastModified
        }))
      logger.info("Files listed successfully", data.Contents);
      return res.json({ videos: videoListWithUrls });
    }
  });

});


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
        const stream = fileBaseStorage.fileBaseStorage.getObject(params).createReadStream();

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