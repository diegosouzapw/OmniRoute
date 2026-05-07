import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CLI_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT_DIR = join(CLI_DIR, "..", "..");

export const COMMON_PROVIDERS = [
  { id: "openai", name: "OpenAI" },
  { id: "anthropic", name: "Anthropic" },
  { id: "google", name: "Google AI" },
  { id: "openrouter", name: "OpenRouter" },
  { id: "groq", name: "Groq" },
  { id: "mistral", name: "Mistral" },
];

function normalizeCatalogCategory(exportName) {
  const raw = exportName
    .replace(/_PROVIDERS$/, "")
    .toLowerCase()
    .replaceAll("_", "-");
  if (raw === "apikey") return "api-key";
  return raw;
}

function readStringProperty(source, property) {
  const match = source.match(new RegExp(`${property}:\\s*"([^"]*)"`));
  return match?.[1] || null;
}

function readBooleanProperty(source, property) {
  return new RegExp(`${property}:\\s*true`).test(source);
}

function findMatchingBrace(source, openIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  return -1;
}

function extractProviderEntries(blockSource, exportName) {
  const providers = [];
  const category = normalizeCatalogCategory(exportName);
  const entryPattern = /(?:^|\n)\s{2}(?:"([^"]+)"|([A-Za-z0-9_-]+)):\s*\{/g;

  for (const match of blockSource.matchAll(entryPattern)) {
    const key = match[1] || match[2];
    const openIndex = blockSource.indexOf("{", match.index);
    const closeIndex = findMatchingBrace(blockSource, openIndex);
    if (!key || openIndex < 0 || closeIndex < 0) continue;

    const objectSource = blockSource.slice(openIndex, closeIndex + 1);
    const id = readStringProperty(objectSource, "id") || key;
    const name = readStringProperty(objectSource, "name") || id;

    providers.push({
      id,
      name,
      category,
      alias: readStringProperty(objectSource, "alias"),
      website: readStringProperty(objectSource, "website"),
      deprecated: readBooleanProperty(objectSource, "deprecated"),
      hasFree: readBooleanProperty(objectSource, "hasFree"),
      passthroughModels: readBooleanProperty(objectSource, "passthroughModels"),
    });
  }

  return providers;
}

function extractProviderBlocks(source) {
  const providers = [];
  const blockPattern = /^export const ([A-Z0-9_]+_PROVIDERS)\s*=\s*\{/gm;

  for (const match of source.matchAll(blockPattern)) {
    const exportName = match[1];
    const openIndex = source.indexOf("{", match.index);
    const closeIndex = findMatchingBrace(source, openIndex);
    if (!exportName || openIndex < 0 || closeIndex < 0) continue;

    providers.push(...extractProviderEntries(source.slice(openIndex + 1, closeIndex), exportName));
  }

  return providers;
}

function fallbackAvailableProviders() {
  return COMMON_PROVIDERS.map((provider) => ({
    ...provider,
    category: "api-key",
    alias: null,
    website: null,
    deprecated: false,
    hasFree: false,
    passthroughModels: false,
  }));
}

export function loadAvailableProviders(options = {}) {
  const rootDir = typeof options === "string" ? options : options.rootDir || DEFAULT_ROOT_DIR;
  const providersPath = join(rootDir, "src", "shared", "constants", "providers.ts");

  if (!existsSync(providersPath)) {
    return fallbackAvailableProviders();
  }

  try {
    const source = readFileSync(providersPath, "utf-8");
    const providers = extractProviderBlocks(source);
    if (providers.length === 0) return fallbackAvailableProviders();

    const seen = new Set();
    return providers.filter((provider) => {
      if (seen.has(provider.id)) return false;
      seen.add(provider.id);
      return true;
    });
  } catch {
    return fallbackAvailableProviders();
  }
}

export function getAvailableProviderCategories(providers = loadAvailableProviders()) {
  return [...new Set(providers.map((provider) => provider.category))].sort();
}

export function getProviderDisplayName(providerId) {
  return COMMON_PROVIDERS.find((provider) => provider.id === providerId)?.name || providerId;
}

export function formatProviderChoices() {
  return COMMON_PROVIDERS.map((provider, index) => `${index + 1}. ${provider.name}`).join("\n");
}

export function resolveProviderChoice(value) {
  const trimmed = String(value || "").trim();
  const numeric = Number.parseInt(trimmed, 10);
  if (Number.isInteger(numeric) && numeric >= 1 && numeric <= COMMON_PROVIDERS.length) {
    return COMMON_PROVIDERS[numeric - 1].id;
  }
  return trimmed || "openai";
}
