import seedModel from "../controllers/seedModel.js";

import { Router } from "express";

const router = Router();

router.get("/books", seedModel.seedBooks);
router.get("/chapters", seedModel.seedChapters);
router.get("/sections", seedModel.seedSections);
router.get("/users", seedModel.seedUsers);

export default router;
