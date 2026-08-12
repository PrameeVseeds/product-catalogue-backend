const TRANSIENT_DATABASE_ERROR_CODES = new Set([
  "ECONNRESET",
  "ETIMEDOUT",
  "PROTOCOL_CONNECTION_LOST",
]);

const getErrorCode = (error: unknown): string | undefined => {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return undefined;
  }

  return typeof error.code === "string" ? error.code : undefined;
};

const wait = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const retryTransientDatabaseError = async <T>(
  operation: () => Promise<T>,
  retries = 2,
): Promise<T> => {
  let retryCount = 0;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      const errorCode = getErrorCode(error);

      if (!errorCode || !TRANSIENT_DATABASE_ERROR_CODES.has(errorCode) || retryCount >= retries) {
        throw error;
      }

      retryCount += 1;
      await wait(250 * retryCount);
    }
  }
};
