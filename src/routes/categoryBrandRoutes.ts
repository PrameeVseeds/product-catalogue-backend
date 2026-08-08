import { Router } from "express";
import {createCategoryBrand,deleteCategoryBrand,getAllCategoryBrands,
  getBrandsByCategorySlug,updateCategoryBrand,} from "../controllers/categoryBrandController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/categories/:slug/brands", getBrandsByCategorySlug);
router.get("/admin/category-brands", authenticate, getAllCategoryBrands);
router.post("/admin/category-brands", authenticate, createCategoryBrand);
router.put("/admin/category-brands/:id", authenticate, updateCategoryBrand);
router.delete("/admin/category-brands/:id", authenticate, deleteCategoryBrand);

export default router;
