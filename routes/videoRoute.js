import express from "express";
import { v4 as uuidv4 } from 'uuid';
import {connectPrep} from "../database/db.js"
const router = express.Router();

const dbConnection = connectPrep()

router.post("/register", verificationMiddleWare,  (req, res) => {
    const user = uuidv4()
    const {username, emailAddress, password} = req.body;
    // Check if Username is available and email exists
    VerifyyUsername_Email();

})


function verificationMiddleWare (req, res, next) {
   const {username, emailAddress, password} = req.body;
    if(checkUsername(username)){
    }
 
}

async function checkUsername(username){
    const res = await dbConnection.query(`SELECT username from USERS WHERE username = ${username}`)
    return res;
}
