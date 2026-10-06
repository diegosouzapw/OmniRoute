import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
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
  const raw = exportName.split("_PROVIDERS")[0].toLowerCase().replaceAll("_", "-");
  if (raw === "apikey") return "api-key";
  return raw;
}

/**
 * Advance past a string literal, template literal, or comment starting at `i`.
 * Returns the index just after it, or -1 when `i` does not start one. Keeping
 * the scanner string/comment aware is what lets it walk braces safely — provider
 * notes routinely contain `{`, `}` and apostrophes.
 */
function skipNonCode(source, i) {
  const c = source[i];

  if (c === '"' || c === "'" || c === "`") {
    for (let j = i + 1; j < source.length; j++) {
      if (source[j] === "\\") {
        j++;
        continue;
      }
      if (source[j] === c) return j + 1;
    }
    return source.length;
  }

  if (c === "/" && source[i + 1] === "/") {
    const nl = source.indexOf("\n", i);
    return nl === -1 ? source.length : nl;
  }

  if (c === "/" && source[i + 1] === "*") {
    const close = source.indexOf("*/", i + 2);
    return close === -1 ? source.length : close + 2;
  }

  return -1;
}

/** Index of the `}` matching the `{` at `openIdx`, or -1. */
function findMatchingBrace(source, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < source.length; i++) {
    const skipped = skipNonCode(source, i);
    if (skipped !== -1) {
      i = skipped - 1;
      continue;
    }
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

const MEMBER_KEY = /(?:([A-Za-z_$][\w$]*)|"([^"]*)"|'([^']*)')\s*:/y;

/**
 * Parse the direct members of the object literal whose `{` is at `openIdx`.
 * Returns `[{ key, value }]` with `value` as the raw source slice.
 */
function parseObjectMembers(source, openIdx) {
  // An unbalanced literal (a missing `},` in a large data file — see #10093)
  // should not blank the whole catalog: scan to end-of-source so the entries
  // before the damage are still recovered.
  const matching = findMatchingBrace(source, openIdx);
  const close = matching === -1 ? source.length : matching;

  const members = [];
  let i = openIdx + 1;

  while (i < close) {
    if (/[\s,;]/.test(source[i])) {
      i++;
      continue;
    }

    // The key match MUST be attempted before skipNonCode: quoted keys such as
    // `"duckduckgo-web":` start with a quote, and skipping them as string
    // literals both loses the entry and desynchronizes the walk, which then
    // reports nested keys (`notice`, …) as top-level providers.
    MEMBER_KEY.lastIndex = i;
    const match = MEMBER_KEY.exec(source);
    if (!match) {
      const skipped = skipNonCode(source, i);
      i = skipped !== -1 ? skipped : i + 1;
      continue;
    }

    const key = match[1] ?? match[2] ?? match[3];
    let valueStart = MEMBER_KEY.lastIndex;
    while (valueStart < close && /\s/.test(source[valueStart])) valueStart++;

    let valueEnd;
    if (source[valueStart] === "{" || source[valueStart] === "[") {
      const openChar = source[valueStart];
      const closeChar = openChar === "{" ? "}" : "]";
      let depth = 0;
      let j = valueStart;
      for (; j < close; j++) {
        const s2 = skipNonCode(source, j);
        if (s2 !== -1) {
          j = s2 - 1;
          continue;
        }
        if (source[j] === openChar) depth++;
        else if (source[j] === closeChar) {
          depth--;
          if (depth === 0) break;
        }
      }
      valueEnd = j + 1;
    } else {
      let j = valueStart;
      for (; j < close; j++) {
        const s2 = skipNonCode(source, j);
        if (s2 !== -1) {
          j = s2 - 1;
          continue;
        }
        if (source[j] === ",") break;
      }
      valueEnd = j;
    }

    members.push({ key, value: source.slice(valueStart, valueEnd), valueStart });
    // Guarantee forward progress even on malformed input.
    i = valueEnd > i ? valueEnd : i + 1;
  }

  return members;
}

