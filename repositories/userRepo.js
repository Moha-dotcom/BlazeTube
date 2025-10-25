
import logger from "../logger.js"
import dbConnect from "../database/db.js"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt"

const connection = await dbConnect();
export async function insertUser(userID, emailAddress, hashedPassword) {
  try {
    await connection.query(
      "INSERT INTO user (Id, EmailAddress, PasswordHash) VALUES (?, ?, ?)",
      [userID, emailAddress, hashedPassword]
    );
    logger.info("✅ Successfully inserted user into DB");
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      throw new Error("Duplicate entry: email already exists");
    }
    throw err;
  }
}



export async function findUserByEmail(emailAddress) {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM user WHERE EmailAddress = ?",
      [emailAddress]
    );
    return rows[0] || null;
  } catch (err) {
    logger.error(err.message);
    throw err;
  }
}
