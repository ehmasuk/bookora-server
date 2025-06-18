// USE CASE: check if user is authenticated

import jwt from "jsonwebtoken";
import error from "../utils/error.js";

const isAuthenticated = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw error("No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    next(err);
  }
};

export default isAuthenticated;
