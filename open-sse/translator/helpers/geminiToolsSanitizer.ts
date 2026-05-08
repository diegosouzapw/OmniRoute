import { createHash } from "crypto";

import { cleanJSONSchemaForAntigravity } from "./geminiHelper.ts";

type GeminiFunctionDeclaration = {
  name: string;
  description: string;
  parameters: unknown;
};

type GeminiTool = {
  functionDeclarations?: GeminiFunctionDeclaration[];
  googleSearch?: Record<string, unknown>;
};

type GeminiToolSanitizationOptions = {
  stripNamespace?: boolean;
  toolNameMap?: Map<string, string> | null;
};

const MAX_GEMINI_TOOL_NAME_LENGTH = 64;
const GEMINI_TOOL_HASH_LENGTH = 8;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeGeminiToolName(
  name: string,
  options: GeminiToolSanitizationOptions = {}
): string {
  const trimmed = name.trim();
  const namespaceStripped = !options.stripNamespace
    ? trimmed
    : (() => {
        const namespaceIndex = trimmed.indexOf(":");
        return namespaceIndex >= 0 ? trimmed.slice(namespaceIndex + 1) : trimmed;
      })();

  return namespaceStripped
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function buildHashedGeminiToolName(
  baseName: string,
  originalName: string,
  hashLength: number
): string {
  const effectiveBase = baseName || "tool";
  const hash = createHash("sha256").update(originalName).digest("hex").slice(0, hashLength);
  const prefixLength = Math.max(1, MAX_GEMINI_TOOL_NAME_LENGTH - 1 - hash.length);
  return `${effectiveBase.slice(0, prefixLength)}_${hash}`;
}

function findSanitizedNameForOriginal(
  toolNameMap: Map<string, string> | null | undefined,
  originalName: string
): string | null {
  if (!(toolNameMap instanceof Map)) return null;
  for (const [sanitizedName, rawName] of toolNameMap.entries()) {
    if (rawName === originalName) {
      return sanitizedName;
    }
  }
  return null;
}

function isSanitizedNameTaken(
  toolNameMap: Map<string, string> | null | undefined,
  sanitizedName: string,
  originalName: string
): boolean {
  if (!(toolNameMap instanceof Map)) return false;
  const mappedOriginalName = toolNameMap.get(sanitizedName);
  return typeof mappedOriginalName === "string" && mappedOriginalName !== originalName;
}

export function sanitizeGeminiToolName(
  name: string,
  options: GeminiToolSanitizationOptions = {}
): string {
  const normalizedName = normalizeGeminiToolName(name, options) || "tool";
  const toolNameMap = options.toolNameMap instanceof Map ? options.toolNameMap : null;
  const existingSanitizedName = findSanitizedNameForOriginal(toolNameMap, name);
  if (existingSanitizedName) {
    return existingSanitizedName;
  }

  let sanitizedName =
    normalizedName.length <= MAX_GEMINI_TOOL_NAME_LENGTH
      ? normalizedName
      : buildHashedGeminiToolName(normalizedName, name, GEMINI_TOOL_HASH_LENGTH);

  if (isSanitizedNameTaken(toolNameMap, sanitizedName, name)) {
    const conflictingOriginalName = toolNameMap?.get(sanitizedName);
    sanitizedName = buildHashedGeminiToolName(normalizedName, name, GEMINI_TOOL_HASH_LENGTH);
    let hashLength = GEMINI_TOOL_HASH_LENGTH + 2;
    while (isSanitizedNameTaken(toolNameMap, sanitizedName, name) && hashLength <= 32) {
      sanitizedName = buildHashedGeminiToolName(normalizedName, name, hashLength);
      hashLength += 2;
    }

    if (isSanitizedNameTaken(toolNameMap, sanitizedName, name)) {
      sanitizedName = buildHashedGeminiToolName("tool", `${name}:${Date.now()}`, 12);
    }

    console.warn(
      `[GeminiTools] Tool name collision after sanitization: "${name}" conflicts with "${conflictingOriginalName}". Using "${sanitizedName}".`
    );
  }

  toolNameMap?.set(sanitizedName, name);
  return sanitizedName;
}

function toGeminiGoogleSearchTool(tool: Record<string, unknown>): GeminiTool | null {
  if (isRecord(tool.googleSearch)) {
    return { googleSearch: tool.googleSearch };
  }
  if (tool.googleSearch !== undefined) {
    return { googleSearch: {} };
  }

  if (isRecord(tool.google_search)) {
    return { googleSearch: tool.google_search };
  }
  if (tool.google_search !== undefined) {
    return { googleSearch: {} };
  }

  const toolType = typeof tool.type === "string" ? tool.type : "";
  if (
    toolType === "googleSearch" ||
    toolType === "google_search" ||
    toolType === "web_search" ||
    toolType === "web_search_preview"
  ) {
    return { googleSearch: {} };
  }

  return null;
}

export function buildGeminiTools(
  tools: unknown,
  options: GeminiToolSanitizationOptions = {}
): GeminiTool[] | undefined {
  if (!Array.isArray(tools) || tools.length === 0) {
    return undefined;
  }

  const functionDeclarations: GeminiFunctionDeclaration[] = [];
  let googleSearchTool: GeminiTool | null = null;

  for (const rawTool of tools) {
    if (!isRecord(rawTool)) {
      continue;
    }

    const normalizedGoogleSearchTool = toGeminiGoogleSearchTool(rawTool);
    if (normalizedGoogleSearchTool) {
      googleSearchTool = normalizedGoogleSearchTool;
      continue;
    }

    if (Array.isArray(rawTool.functionDeclarations)) {
      for (const fn of rawTool.functionDeclarations) {
        if (!isRecord(fn) || typeof fn.name !== "string" || !fn.name.trim()) {
          continue;
        }

        functionDeclarations.push({
          name: sanitizeGeminiToolName(fn.name, options),
          description: typeof fn.description === "string" ? fn.description : "",
          parameters: cleanJSONSchemaForAntigravity(
            fn.parameters || { type: "object", properties: {} }
          ),
        });
      }
      continue;
    }

    if (typeof rawTool.name === "string" && rawTool.name.trim()) {
      functionDeclarations.push({
        name: sanitizeGeminiToolName(rawTool.name, options),
        description: typeof rawTool.description === "string" ? rawTool.description : "",
        parameters: cleanJSONSchemaForAntigravity(
          rawTool.input_schema || { type: "object", properties: {} }
        ),
      });
      continue;
    }

    if (rawTool.type === "function" && isRecord(rawTool.function)) {
      const fn = rawTool.function;
      if (typeof fn.name !== "string" || !fn.name.trim()) {
        continue;
      }

      functionDeclarations.push({
        name: sanitizeGeminiToolName(fn.name, options),
        description: typeof fn.description === "string" ? fn.description : "",
        parameters: cleanJSONSchemaForAntigravity(
          fn.parameters || { type: "object", properties: {} }
        ),
      });
    }
  }

  if (googleSearchTool && functionDeclarations.length > 0) {
    console.warn(
      `[GeminiTools] Removing ${functionDeclarations.length} functionDeclarations because googleSearch cannot be mixed with Gemini function tools`
    );
  }

  if (googleSearchTool) {
    return [googleSearchTool];
  }

  if (functionDeclarations.length > 0) {
    return [{ functionDeclarations }];
  }

  return undefined;
}
