import AWS from "aws-sdk";
import dotenv from "dotenv";

// Replace with your Filebase credentials
dotenv.config({ path: `/Users/user/Documents/BlazeTube/.env` });
console.log(process.env.FILEBASE_ACCESSKEY)
const s3 = new AWS.S3({
  endpoint: "https://s3.filebase.com",  // Filebase endpoint
  accessKeyId: process.env.FILEBASE_ACCESSKEY,
  secretAccessKey: process.env.FILEBASE_SECRETKEY,
  signatureVersion: "v4",
});