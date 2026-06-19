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
  // Anchor files for bare-value frozen entries. The registry was modularized into
  // per-provider plugins (#3993), so providerRegistry.ts is now a re-export barrel;
  // entries keyed by an explicit `file:line:value` are checked against the file named
  // in the key (which is where the literal actually lives), not this anchor blob.
  const anchorFiles = [
    "open-sse/config/providerRegistry.ts",
    "src/lib/oauth/constants/oauth.ts",
  ];
  const anchorBlob = anchorFiles
    .map((rel) => fs.readFileSync(path.join(repoRoot, rel), "utf8") as string)
    .join("\n");
  for (const entry of KNOWN_LITERAL_CREDS) {
    const keyed = entry.includes(":") && /:\d+:/.test(entry);
    const value = keyed ? entry.replace(/^.*?:\d+:/, "") : entry;
    if (keyed) {
      // `file:line:value` entry — the literal must still be present in its own source
      // file (this is what makes the entry "not dead"). The line may have drifted, so
      // match on file content rather than the exact line number.
      const file = entry.replace(/:\d+:.*$/, "");
      const src = fs.readFileSync(path.join(repoRoot, file), "utf8") as string;
      assert.ok(src.includes(value), `frozen literal not found in its source file ${file}: ${value}`);
    } else {
      assert.ok(anchorBlob.includes(value), `frozen literal not found in any anchor file: ${value}`);
    }
  }
});

test("with an empty allowlist the real scanned files surface zero violations (all migrated to resolvePublicCred)", () => {
  // All five public client_ids (9 call-sites) were migrated to resolvePublicCred() in
  // #3493, so neither anchor file has literal credentials anymore.
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
  assert.equal(regViolations.length, 0, `providerRegistry.ts should be clean, got: ${regViolations.join(", ")}`);
  assert.equal(oauthViolations.length, 0, `oauth.ts should be clean, got: ${oauthViolations.join(", ")}`);
});

// --- 6A.8: expanded scope (open-sse/** and src/lib/oauth/**) ---

test("6A.8: flags a literal clientIdDefault in any new open-sse file", () => {
  const src = `export const CONFIG = { clientIdDefault: "brand-new-client-id-in-new-executor" };`;
  const v = findLiteralCreds(src, new Set(), "open-sse/executors/new-provider.ts");
  assert.equal(v.length, 1);
  assert.match(v[0], /brand-new-client-id-in-new-executor/);
});

test("6A.8: flags a literal clientSecret in any new src/lib/oauth file", () => {
  const src = `export const CFG = { clientSecret: "GOCSPX-new-leaked-secret" };`;
  const v = findLiteralCreds(src, new Set(), "src/lib/oauth/providers/newprovider.ts");
  assert.equal(v.length, 1);
  assert.match(v[0], /GOCSPX-new-leaked-secret/);
});

test("6A.8: does NOT flag resolvePublicCred() in a new open-sse executor", () => {
  const src = `export const CONFIG = { clientIdDefault: resolvePublicCred("new_provider_id") };`;
  const v = findLiteralCreds(src, new Set(), "open-sse/executors/new-provider.ts");
  assert.deepEqual(v, []);
});

// --- 6A.8: stale-allowlist enforcement ---

// @ts-expect-error — assertNoStale exported from lib module
import { reportStaleEntries as reportStale } from "../../scripts/check/lib/allowlist.mjs";

test("6A.8 stale: known literal that was removed from the codebase is detected as stale", () => {
  // Simulate: allowlist has "old-literal", but codebase no longer has it.
  const src = `export const CONFIG = { clientIdDefault: resolvePublicCred("x") };`; // no literal
  const liveViolations = findLiteralCreds(src, new Set(), "file.ts");
  // The allowlist has an entry "old-literal" but it's not in live violations.
  const stale = (reportStale as (a: Set<string>, b: string[], c: string) => string[])(
    new Set(["old-literal"]), liveViolations, "check-public-creds"
  );
  assert.deepEqual(stale, ["old-literal"]);
});

test("6A.8: open-sse/services/usage.ts FP — function-signature apiKey is suppressed by allowlist", () => {
  // open-sse/services/usage.ts L543: `getMiniMaxUsage(apiKey: string, provider: "minimax" | "minimax-cn")`
  // The CRED_KEY_RE matches `apiKey:` in the TypeScript function-parameter type annotation.
  // "minimax" and "minimax-cn" are provider-name strings in the type, NOT credentials.
  // Frozen in KNOWN_LITERAL_CREDS as FPs by file:line:value key.
  const realSrc = fs.readFileSync(path.join(repoRoot, "open-sse/services/usage.ts"), "utf8") as string;
  // With empty allowlist the FP shows up (it IS flagged by the regex).
  const vWithEmpty = findLiteralCreds(realSrc, new Set(), "open-sse/services/usage.ts");
  assert.ok(vWithEmpty.some((v) => v.includes("minimax")), `expected FP 'minimax' violations with empty allowlist, got: ${vWithEmpty.join(", ")}`);
  // With KNOWN_LITERAL_CREDS the FPs are suppressed.
  const vWithAllowlist = findLiteralCreds(realSrc, KNOWN_LITERAL_CREDS, "open-sse/services/usage.ts");
  assert.deepEqual(vWithAllowlist, [], `FP violations should be suppressed, got: ${vWithAllowlist.join(", ")}`);
});
