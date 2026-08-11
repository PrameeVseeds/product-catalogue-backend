import type {HomeSectionInput,HomeSectionItemInput,} from "../interfaces/settingsInterface.js";
import type {HomeSectionItemRow,HomeSectionRow,} from "../models/settingsModel.js";
import { isDuplicateEntryError } from "../repositories/databaseErrorUtils.js";
import * as homeSectionRepository from "../repositories/homeSectionRepository.js";

export interface HomeSectionWithItems extends HomeSectionRow {
  items: HomeSectionItemRow[];
}

const attachItemsToSections = async (sections: HomeSectionRow[],visibleItemsOnly: boolean): Promise<HomeSectionWithItems[]> => {
  return Promise.all(
    sections.map(async (section) => ({
      ...section,
      items: await homeSectionRepository.findSectionItems(
        section.id,
        visibleItemsOnly
      ),
    }))
  );
};

export const getVisibleHomeSections = async (): Promise<HomeSectionWithItems[]> => {
    const sections = await homeSectionRepository.findVisibleHomeSections();
    return attachItemsToSections(sections, true);
  };

export const getAllHomeSections = async (): Promise<HomeSectionWithItems[]> => {
    const sections = await homeSectionRepository.findAllHomeSections();
    return attachItemsToSections(sections, false);
  };

export const createHomeSection = async (input: HomeSectionInput) => {
  try {
    return await homeSectionRepository.createHomeSection(input);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error("HOME_SECTION_KEY_EXISTS");
    }

    throw error;
  }
};

export const updateHomeSection = async (sectionId: number,input: HomeSectionInput) => {
  try {
    const updated = await homeSectionRepository.updateHomeSection(
      sectionId,
      input
    );

    if (!updated) return null;

    return homeSectionRepository.findHomeSectionById(sectionId);
  } catch (error) {
    if (isDuplicateEntryError(error)) {
      throw new Error("HOME_SECTION_KEY_EXISTS");
    }

    throw error;
  }
};

export const deleteHomeSection = (sectionId: number): Promise<boolean> => {
  return homeSectionRepository.deleteHomeSection(sectionId);
};

export const getSectionItems = async (sectionId: number) => {
  const section = await homeSectionRepository.findHomeSectionById(sectionId);

  if (!section) return null;

  return homeSectionRepository.findSectionItems(sectionId, false);
};

export const createSectionItem = async (sectionId: number,input: HomeSectionItemInput) => {
  const section = await homeSectionRepository.findHomeSectionById(sectionId);

  if (!section) return null;

  return homeSectionRepository.createSectionItem(sectionId, input);
};

export const updateSectionItem = async (itemId: number,input: HomeSectionItemInput) => {
  const updated = await homeSectionRepository.updateSectionItem(itemId, input);

  if (!updated) return null;

  return homeSectionRepository.findSectionItemById(itemId);
};

export const deleteSectionItem = (itemId: number): Promise<boolean> => {
  return homeSectionRepository.deleteSectionItem(itemId);
};
