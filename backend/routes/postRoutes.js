import express from "express";
import {
  createPost,
  getFeed,
  likePost,
  commentOnPost,
} from "../controllers/postController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public feed
router.get("/", getFeed);

// Protected actions
router.post("/", protect, createPost);
router.post("/:id/like", protect, likePost);
router.post("/:id/comment", protect, commentOnPost);

export default router;
