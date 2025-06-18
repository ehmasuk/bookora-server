import { Router } from "express";
import userControllers from "../controllers/users.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();

// get all users
router.get("/", userControllers.getUsers);

// get user by userId
router.get("/:userId", isAuthenticated, userControllers.getUser);

// get books of a user
router.get("/:userId/books", isAuthenticated, userControllers.getUsersAllBooks);

// update user name and profile image
router.patch("/:userId", isAuthenticated, userControllers.updateUser);

// update user name and profile image
router.patch("/:userId/password", isAuthenticated, userControllers.updateUserPassword);

export default router;
