import { Router } from "express";
import authRoutes from "./auth.js";
import bookRoutes from "./books.js";
import chapterRoutes from "./chapters.js";
import sectionRoutes from "./sections.js";
import seedModelRoutes from "./seedmodel.js";
import userRoutes from "./users.js";

const router = Router();

//health
router.get("/api/v1/health", (_req, res) => {
  return res.status(200).json({ message: "Success" });
});

// auth
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/auth", authRoutes);

// books
router.use("/api/v1/books", bookRoutes);

// chapters
router.use("/api/v1/chapters", chapterRoutes);

// sections
router.use("/api/v1/sections", sectionRoutes);

// seed
router.use("/api/v1/seed", seedModelRoutes);

//chapters
//sections

export default router;
