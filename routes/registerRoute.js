import express from "express";
import { v4 as uuidv4 } from 'uuid';
import * as userService from "../services/userService.js"; // ✅ use * as
import logger from "../logger.js"
import { authenticateToken } from "../ middleware/authMiddleware.js"
const router = express.Router();

router.post("/register",  async (req, res) => {
    try {
        const result = await userService.registerUser(req.body)
        logger.info(`✅ User registered: ${req.body.emailAddress}`);
        res.status(201).json({
            success : true,
            message : result.message || "User registered successsFully"
        })

    }catch(err){
        logger.error(`❌ Registration failed: ${err.message}`);
        res.status(400).json({
            success: false,
            message : err.message
        })
    }
})

export default router