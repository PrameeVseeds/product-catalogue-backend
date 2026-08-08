import { Router } from "express";
import {createCategory,deleteCategory,getActiveCategories,
  getAllCategories,getCategoryBySlug,updateCategory,} from "../controllers/categoryController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/categories", getActiveCategories);
router.get("/categories/:slug", getCategoryBySlug);
router.get("/admin/categories", authenticate, getAllCategories);
router.post("/admin/categories", authenticate, createCategory);
router.put("/admin/categories/:id", authenticate, updateCategory);
router.delete("/admin/categories/:id", authenticate, deleteCategory);

export default router;
