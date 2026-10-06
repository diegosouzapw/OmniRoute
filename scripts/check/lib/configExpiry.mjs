/**
 * scripts/check/lib/configExpiry.mjs
 *
 * Finds dated validity fields in JSON config packs so a test can fail BEFORE
 * they lapse. Origin: config/alibaba-free-tier-allowlist.json carried
 * `"validUntil": "2026-08-27"`; on 2026-08-28 the loader started (correctly)
 * rejecting the pack and a test that asserted "the shipped pack loads" turned
 * every PR and main red with no commit involved (#11866). A time bomb, not a
 * regression — and the only kind of defect a diff review can never catch.
 *
 * Pure helpers; the repo-wide assertion lives in
 * tests/unit/config-expiry-time-bomb.test.ts.
 */
import fs from "node:fs";
import path from "node:path";

export const EXPIRY_KEY =
  /^(validUntil|valid_until|validTo|valid_to|expiresAt|expires_at|expiry|expires)$/;
const DAY_MS = 86_400_000;

/**
 * Walks a parsed JSON value and returns every string-valued expiry field.
 * @returns {{ file: string, keyPath: string, raw: string, expiresAt: number|null }[]}
 */
export function collectExpiryFields(value, file, keyPath = []) {
  const out = [];
  if (Array.isArray(value)) {
    value.forEach((v, i) => out.push(...collectExpiryFields(v, file, [...keyPath, String(i)])));
    return out;
  }
  if (!value || typeof value !== "object") return out;
  for (const [key, v] of Object.entries(value)) {
    const kp = [...keyPath, key];
    if (EXPIRY_KEY.test(key) && typeof v === "string") {
      const ms = Date.parse(v);
      out.push({ file, keyPath: kp.join("."), raw: v, expiresAt: Number.isFinite(ms) ? ms : null });
    } else if (v && typeof v === "object") {
      out.push(...collectExpiryFields(v, file, kp));
    }
  }
  return out;
}

/** @returns {"expired"|"expiring"|"ok"|"unparseable"} */
export function classifyExpiry(field, nowMs, warnDays = 7) {
  if (field.expiresAt === null) return "unparseable";
  if (field.expiresAt < nowMs) return "expired";
  if (field.expiresAt < nowMs + warnDays * DAY_MS) return "expiring";
  return "ok";
}

/** All *.json under dir, recursively, skipping node_modules. Sorted for stable output. */
export function walkJsonFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const e of entries) {
      const full = path.join(current, e.name);
      if (e.isDirectory()) {
        if (e.name !== "node_modules") stack.push(full);
      } else if (e.isFile() && e.name.endsWith(".json")) {
        out.push(full);
      }
    }
  }
  return out.sort();
}

/**
 * Scans every JSON file under `dir`; `file` in the result is relative to `dir`
 * with forward slashes, so allowlists can key on it portably.
 */
export function scanConfigExpiry(dir) {
  return walkJsonFiles(dir).flatMap((f) => {
    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(f, "utf8"));
    } catch {
      return []; // not this scanner's job to validate JSON
    }
    return collectExpiryFields(parsed, path.relative(dir, f).split(path.sep).join("/"));
  });
}
