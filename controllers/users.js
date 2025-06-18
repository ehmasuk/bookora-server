import bcrypt from "bcryptjs";
import Book from "../models/Book.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";
import error from "../utils/error.js";
import hashPassword from "../utils/hashPassword.js";

// get all users
const getUsers = async (_req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Successfully fetched all users", data: users });
  } catch (err) {
    next(err);
  }
};

// get user by userId
const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return res.status(200).json({ message: "Successfully fetched user", data: user });
  } catch (err) {
    next(err);
  }
};

// get books of a user
const getUsersAllBooks = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const books = await Book.find({ author: userId });
    return res.status(200).json({ message: "Successfully fetched books", data: books });
  } catch (err) {
    next(err);
  }
};

// update user name and profile image
const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, image } = req.body;
    const updateData = {};

    if (image) {
      try {
        const uploadedImage = await cloudinary.uploader.upload(image, {
          folder: "bookora",
        });

        updateData.image = uploadedImage.secure_url;
      } catch (error) {
        return res.status(400).json({ message: "Cannot upload image to cloudinary" });
      }
    }

    if (name !== undefined) updateData.name = name;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw error("User not found", 404);
    }
    return res.status(200).json({ message: "User updated successfully", data: updateData });
  } catch (err) {
    next(err);
  }
};

// update user password
const updateUserPassword = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      throw error("Old password and new password are required");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      throw error("Invalid old password");
    }

    const hasedPassword = hashPassword(newPassword);

    user.password = hasedPassword;
    await user.save();

    return res.status(200).json({ message: "User password updated successfully" });
  } catch (err) {
    next(err);
  }
};

export default { getUsers, getUser, getUsersAllBooks, updateUser, updateUserPassword };
