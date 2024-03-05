import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    const user = await newUser.save();
    const { password: pass, ...rest } = user._doc;
    res.json(rest);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const isValidUser = await User.findOne({ email });

    if (!isValidUser) return res.json("User Not Found");
    const isValidPassword = bcrypt.compareSync(password, isValidUser.password);
    if (!isValidPassword)
      return res.json("Either email or password is incorrect");
    const { password: pass, ...rest } = isValidUser._doc;
    const token = jwt.sign({ id: isValidUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...req.body,
      },
      { new: true }
    );
    const { password: pass, ...rest } = updateUser._doc;
    res.json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    res
      .clearCookie("access_token")
      .status(200)
      .json("user deleted successfully");
  } catch (error) {
    next(error);
  }
};
export const logOutUser = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("user has been logout");
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};