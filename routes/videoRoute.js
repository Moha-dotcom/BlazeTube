import express from "express";
import * as userService from "../services/userService.js"; // ✅ use * as
import { authenticateToken } from "../ middleware/authMiddleware.js";
import logger from "../logger.js"
const router = express.Router();


router.get('/profile', authenticateToken, async (req, res) => {
  // req.user is now available from token
  res.json({ success: true, user: req.user });
});
export default router;