import { z } from "zod";

type ValidationErrorDetail = {
  field: string;
  message: string;
};

type ValidationErrorPayload = {
  message: string;
  details: ValidationErrorDetail[];
};

type ValidationSuccess<TData> = {
  success: true;
  data: TData;
};

type ValidationFailure = {
  success: false;
  error: ValidationErrorPayload;
};

export type ValidationResult<TData> = ValidationSuccess<TData> | ValidationFailure;

// ──── Helper ────

/**
 * Parse and validate request body with a Zod schema.
 * Returns { success: true, data } or { success: false, error }.
 */
export function validateBody<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  body: unknown
): ValidationResult<z.infer<TSchema>> {
  const result = schema.safeParse(body);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const issues = Array.isArray(result.error?.issues) ? result.error.issues : [];
  return {
    success: false,
    error: {
      message: "Invalid request",
      details: issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    },
  };
}

export function isValidationFailure<TData>(
  validation: ValidationResult<TData>
): validation is ValidationFailure {
  return validation.success === false;
}
