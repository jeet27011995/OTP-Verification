import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
//-------------------------------------
import authRouter from "./Routes/routes.js";
import userRouter from "./Routes/userRoutes.js";
//-----------------------------------
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", true);
mongoose.connect(process.env.mongo, () => {
  console.log("connected to backend");
});

app.use("/api", authRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("server running on 8000");
});
