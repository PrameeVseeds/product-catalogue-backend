import { Router } from "express";
import {
  createHomeSection,
  createSectionItem,
  createSocialLink,
  deleteHomeSection,
  deleteSectionItem,
  deleteSocialLink,
  getActiveSocialLinks,
  getAllHomeSections,
  getAllSocialLinks,
  getContactSettings,
  getEnquirySettings,
  getHeroSettings,
  getSectionItems,
  getSiteSettings,
  getThemeSettings,
  getVisibleHomeSections,
  updateContactSettings,
  updateEnquirySettings,
  updateHeroSettings,
  updateHomeSection,
  updateSectionItem,
  updateSiteSettings,
  updateSocialLink,
  updateThemeSettings,
} from "../controllers/settingsController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/settings/site", getSiteSettings);
router.get("/settings/theme", getThemeSettings);
router.get("/settings/hero", getHeroSettings);
router.get("/settings/contact", getContactSettings);
router.get("/settings/enquiry", getEnquirySettings);
router.get("/home-sections", getVisibleHomeSections);
router.get("/social-media", getActiveSocialLinks);

router.put("/admin/settings/site", authenticate, updateSiteSettings);
router.put("/admin/settings/theme", authenticate, updateThemeSettings);
router.put("/admin/settings/hero", authenticate, updateHeroSettings);
router.put("/admin/settings/contact", authenticate, updateContactSettings);
router.put("/admin/settings/enquiry", authenticate, updateEnquirySettings);

router.get("/admin/home-sections", authenticate, getAllHomeSections);
router.post("/admin/home-sections", authenticate, createHomeSection);
router.put("/admin/home-sections/:id", authenticate, updateHomeSection);
router.delete("/admin/home-sections/:id", authenticate, deleteHomeSection);
router.get("/admin/home-sections/:sectionId/items",authenticate,getSectionItems);
router.post("/admin/home-sections/:sectionId/items",authenticate,createSectionItem);
router.put("/admin/home-section-items/:id", authenticate, updateSectionItem);
router.delete("/admin/home-section-items/:id", authenticate, deleteSectionItem);

router.get("/admin/social-media", authenticate, getAllSocialLinks);
router.post("/admin/social-media", authenticate, createSocialLink);
router.put("/admin/social-media/:id", authenticate, updateSocialLink);
router.delete("/admin/social-media/:id", authenticate, deleteSocialLink);

export default router;
