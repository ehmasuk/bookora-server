import { Router } from "express";
import authControllers from "../controllers/auth.js";

const router = Router();

router.post("/login", authControllers.login);
router.post("/register", authControllers.register);
router.post("/google", authControllers.google);

export default router;
