import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the codex executor quota extraction.
// The pure quota-snapshot parsing + reset/cooldown scheduling lives in codex/quota.ts.
// Host re-exports the 4 public symbols (chatCore/codexQuota.ts + tests import them).
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "codex.ts");
const LEAF = join(EXE, "codex/quota.ts");

test("leaf hosts the quota helpers and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  for (const sym of [
    "parseCodexQuotaHeaders",
    "getCodexResetTime",
    "getCodexDualWindowCooldownMs",
    "CodexQuotaSnapshot",
  ]) {
    assert.match(src, new RegExp(`export (function|interface) ${sym}\\b`));
  }
  assert.doesNotMatch(src, /from "\.\.\/codex\.ts"/);
});

test("host re-exports the quota symbols for external importers", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/codex\/quota\.ts"/);
});

test("parseCodexQuotaHeaders returns null without quota headers", async () => {
  const { parseCodexQuotaHeaders } = await import("../../open-sse/executors/codex/quota.ts");
  assert.equal(parseCodexQuotaHeaders({}), null);
});
