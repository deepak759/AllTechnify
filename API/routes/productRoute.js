import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {getAllProduct,getSpecProduct,createProduct,updateProduct,deleteProduct,commentProduct,getAllMyProduct} from '../controllers/productController.js'
const router = express.Router();

router.get("/getAllProduct", getAllProduct);
router.get("/getSpecProduct/:id", getSpecProduct);
router.get("/getAllMyProduct/",verifyUser, getAllMyProduct);
router.post("/createProduct", verifyUser, createProduct);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", verifyUser, deleteProduct);
router.put("/commentProduct/:id", verifyUser, commentProduct);

export default router;
