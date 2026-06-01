import type { JsonlLineError, ValidationResult } from "./types";
import type { SupportedBatchEndpoint } from "@/shared/constants/batchEndpoints";

const OPENAI_LIKE = new Set([
  "/v1/chat/completions",
  "/v1/embeddings",
  "/v1/completions",
  "/v1/moderations",
  "/v1/images/generations",
  "/v1/videos/generations",
  "/v1/responses",
]);

interface LineResult {
  customId?: string;
  errors: JsonlLineError[];
  parsed?: unknown;
}

function validateOneLine(
  raw: string,
  endpoint: SupportedBatchEndpoint,
  lineNo: number
): LineResult {
  const errors: JsonlLineError[] = [];
  if (raw.trim().length === 0) return { errors };

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { errors: [{ lineNumber: lineNo, reason: "invalid JSON" }] };
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return { errors: [{ lineNumber: lineNo, reason: "line is not a JSON object" }] };
  }

  if (typeof parsed.custom_id !== "string" || parsed.custom_id.length === 0) {
    errors.push({ lineNumber: lineNo, reason: "custom_id missing or empty", field: "custom_id" });
  }

  // Anthropic native batch shape: { custom_id, params }
  // OpenAI batch shape: { custom_id, method, url, body }
  if ("params" in parsed) {
    if (typeof parsed.params !== "object" || parsed.params === null) {
      errors.push({
        lineNumber: lineNo,
        reason: "params must be an object (Anthropic batch shape)",
        field: "params",
      });
    }
  } else {
    if (parsed.method !== "POST") {
      errors.push({ lineNumber: lineNo, reason: "method must be POST", field: "method" });
    }
    if (typeof parsed.url !== "string" || !OPENAI_LIKE.has(parsed.url)) {
      errors.push({
        lineNumber: lineNo,
        reason: `url must be one of the supported batch endpoints`,
        field: "url",
      });
    } else if (parsed.url !== endpoint) {
      errors.push({
        lineNumber: lineNo,
        reason: `url "${parsed.url}" differs from batch endpoint "${endpoint}"`,
        field: "url",
      });
    }
    if (typeof parsed.body !== "object" || parsed.body === null || Array.isArray(parsed.body)) {
      errors.push({ lineNumber: lineNo, reason: "body must be an object", field: "body" });
    }
  }

  return {
    customId: typeof parsed.custom_id === "string" ? parsed.custom_id : undefined,
    errors,
    parsed: errors.length === 0 ? parsed : undefined,
  };
}

/**
 * Validate a JSONL string (OpenAI or Anthropic batch request format).
 *
 * For large files (> 5 MB) the caller should use sampling: pass maxLinesToInspect=1000
 * and tailLinesToInspect=100. For smaller files pass the defaults or a very high number.
 *
 * @param content - Full JSONL text (UTF-8 string)
 * @param opts - endpoint to validate against; optional sampling limits
 * @returns ValidationResult with errors, duplicates, preview, and byte size
 */
export function validateJsonl(
  content: string,
  opts: {
    endpoint: SupportedBatchEndpoint;
    maxLinesToInspect?: number;
    tailLinesToInspect?: number;
  }
): ValidationResult {
  const maxHead = opts.maxLinesToInspect ?? 1000;
  const maxTail = opts.tailLinesToInspect ?? 100;

  // Strip UTF-8 BOM if present (Windows-saved files) so first line parses cleanly
  const normalized = content.replace(/^﻿/, "");
  const lines = normalized.split(/\r?\n/);
  // Drop trailing empty lines
  while (lines.length > 0 && lines.at(-1)!.trim() === "") lines.pop();

  const total = lines.length;

  // Build index set: head N + tail M (deduplicated, in order)
  const indexSet = new Set<number>();
  for (let i = 0; i < Math.min(maxHead, total); i++) indexSet.add(i);
  for (let i = Math.max(maxHead, total - maxTail); i < total; i++) indexSet.add(i);
  const indices = Array.from(indexSet).sort((a, b) => a - b);

  const customIds = new Set<string>();
  const duplicates = new Set<string>();
  const errors: JsonlLineError[] = [];
  const preview: unknown[] = [];

  for (const i of indices) {
    const result = validateOneLine(lines[i], opts.endpoint, i + 1);

    if (result.customId) {
      if (customIds.has(result.customId)) {
        duplicates.add(result.customId);
      } else {
        customIds.add(result.customId);
      }
    }

    for (const err of result.errors) {
      if (errors.length < 50) errors.push(err);
    }

    if (preview.length < 5 && result.parsed != null) {
      preview.push(result.parsed);
    }
  }

  const byteSize = new TextEncoder().encode(content).length;

  return {
    ok: errors.length === 0 && duplicates.size === 0,
    totalLines: total,
    sampledLines: indices.length,
    uniqueCustomIds: customIds.size,
    duplicateCustomIds: Array.from(duplicates).slice(0, 10),
    errors,
    preview,
    byteSize,
  };
}
