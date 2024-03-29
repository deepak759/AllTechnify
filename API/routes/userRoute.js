import express from "express";
import { getAllUser,createUser,signIn,updateUser,deleteUser,toggleFollow,logOutUser,getUser } from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/getAllUser", getAllUser);
router.get("/getUser/:id", getUser);
router.post("/createUser", createUser);
router.post("/signin", signIn);
router.put("/update",verifyUser, updateUser);
router.delete("/delete",verifyUser, deleteUser);
router.get("/logout",verifyUser, logOutUser);

router.get("/toggleFollow/:id",verifyUser,toggleFollow)

export default router
