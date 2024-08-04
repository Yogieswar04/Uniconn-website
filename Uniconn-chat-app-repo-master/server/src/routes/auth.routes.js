import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/verifyJwt.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", verifyToken, logoutUser);

// Add this route to check authentication status
router.get("/check", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
