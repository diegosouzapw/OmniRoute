/**
 * API: Log export destinations
 * GET  — List every configured destination (secrets redacted)
 * POST — Create a destination
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  resetLogExportCursor,
  getLogExportDestination,
  createLogExportDestination,
  getLogExportDestinations,
} from "@/lib/db/logExportDestinations";
import { getLogExportDestinationType } from "@/lib/logExport/registry";
import { encryptDestinationConfig, requiresEncryptionKey } from "@/lib/logExport/secrets";
import { getMaxCallLogRowId } from "@/lib/usage/callLogExportSource";
import { toDestinationView } from "@/lib/logExport/presenter";

const createDestinationSchema = z.object({
  name: z.string().min(1).max(200),
  type: z.string().min(1).max(64),
  enabled: z.boolean().optional().default(false),
  config: z.record(z.string(), z.unknown()).optional().default({}),
  batchSize: z.number().int().min(1).max(10_000).optional().default(500),
  startFromCurrentPosition: z.boolean().optional().default(false),
  includeBodies: z.boolean().optional().default(false),
  maxBodyBytes: z.number().int().min(1024).max(5_000_000).optional().default(262_144),
  maxRowsPerRun: z.number().int().min(1).max(1_000_000).optional().default(10_000),
});

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    return NextResponse.json({
      destinations: getLogExportDestinations().map(toDestinationView),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to list log export destinations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const validation = validateBody(createDestinationSchema, await request.json());
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { data } = validation;

    const destinationType = getLogExportDestinationType(data.type);
    if (!destinationType) {
      return NextResponse.json(
        { error: `Unknown log export destination type "${data.type}"` },
        { status: 400 }
      );
    }

    const parsedConfig = destinationType.configSchema.safeParse(data.config);
    if (!parsedConfig.success) {
      return NextResponse.json(
        {
          error: {
            message: "Invalid destination configuration",
            details: parsedConfig.error.issues.map((issue) => ({
              field: issue.path.join("."),
              message: issue.message,
            })),
          },
        },
        { status: 400 }
      );
    }

    const config = destinationType.initializeConfig?.(parsedConfig.data) ?? parsedConfig.data;
    if (requiresEncryptionKey(data.type, config as Record<string, unknown>)) {
      return NextResponse.json(
        {
          error:
            "This destination stores a credential, which requires STORAGE_ENCRYPTION_KEY to be " +
            "configured. Without it the credential would be written to SQLite in plaintext.",
        },
        { status: 400 }
      );
    }

    const created = createLogExportDestination({
      name: data.name,
      type: data.type,
      enabled: data.enabled,
      config: encryptDestinationConfig(data.type, config as Record<string, unknown>),
      batchSize: data.batchSize,
      includeBodies: data.includeBodies,
      maxBodyBytes: data.maxBodyBytes,
      maxRowsPerRun: data.maxRowsPerRun,
    });

    // Capture the high-water mark without an await between creation and reset: an enabled
    // destination cannot be scheduled with cursor zero in the middle of this handler.
    if (data.startFromCurrentPosition) resetLogExportCursor(created.id, getMaxCallLogRowId());
    const view = data.startFromCurrentPosition ? getLogExportDestination(created.id)! : created;
    return NextResponse.json({ destination: toDestinationView(view) }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to create log export destination" },
      { status: 500 }
    );
  }
}
