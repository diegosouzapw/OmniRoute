/**
 * GET /api/chaos/config — Get chaos mode configuration
 * PUT /api/chaos/config — Update chaos mode configuration
 * DELETE /api/chaos/config — Reset to defaults
 *
 * Chaos Mode global settings: which providers/models participate,
 * default mode (parallel/collaborative), system prompt, timeout.
 */

import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  getChaosConfig,
  setChaosConfig,
  resetChaosConfig,
  chaosConfigSchema,
} from "@/lib/chaos/chaosConfig";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import * as log from "@/sse/utils/logger";

export const dynamic = "force-dynamic";

/**
 * GET /api/chaos/config
 * Returns the current chaos mode configuration.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const config = await getChaosConfig();
    return NextResponse.json({ config });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    log.error("chaos", "Error fetching chaos config", err);
    return NextResponse.json(buildErrorBody(500, msg), { status: 500 });
  }
}

/**
 * PUT /api/chaos/config
 * Update chaos mode configuration.
 */
export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();
    const validation = validateBody(chaosConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(buildErrorBody(400, validation.error.message), {
        status: 400,
      });
    }

    const config = await setChaosConfig(validation.data);
    return NextResponse.json({ config, message: "Chaos config updated" });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    log.error("chaos", "Error updating chaos config", err);
    return NextResponse.json(buildErrorBody(500, msg), { status: 500 });
  }
}

/**
 * DELETE /api/chaos/config
 * Reset chaos config to defaults.
 */
export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const config = await resetChaosConfig();
    return NextResponse.json({ config, message: "Chaos config reset to defaults" });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    log.error("chaos", "Error resetting chaos config", err);
    return NextResponse.json(buildErrorBody(500, msg), { status: 500 });
  }
}
