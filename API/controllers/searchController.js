import Blog from "../models/blog.js";
import Product from "../models/product.js";
import User from "../models/user.js";



export const searchHandler = async (req, res, next) => {
  const searchTerm = req.query.searchTerm || "rj suio";
  const sort = req.query.sort || "createdAt";
  try {
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { desc: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort({ [sort]: "desc" });
    const products = await Product.find({
      $or: [
        { productName: { $regex: searchTerm, $options: "i" } },
        { desc: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort({ [sort]: "desc" });
    const users = await User.find({
      name: { $regex: searchTerm, $options: "i" },
    }).sort({ [sort]: "desc" });
    res.status(200).json({ data: [blogs, products, users] });
  } catch (error) {
    next(error);
  }
};

import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OsnSiSCYJhYhwAnTIAsJAZw0BWBoPEHyXpIe1jWRiMPuxkcYNt9aU93X79pbdwC9pOcGmxvKkbJkRZP0xaRm3Uk00yGyka0Tr');

export const buyHandler = async (req, res, next) => {
  const product = req.body.products;
  const items = product.map((pro) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: pro.productName,
      images:[pro.imageURLs[0]]
      },
      unit_amount: pro.price,
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items,
    mode: 'payment',
    success_url: "http://localhost:5173/",
    cancel_url: "http://localhost:5173/",
  });

  res.json( session);
};
