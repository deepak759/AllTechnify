import Blog from "../models/blog.js";
import Product from "../models/product.js";
import User from "../models/user.js";

const searchHandler = async (req, res, next) => {
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

export default searchHandler;
