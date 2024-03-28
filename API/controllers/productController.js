import Product from "../models/product.js";
import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";

export const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) return next(errorHandler(404, "Products Not Found"));
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getSpecProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(errorHandler(404, "Product Not Found"));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getAllUserProduct = async (req, res, next) => {
  try {
    const products = await Product.find({ userRef: req.params.id });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    const userRef = req.body.userRef;
    const findUser = await User.findById(userRef);
    if (!findUser) return next(errorHandler(404, "user not found"));
    findUser.products=findUser.products+1;
    await findUser.save()
    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!product) return next(errorHandler(404, "Product Not Found"));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
   
    if (!product) return next(errorHandler(404, "Product Not Found"));
    if (product.userRef !== req.user.id)
      return next(errorHandler(400, "You can only delete your own products"));
    const findreluser=await User.findById(product.userRef)
    findreluser.products=findreluser.products-1;
    await findreluser.save();
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product deleted succesfully");
  } catch (error) {
    next(error);
  }
};

export const commentProduct = async (req, res, next) => {
  try {
    const userRef = req.user.id;
    const { content } = req.body;
    const commentingUser = await User.findById(userRef);
    const avatar = commentingUser.avatar;
    const userName = commentingUser.name;
    const product = await Product.findById(req.params.id);
    if (!product) return next(errorHandler(404, "Product Not Found"));
    product.review.push({ content, userName, userRef, avatar });
    const updated = await product.save();
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
export const getAllMyProduct = async (req, res, next) => {
  try {
    const myProducts = await Product.find({ userRef: req.user.id });
    res.status(200).json(myProducts);
  } catch (error) {
    next(error);
  }
};
