
import { log } from "console";
import logger  from "../logger.js"
import * as userRepo from "../repositories/userRepo.js"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: `/Users/user/Documents/BlazeTube/.env` });




export  async function registerUser(user) {
  const { emailAddress, password } = user;
  // 1️⃣ Check if email exists
  const existingUser = await userRepo.findUserByEmail(emailAddress);
  if (existingUser) {
    throw new Error("Email already registered");
  }
  // 2️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const userID = uuidv4();
  // 3️⃣ Insert into DB
  await userRepo.insertUser(userID, emailAddress, hashedPassword);

  logger.info(`User registered: ${emailAddress}`);
  return { success: true, message: "User registered successfully" };
}


export async function login(user) {
  const { emailAddress, password } = user;
  // 1️⃣ Find user by email
  const existingUser = await verifyUser(emailAddress);
  // 2️⃣ Compare password
  await comparePassword(password, existingUser);
  // Create JWT
  const token = createJWT(existingUser)
  // 3️⃣ Log and return
  logger.info(`✅ User logged in: ${emailAddress}`);
  return {
    success: true,
    message: "Login successful",
    token, 
    user: { id: existingUser.Id, emailAddress: existingUser.EmailAddress },
  };
}

async function verifyUser(emailAddress) {
    const existingUser = await userRepo.findUserByEmail(emailAddress);
    if (!existingUser) {
        throw new Error("Email not found");
    }
    return existingUser;
}

function createJWT(existingUser) {
    return jwt.sign({ id: existingUser.Id, email: existingUser.EmailAddress },
        process.env.JWT_SECRET, { expiresIn: "1h" }
    );
}

async function comparePassword(password, existingUser) {
    const match = await bcrypt.compare(password, existingUser.PasswordHash);
    if (!match) {
        throw new Error("Incorrect password");
    }
}

export async function logout() {
  // Placeholder for session/token clearing
  logger.info("User logged out");
}