/**
 * OmniRoute — shared translation backend for the i18n tooling.
 *
 * Thin OpenAI-compatible chat-completions client used by
 * `scripts/i18n/sync-ui-keys.mjs` (and the locale bootstrap orchestrator that
 * builds on it) to translate UI strings. Configuration comes from the
 * environment only — this module never reads `.env` itself; the calling
 * script is responsible for loading it before `backendConfig()` runs:
 *
 *   OMNIROUTE_TRANSLATION_API_URL     base URL (…/v1) of the chat backend
 *   OMNIROUTE_TRANSLATION_API_KEY     bearer token
 *   OMNIROUTE_TRANSLATION_MODEL       model id
 *   OMNIROUTE_TRANSLATION_TIMEOUT_MS  per-request timeout (default 60000)
 *
 * Two translation modes are exposed:
 *   - `translateString(en, localeEntry, backend)` — one request per string.
 *   - `translateBatch(entries, localeEntry, backend)` — up to N strings per
 *     request, sent and returned as a JSON object keyed by caller-chosen ids.
 *     `parseBatchResponse` is the pure parser behind it; it throws whenever the
 *     model's answer cannot be trusted (not a JSON object, missing id,
 *     non-string or empty value) so callers can fall back to per-string calls.
 *
 * `localeEntry` is an entry of `config/i18n.json` (`code`, `english`, `native`,
 * `name`).
 */

import process from "node:process";

function logWarn(...parts) {
  console.warn("[i18n-translate-backend] WARN", ...parts);
}

export function requireEnv(name) {
  const v = process.env[name];
  if (!v || !v.trim()) {
    throw new Error(
      `Missing required env var: ${name}. Set it in .env (see docs/guides/I18N.md → "Translation pipeline").`
    );
  }
  return v.trim();
}

export function backendConfig() {
  const apiUrl = requireEnv("OMNIROUTE_TRANSLATION_API_URL").replace(/\/$/, "");
  const apiKey = requireEnv("OMNIROUTE_TRANSLATION_API_KEY");
  const model = requireEnv("OMNIROUTE_TRANSLATION_MODEL");
  const timeoutMs = Number(process.env.OMNIROUTE_TRANSLATION_TIMEOUT_MS || 60000);
  return { apiUrl, apiKey, model, timeoutMs };
}

export async function callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry = 0) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.15,
        stream: false,
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const transient = res.status === 408 || res.status === 429 || res.status >= 500;
      if (transient && retry < 1) {
        const wait = 1500 + retry * 1500;
        logWarn(`upstream ${res.status} — retrying after ${wait}ms`);
        await new Promise((r) => setTimeout(r, wait));
        return callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry + 1);
      }
      throw new Error(`upstream ${res.status}: ${text.slice(0, 200)}`);
    }
    const json = await res.json();
    const content = json?.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content) {
      throw new Error("upstream returned empty content");
    }
    return content;
  } catch (err) {
    if (err?.name === "AbortError") {
      if (retry < 1) {
        logWarn(`timeout after ${timeoutMs}ms — retrying`);
        return callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry + 1);
      }
      throw new Error(`timeout after ${timeoutMs}ms`);
    }
    if (
      retry < 1 &&
      err instanceof TypeError &&
      /fetch failed|ECONN|ENOTFOUND|network/i.test(String(err.cause ?? err.message))
    ) {
      logWarn(`network error: ${err.message} — retrying`);
      await new Promise((r) => setTimeout(r, 1500));
      return callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry + 1);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ----- Per-string mode -----------------------------------------------------

export const TRANSLATION_SYSTEM = (englishName, native) =>
  [
    `You are a professional translator for technical software UI strings.`,
    `Translate the user's English UI string into ${englishName} (native: ${native}).`,
    `Return ONLY the translated string — no quotes, no commentary, no surrounding markdown.`,
    `Preserve placeholders such as {name}, {{count}}, %s, %d, and any HTML tags exactly.`,
    `Do NOT translate command names (npm/git/curl/etc), code identifiers, URLs, or environment variable names.`,
    `Keep the same casing style (Title Case stays Title Case, sentence case stays sentence case).`,
    `Keep punctuation and trailing whitespace identical to the source.`,
  ].join(" ");

export async function translateString(englishValue, localeEntry, backend) {
  const englishName = localeEntry.english ?? localeEntry.name;
  const native = localeEntry.native ?? localeEntry.name;
  const messages = [
    { role: "system", content: TRANSLATION_SYSTEM(englishName, native) },
    { role: "user", content: englishValue },
  ];
  const out = await callChat(messages, backend);
  return out.trim();
}

// ----- Batch mode ----------------------------------------------------------

export const BATCH_SYSTEM = (englishName, native) =>
  [
    `You are a professional UI translator for a developer tool (OmniRoute).`,
    `Translate every value of the JSON object the user sends from English into ${englishName} (native: ${native}).`,
    `Keep the keys EXACTLY as given. Keep ICU placeholders like {count} or {name}, HTML tags, product names, provider names, URLs, file paths and code unchanged.`,
    `Return ONLY a JSON object with the same keys and translated string values — no prose, no markdown fence.`,
  ].join(" ");

/**
 * Pure parser for a batch answer. Accepts a bare JSON object or one wrapped in
 * a ```json fence; anything else (prose around the object, arrays, invalid
 * JSON) throws. Every id in `expectedIds` must be present as an OWN property
 * (an inherited name such as `constructor` counts as missing) with a non-empty
 * string value — an empty translation would replace the `__MISSING__` marker
 * for good, so it fails the batch instead (the per-string path rejects empty
 * completions the same way). Values are trimmed, like `translateString` does.
 *
 * @param {string} text raw assistant content
 * @param {string[]} expectedIds ids the caller sent (and expects back)
 * @returns {Map<string, string>} id → translated value, in `expectedIds` order
 */
export function parseBatchResponse(text, expectedIds) {
  const trimmed = String(text)
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) {
    throw new Error("batch response is not a JSON object");
  }
  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch (err) {
    throw new Error(`batch response is not valid JSON: ${err.message}`);
  }
  const out = new Map();
  for (const id of expectedIds) {
    if (!Object.hasOwn(parsed, id)) throw new Error(`batch response missing id ${id}`);
    if (typeof parsed[id] !== "string") {
      throw new Error(`batch response has non-string value for ${id}`);
    }
    const value = parsed[id].trim();
    if (!value) throw new Error(`batch response has empty value for ${id}`);
    out.set(id, value);
  }
  return out;
}

/**
 * Translates up to N strings in ONE chat request. `entries` are
 * `{ id, text }` pairs; the ids are echoed back as the keys of the answer.
 * Throws (via `callChat` or `parseBatchResponse`) when the batch cannot be
 * trusted — callers are expected to fall back to `translateString`.
 *
 * @returns {Promise<Map<string, string>>} id → translated value
 */
export async function translateBatch(entries, localeEntry, backend) {
  const englishName = localeEntry.english ?? localeEntry.name;
  const native = localeEntry.native ?? localeEntry.name;
  const payload = Object.fromEntries(entries.map((e) => [e.id, e.text]));
  const messages = [
    { role: "system", content: BATCH_SYSTEM(englishName, native) },
    { role: "user", content: JSON.stringify(payload) },
  ];
  const out = await callChat(messages, backend);
  return parseBatchResponse(
    out,
    entries.map((e) => e.id)
  );
}
