import { Router } from "express";
import {createBrand,deleteBrand,getActiveBrands,getAllBrands,getBrandBySlug,updateBrand,} from "../controllers/brandController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/brands", getActiveBrands);
router.get("/brands/:slug", getBrandBySlug);
router.get("/admin/brands", authenticate, getAllBrands);
router.post("/admin/brands", authenticate, createBrand);
router.put("/admin/brands/:id", authenticate, updateBrand);
router.delete("/admin/brands/:id", authenticate, deleteBrand);

export default router;
