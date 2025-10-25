import dotenv from "dotenv";
import jwt from "jsonwebtoken";

 dotenv.config({ path: `/Users/user/Documents/BlazeTube/.env` });


export function authenticateToken(req, res, next){
   
     const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] || req.cookies?.token;
if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token missing",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token invalid or expired",
      });
    }

    req.user = user; // ✅ attach user info to request
    next(); // ✅ continue to route handler
  });
}