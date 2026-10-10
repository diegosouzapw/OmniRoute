/**
 * WhyCodes config generator — TOML.
 *
 * WhyCodes (`whycodes provider add` / `crates/config`) stores custom
 * OpenAI-compatible providers under `[providers.<id>]` with `base_url` (or
 * `api_base`) and optional `api_key`. The Chat Completions client accepts a
 * bare `/v1` base. Default model is `[default_model]`.
 *
 * An existing `config.toml` is merged conservatively: unrelated keys stay;
 * only `providers.omniroute` and `default_model` (when a model is supplied)
 * are written. A file that fails TOML parsing aborts instead of clobbering.
 */

import fs from "node:fs";
import { parse, stringify } from "smol-toml";

import { getWhyCodesConfigPath } from "./whycodesHome.ts";

export const WHYCODES_PROVIDER_ID = "omniroute";

export function ensureWhyCodesV1BaseUrl(url: string): string {
  let base = String(url || "").trim();
  let end = base.length;
  while (end > 0 && base[end - 1] === "/") end--;
  base = end < base.length ? base.slice(0, end) : base;
  return base.endsWith("/v1") ? base : `${base}/v1`;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function mergeWhyCodesConfig(
  existing: Record<string, unknown>,
  options: { baseUrl: string; apiKey: string; model?: string }
): Record<string, unknown> {
  const providers = asRecord(existing.providers);
  const previous = asRecord(providers[WHYCODES_PROVIDER_ID]);
  const merged: Record<string, unknown> = {
    ...existing,
    providers: {
      ...providers,
      [WHYCODES_PROVIDER_ID]: {
        ...previous,
        name: WHYCODES_PROVIDER_ID,
        base_url: ensureWhyCodesV1BaseUrl(options.baseUrl),
        api_key: options.apiKey,
      },
    },
  };
  if (options.model) {
    const previousDefault = asRecord(existing.default_model);
    merged.default_model = {
      ...previousDefault,
      provider_id: WHYCODES_PROVIDER_ID,
      model_id: options.model,
      supports_tools: true,
    };
  }
  return merged;
}

export function generateWhyCodesConfig(options: {
  baseUrl: string;
  apiKey: string;
  model?: string;
  configPath?: string;
}): string {
  const configPath = options.configPath ?? getWhyCodesConfigPath();

  let existing: Record<string, unknown> = {};
  if (fs.existsSync(configPath)) {
    const raw = fs.readFileSync(configPath, "utf-8");
    try {
      existing = parse(raw) as Record<string, unknown>;
    } catch {
      throw new Error(
        `Existing ${configPath} is not valid TOML; refusing to overwrite it. ` +
          "Fix or move the file, then retry."
      );
    }
  }

  const merged = mergeWhyCodesConfig(existing, options);
  return stringify(merged);
}

export function redactWhyCodesApiKey(toml: string): string {
  return toml.replace(/(api_key\s*=\s*)(["'])(?:\\.|[^\\])*?\2/gi, `$1"$OMNIROUTE_API_KEY"`);
}
