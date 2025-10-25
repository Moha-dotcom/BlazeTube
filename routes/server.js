import express from "express";
import userRouter from "./routes/userRouter.js";
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());



// Use the router
app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});