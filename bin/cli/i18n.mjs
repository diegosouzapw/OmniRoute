import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = join(__dirname, "locales");
const FALLBACK_LOCALE = "en";
const I18N_CONFIG_PATH = join(__dirname, "..", "..", "config", "i18n.json");
let aliasMap = null; // lower-case tag → canonical locale code

function loadAliasMap() {
  if (aliasMap) return aliasMap;
  aliasMap = new Map();
  try {
    const { locales } = JSON.parse(readFileSync(I18N_CONFIG_PATH, "utf8"));
    for (const entry of locales) {
      aliasMap.set(entry.code.toLowerCase(), entry.code);
      for (const alias of entry.aliases || []) {
        aliasMap.set(String(alias).toLowerCase(), entry.code);
      }
    }
  } catch {
    // config absent (trimmed package): keep file-based detection only
  }
  return aliasMap;
}

const cache = new Map();
let activeLocale = null;
let fallbackCatalog = null;

export function detectLocale() {
  const raw =
    process.env.OMNIROUTE_LANG ||
    process.env.LC_ALL ||
    process.env.LC_MESSAGES ||
    process.env.LANG ||
    FALLBACK_LOCALE;
  return normalize(raw);
}

function normalize(raw) {
  const stripped = String(raw).split(".")[0].replaceAll("_", "-");
  if (!stripped || !/^[a-zA-Z0-9-]+$/.test(stripped)) return FALLBACK_LOCALE;
  if (hasCatalog(stripped)) return stripped;
  const lower = stripped.toLowerCase();
  const base = lower.split("-")[0];
  const aliases = loadAliasMap();
  const viaAlias = aliases.get(lower) ?? aliases.get(base);
  if (viaAlias && hasCatalog(viaAlias)) return viaAlias;
  if (hasCatalog(base)) return base;
  const regional = [...new Set(aliases.values())].find(
    (code) => code.includes("-") && code.toLowerCase().split("-")[0] === base
  );
  if (regional && hasCatalog(regional)) return regional;
  return FALLBACK_LOCALE;
}

function hasCatalog(locale) {
  return existsSync(join(LOCALES_DIR, `${locale}.json`));
}

function flattenToMap(obj, prefix, result) {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      flattenToMap(value, fullKey, result);
    } else if (typeof value === "string") {
      result.set(fullKey, value);
    }
  }
}

function loadCatalog(locale) {
  if (cache.has(locale)) return cache.get(locale);
  const file = join(LOCALES_DIR, `${locale}.json`);
  if (!existsSync(file)) {
    cache.set(locale, null);
    return null;
  }
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8"));
    const flat = new Map();
    flattenToMap(parsed, "", flat);
    cache.set(locale, flat);
    return flat;
  } catch {
    cache.set(locale, null);
    return null;
  }
}

export function setLocale(locale) {
  activeLocale = normalize(locale);
  loadCatalog(activeLocale);
  return activeLocale;
}

export function getLocale() {
  if (!activeLocale) activeLocale = detectLocale();
  return activeLocale;
}

function interpolate(template, vars) {
  if (!vars) return template;
  const entries = Object.entries(vars);
  if (entries.length === 0) return template;
  const varMap = new Map(entries);
  return template.replace(/\{(\w+)\}/g, (match, name) => {
    const v = varMap.get(name);
    return v !== undefined ? String(v) : match;
  });
}

export function t(key, vars) {
  if (!activeLocale) activeLocale = detectLocale();
  const primary = loadCatalog(activeLocale);
  const fromPrimary = primary?.get(key);
  if (fromPrimary !== undefined) return interpolate(fromPrimary, vars);

  if (activeLocale !== FALLBACK_LOCALE) {
    if (!fallbackCatalog) fallbackCatalog = loadCatalog(FALLBACK_LOCALE);
    const fromFallback = fallbackCatalog?.get(key);
    if (fromFallback !== undefined) return interpolate(fromFallback, vars);
  }
  return key;
}

export function resetForTests() {
  cache.clear();
  activeLocale = null;
  fallbackCatalog = null;
  aliasMap = null;
}
