"use server";

import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { guardCliConfigWrite } from "@/lib/api/cliConfigWriteGuard";
import { getApiKeyById } from "@/lib/db/apiKeys";
import {
  generateWhyCodesConfig,
  redactWhyCodesApiKey,
} from "@/lib/cli-helper/config-generator/whycodes";
import { getWhyCodesConfigPath } from "@/lib/cli-helper/config-generator/whycodesHome";
import { validateBaseUrl } from "@/lib/cli-helper/config-generator";
import { getCliPrimaryConfigPath, getCliRuntimeStatus } from "@/shared/services/cliRuntime";

const TOOL_ID = "whycodes";

const settingsSchema = z.object({
  baseUrl: z.string().min(1, "baseUrl is required"),
  keyId: z.string().optional().nullable(),
  apiKey: z.string().optional().nullable(),
  model: z.string().optional(),
  dryRun: z.boolean().optional(),
  preview: z.boolean().optional(),
});

const getConfigPath = () => getCliPrimaryConfigPath(TOOL_ID) || getWhyCodesConfigPath();

export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const runtime = await getCliRuntimeStatus(TOOL_ID);
    const configPath = getConfigPath();
    let content: string | null = null;
    try {
      content = await fs.readFile(configPath, "utf8");
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    }

    return NextResponse.json({
      installed: runtime.installed,
      runnable: runtime.runnable,
      command: runtime.command,
      commandPath: runtime.commandPath,
      runtimeMode: runtime.runtimeMode,
      reason: runtime.reason,
      settingsPath: configPath,
      content: content ? redactWhyCodesApiKey(content) : null,
      hasOmniRoute: Boolean(content && /\[providers\.omniroute\]/i.test(content)),
    });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = settingsSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  const { baseUrl, keyId, apiKey, model, dryRun, preview } = parsed.data;
  if (!validateBaseUrl(baseUrl)) {
    return NextResponse.json({ error: "baseUrl must be a valid http(s) URL" }, { status: 400 });
  }

  let resolvedApiKey = apiKey ?? "";
  if (keyId) {
    try {
      const keyRecord = await getApiKeyById(keyId);
      if (keyRecord?.key) resolvedApiKey = keyRecord.key as string;
    } catch {
      // Fall through to whatever apiKey (if any) was already provided.
    }
  }
  if (!resolvedApiKey) {
    return NextResponse.json({ error: "API key is required" }, { status: 400 });
  }

  const configPath = getConfigPath();
  let content: string;
  try {
    content = generateWhyCodesConfig({
      baseUrl,
      apiKey: resolvedApiKey,
      model,
      configPath,
    });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 400 });
  }

  if (dryRun || preview) {
    return NextResponse.json({
      dryRun: true,
      configPath,
      content: redactWhyCodesApiKey(content),
    });
  }

  const refusal = guardCliConfigWrite(configPath, {
    toolLabel: "WhyCodes",
    hostCommand: "omniroute setup-whycodes",
  });
  if (refusal) return refusal;

  try {
    await fs.mkdir(path.dirname(configPath), { recursive: true });
    await fs.writeFile(configPath, content, { encoding: "utf8", mode: 0o600 });
    return NextResponse.json({
      success: true,
      configPath,
      content: redactWhyCodesApiKey(content),
      message: "WhyCodes config written",
    });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
