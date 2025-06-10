import { ZodIssue } from "zod";

/**
 * Represents a standardized error object used across API responses.
 *
 * @property success - Always `false` to indicate failure.
 * @property message - A human-readable error message.
 * @property statusCode - Optional HTTP status code (defaults to 500).
 * @property zodErrors - Optional list of Zod validation issues, if applicable.
 */
export type AppError = {
  success: false;
  message: string;
  statusCode?: number;
  zodErrors?: ZodIssue[];
};

/**
 * Creates a typed error object conforming to the AppError structure.
 *
 * @param message - A human-readable message describing the error.
 * @param statusCode - Optional HTTP status code. Defaults to 500.
 * @param zodErrors - Optional array of Zod validation errors.
 *
 * @returns An object of type `AppError` with structured error details.
 */
export const createAppError = (
  message: string,
  statusCode: number = 500,
  zodErrors?: ZodIssue[]
): AppError => ({
  success: false as const,
  message,
  statusCode,
  ...(zodErrors ? { zodErrors } : {}),
});
