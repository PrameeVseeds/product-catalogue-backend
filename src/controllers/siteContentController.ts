import type { Request, Response } from "express";
import { getSiteContent as getSiteContentService } from "../services/siteContentService.js";
import {sendSuccess,sendUnexpectedError,} from "../utils/controllerUtils.js";

export const getSiteContent = async (_req: Request,res: Response): Promise<void> => {
  try {
    sendSuccess(res,200,"Site content retrieved successfully.",
      await getSiteContentService()
    );
  } catch (error) {
    sendUnexpectedError(res, "Failed to retrieve site content:", error);
  }
};
