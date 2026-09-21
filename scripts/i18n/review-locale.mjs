#!/usr/bin/env node
/**
 * OmniRoute — locale review pass. Sends the leaves a locale changed since a git ref to the
 * translation backend with a *reviewer* prompt (native speaker, dashboard context, keep
 * placeholders/ICU/markup) and applies only the corrections it returns. Produces a markdown
 * report so the operator can read what was changed.
 *
 * Usage: node scripts/i18n/review-locale.mjs --locale=pt-BR --since=<ref> [--dry-run] [--batch-size=30]
 */
import { existsSync, readFileSync, promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { backendConfig, callChat } from "./lib/translate-backend.mjs";

// ----- .env loader (same contract as sync-ui-keys.mjs: repo-root .env, already-set vars win)
(function loadDotEnv() {
  const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", ".env");
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
    // unreadable .env — the backend config will report the missing variables
  }
})();

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");

const flat = (o, p = "", out = {}) => {
  for (const [k, v] of Object.entries(o)) {
    const d = p ? `${p}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flat(v, d, out);
    else out[d] = v;
  }
  return out;
};

// 36 leaf keys of en.json carry a dot in their own name
// (`compliance.eventTypes["apiKey.ban"]`), so the flattened id is ambiguous:
// a naive split-and-descend walked into a missing `apiKey` object and the
// review died with "Cannot set properties of undefined (setting 'ban')" —
// after two hours for Hausa, before anything was written. Walk the object
// preferring the longest key that actually exists at each level.
export function setDeep(o, dotted, value) {
  const parts = dotted.split(".");
  const walk = (node, from) => {
    for (let len = parts.length - from; len >= 1; len--) {
      const key = parts.slice(from, from + len).join(".");
      if (!Object.prototype.hasOwnProperty.call(node, key)) continue;
      if (from + len === parts.length) {
        node[key] = value;
        return true;
      }
      if (node[key] && typeof node[key] === "object" && walk(node[key], from + len)) return true;
    }
    return false;
  };
  if (!walk(o, 0)) throw new Error(`key not found in catalog: ${dotted}`);
}

export function changedLeaves(before, after) {
  const out = {};
  for (const [k, v] of Object.entries(after)) {
    if (typeof v === "string" && before[k] !== v) out[k] = v;
  }
  return out;
}

// One upstream hiccup used to abort the whole run through main().catch, and
// the catalog was written only at the end — a 13k-leaf review (2h40 for
// Amharic) lost everything. Each batch is retried with a backoff and, if it
// still fails, skipped and reported instead of killing the run.
export async function withRetries(
  fn,
  { attempts = 4, delaysMs = [2000, 10000, 30000], onRetry } = {}
) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn(i);
    } catch (err) {
      lastErr = err;
      if (i + 1 < attempts) {
        onRetry?.(err, i + 1);
        await new Promise((r) => setTimeout(r, delaysMs[Math.min(i, delaysMs.length - 1)]));
      }
    }
  }
  throw lastErr;
}

export function parseReviewResponse(text, ids) {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return {};
  let parsed;
  try {
    parsed = JSON.parse(m[0]);
  } catch {
    return {};
  }
  const allowed = new Set(ids);
  const out = {};
  for (const [id, v] of Object.entries(parsed)) {
    if (allowed.has(id) && typeof v === "string" && v.trim() && v.trim() !== "OK") {
      out[id] = v.trim();
    }
  }
  return out;
}

const REVIEW_SYSTEM = (english, native) =>
  `You are a senior ${english} (${native}) localization reviewer for a developer-facing dashboard (an LLM proxy/router called OmniRoute). You receive a JSON object mapping ids to {en, current}. For every id, answer "OK" when the current translation is correct, natural and complete, or return the corrected ${english} string. Rules: keep every placeholder ({name}, {count, plural, …}), ICU syntax, HTML/markdown, product names (OmniRoute, Claude, Codex, MCP, A2A) and technical identifiers exactly as in the English; do not translate code; prefer the terminology already used in "current" when it is fine. Reply with ONLY a JSON object {id: "OK" | "corrected string"}.`;

function parseArgs(argv) {
  const o = { locale: null, since: null, dryRun: false, batchSize: 30 };
  for (const a of argv.slice(2)) {
    if (a.startsWith("--locale=")) o.locale = a.slice(9);
    else if (a.startsWith("--since=")) o.since = a.slice(8);
    else if (a === "--dry-run") o.dryRun = true;
    else if (a.startsWith("--batch-size=")) o.batchSize = Math.max(1, Number(a.slice(13)) || 30);
  }
  if (!o.locale || !o.since) throw new Error("--locale=<code> and --since=<git ref> are required");
  return o;
}

async function main() {
  const o = parseArgs(process.argv);
  const file = path.join(MESSAGES_DIR, `${o.locale}.json`);
  const rel = path.relative(ROOT, file);
  const after = JSON.parse(await fs.readFile(file, "utf8"));
  // A catalog that did not exist at --since (a locale created after it) is reviewed in full.
  let before = {};
  try {
    before = JSON.parse(
      execFileSync("git", ["show", `${o.since}:${rel}`], {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 1 << 28,
        stdio: ["ignore", "pipe", "ignore"],
      })
    );
  } catch {
    console.log(`[review] ${rel} does not exist at ${o.since} — reviewing every leaf`);
  }
  const en = flat(JSON.parse(await fs.readFile(path.join(MESSAGES_DIR, "en.json"), "utf8")));
  const changed = changedLeaves(flat(before), flat(after));
  const ids = Object.keys(changed);
  console.log(`[review] ${o.locale}: ${ids.length} leaves changed since ${o.since}`);
  if (o.dryRun) return;
  const config = JSON.parse(await fs.readFile(path.join(ROOT, "config", "i18n.json"), "utf8"));
  const entry = config.locales.find((l) => l.code === o.locale);
  const backend = backendConfig();
  const fixes = {};
  const skipped = [];
  const CHECKPOINT_EVERY = 25;
  const writeCatalog = async () => {
    for (const [id, v] of Object.entries(fixes)) {
      try {
        setDeep(after, id, v);
      } catch (err) {
        console.log(`[review] ${err.message} — correction dropped`);
      }
    }
    await fs.writeFile(file, JSON.stringify(after, null, 2) + "\n", "utf8");
  };
  let batchNo = 0;
  for (let i = 0; i < ids.length; i += o.batchSize) {
    const slice = ids.slice(i, i + o.batchSize);
    const payload = Object.fromEntries(
      slice.map((id) => [id, { en: en[id], current: changed[id] }])
    );
    try {
      const text = await withRetries(
        () =>
          callChat(
            [
              { role: "system", content: REVIEW_SYSTEM(entry.english ?? entry.name, entry.native) },
              { role: "user", content: JSON.stringify(payload) },
            ],
            backend
          ),
        {
          onRetry: (err, n) =>
            console.log(`[review] batch at ${i} failed (${err.message}) — retry ${n}`),
        }
      );
      Object.assign(fixes, parseReviewResponse(text, slice));
    } catch (err) {
      skipped.push(...slice);
      console.log(`[review] batch at ${i} skipped after retries: ${err.message}`);
    }
    console.log(
      `[review] ${Math.min(i + o.batchSize, ids.length)}/${ids.length} reviewed, ${Object.keys(fixes).length} corrections so far`
    );
    if (++batchNo % CHECKPOINT_EVERY === 0) await writeCatalog();
  }
  await writeCatalog();
  const reportDir = path.join(ROOT, "_artifacts", "i18n-review");
  await fs.mkdir(reportDir, { recursive: true });
  if (skipped.length) {
    await fs.writeFile(
      path.join(reportDir, `${o.locale}.skipped.json`),
      JSON.stringify(skipped, null, 2) + "\n",
      "utf8"
    );
  }
  const report = [
    `# Review ${o.locale} since ${o.since}`,
    "",
    `${ids.length} leaves reviewed, ${Object.keys(fixes).length} corrected, ${skipped.length} skipped (upstream failures).`,
    "",
    "| key | en | before | after |",
    "| --- | --- | --- | --- |",
    ...Object.entries(fixes).map(([id, v]) => `| \`${id}\` | ${en[id]} | ${changed[id]} | ${v} |`),
  ].join("\n");
  await fs.writeFile(path.join(reportDir, `${o.locale}.md`), report + "\n", "utf8");
  console.log(
    `[review] ${Object.keys(fixes).length} corrections applied${skipped.length ? `, ${skipped.length} leaves skipped` : ""}; report: _artifacts/i18n-review/${o.locale}.md`
  );
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((e) => {
    console.error(`[review] ${e.message}`);
    process.exitCode = 1;
  });
}
