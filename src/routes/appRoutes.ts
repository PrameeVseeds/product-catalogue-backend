import { Router, type Request, type Response } from "express";
import authRoutes from "./authRoutes.js";
import settingsRoutes from "./settingsRoutes.js";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API routes are working",
  });
});

router.use("/auth", authRoutes);
router.use(settingsRoutes);

export default router;
