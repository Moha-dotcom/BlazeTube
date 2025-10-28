import express from "express";
import { v4 as uuidv4 } from 'uuid';
import * as userService from "../services/userService.js"; // ✅ use * as
import logger from "../logger.js"
import { authenticateToken } from "../ middleware/authMiddleware.js"
const router = express.Router();





router.post("/", async (req, res) => {
  try {
    const result = await userService.login(req.body);
    console.log(result.token)
    logger.info(`✅ User logged in: ${req.body.emailAddress}`);
    console.log(result)
    res.cookie("token", result.token, { httpOnly: true, secure: true })
    res.redirect("http://localhost:4000/login/profile")

  } catch (err) {
    logger.error(`❌ Login failed: ${err.message}`);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});




export default router
