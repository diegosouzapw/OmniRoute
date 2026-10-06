import { z } from "zod";

import {
  readRequestBodyWithLimit,
  RequestBodyTooLargeError,
} from "@/shared/middleware/bodySizeGuard";

/** Every Radar sync trigger is parameterless: absent or exactly `{}` only. */
export const RadarSyncBodySchema = z.object({}).strict().optional();

export const RADAR_SYNC_BODY_LIMIT_BYTES = 1024;

export type RadarSyncBodyResult = "valid" | "invalid" | "too_large" | "read_error";

export function radarSyncBodyError(
  result: RadarSyncBodyResult
): { status: 400 | 413; message: string } | null {
  if (result === "valid") return null;
  return result === "too_large"
    ? { status: 413, message: "Request body too large" }
    : { status: 400, message: "Invalid request body" };
}

export async function validateRadarSyncBody(request: Request): Promise<RadarSyncBodyResult> {
  let rawBody: string;
  try {
    const bytes = await readRequestBodyWithLimit(request, RADAR_SYNC_BODY_LIMIT_BYTES);
    rawBody = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch (error: unknown) {
    return error instanceof RequestBodyTooLargeError ? "too_large" : "read_error";
  }
  if (rawBody.trim() === "") return "valid";

  try {
    return RadarSyncBodySchema.safeParse(JSON.parse(rawBody) as unknown).success
      ? "valid"
      : "invalid";
  } catch {
    return "invalid";
  }
}
