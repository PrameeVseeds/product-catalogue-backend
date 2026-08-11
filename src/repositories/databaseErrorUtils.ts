const duplicateEntryCode = "ER_DUP_ENTRY";

export const isDuplicateEntryError = (error: unknown): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === duplicateEntryCode
  );
};
