import { Router } from "express";
import {deleteImage,uploadDatasheet,uploadImage,uploadImages,uploadSpecificationPdf,} from "../controllers/uploadController.js";
import { authenticate } from "../middleware/authenticate.js";
import {getUploadErrorMessage,uploadMultipleImages,uploadSingleImage,} from "../middleware/uploadImage.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import {getDatasheetUploadErrorMessage,uploadSingleDatasheet,} from "../middleware/uploadDatasheet.js";
import { uploadSingleSpecificationPdf } from "../middleware/uploadDatasheet.js";
import { MAX_DATASHEET_SIZE_IN_BYTES } from "../middleware/uploadDatasheet.js";
import { UploadValidationError } from "../services/uploadService.js";

const router = Router();
const MAX_MULTIPART_OVERHEAD_IN_BYTES = 64 * 1024;

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
  (req, _res, next) => {
    console.log("Datasheet upload request started.");
    req.once("aborted", () => {
      console.warn("Datasheet upload request aborted by client.");
    });
    next();
  },
  authenticate,
  (_req, _res, next) => {
    console.log("Datasheet authentication completed.");
    next();
  },
  (req, res, next) => {
    const contentLength = Number(req.headers["content-length"]);

    // Reject before reading a large request body. Multer still enforces the exact
    // file limit when Content-Length is absent or includes multipart overhead.
    if (
      Number.isFinite(contentLength) &&
      contentLength > MAX_DATASHEET_SIZE_IN_BYTES + MAX_MULTIPART_OVERHEAD_IN_BYTES
    ) {
      res.status(413).json({
        success: false,
        message: "Datasheet PDF must be 10 MB or smaller.",
      });
      return;
    }

    next();
  },
  (req, res, next) => {
    uploadSingleDatasheet(req, res, (error: unknown) => {
      if (!error) {
        console.log("Datasheet file received.");
        next();
        return;
      }
      const message = getDatasheetUploadErrorMessage(error);
      if (message) {
        const statusCode =
          error instanceof Error && "code" in error && error.code === "LIMIT_FILE_SIZE"
            ? 413
            : error instanceof UploadValidationError
              ? 415
              : 400;
        res.status(statusCode).json({ success: false, message });
        return;
      }
      console.error("Datasheet upload storage failed:", error);
      res.status(500).json({
        success: false,
        message: "Failed to store datasheet PDF.",
      });
    });
  },
  uploadDatasheet,
);

router.post(
  "/admin/uploads/specification-pdf",
  authenticate,
  (req, res, next) => {
    uploadSingleSpecificationPdf(req, res, (error: unknown) => {
      if (!error) 
        return next();
      const message = getDatasheetUploadErrorMessage(error);
      res.status(error instanceof Error && "code" in error && error.code === "LIMIT_FILE_SIZE" ? 413 : 400)
        .json({ success: false, message: message ?? "Failed to upload specification PDF." });
    });
  },
  uploadSpecificationPdf,
);

export default router;
