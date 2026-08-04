"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  ensureCliConfigWriteAllowed,
  getCliPrimaryConfigPath,
  getCliRuntimeStatus,
} from "@/shared/services/cliRuntime";
import { createBackup } from "@/shared/services/backupService";
import { saveCliToolLastConfigured, deleteCliToolLastConfigured } from "@/lib/db/cliToolState";
import { cliModelConfigSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { resolveApiKey } from "@/shared/services/apiKeyResolver";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const TOOL_ID = "grok-build";
const MODEL_SLOT = "omniroute";
// Grok Build ships with a built-in default model id; restored on Reset when no
// prior custom default was recorded.
const BUILTIN_DEFAULT_MODEL = "grok-build";

const getGrokBuildConfigPath = (): string =>
  getCliPrimaryConfigPath(TOOL_ID) ?? path.join(process.env.HOME ?? "~", ".grok", "config.toml");

const getGrokBuildDir = () => path.dirname(getGrokBuildConfigPath());

// [model.omniroute] ... until the next [section] header or EOF
const MODEL_SECTION_RE = new RegExp(
  `^\\[model\\.${MODEL_SLOT}\\][ \\t]*\\r?\\n(?:(?!\\[)[^\\r\\n]*\\r?\\n?)*`,
  "m"
);
const MODELS_SECTION_RE = /^\[models\][ \t]*\r?\n((?:(?!\[)[^\r\n]*\r?\n?)*)/m;
// Marker written on Apply so Reset can restore the previously configured default.
const PREV_DEFAULT_RE = /^# omniroute-prev-default = "([^"]*)"[ \t]*\r?\n?/m;

const getTomlField = (body: string, key: string): string | null => {
  const m = body.match(new RegExp(`^[ \\t]*${key}[ \\t]*=[ \\t]*"([^"]*)"`, "m"));
  return m ? m[1] : null;
};

type GrokModelSection = {
  model: string | null;
  base_url: string | null;
  name: string | null;
  api_key: string | null;
  api_backend: string | null;
};

/**
 * Parse the `~/.grok/config.toml` produced by the Grok Build CLI (a subset of
 * TOML — flat `key = "value"` pairs inside `[section]` headers). Grok Build's
 * config format is not guaranteed to be quote-escaped or nested, so this reads
 * only the flat string fields OmniRoute itself writes.
 */
const parseModelSection = (toml: string): GrokModelSection | null => {
  const match = toml.match(MODEL_SECTION_RE);
  if (!match) return null;
  const body = match[0].replace(/^\[model\.[^\]]+\][ \t]*\r?\n/, "");
  return {
    model: getTomlField(body, "model"),
    base_url: getTomlField(body, "base_url"),
    name: getTomlField(body, "name"),
    api_key: getTomlField(body, "api_key"),
    api_backend: getTomlField(body, "api_backend"),
  };
};

const parseModelsDefault = (toml: string): string | null => {
  const match = toml.match(MODELS_SECTION_RE);
  if (!match) return null;
  return getTomlField(match[1] || "", "default");
};

const escapeTomlString = (value: string): string => value.replace(/["\\]/g, "\\$&");

const buildModelSection = (model: string, baseUrl: string, apiKey: string): string => {
  const lines = [
    `[model.${MODEL_SLOT}]`,
    `model = "${escapeTomlString(model)}"`,
    `base_url = "${escapeTomlString(baseUrl)}"`,
    `name = "OmniRoute"`,
    `description = "Routed via OmniRoute gateway"`,
    `api_backend = "chat_completions"`,
  ];
  if (apiKey) lines.push(`api_key = "${escapeTomlString(apiKey)}"`);
  return `${lines.join("\n")}\n`;
};

/** Insert/replace the `[model.omniroute]` section, preserving the rest of the file. */
const upsertModelSection = (toml: string, section: string): string => {
  if (MODEL_SECTION_RE.test(toml)) return toml.replace(MODEL_SECTION_RE, section);
  const needsNl = toml.length > 0 && !toml.endsWith("\n");
  return `${toml}${needsNl ? "\n" : ""}\n${section}`;
};

const removeModelSection = (toml: string): string =>
  toml.replace(MODEL_SECTION_RE, "").replace(/\n{3,}/g, "\n\n");

/** Set or insert `default = "..."` inside an existing `[models]`, or create the section. */
const setModelsDefault = (toml: string, value: string): string => {
  const match = toml.match(MODELS_SECTION_RE);
  if (match) {
    const body = match[1] || "";
    const newBody = /^[ \t]*default[ \t]*=/m.test(body)
      ? body.replace(/^[ \t]*default[ \t]*=[ \t]*"[^"]*"/m, `default = "${value}"`)
      : `default = "${value}"\n${body}`;
    return toml.replace(match[0], `[models]\n${newBody}`);
  }
  const block = `[models]\ndefault = "${value}"\n\n`;
  return toml.length > 0 ? block + toml : block;
};

/** Remember the previous default once so re-Apply never clobbers it with our own slot. */
const rememberPrevDefault = (toml: string): string => {
  if (PREV_DEFAULT_RE.test(toml)) return toml;
  const current = parseModelsDefault(toml);
  if (!current || current === MODEL_SLOT) return toml;
  const marker = `# omniroute-prev-default = "${current}"\n`;
  if (MODEL_SECTION_RE.test(toml)) {
    return toml.replace(MODEL_SECTION_RE, (section) => marker + section);
  }
  const needsNl = toml.length > 0 && !toml.endsWith("\n");
  return `${toml}${needsNl ? "\n" : ""}${marker}`;
};

/** If `[models].default` still points at our slot, restore the remembered default. */
const clearModelsDefaultIfOurs = (toml: string): string => {
  const prevMatch = toml.match(PREV_DEFAULT_RE);
  const restoreTo = prevMatch?.[1] || BUILTIN_DEFAULT_MODEL;
  let next = toml.replace(PREV_DEFAULT_RE, "");
  const current = parseModelsDefault(next);
  if (current === MODEL_SLOT) {
    next = setModelsDefault(next, restoreTo);
  }
  return next;
};

const hasOmniRouteConfig = (modelCfg: GrokModelSection | null): boolean =>
  Boolean(modelCfg?.base_url);

// Read current config.toml
const readConfigToml = async (): Promise<string> => {
  try {
    return await fs.readFile(getGrokBuildConfigPath(), "utf-8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return "";
    throw err;
  }
};

// GET — check Grok Build CLI and return current [model.omniroute] config
export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const runtime = await getCliRuntimeStatus(TOOL_ID);

    if (!runtime.installed || !runtime.runnable) {
      return NextResponse.json({
        installed: runtime.installed,
        runnable: runtime.runnable,
        command: runtime.command,
        commandPath: runtime.commandPath,
        runtimeMode: runtime.runtimeMode,
        reason: runtime.reason,
        config: null,
        message:
          runtime.installed && !runtime.runnable
            ? "Grok Build is installed but not runnable"
            : "Grok Build is not installed",
      });
    }

    const toml = await readConfigToml();
    const model = parseModelSection(toml);
    const defaultModel = parseModelsDefault(toml);

    return NextResponse.json({
      installed: runtime.installed,
      runnable: runtime.runnable,
      command: runtime.command,
      commandPath: runtime.commandPath,
      runtimeMode: runtime.runtimeMode,
      reason: runtime.reason,
      config: { model, default: defaultModel },
      hasOmniRoute: hasOmniRouteConfig(model),
      configPath: getGrokBuildConfigPath(),
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}

// POST — write the [model.omniroute] section into ~/.grok/config.toml and set it default
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    // Extract keyId BEFORE Zod validation — Zod strips unknown fields
    const keyId = typeof rawBody?.keyId === "string" ? rawBody.keyId.trim() : null;

    const validation = validateBody(cliModelConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, model } = validation.data;
    const apiKey = await resolveApiKey(keyId, validation.data.apiKey);

    const configPath = getGrokBuildConfigPath();
    const grokDir = getGrokBuildDir();

    await fs.mkdir(grokDir, { recursive: true });
    await createBackup(TOOL_ID, configPath);

    const normalizedBaseUrl = baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;

    let toml = await readConfigToml();
    toml = rememberPrevDefault(toml);
    toml = upsertModelSection(toml, buildModelSection(model, normalizedBaseUrl, apiKey || ""));
    toml = setModelsDefault(toml, MODEL_SLOT);

    await fs.writeFile(configPath, toml, "utf-8");

    try {
      saveCliToolLastConfigured(TOOL_ID);
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "Grok Build settings applied successfully!",
      configPath,
      modelSlot: MODEL_SLOT,
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}

// DELETE — remove the [model.omniroute] section and restore the previous default
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const configPath = getGrokBuildConfigPath();

    let toml: string;
    try {
      toml = await fs.readFile(configPath, "utf-8");
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        return NextResponse.json({ success: true, message: "No config file to reset" });
      }
      throw err;
    }

    await createBackup(TOOL_ID, configPath);

    toml = removeModelSection(toml);
    toml = clearModelsDefaultIfOurs(toml);
    await fs.writeFile(configPath, toml, "utf-8");

    try {
      deleteCliToolLastConfigured(TOOL_ID);
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "OmniRoute model slot removed from Grok Build",
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}
