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

    if (!isValidUser) return next(errorHandler(404, "user not found"));
    const isValidPassword = bcrypt.compareSync(password, isValidUser.password);
    if (!isValidPassword) return next(errorHandler(401, "wrong credentials"));
    const { password: pass, ...rest } = isValidUser._doc;
    const token = jwt.sign({ id: isValidUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 99999999999),
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
  const id=req.params.id;
  const user=await User.findById(id)
  res.status(200).json(user)
  } catch (error) {
    next(error);
  }
};

// export const signIn = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const isValidUser = await User.findOne({ email });

//     if (!isValidUser) return next(errorHandler(404,'user not found'))
//     const isValidPassword = bcrypt.compareSync(password, isValidUser.password);
//     if (!isValidPassword)
//       return  next(errorHandler(401, "wrong credentials"));
//     const { password: pass, ...rest } = isValidUser._doc;
//     const token = jwt.sign({ id: isValidUser._id }, process.env.JWT_SECRET);

//     // Set cookie expiration to a far future date
//     const cookieOptions = {
//       httpOnly: true,
//       expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
//     };

//     res
//       .cookie("access_token", token, cookieOptions)
//       .status(200)
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

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




export const toggleFollow = async (req, res, next) => {
  try {
    const followerID = req.params.id;
    const followingID = req.user.id;

    // Check if the follower is already following the user
    const myInfo = await User.findById(followingID);
    const followUser = await User.findById(followerID);

    const isFollowing = myInfo.followings.includes(followerID);
    if (isFollowing) {
      // Unfollow the user
      const followerIndex = myInfo.followings.indexOf(followerID);
      const followingIndex = followUser.followers.indexOf(followingID);

      myInfo.followings.splice(followerIndex, 1);
      followUser.followers.splice(followingIndex, 1);

      await Promise.all([myInfo.save(), followUser.save()]);
      res.status(200).json("You unfollowed successfully");
    } else {
      // Follow the user
      myInfo.followings.push(followerID);
      followUser.followers.push(followingID);

      await Promise.all([myInfo.save(), followUser.save()]);
      res.status(200).json("You followed successfully");
    }
  } catch (error) {
    next(error);
  }
};
