#!/usr/bin/env node
/**
 * One-shot script: translates the 10 new `endpoint.*` tier/badge keys
 * to every non-English locale in src/i18n/messages/.
 *
 * Only writes keys that are genuinely absent — never overwrites existing
 * translations. Skips pt-BR and en (already have the keys).
 *
 * Usage:
 *   node scripts/i18n/translate-endpoint-tier-keys.mjs
 *   node scripts/i18n/translate-endpoint-tier-keys.mjs --dry-run
 *   node scripts/i18n/translate-endpoint-tier-keys.mjs --locale=de,fr
 */

import { promises as fs, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");
const I18N_CONFIG = path.join(ROOT, "config", "i18n.json");

// ---- .env loader -----------------------------------------------------------
(function loadDotEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!existsSync(envPath)) return;
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const rawLine of raw.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq <= 0) continue;
      const key = line.slice(0, eq).trim();
      if (!key || process.env[key] !== undefined) continue;
      let value = line.slice(eq + 1);
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch {
    /* ignore */
  }
})();

// ---- CLI opts --------------------------------------------------------------
const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const localeFilter = args
  .find((a) => a.startsWith("--locale="))
  ?.slice("--locale=".length)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

// ---- Helpers ---------------------------------------------------------------
function log(...parts) {
  console.log("[endpoint-tier-i18n]", ...parts);
}

function requireEnv(name) {
  const val = process.env[name];
  if (!val) throw new Error(`Missing required env var: ${name}`);
  return val;
}

function backendConfig() {
  const apiUrl = requireEnv("OMNIROUTE_TRANSLATION_API_URL").replace(/\/$/, "");
  const apiKey = requireEnv("OMNIROUTE_TRANSLATION_API_KEY");
  const model = requireEnv("OMNIROUTE_TRANSLATION_MODEL");
  const timeoutMs = Number(process.env.OMNIROUTE_TRANSLATION_TIMEOUT_MS || 60000);
  return { apiUrl, apiKey, model, timeoutMs };
}

const TRANSLATION_SYSTEM = (englishName, native) =>
  [
    `You are a professional translator for technical software UI strings.`,
    `Translate the user's English UI string into ${englishName} (native: ${native}).`,
    `Return ONLY the translated string — no quotes, no commentary, no surrounding markdown.`,
    `Preserve placeholders such as {name}, {{count}}, %s, %d, and any HTML tags exactly.`,
    `Do NOT translate command names (npm/git/curl/etc), code identifiers, URLs, or environment variable names.`,
    `Keep the same casing style (Title Case stays Title Case, sentence case stays sentence case).`,
    `Keep punctuation and trailing whitespace identical to the source.`,
  ].join(" ");

async function callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry = 0) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages, temperature: 0.15, stream: false }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const transient = res.status === 408 || res.status === 429 || res.status >= 500;
      if (transient && retry < 2) {
        const wait = 1500 * (retry + 1);
        log(`upstream ${res.status} — retrying after ${wait}ms`);
        await new Promise((r) => setTimeout(r, wait));
        return callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry + 1);
      }
      throw new Error(`upstream ${res.status}: ${text.slice(0, 200)}`);
    }
    const json = await res.json();
    const content = json?.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content) throw new Error("empty content from upstream");
    return content.trim();
  } catch (err) {
    if (err?.name === "AbortError") {
      if (retry < 2) {
        log(`timeout — retrying`);
        return callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry + 1);
      }
      throw new Error(`timeout after ${timeoutMs}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function translateString(englishValue, localeEntry, backend) {
  const messages = [
    { role: "system", content: TRANSLATION_SYSTEM(localeEntry.english, localeEntry.native) },
    { role: "user", content: englishValue },
  ];
  return callChat(messages, backend);
}

// ---- Keys to translate -----------------------------------------------------
// These 10 keys were added to en.json and pt-BR.json in the api-endpoints audit
// but not propagated to other locales.
const NEW_ENDPOINT_KEYS = {
  tierAll: "All tiers",
  tierAuth: "Auth",
  tierLoopback: "Local-only",
  tierAlwaysProtected: "Always-protected",
  tierPublic: "Public",
  showInternal: "Show internal",
  hideInternal: "Hide internal",
  badgeLoopbackTooltip: "Local-only: blocked from non-loopback IPs",
  badgeAlwaysProtectedTooltip: "Always protected: requires auth even when requireLogin=false",
  badgeInternalTooltip: "Internal route — not part of the public API",
};

// Technical terms that stay in English regardless of locale
const KEEP_AS_ENGLISH = new Set(["tierAuth"]);

// ---- Main ------------------------------------------------------------------
async function main() {
  const config = JSON.parse(readFileSync(I18N_CONFIG, "utf8"));
  if (!config.locales || !Array.isArray(config.locales)) {
    throw new Error("config/i18n.json: expected { locales: [] }");
  }

  // Exclude English source + pt-BR (already has keys)
  const SKIP = new Set(["en", "pt-BR"]);
  let locales = config.locales.filter((l) => !SKIP.has(l.code));
  if (localeFilter && localeFilter.length > 0) {
    locales = locales.filter((l) => localeFilter.includes(l.code));
  }

  const backend = isDryRun ? null : backendConfig();

  log(
    isDryRun ? "[DRY RUN]" : "",
    `Processing ${locales.length} locales — ${Object.keys(NEW_ENDPOINT_KEYS).length} keys each`
  );

  let totalAdded = 0;
  let totalSkipped = 0;

  for (const locale of locales) {
    const filePath = path.join(MESSAGES_DIR, `${locale.code}.json`);
    if (!existsSync(filePath)) {
      log(`${locale.code}: file not found — skipping`);
      continue;
    }

    const data = JSON.parse(readFileSync(filePath, "utf8"));
    const ep = (data.endpoint ??= {});

    const toTranslate = Object.entries(NEW_ENDPOINT_KEYS).filter(([k]) => !(k in ep));

    if (toTranslate.length === 0) {
      log(`${locale.code}: all keys already present — skipping`);
      continue;
    }

    log(`${locale.code}: adding ${toTranslate.length} keys…`);

    let added = 0;
    for (const [key, englishValue] of toTranslate) {
      if (isDryRun) {
        log(`  [DRY] ${locale.code}.endpoint.${key} = "${englishValue}" → <translated>`);
        added++;
        continue;
      }

      try {
        let translated;
        if (KEEP_AS_ENGLISH.has(key)) {
          translated = englishValue;
        } else {
          translated = await translateString(englishValue, locale, backend);
        }
        ep[key] = translated;
        log(`  ${locale.code}.endpoint.${key} = "${translated}"`);
        added++;
      } catch (err) {
        log(`  ERROR translating ${locale.code}.endpoint.${key}: ${err.message}`);
        ep[key] = `__MISSING__:${englishValue}`;
        added++;
      }
    }

    if (!isDryRun) {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    }

    totalAdded += added;
    totalSkipped += Object.keys(NEW_ENDPOINT_KEYS).length - added;
  }

  log(`Done. Added ${totalAdded} keys, ${totalSkipped} already present.`);
}

main().catch((err) => {
  console.error("[endpoint-tier-i18n] FATAL:", err.message);
  process.exit(1);
});
