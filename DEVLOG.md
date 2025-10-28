# 🗓️ October 25, 2025

**Today's Progress:**
- Implemented JWT-based authentication system.
- Created `authenticateToken` middleware to protect routes.
- Tested login, register, and profile routes using Postman.

**Next Steps:**
- Add token expiration and refresh mechanism.
- Secure JWT secret with environment management (`dotenv` → production).

---

# 🗓️ October 27, 2025 – Video Upload System

## Tasks Completed

1. **Investigated and Chose Video Storage Approach**
   - Attempted storing videos directly in MySQL → caused memory/performance issues.
   - Tried writing temp `.txt` files → inefficient and unnecessary.
   - Decided on **Filebase (S3-compatible cloud storage)** for scalable and efficient video storage.

2. **Implemented File Upload via Multer**
   - Set up `upload.single("videoPath")` for receiving files from Postman/form-data requests.
   - Captured video metadata from `req.file` (original name, MIME type, size, temp path).

3. **Streamed Videos to Filebase**
   - Generated unique storage keys using `UUID + original filename` to handle duplicates.
   - Streamed files directly from Multer’s temp storage to Filebase **without loading the entire file into memory**.
   - Configured S3 client (`AWS.S3`) with correct `.env` credentials and bucket name.
   - Verified upload success with Filebase returning the video URL.

4. **Saved Metadata in MySQL**
   - Stored only essential information: `video_name`, `user_id`, `video_key`, `video_url`, `size`, `mime_type`.
   - Ensured large video files are **not stored in the database**, keeping operations lightweight.

5. **Key Fixes & Lessons Learned**
   - Fixed `MissingRequiredParameter: Bucket` error by using string bucket name from `.env`.
   - Properly exported `fileBaseStorage` client to avoid undefined references.
   - Ensured temporary files are deleted after successful upload.
   - Prepared system to handle duplicate filenames safely via unique keys.

## Results / Logs

```text
[2025-10-27 13:45:06.556 -0500] INFO: blazetubevideos
[2025-10-27 13:45:48.648 -0500] INFO: blazetubevideos
✅ Video uploaded successfully: https://blazetubevideos.s3.filebase.com/edaad225-72a3-46ca-9be5-6fd3dbab5212/4a2ca00c-e90d-4560-8d2b-9424391df523_Hibo_Maxamed_(Hibo-Nuura)_|_Heesta_Maxaa_luray_naftaadi?_|_With_Lyrics.mp4.mp4
✅ Video metadata saved in DB!
Video URL returned: https://blazetubevideos.s3.filebase.com/edaad225-72a3-46ca-9be5-6fd3dbab5212/4a2ca00c-e90d-4560-8d2b-9424391df523_Hibo_Maxamed_(Hibo-Nuura)_|_Heesta_Maxaa_luray_naftaadi?_|_With_Lyrics.mp4.mp4






 Fix Issues : 
 - Currently we are not deleteing Files on Uploads. So we have to fix that- in a way when we upload the file to S3 Bucket. We can go ahead and Delete from the File Directory.