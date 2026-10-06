import { NextResponse } from "next/server";
import { z } from "zod";

type ValidationErrorDetail = {
  field: string;
  message: string;
  // Present for `unrecognized_keys` issues: the unknown key names that were
  // refused (e.g. a typo'd override key). Surfaced by callers so clients can
  // tell exactly which keys were rejected.
  keys?: string[];
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
        ...(("keys" in e && (e as { keys?: string[] }).keys)
          ? { keys: (e as { keys: string[] }).keys }
          : {}),
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
 * Build a human-readable 400 message from a validation failure, naming the
 * first offending field instead of the generic "Invalid request" (#10849).
 * Intended for routes that reply with a single message string (e.g.
 * `errorResponse()`) rather than the full `{ message, details }` envelope
 * returned by `validatedJsonBody()`.
 */
export function formatValidationMessage(error: ValidationErrorPayload): string {
  const [first] = error.details;
  if (!first) return error.message;
  return first.field ? `${first.field}: ${first.message}` : first.message;
}

/**
 * Result of attempting to parse and validate a JSON body against a Zod schema.
 *
 * On failure, `response` is a fully-prepared `NextResponse` (with the standard
 * error envelope) that the caller should return directly, so route handlers can
 * do `if (!r.success) return r.response;` without knowing the envelope shape.
 */
export type ValidatedJsonBodyResult<TData> =
  { success: true; data: TData } | { success: false; response: NextResponse };

/**
 * Parse a request body as JSON and validate it against a Zod schema in one
 * step. Returns the parsed (and type-narrowed) data on success, or a ready-to-
 * return 400 `NextResponse` on failure. Both the malformed-JSON and the failed-
 * validation paths emit the same error envelope
 * (`{ error: { message, details: [{ field, message }] } }`), so a single client
 * parser covers both.
 *
 * Usage:
 *
 * ```ts
 * const result = await validatedJsonBody(request, updateComboSchema);
 * if (!result.success) return result.response;
 * const body = result.data; // typed as z.infer<typeof updateComboSchema>
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

  const validation = validateBody(schema, raw);
  if (isValidationFailure(validation)) {
    return {
      success: false,
      response: NextResponse.json({ error: validation.error }, { status: 400 }),
    };
  }

  return { success: true, data: validation.data };
}
