import { Router } from "express";
import chapterControllers from "../controllers/chapters.js";
import sectionControllers from "../controllers/sections.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();


// delete a chapter 
router.delete("/:chapterId",isAuthenticated, chapterControllers.deleteChapter);

// Update chapter title and chapterNumber
router.patch("/:chapterId",isAuthenticated, chapterControllers.updateChapter);

// create a new section
router.post("/:chapterId/sections",isAuthenticated, sectionControllers.createSection);

//get all sections of a chapter
router.get("/:chapterId/sections", sectionControllers.getSectionsByChapterId);

// sort sections
router.post("/:chapterId/sections/sort",isAuthenticated, sectionControllers.sortSections);




export default router;