/** First string literal in a raw value (handles `"a" + "b"` continuations). */
function readString(raw) {
  if (raw == null) return null;
  const match = raw.match(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/);
  if (!match) return null;
  return (match[1] ?? match[2]).replace(/\\(.)/g, "$1");
}

function readBoolean(raw) {
  return String(raw).trim() === "true";
}

const PROVIDER_EXPORT =
  /(?:export\s+)?const\s+([A-Z0-9_]*_PROVIDERS[A-Z0-9_]*)\s*(?::[^=]+)?=\s*\{/g;

/**
 * Extract provider entries from a catalog source file.
 *
 * Deliberately dependency-free: `typescript` is a devDependency, so requiring it
 * at runtime made this silently return [] on every published install (#10080).
 * These files are pure data literals, so a string/comment-aware brace walk is
 * both sufficient and stable.
 */
export function extractProviderBlocks(source) {
  const providers = [];
  PROVIDER_EXPORT.lastIndex = 0;

  let exportMatch;
  while ((exportMatch = PROVIDER_EXPORT.exec(source)) !== null) {
    const exportName = exportMatch[1];
    const openIdx = source.indexOf("{", exportMatch.index + exportMatch[0].length - 1);
    if (openIdx === -1) continue;

    const category = normalizeCatalogCategory(exportName);

    for (const entry of parseObjectMembers(source, openIdx)) {
      if (!entry.value.startsWith("{")) continue; // spread / non-object member
      const fields = new Map(
        parseObjectMembers(source, entry.valueStart).map((f) => [f.key, f.value])
      );

      const id = readString(fields.get("id")) || entry.key;
      providers.push({
        id,
        name: readString(fields.get("name")) || id,
        category,
        alias: readString(fields.get("alias")),
        website: readString(fields.get("website")),
        deprecated: readBoolean(fields.get("deprecated")),
        hasFree: readBoolean(fields.get("hasFree")),
        passthroughModels: readBoolean(fields.get("passthroughModels")),
      });
    }

    // An unbalanced literal (see #10093) yields -1 here. Resetting lastIndex to
    // 0 would restart the scan from the top forever, so stop instead — the
    // entries recovered above are still returned.
    const closeIdx = findMatchingBrace(source, openIdx);
    if (closeIdx === -1) break;
    PROVIDER_EXPORT.lastIndex = closeIdx + 1;
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

function resolveProviderCatalogPath(rootDir, options = {}) {
  const configuredPath = options.catalogPath || process.env.OMNIROUTE_PROVIDER_CATALOG_PATH;
  if (configuredPath) {
    return isAbsolute(configuredPath) ? configuredPath : resolve(rootDir, configuredPath);
  }

  // The catalog used to be one god-file at constants/providers.ts. It was
  // decomposed into constants/providers/**, leaving the barrel with nothing but
  // re-exports and an empty `FREE_PROVIDERS = {}` — so parsing it alone yielded
  // zero providers and the CLI silently fell back to COMMON_PROVIDERS (#10080).
  // Prefer the directory; keep the legacy file for older trees.
  const catalogDir = join(rootDir, "src", "shared", "constants", "providers");
  if (existsSync(catalogDir)) return catalogDir;
  return join(rootDir, "src", "shared", "constants", "providers.ts");
}

/** Every .ts catalog file under `dir`, one level of subdirectories deep. */
function collectCatalogFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectCatalogFiles(full));
    } else if (entry.name.endsWith(".ts") && !entry.name.endsWith(".d.ts")) {
      files.push(full);
    }
  }
  return files.sort();
}

export function loadAvailableProviders(options = {}) {
  const rootDir = typeof options === "string" ? options : options.rootDir || DEFAULT_ROOT_DIR;
  const providersPath = resolveProviderCatalogPath(rootDir, options);

  if (!existsSync(providersPath)) {
    return fallbackAvailableProviders();
  }

  try {
    const sources = statSync(providersPath).isDirectory()
      ? collectCatalogFiles(providersPath)
      : [providersPath];
    const providers = sources.flatMap((file) => extractProviderBlocks(readFileSync(file, "utf-8")));
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
