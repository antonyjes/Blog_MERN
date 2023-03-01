import express from 'express';
import {commentPost, deletePost, getFavoritesPosts, getFeedPosts, getImpressions, getPost, getUserPosts, likePost} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:id", verifyToken, getPost);
router.get("/:userId/favorites", verifyToken, getFavoritesPosts);
router.get("/:userId/impressions", verifyToken, getImpressions);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);

//DELETE
router.delete("/:postId/delete", verifyToken, deletePost);

export default router;