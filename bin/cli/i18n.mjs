import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = join(__dirname, "locales");
const FALLBACK_LOCALE = "en";

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
  const base = stripped.split("-")[0];
  if (hasCatalog(base)) return base;
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
}
