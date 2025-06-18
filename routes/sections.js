import { Router } from "express";
import sectionControllers from "../controllers/sections.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = Router();


// get a section
router.get("/:sectionId", sectionControllers.getSection);

// delete a section
router.delete("/:sectionId",isAuthenticated, sectionControllers.deleteSection);

// update section title, note and content
router.patch("/:sectionId",isAuthenticated, sectionControllers.updateSection);

export default router;
