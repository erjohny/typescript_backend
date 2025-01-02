import { Router } from "express";
import { addPost, getAllPost, getSinglePost, editPost, removePost } from "../controllers/postController";
import { authenticate } from "../middleware/authMiddleware";
import { createPostValidations, updatePostValidations } from "../utils/validations";

const router = Router();

router.post("/", authenticate, createPostValidations, addPost);
router.get("/", getAllPost)
router.get("/:id", getSinglePost)
router.put("/:id", authenticate, updatePostValidations, editPost)
router.delete("/:id", authenticate, removePost)

export default router;