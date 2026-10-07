/**
 * API: One log export destination
 * GET    — Fetch it (secrets redacted)
 * PUT    — Update name / enabled / config / batching
 * DELETE — Remove it
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  deleteLogExportDestination,
  getLogExportDestination,
  updateLogExportDestination,
} from "@/lib/db/logExportDestinations";
import { getLogExportDestinationType } from "@/lib/logExport/registry";
import {
  encryptDestinationConfig,
  mergeDestinationConfig,
  requiresEncryptionKey,
} from "@/lib/logExport/secrets";
import { toDestinationView } from "@/lib/logExport/presenter";

const updateDestinationSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  enabled: z.boolean().optional(),
  config: z.record(z.string(), z.unknown()).optional(),
  batchSize: z.number().int().min(1).max(10_000).optional(),
  includeBodies: z.boolean().optional(),
  maxBodyBytes: z.number().int().min(1024).max(5_000_000).optional(),
  maxRowsPerRun: z.number().int().min(1).max(1_000_000).optional(),
});

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const destination = getLogExportDestination(id);
    if (!destination) {
      return NextResponse.json({ error: "Log export destination not found" }, { status: 404 });
    }
    return NextResponse.json({ destination: toDestinationView(destination) });
  } catch (error: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to read log export destination" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const existing = getLogExportDestination(id);
    if (!existing) {
      return NextResponse.json({ error: "Log export destination not found" }, { status: 404 });
    }

    const validation = validateBody(updateDestinationSchema, await request.json());
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { data } = validation;

    let nextConfig = existing.config;
    if (data.config) {
      const destinationType = getLogExportDestinationType(existing.type);
      if (!destinationType) {
        return NextResponse.json(
          { error: `Unknown log export destination type "${existing.type}"` },
          { status: 400 }
        );
      }
      // The UI sends back a placeholder for secrets it did not retype — keep the
      // stored ciphertext for those instead of overwriting it with the placeholder.
      // Ciphertext is a non-empty string, so presence checks in the schema still hold.
      const merged = mergeDestinationConfig(existing.type, existing.config, data.config);
      const parsedConfig = destinationType.configSchema.safeParse(merged);
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
      if (requiresEncryptionKey(existing.type, parsedConfig.data as Record<string, unknown>)) {
        return NextResponse.json(
          {
            error:
              "This destination stores a credential, which requires STORAGE_ENCRYPTION_KEY to be " +
              "configured. Without it the credential would be written to SQLite in plaintext.",
          },
          { status: 400 }
        );
      }

      nextConfig = encryptDestinationConfig(
        existing.type,
        parsedConfig.data as Record<string, unknown>
      );
    }

    const updated = updateLogExportDestination(id, {
      name: data.name,
      enabled: data.enabled,
      config: nextConfig,
      batchSize: data.batchSize,
      includeBodies: data.includeBodies,
      maxBodyBytes: data.maxBodyBytes,
      maxRowsPerRun: data.maxRowsPerRun,
    });
    if (!updated) {
      return NextResponse.json({ error: "Log export destination not found" }, { status: 404 });
    }
    return NextResponse.json({ destination: toDestinationView(updated) });
  } catch (error: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to update log export destination" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    if (!deleteLogExportDestination(id)) {
      return NextResponse.json({ error: "Log export destination not found" }, { status: 404 });
    }
    return NextResponse.json({ deleted: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error) || "Failed to delete log export destination" },
      { status: 500 }
    );
  }
}
