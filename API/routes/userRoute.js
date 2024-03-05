import express from "express";
import { getAllUser,createUser,signIn,updateUser,deleteUser,logOutUser } from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/getAllUser", getAllUser);
router.post("/createUser", createUser);
router.post("/signin", signIn);
router.put("/update",verifyUser, updateUser);
router.delete("/delete",verifyUser, deleteUser);
router.put("/logout",verifyUser, logOutUser);


export default router
