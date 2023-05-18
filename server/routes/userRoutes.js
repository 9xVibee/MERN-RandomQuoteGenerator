import express from "express";
import {
  SingIn,
  getMyProfile,
  logout,
  signUp,
} from "../controllers/userController.js";

const router = express.Router();

// sign up
router.post("/signup", signUp);

// sign in
router.post("/signin", SingIn);

// get my profile
router.get("/me", getMyProfile);

// logout
router.get("/logout", logout);
export default router;
