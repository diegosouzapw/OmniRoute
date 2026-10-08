import { z } from "zod";
import { buildErrorBody } from "../../../open-sse/utils/error.ts";
import { abortable, deadline } from "./limits";

const identifier = (limit: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(limit)
    .regex(/^[^\s\x00-\x1f\x7f]+$/);
export const validateAndAddSchema = z
  .object({
    provider: identifier(120),
    modelId: identifier(240),
    connectionId: identifier(160),
    allowInference: z.literal(true),
    modelName: z
      .string()
      .trim()
      .min(1)
      .max(240)
      .regex(/^[^\x00-\x1f\x7f]+$/)
      .optional(),
    max_input_tokens: z.number().int().positive().max(Number.MAX_SAFE_INTEGER).optional(),
    max_output_tokens: z.number().int().positive().max(Number.MAX_SAFE_INTEGER).optional(),
    apiFormat: z.enum(["chat-completions", "responses"]).default("chat-completions"),
  })
  .strict();

export type ValidationInput = z.infer<typeof validateAndAddSchema>;

export class ModelValidationError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string
  ) {
    super(message);
  }
}

async function readBody(request: Request): Promise<unknown> {
  if (!request.body)
    throw new ModelValidationError(400, "INVALID_VALIDATION_REQUEST", "Invalid validation request");
  const bound = deadline(request.signal, 10_000);
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const chunk = await abortable(reader.read(), bound.signal);
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 16_384)
        throw new ModelValidationError(
          413,
          "VALIDATION_BODY_TOO_LARGE",
          "Validation request exceeds 16 KiB"
        );
      text += decoder.decode(chunk.value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } catch (error) {
    if (error instanceof ModelValidationError) throw error;
    throw new ModelValidationError(
      bound.signal.aborted ? 408 : 400,
      "INVALID_VALIDATION_REQUEST",
      "Invalid or incomplete validation request"
    );
  } finally {
    bound.clear();
    void reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

export function createValidateAndAddHandler(dependencies: {
  authorize: (request: Request) => Promise<Response | null>;
  validateAndAdd: (input: ValidationInput, signal: AbortSignal) => Promise<unknown>;
}) {
  return async (request: Request): Promise<Response> => {
    const headers = { "Cache-Control": "no-store" };
    try {
      const rejection = await dependencies.authorize(request);
      if (rejection) {
        const response = new Response(rejection.body, rejection);
        response.headers.set("Cache-Control", "no-store");
        return response;
      }
      const body = await readBody(request);
      const parsed = validateAndAddSchema.safeParse(body);
      if (!parsed.success) {
        throw new ModelValidationError(
          400,
          "INVALID_VALIDATION_REQUEST",
          "Invalid validation request; explicit inference consent is required"
        );
      }
      const result = await dependencies.validateAndAdd(parsed.data, request.signal);
      return Response.json(result, { status: 201, headers });
    } catch (error) {
      const known = error instanceof ModelValidationError;
      const status = known ? error.status : 500;
      return Response.json(
        buildErrorBody(status, known ? error.message : "Model validation failed", undefined, {
          code: known ? error.code : "MODEL_VALIDATION_FAILED",
        }),
        { status, headers }
      );
    }
  };
}
