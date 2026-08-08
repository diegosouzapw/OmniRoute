#!/usr/bin/env node
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import { DEVIN_MODEL_CATALOG } from "../../open-sse/config/providers/registry/devin/catalog.ts";

const candidateFields = new Set([
  "model_id",
  "modelId",
  "model_uid",
  "modelUid",
  "family_uid",
  "familyUid",
]);

function normalizeModelId(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function collect(value, candidates) {
  if (Array.isArray(value)) {
    value.forEach((item) => collect(item, candidates));
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, nested] of Object.entries(value)) {
    if (
      typeof nested === "string" &&
      candidateFields.has(key) &&
      /^[a-z0-9][a-z0-9._/-]*$/i.test(nested)
    ) {
      candidates.push(nested);
    }
    collect(nested, candidates);
  }
}

export function selectLiveModel(
  document,
  environment = process.env,
  catalog = DEVIN_MODEL_CATALOG
) {
  const candidates = [];
  collect(document, candidates);
  const unique = [...new Set(candidates)];
  const normalizedCatalog = new Map();
  for (const entry of catalog) {
    const normalized = normalizeModelId(entry.id);
    const existing = normalizedCatalog.get(normalized) || [];
    existing.push(entry.id);
    normalizedCatalog.set(normalized, existing);
  }
  for (const [normalized, ids] of normalizedCatalog) {
    if (ids.length > 1) {
      throw new Error(
        `Ambiguous OmniRoute catalog normalization for ${normalized}: ${ids.join(", ")}`
      );
    }
  }
  const catalogIds = new Set(catalog.map((entry) => entry.id));
  const available = [
    ...new Set(
      unique
        .map((candidate) => normalizeModelId(candidate))
        .filter((candidate) => normalizedCatalog.has(candidate))
    ),
  ];

  for (const [name, configured] of [
    ["DEVIN_BRIDGE_SONNET_MODEL", environment.DEVIN_BRIDGE_SONNET_MODEL],
    ["DEVIN_BRIDGE_OPUS_MODEL", environment.DEVIN_BRIDGE_OPUS_MODEL],
    ["DEVIN_BRIDGE_HAIKU_MODEL", environment.DEVIN_BRIDGE_HAIKU_MODEL],
    ["DEVIN_BRIDGE_SUBAGENT_MODEL", environment.DEVIN_BRIDGE_SUBAGENT_MODEL],
  ]) {
    if (!configured) continue;
    const prefix = "devin-cli-agentic/";
    const modelId = configured.startsWith(prefix) ? configured.slice(prefix.length) : "";
    if (!modelId || !catalogIds.has(modelId) || !available.includes(modelId)) {
      throw new Error(`${name} is not a model returned by Devin and present in OmniRoute`);
    }
  }

  const selected =
    available.find((candidate) => candidate === "swe-1-7-lightning") ||
    available.find((candidate) => candidate === "swe-1-7") ||
    available.find((candidate) => /swe|claude|gpt|gemini/i.test(candidate)) ||
    available[0];

  if (!selected) {
    throw new Error("Devin returned no model identifier present in OmniRoute's Devin catalog");
  }
  return selected;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  const document = JSON.parse(fs.readFileSync(0, "utf8"));
  process.stdout.write(selectLiveModel(document));
}
