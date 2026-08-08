import { Router } from "express";
import {createSubcategory,deleteSubcategory,getActiveSubcategories,getAllSubcategories,
  getSubcategoryBySlug,updateSubcategory,} from "../controllers/subcategoryController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/subcategories", getActiveSubcategories);
router.get("/subcategories/:slug", getSubcategoryBySlug);
router.get("/admin/subcategories", authenticate, getAllSubcategories);
router.post("/admin/subcategories", authenticate, createSubcategory);
router.put("/admin/subcategories/:id", authenticate, updateSubcategory);
router.delete("/admin/subcategories/:id", authenticate, deleteSubcategory);

export default router;
