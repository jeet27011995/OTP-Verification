import express from "express";
import { Login, Register } from "../controllers/Auth.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Working");
});

router.post("/register", Register);
router.post("/login", Login);

export default router;
