import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  classifyExpiry,
  collectExpiryFields,
  scanConfigExpiry,
} from "../../scripts/check/lib/configExpiry.mjs";

/**
 * Time bombs: config packs with a `validUntil` (or sibling key) that lapse with
 * no commit involved. The Alibaba free-tier pack expired on 2026-08-27 and from
 * the 28th every PR and main carried a red Unit Tests shard (#11866). Nothing a
 * diff review could have caught.
 *
 * This suite fails SEVEN DAYS BEFORE any pack under config/ lapses, naming the
 * file and key, so renewal happens on someone's terms instead of the clock's.
 */
const ROOT = join(import.meta.dirname, "../..");
const CONFIG_DIR = join(ROOT, "config");
const DAY = 86_400_000;
const WARN_DAYS = 7;

/**
 * Packs known to be expired/expiring, each pinned to the issue that owns the
 * renewal decision. An entry whose pack is no longer expiring FAILS below as a
 * stale allowlist entry — remove it when the pack is renewed.
 */
const ALLOWLIST: Record<string, string> = {
  "alibaba-free-tier-allowlist.json":
    "#11866 — validUntil 2026-08-27 has passed; the loader already falls back to the embedded list, and renewing the curated free-tier pack is an operator data decision, not a test fix",
};

const NOW = Date.UTC(2026, 7, 28); // 2026-08-28, fixed: this suite must not itself depend on the clock
const day = (offset: number) => new Date(NOW + offset * DAY).toISOString().slice(0, 10);

test("collectExpiryFields: finds nested and array-nested expiry keys, ignores non-string values", () => {
  const fields = collectExpiryFields(
    {
      validUntil: day(3),
      nested: { expiresAt: day(30), other: "x" },
      list: [{ expiry: day(-1) }, { expires: 12345 }],
      expires_at: "not a date",
    },
    "pack.json"
  );
  assert.deepEqual(
    fields.map((f) => [f.keyPath, f.expiresAt === null ? null : "date"]),
    [
      ["validUntil", "date"],
      ["nested.expiresAt", "date"],
      ["list.0.expiry", "date"],
      ["expires_at", null],
    ]
  );
});

test("classifyExpiry: expired / expiring inside the warning window / ok / unparseable", () => {
  const f = (raw: string) => ({
    file: "p",
    keyPath: "validUntil",
    raw,
    expiresAt: Number.isFinite(Date.parse(raw)) ? Date.parse(raw) : null,
  });
  assert.equal(classifyExpiry(f(day(-1)), NOW, WARN_DAYS), "expired");
  assert.equal(
    classifyExpiry(f(day(0)), NOW, WARN_DAYS),
    "expiring",
    "lapsing today is already too late to be 'ok'"
  );
  assert.equal(classifyExpiry(f(day(6)), NOW, WARN_DAYS), "expiring");
  assert.equal(classifyExpiry(f(day(8)), NOW, WARN_DAYS), "ok");
  assert.equal(classifyExpiry(f("never"), NOW, WARN_DAYS), "unparseable");
});

test("scanConfigExpiry: walks a config tree, skips node_modules and invalid JSON, keys files portably", () => {
  const dir = mkdtempSync(join(tmpdir(), "cfg-expiry-"));
  try {
    mkdirSync(join(dir, "sub"), { recursive: true });
    mkdirSync(join(dir, "node_modules", "dep"), { recursive: true });
    writeFileSync(join(dir, "a.json"), JSON.stringify({ validUntil: day(3) }));
    writeFileSync(join(dir, "sub", "b.json"), JSON.stringify({ deep: { expiresAt: day(40) } }));
    writeFileSync(
      join(dir, "node_modules", "dep", "c.json"),
      JSON.stringify({ validUntil: day(-5) })
    );
    writeFileSync(join(dir, "broken.json"), "{ not json");
    writeFileSync(join(dir, "notes.txt"), JSON.stringify({ validUntil: day(-5) }));
    const found = scanConfigExpiry(dir).map((f) => `${f.file}:${f.keyPath}`);
    assert.deepEqual(found, ["a.json:validUntil", "sub/b.json:deep.expiresAt"]);
  } finally {
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test(`repo: no pack under config/ lapses within ${WARN_DAYS} days unless its renewal is tracked`, (t) => {
  const fields = scanConfigExpiry(CONFIG_DIR);
  // Positive anchor: the scanner must be seeing SOMETHING, or a renamed key
  // would silently turn this whole suite into a no-op.
  assert.ok(
    fields.length >= 1,
    "expected at least one dated pack under config/ (the Alibaba allowlist) — if the key was renamed, extend EXPIRY_KEY"
  );

  const failures: string[] = [];
  const seenAllowlisted = new Set<string>();
  for (const f of fields) {
    const status = classifyExpiry(f, Date.now(), WARN_DAYS);
    const tracked = ALLOWLIST[f.file];
    if (status === "unparseable") {
      t.diagnostic(`${f.file} ${f.keyPath}="${f.raw}" is not a date — not monitored`);
      continue;
    }
    if (status === "ok") continue;
    if (tracked) {
      seenAllowlisted.add(f.file);
      t.diagnostic(`${f.file} ${f.keyPath}=${f.raw} is ${status} — tracked: ${tracked}`);
      continue;
    }
    failures.push(
      `${f.file} → ${f.keyPath}=${f.raw} is ${status}: renew the pack (or track it in ALLOWLIST with its issue)`
    );
  }
  for (const file of Object.keys(ALLOWLIST)) {
    if (!seenAllowlisted.has(file)) {
      failures.push(
        `stale ALLOWLIST entry: ${file} is no longer expired/expiring — remove it (${ALLOWLIST[file]})`
      );
    }
  }
  assert.deepEqual(failures, [], failures.join("\n"));
});
