import { Router } from "express";
import * as enquiryController from "../controllers/enquiryController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/enquiries", enquiryController.createEnquiry);
router.get("/admin/enquiries", authenticate, enquiryController.getEnquiries);
router.get("/admin/enquiries/:id", authenticate, enquiryController.getEnquiryById);
router.put("/admin/enquiries/:id/status", authenticate, enquiryController.updateEnquiryStatus);

export default router;
