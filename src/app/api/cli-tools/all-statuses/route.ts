"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import pino from "pino";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { CLI_TOOLS } from "@/shared/constants/cliTools";
import { getCliRuntimeStatus, getCliPrimaryConfigPath } from "@/shared/services/cliRuntime";
import { getAllCliToolLastConfigured } from "@/lib/db/cliToolState";
import { checkToolConfigStatus } from "@/lib/cliTools/checkToolConfigStatus";
import { getCached, setCached } from "@/lib/cliTools/batchStatusCache";
import type { ToolBatchStatus, ToolBatchStatusMap } from "@/shared/types/cliBatchStatus";

const logger = pino({ name: "cli-tools-all-statuses-api" });

const TOOL_CHECK_TIMEOUT_MS = 5000; // 5s per tool max

/**
 * Attempt to extract the endpoint from a config file for a given toolId.
 * Returns null if extraction is not possible or the file is not parseable.
 */
async function extractEndpointFromConfig(
  toolId: string,
  configPath: string
): Promise<string | null> {
  try {
    const content = await fs.readFile(configPath, "utf-8");

    // TOML-based tools (codex) — do a best-effort text search
    if (toolId === "codex") {
      const match = content.match(/base_url\s*=\s*["']([^"'\n]+)["']/i);
      return match ? match[1] : null;
    }

    const config = JSON.parse(content) as Record<string, unknown>;

    switch (toolId) {
      case "claude": {
        const env = config.env as Record<string, unknown> | undefined;
        return (env?.ANTHROPIC_BASE_URL as string | undefined) ?? null;
      }
      case "qwen": {
        const mp = config.modelProviders as Record<string, unknown>[] | undefined;
        if (!Array.isArray(mp)) return null;
        for (const provider of mp) {
          const baseUrl = (provider as Record<string, unknown>).apiBase as string | undefined;
          if (baseUrl) return baseUrl;
        }
        return null;
      }
      case "cline":
        return (config.openAiBaseUrl as string | undefined) ?? null;
      case "droid":
      case "openclaw":
      case "kilo": {
        // Generic search for common endpoint key patterns
        for (const key of ["baseUrl", "apiBase", "openaiBaseUrl", "baseURL", "endpoint"]) {
          const value = config[key];
          if (typeof value === "string" && value.startsWith("http")) return value;
        }
        return null;
      }
      case "hermes": {
        // Hermes uses a text/TOML-like config; already handled via raw text above
        const match = content.match(/base_url\s*=\s*["']([^"'\n]+)["']/i);
        return match ? match[1] : null;
      }
      default:
        return null;
    }
  } catch {
    return null;
  }
}

/**
 * GET /api/cli-tools/all-statuses
 *
 * Returns detection + config status for ALL CLI tools in one batch round-trip.
 * Uses mtime-based in-memory cache so repeated calls don't re-execute runtime checks.
 *
 * Auth: requireCliToolsAuth (management-level)
 * Response 200: Record<toolId, ToolBatchStatus>
 * Response 401: { error: "Unauthorized" }
 * Response 500: { error: sanitizeErrorMessage(err) }
 */
export async function GET(request: Request): Promise<Response> {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const toolIds = Object.keys(CLI_TOOLS);
    const statuses: ToolBatchStatusMap = {};

    // Resolve mtime for each tool's primary config path
    const mtimesMap: Record<string, number> = {};
    await Promise.allSettled(
      toolIds.map(async (toolId) => {
        const configPath = getCliPrimaryConfigPath(toolId);
        if (!configPath) {
          mtimesMap[toolId] = 0;
          return;
        }
        try {
          const stat = await fs.stat(configPath);
          mtimesMap[toolId] = stat.mtimeMs;
        } catch {
          mtimesMap[toolId] = 0;
        }
      })
    );

    // For each tool: use cache hit, or run detection + config check in parallel
    await Promise.allSettled(
      toolIds.map(async (toolId) => {
        const mtimeMs = mtimesMap[toolId] ?? 0;
        const cached = getCached(toolId, mtimeMs);

        if (cached) {
          statuses[toolId] = cached;
          return;
        }

        try {
          const runtimePromise = Promise.race<Awaited<ReturnType<typeof getCliRuntimeStatus>>>([
            getCliRuntimeStatus(toolId),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error("Timeout")), TOOL_CHECK_TIMEOUT_MS)
            ),
          ]);

          const configStatusPromise = checkToolConfigStatus(toolId);

          const [runtimeResult, configStatusResult] = await Promise.allSettled([
            runtimePromise,
            configStatusPromise,
          ]);

          const runtime =
            runtimeResult.status === "fulfilled"
              ? runtimeResult.value
              : { installed: false, runnable: false, reason: "Timeout" };

          const configStatus =
            configStatusResult.status === "fulfilled" ? configStatusResult.value : "unknown";

          // Determine effective config status
          const effectiveConfigStatus =
            !runtime.installed || !runtime.runnable ? "not_installed" : configStatus;

          // Try to extract endpoint from config file
          const configPath = getCliPrimaryConfigPath(toolId);
          const endpoint = configPath
            ? await extractEndpointFromConfig(toolId, configPath)
            : null;

          const result: ToolBatchStatus = {
            detection: {
              installed: runtime.installed,
              runnable: runtime.runnable,
              command: runtime.command ?? undefined,
              commandPath: (runtime as Record<string, unknown>).commandPath as string | undefined,
              reason: runtime.reason ?? undefined,
            },
            config: {
              status: effectiveConfigStatus,
              endpoint: endpoint ?? null,
            },
          };

          setCached(toolId, mtimeMs, result);
          statuses[toolId] = result;
        } catch (toolErr) {
          const errMsg =
            toolErr instanceof Error && toolErr.message === "Timeout" ? "Timeout" : "Check failed";
          logger.warn({ toolId, err: toolErr }, "Failed to check CLI tool status");

          const result: ToolBatchStatus = {
            detection: { installed: false, runnable: false, reason: errMsg },
            config: { status: "unknown" },
            error: errMsg,
          };
          statuses[toolId] = result;
        }
      })
    );

    // Merge last-configured timestamps from SQLite (non-critical)
    try {
      const lastConfigured = getAllCliToolLastConfigured();
      for (const [toolId, timestamp] of Object.entries(lastConfigured)) {
        if (statuses[toolId]) {
          statuses[toolId].config.lastConfiguredAt = timestamp;
        }
      }
    } catch (dbErr) {
      logger.warn({ err: dbErr }, "Failed to fetch lastConfiguredAt timestamps");
    }

    return NextResponse.json(statuses);
  } catch (err) {
    logger.error({ err }, "Unexpected error in /api/cli-tools/all-statuses");
    return NextResponse.json(buildErrorBody(500, err instanceof Error ? err.message : String(err)), {
      status: 500,
    });
  }
}
