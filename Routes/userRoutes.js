import express from "express";
import {
  deleteUser,
  forgetPassword,
  getUser,
  updateUser,
  verifyOtp,
} from "../controllers/userController.js";

const router = express.Router();

//update user-----------------------------
router.put("/:id", updateUser);
//Get User ---------------------------
router.get("/", getUser);
//delete user
router.delete("/:id", deleteUser);
//forget password
router.post("/forgetpassword", forgetPassword);
router.post("/verify", verifyOtp);

export default router;
