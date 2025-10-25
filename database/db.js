import dotenv from "dotenv";
import mysql from "mysql2/promise";
import path from "path";

dotenv.config({ path: `/Users/user/Documents/BlazeTube/.env` });
console.log("User:", process.env.DB_USER);

export default async function connectPrep() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME, 
    });


    // const res = await connection.query(`SELECT * FROM USERS`)
    // console.log(res[0])
    console.log("✅ Connected to MySQL!");
    return connection;
  } catch (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
}

const req = await connectPrep()
const res = await req.query(`SELECT * FROM USERS`);
console.log(res[0])
