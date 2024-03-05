import Blog from "../models/blog.js";
import User from "../models/user.js";
export const getBlog = async (req, res, next) => {
  try {
    const blogs = await Blog.findById(req.params.id);
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};
export const getAllMyBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ userRef: req.user.id });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};
export const getAllUserBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ userRef: req.params.id });
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};
export const createBlog = async (req, res, next) => {
  const newBlog = new Blog(req.body);
  try {
    const blog = await newBlog.save();
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};
export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};
export const deleteBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json("Post deleted Succesfully");
  } catch (error) {
    next(error);
  }
};

export const comment = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const userName = user.name;
    const content = req.body.content;
    const id = req.params.id;
    const post = await Blog.findById(id);
    post.comments.push({ userName, content });
    await post.save();

    res.json(post);
  } catch (error) {
    next(error);
  }
};
