import { Router } from "express";
import { getProductDatasheet } from "../controllers/datasheetController.js";

const router = Router();

router.get("/products/:slug/datasheet", getProductDatasheet);

export default router;
