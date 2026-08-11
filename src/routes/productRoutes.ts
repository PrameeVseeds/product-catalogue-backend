import { Router } from "express";
import {createProduct,deleteProduct,getActiveProducts,getAllProducts,getProductBySlug,updateProduct,} from "../controllers/productController.js";
import {createProductFeature,createProductImage,createProductSpecification,
  deleteProductFeature,deleteProductImage,deleteProductSpecification,updateProductFeature,
  updateProductImage,updateProductSpecification,} from "../controllers/productAssetController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/products", getActiveProducts);
router.get("/products/:slug", getProductBySlug);
router.get("/admin/products", authenticate, getAllProducts);
router.post("/admin/products", authenticate, createProduct);
router.put("/admin/products/:id", authenticate, updateProduct);
router.delete("/admin/products/:id", authenticate, deleteProduct);

router.post("/admin/product-images", authenticate, createProductImage);
router.put("/admin/product-images/:id", authenticate, updateProductImage);
router.delete("/admin/product-images/:id", authenticate, deleteProductImage);

router.post("/admin/product-features", authenticate, createProductFeature);
router.put("/admin/product-features/:id", authenticate, updateProductFeature);
router.delete("/admin/product-features/:id",authenticate,deleteProductFeature);

router.post("/admin/product-specifications",authenticate,createProductSpecification);
router.put("/admin/product-specifications/:id",authenticate,updateProductSpecification);
router.delete("/admin/product-specifications/:id",authenticate,deleteProductSpecification);

export default router;
