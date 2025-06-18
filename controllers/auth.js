import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import error from "../utils/error.js";
import hashPassword from "../utils/hashPassword.js";

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw error("Email and password is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw error("Invalid password");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return res.status(200).json({ message: "Login successful", data: { id: user.id, name: user.name, email: user.email, token, image: user.image } });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw error("Name ,email , password is required");
    }

    const user = await User.findOne({ email });
    if (user) {
      throw error("Email already exists");
    }

    const hasedPassword = hashPassword(password);
    const newUser = new User({ name, email, password: hasedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

    return res.status(201).json({ message: "User created successfully", data: { id: newUser.id, name: newUser.name, email: newUser.email, token, image: newUser.image } });
  } catch (err) {
    next(err);
  }
};

const google = async (req, res, next) => {
  try {
    const provider = "google";
    const { name, email } = req.body;
    if (!name || !email) {
      throw error("Name and email is required");
    }
    const user = await User.findOne({ email });
    let token;
    // if there is no emailin database create a new user with this email
    if (!user) {
      const createdUser = await User.create({ name, email, provider });
      token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET);
    }
    // else just create a token for the user
    token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    return res.json({ message: "Google login successful", data: { id: user.id, token } });
  } catch (error) {
    next(error);
  }
};

export default { login, register, google };
