import { Router, type Request, type Response } from "express";
import authRoutes from "./authRoutes.js";
import brandRoutes from "./brandRoutes.js";
import categoryBrandRoutes from "./categoryBrandRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";
import settingsRoutes from "./settingsRoutes.js";
import subcategoryRoutes from "./subcategoryRoutes.js";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API routes are working",
  });
});

router.use("/auth", authRoutes);
router.use(settingsRoutes);
router.use(categoryRoutes);
router.use(brandRoutes);
router.use(categoryBrandRoutes);
router.use(subcategoryRoutes);
router.use(productRoutes);

export default router;
