import express from "express";
import {searchHandler,buyHandler} from "../controllers/searchController.js";
import Stripe from "stripe";



const stri=new Stripe(process.env.STRIPE_SECRET_KEY)

const router = express.Router();
router.get("/", searchHandler);
router.post('/buy',buyHandler)


export default router;
