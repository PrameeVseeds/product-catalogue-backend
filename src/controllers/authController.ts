import type { Request, Response } from "express";
import type { AuthenticationRequest } from "../middleware/authenticate.js";
import { loginAdmin } from "../services/authService.js";
import { sendBadRequest } from "../utils/responseHelper.js";
import { validateLogin } from "../validators/authValidator.js";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateLogin(req.body as Record<string, unknown>);

    if (!validation.isValid) {
      sendBadRequest(res, validation.message);
      return;
    }

    const result = await loginAdmin(validation.data);

    if (!result) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "ADMIN_INACTIVE") {
      res.status(403).json({
        success: false,
        message: "Admin account is inactive.",
      });
      return;
    }

    console.error("Admin login failed:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getAdminTest = (req: AuthenticationRequest,res: Response): void => {
  res.status(200).json({
    success: true,
    message: "Protected admin route is working.",
    data: {
      admin: req.admin,
    },
  });
};
