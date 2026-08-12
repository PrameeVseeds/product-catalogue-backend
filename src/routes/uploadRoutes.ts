import { Router } from "express";
import {deleteImage,uploadDatasheet,uploadImage,uploadImages,} from "../controllers/uploadController.js";
import { authenticate } from "../middleware/authenticate.js";
import {getUploadErrorMessage,uploadMultipleImages,uploadSingleImage,} from "../middleware/uploadImage.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import {getDatasheetUploadErrorMessage,uploadSingleDatasheet,} from "../middleware/uploadDatasheet.js";

const router = Router();

const handleUpload =
  (uploadMiddleware: typeof uploadSingleImage) =>
  (req: Parameters<typeof uploadMiddleware>[0], res: Parameters<typeof uploadMiddleware>[1], next: Parameters<typeof uploadMiddleware>[2]): void => {
    uploadMiddleware(req, res, (error: unknown) => {
      if (!error) {
        next();
        return;
      }

      const message = getUploadErrorMessage(error);

      if (message) {
        sendBadRequest(res, message);
        return;
      }

      next(error);
    });
  };

router.post(
  "/admin/uploads/image",
  authenticate,
  handleUpload(uploadSingleImage),
  uploadImage
);
router.post(
  "/admin/uploads/images",
  authenticate,
  handleUpload(uploadMultipleImages),
  uploadImages
);
router.delete("/admin/uploads/image", authenticate, deleteImage);
router.post(
  "/admin/uploads/datasheet",
  authenticate,
  (req, res, next) => {
    uploadSingleDatasheet(req, res, (error: unknown) => {
      if (!error) {
        next();
        return;
      }
      const message = getDatasheetUploadErrorMessage(error);
      if (message) {
        sendBadRequest(res, message);
        return;
      }
      next(error);
    });
  },
  uploadDatasheet,
);

export default router;
