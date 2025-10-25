import express from "express";
import userRouter from "../routes/userRoute.js";
import videoRepo from "../routes/videoRoute.js"
import cookieParser from "cookie-parser";
import { register } from "module";
import registerRoute from "./registerRoute.js"

const app = express();
const PORT = 4000;
app.use(cookieParser());
// Middleware to parse JSON
app.use(express.json());



// Use the router
app.use("/", registerRoute)
app.use("/login", userRouter);
app.use("/video",  videoRepo)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});