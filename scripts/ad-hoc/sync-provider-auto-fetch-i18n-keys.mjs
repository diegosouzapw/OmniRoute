#!/usr/bin/env node
/**
 * One-shot, narrowly-scoped i18n sync for PR #10603.
 *
 * The full `i18n:sync-ui` tool syncs every missing key against en.json (which
 * also picks up an unrelated pre-existing ~33-key backlog per locale). This
 * PR only added 11 new keys under `providers.` (autoFetchModels-prefixed,
 * overridesUpstreamModel-prefixed, resetToUpstreamDefaults-prefixed), so
 * this script translates and inserts only those 11 keys into every locale
 * file that is missing them, leaving everything else in each locale file
 * byte-identical. Reuses the same translation backend env vars as
 * scripts/i18n/sync-ui-keys.mjs (OMNIROUTE_TRANSLATION_API_URL/KEY/MODEL).
 *
 * Usage: node scripts/ad-hoc/sync-provider-auto-fetch-i18n-keys.mjs
 */

import { promises as fs, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");
const CONFIG_PATH = path.join(ROOT, "config", "i18n.json");
const ENV_PATH = path.join(ROOT, ".env");

const TARGET_KEYS = [
  "autoFetchModels",
  "autoFetchModelsTooltip",
  "autoFetchModelsEnabled",
  "autoFetchModelsDisabled",
  "autoFetchModelsToggleFailed",
  "autoFetchModelsPartialFailure",
  "overridesUpstreamModel",
  "overridesUpstreamModelHint",
  "resetToUpstreamDefaults",
  "resetToUpstreamDefaultsSuccess",
  "resetToUpstreamDefaultsFailed",
];
const NAMESPACE = "providers";

function loadDotEnv() {
  if (!existsSync(ENV_PATH)) return;
  const content = readFileSync(ENV_PATH, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (!key || process.env[key] !== undefined) continue;
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

function requireEnv(name) {
  const v = process.env[name];
  if (!v || !v.trim()) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return v.trim();
}

function backendConfig() {
  const apiUrl = requireEnv("OMNIROUTE_TRANSLATION_API_URL").replace(/\/$/, "");
  const apiKey = requireEnv("OMNIROUTE_TRANSLATION_API_KEY");
  const model = requireEnv("OMNIROUTE_TRANSLATION_MODEL");
  const timeoutMs = Number(process.env.OMNIROUTE_TRANSLATION_TIMEOUT_MS || 60000);
  return { apiUrl, apiKey, model, timeoutMs };
}

async function callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry = 0) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages, temperature: 0.15, stream: false }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const transient = res.status === 408 || res.status === 429 || res.status >= 500;
      if (transient && retry < 2) {
        const wait = 1500 + retry * 1500;
        await new Promise((r) => setTimeout(r, wait));
        return callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry + 1);
      }
      throw new Error(`upstream ${res.status}: ${text.slice(0, 200)}`);
    }
    const json = await res.json();
    const content = json?.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content) throw new Error("upstream returned empty content");
    return content;
  } catch (err) {
    if (err?.name === "AbortError") {
      if (retry < 2) return callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry + 1);
      throw new Error(`timeout after ${timeoutMs}ms`);
    }
    if (retry < 2) {
      await new Promise((r) => setTimeout(r, 1500));
      return callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry + 1);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
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

async function translateString(englishValue, localeEntry, backend) {
  const englishName = localeEntry.english ?? localeEntry.name;
  const native = localeEntry.native ?? localeEntry.name;
  const messages = [
    { role: "system", content: TRANSLATION_SYSTEM(englishName, native) },
    { role: "user", content: englishValue },
  ];
  const out = await callChat(messages, backend);
  return out.trim();
}

function createLimiter(max) {
  let active = 0;
  const queue = [];
  const next = () => {
    if (!queue.length || active >= max) return;
    active++;
    const { fn, resolve, reject } = queue.shift();
    fn()
      .then((v) => {
        active--;
        resolve(v);
        next();
      })
      .catch((err) => {
        active--;
        reject(err);
        next();
      });
  };
  return (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      next();
    });
}

async function main() {
  loadDotEnv();
  const backend = backendConfig();
  const config = JSON.parse(await fs.readFile(CONFIG_PATH, "utf8"));

  const en = JSON.parse(await fs.readFile(path.join(MESSAGES_DIR, "en.json"), "utf8"));
  const englishValues = Object.fromEntries(TARGET_KEYS.map((k) => [k, en[NAMESPACE][k]]));
  for (const [k, v] of Object.entries(englishValues)) {
    if (typeof v !== "string") throw new Error(`en.json is missing providers.${k}`);
  }

  const onDisk = new Set(
    (await fs.readdir(MESSAGES_DIR)).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5))
  );
  const targetLocales = config.locales
    .map((l) => l.code)
    .filter((code) => code !== "en" && onDisk.has(code));

  const limit = createLimiter(Number(process.env.OMNIROUTE_TRANSLATION_CONCURRENCY || 4));
  let filesChanged = 0;
  let keysAdded = 0;

  for (const code of targetLocales) {
    const localeEntry = config.locales.find((l) => l.code === code);
    const localePath = path.join(MESSAGES_DIR, `${code}.json`);
    const target = JSON.parse(await fs.readFile(localePath, "utf8"));
    if (!target[NAMESPACE] || typeof target[NAMESPACE] !== "object") {
      throw new Error(`${code}.json has no "providers" namespace object`);
    }

    const missingKeys = TARGET_KEYS.filter(
      (k) => typeof target[NAMESPACE][k] !== "string" || target[NAMESPACE][k].length === 0
    );
    if (missingKeys.length === 0) {
      console.log(`[sync-provider-i18n] ${code}: already has all 11 keys — skipping`);
      continue;
    }

    await Promise.all(
      missingKeys.map((k) =>
        limit(async () => {
          const translated = await translateString(englishValues[k], localeEntry, backend);
          target[NAMESPACE][k] = translated;
        })
      )
    );

    await fs.writeFile(localePath, JSON.stringify(target, null, 2) + "\n", "utf8");
    filesChanged++;
    keysAdded += missingKeys.length;
    console.log(`[sync-provider-i18n] ${code}: added ${missingKeys.length} keys`);
  }

  console.log(`[sync-provider-i18n] done: ${filesChanged} files changed, ${keysAdded} keys added`);
}

main().catch((err) => {
  console.error("[sync-provider-i18n] FAILED:", err);
  process.exitCode = 1;
});
