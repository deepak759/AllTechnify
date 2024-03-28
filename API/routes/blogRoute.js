import express from "express";
import {getBlog,getAllBlogs,getAllMyBlogs,getAllUserBlogs,createBlog,updateBlog,deleteBlog,comment } from '../controllers/blogController.js'
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/getAllBlog", getAllBlogs);
router.get("/getAllUserBlog/:id", getAllUserBlogs);
router.get("/getBlog/:id", getBlog);
router.get("/getAllMyBlog",verifyUser, getAllMyBlogs);
router.post("/createBlog", verifyUser, createBlog);
router.put("/comment/:id", verifyUser, comment);
router.put("/update/:id", verifyUser, updateBlog);
router.delete("/delete/:id", verifyUser, deleteBlog);

export default router;
