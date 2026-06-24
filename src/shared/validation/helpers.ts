import { NextResponse } from "next/server";
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

/**
 * Result of attempting to parse and validate a JSON body against a Zod schema.
 *
 * On failure, `response` is a fully-prepared `NextResponse` (with the
 * standard error envelope) that the caller should return directly. This
 * lets route handlers do `if (!r.success) return r.response;` without
 * needing to know how the envelope is shaped.
 */
export type ValidatedJsonBodyResult<TData> =
  | { success: true; data: TData }
  | { success: false; response: NextResponse };

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
 * Parse a request body as JSON and validate it against a Zod schema in one
 * step. Returns the parsed (and type-narrowed) data on success, or a ready-
 * to-return 400 `NextResponse` on failure.
 *
 * This is the recommended entry point for mutation routes: it fuses the two
 * common helpers (`readJsonBody` + `validateBody`) into a single call site
 * with one error envelope.
 *
 * Usage:
 *
 * ```ts
 * const result = await validatedJsonBody(request, updateComboSchema);
 * if (!result.success) return result.response;
 * const body = result.data; // fully typed as z.infer<typeof updateComboSchema>
 * ```
 */
export async function validatedJsonBody<TSchema extends z.ZodTypeAny>(
  request: Request,
  schema: TSchema
): Promise<ValidatedJsonBodyResult<z.infer<TSchema>>> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: {
            message: "Invalid request",
            details: [{ field: "body", message: "Invalid JSON body" }],
          },
        },
        { status: 400 }
      ),
    };
  }

  const validation = schema.safeParse(raw);
  if (validation.success) {
    return { success: true, data: validation.data };
  }

  const issues = Array.isArray(validation.error?.issues) ? validation.error.issues : [];
  return {
    success: false,
    response: NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
      },
      { status: 400 }
    ),
  };
}
