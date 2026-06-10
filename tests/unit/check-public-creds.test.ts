import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findLiteralCreds, KNOWN_LITERAL_CREDS } from "../../scripts/check/check-public-creds.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("flags a clientIdDefault assigned to a string literal", () => {
  const src = `oauth: {\n  clientIdDefault: "deadbeef-leaked-client-id",\n}`;
  const v = findLiteralCreds(src, new Set(), "x.ts");
  assert.equal(v.length, 1);
  assert.match(v[0], /clientIdDefault/);
  assert.match(v[0], /deadbeef-leaked-client-id/);
});

test("flags a clientId behind a process.env fallback (env || literal)", () => {
  const src = `clientId: process.env.X_OAUTH_CLIENT_ID || "leaked-via-fallback",`;
  const v = findLiteralCreds(src, new Set(), "x.ts");
  assert.equal(v.length, 1);
  assert.match(v[0], /leaked-via-fallback/);
});

test("flags clientSecret and apiKey literals too", () => {
  const src = [
    `clientSecret: "GOCSPX-secret-literal",`,
    `apiKey: "AIzaSyLeakedFirebaseKey",`,
  ].join("\n");
  const v = findLiteralCreds(src, new Set(), "x.ts");
  assert.equal(v.length, 2);
});

test("does NOT flag resolvePublicCred() — the correct embedding pattern", () => {
  const src = `clientIdDefault: resolvePublicCred("gemini_id"),`;
  assert.deepEqual(findLiteralCreds(src, new Set(), "x.ts"), []);
});

test("does NOT flag resolvePublicCredMulti() with literal env-name args", () => {
  const src = `clientId: resolvePublicCredMulti("gemini_id", ["GEMINI_OAUTH_CLIENT_ID", "ALT"]),`;
  assert.deepEqual(findLiteralCreds(src, new Set(), "x.ts"), []);
});

test("does NOT flag empty-string fallback (process.env || \"\")", () => {
  const src = `clientIdDefault: process.env.GITLAB_OAUTH_CLIENT_ID || "",`;
  assert.deepEqual(findLiteralCreds(src, new Set(), "x.ts"), []);
});

test("does NOT flag an *Env key — it carries the env-var NAME, not the secret", () => {
  const src = `clientIdEnv: "QWEN_OAUTH_CLIENT_ID",`;
  assert.deepEqual(findLiteralCreds(src, new Set(), "x.ts"), []);
});

test("does NOT flag a member-access reference (CODEX_CONFIG.clientId)", () => {
  const src = `clientId: CODEX_CONFIG.clientId,`;
  assert.deepEqual(findLiteralCreds(src, new Set(), "x.ts"), []);
});

test("allowlist freezes a literal by VALUE", () => {
  const src = `clientIdDefault: "frozen-value-123",`;
  const allow = new Set(["frozen-value-123"]);
  assert.deepEqual(findLiteralCreds(src, allow, "x.ts"), []);
});

test("allowlist freezes a literal by file:line:value key", () => {
  const src = `\nclientIdDefault: "site-specific-123",`;
  const allow = new Set(["x.ts:2:site-specific-123"]);
  assert.deepEqual(findLiteralCreds(src, allow, "x.ts"), []);
});

test("a NEW literal is still flagged even with the real frozen allowlist", () => {
  const src = `clientIdDefault: "brand-new-leaked-client-id",`;
  const v = findLiteralCreds(src, KNOWN_LITERAL_CREDS, "x.ts");
  assert.equal(v.length, 1);
});

test("real scanned files produce ZERO violations with the frozen allowlist (gate exits 0)", () => {
  const scanned = [
    "open-sse/config/providerRegistry.ts",
    "src/lib/oauth/constants/oauth.ts",
  ];
  for (const rel of scanned) {
    const src = fs.readFileSync(path.join(repoRoot, rel), "utf8") as string;
    const v = findLiteralCreds(src, KNOWN_LITERAL_CREDS, rel);
    assert.deepEqual(v, [], `expected no live violations in ${rel}, got: ${v.join(", ")}`);
  }
});

test("every frozen literal is actually present in a scanned file (no dead allowlist entries)", () => {
  const scanned = [
    "open-sse/config/providerRegistry.ts",
    "src/lib/oauth/constants/oauth.ts",
  ];
  const blob = scanned
    .map((rel) => fs.readFileSync(path.join(repoRoot, rel), "utf8") as string)
    .join("\n");
  for (const entry of KNOWN_LITERAL_CREDS) {
    // Plain value entries (no file:line: prefix) must appear verbatim in the source.
    const value = entry.includes(":") && /:\d+:/.test(entry)
      ? entry.replace(/^.*?:\d+:/, "")
      : entry;
    assert.ok(blob.includes(value), `frozen literal not found in any scanned file: ${value}`);
  }
});

test("with an empty allowlist the real files surface the known live violations", () => {
  const reg = fs.readFileSync(
    path.join(repoRoot, "open-sse/config/providerRegistry.ts"),
    "utf8"
  ) as string;
  const oauth = fs.readFileSync(
    path.join(repoRoot, "src/lib/oauth/constants/oauth.ts"),
    "utf8"
  ) as string;
  const regViolations = findLiteralCreds(reg, new Set(), "providerRegistry.ts");
  const oauthViolations = findLiteralCreds(oauth, new Set(), "oauth.ts");
  // 4 in providerRegistry (Claude/Codex/Qwen/Kimi clientIdDefault),
  // 5 in oauth.ts (the same four + GitHub).
  assert.equal(regViolations.length, 4);
  assert.equal(oauthViolations.length, 5);
});
