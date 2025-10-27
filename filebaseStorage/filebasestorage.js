// })()
import AWS from "aws-sdk";
import dotenv from "dotenv";

// Load env variables
dotenv.config({ path: `/Users/user/Documents/BlazeTube/.env` });
console.log(process.env.FILEBASE_ACCESSKEY)
const fileBaseStorage = new AWS.S3({
  endpoint: "https://s3.filebase.com",  // Filebase endpoint
  accessKeyId: process.env.FILEBASE_ACCESSKEY,
  secretAccessKey: process.env.FILEBASE_SECRETKEY,
  signatureVersion: "v4",
});


export default {fileBaseStorage};