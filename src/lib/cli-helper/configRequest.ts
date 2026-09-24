import { NextResponse } from "next/server";
import { z } from "zod";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const baseUrlSchema = z.string().refine((value) => {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password;
  } catch {
    return false;
  }
}, "baseUrl must be an absolute HTTP(S) URL without embedded credentials");

export const configRequestSchema = z
  .object({
    toolId: z.string().trim().min(1),
    baseUrl: baseUrlSchema.optional(),
    apiKey: z.string().min(1),
    model: z.string().optional(),
  })
  .strict();

export const configPreviewQuerySchema = z.object({ baseUrl: baseUrlSchema.optional() }).strict();

export function defaultConfigBaseUrl(): string {
  const port = process.env.API_PORT || process.env.PORT || 20128;
  return process.env.OMNIROUTE_BASE_URL || process.env.BASE_URL || `http://localhost:${port}/v1`;
}

export function privateConfigResponse(body: unknown, status = 200): NextResponse {
  return NextResponse.json(body, { status, headers: { "cache-control": "no-store" } });
}

export function configError(status: number, message: string): NextResponse {
  return privateConfigResponse(buildErrorBody(status, message), status);
}
