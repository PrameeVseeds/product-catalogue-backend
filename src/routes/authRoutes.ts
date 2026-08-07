import { Router } from "express";
import { getAdminTest, login } from "../controllers/authController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/login", login);
router.get("/admin-test", authenticate, getAdminTest);

export default router;
