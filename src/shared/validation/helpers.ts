import { z } from "zod";

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required").max(200),
});

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

/**
 * Safely extract an error object from a validation result which may be
 * a union or different shapes across callers. Returns the `.error` or
 * `.response` field when present, otherwise returns the original value.
 */
export function getValidationError(v: unknown): unknown {
  const anyV = v as any;
  return anyV?.error ?? anyV?.response ?? anyV;
}

export function getValidationResponse(v: unknown): unknown {
  const anyV = v as any;
  return anyV?.response ?? anyV?.error ?? anyV;
}
