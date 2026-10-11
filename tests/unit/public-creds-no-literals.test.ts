/**
 * Hard Rule #11 — structural guard: no raw public upstream credential in source.
 *
 * Public OAuth client ids/secrets and Firebase Web keys must be embedded through
 * `resolvePublicCred()` / `resolvePublicCredMulti()` (open-sse/utils/publicCreds.ts),
 * never as string literals. See docs/security/PUBLIC_CREDS.md.
 *
 * `npm run check:public-creds` is KEY-based: it flags `clientId:` / `clientSecret:` /
 * `apiKey:` (…Default) object keys assigned a literal, in open-sse/** and
 * src/lib/oauth/**. This test is VALUE-based and complements it:
 *   - it matches the credential FORMATS themselves (Google OAuth client id,
 *     `GOCSPX-` client secret, `AIza` Firebase/Google key, GitHub OAuth app id,
 *     a `client_secret` field with a non-empty literal) wherever they appear —
 *     a bare `const X = "…"`, a URL query string, a JSON config file;
 *   - it also scans src/shared/constants/**, which the gate does not walk.
 * The "gate blind spots" test below proves the gap with synthetic fixtures.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { findLiteralCreds } from "../../scripts/check/check-public-creds.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const SCAN_ROOTS = ["src/lib/oauth", "open-sse", "src/shared/constants"];
const CANONICAL_FILE = "open-sse/utils/publicCreds.ts";
const SCANNED_EXT = /\.(?:ts|tsx|js|mjs|cjs|json)$/;
const SKIPPED_DIRS = new Set(["node_modules", ".next", "__tests__"]);

/** Known public-credential formats (bounded quantifiers — no ReDoS on large files). */
const CREDENTIAL_FORMATS: ReadonlyArray<{ name: string; re: RegExp }> = [
  {
    name: "google-oauth-client-id",
    re: /\b\d{6,30}-[a-z0-9]{32}\.apps\.googleusercontent\.com\b/,
  },
  { name: "google-oauth-client-secret", re: /GOCSPX-[A-Za-z0-9_-]{20,64}/ },
  { name: "google-api-key", re: /AIza[0-9A-Za-z_-]{35}/ },
  { name: "github-oauth-app-client-id", re: /\bIv1\.[a-f0-9]{16}\b/ },
  {
    name: "client_secret-literal",
    re: /client_secret\s{0,8}[:=]\s{0,8}(["'`])(?!\1)[^"'`\n]{1,256}\1/,
  },
];

const SANCTIONED_CALL = /resolvePublicCred(?:Multi)?\s*\(/;

function walk(dir: string, acc: string[] = []): string[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIPPED_DIRS.has(entry.name)) walk(full, acc);
    } else if (SCANNED_EXT.test(entry.name) && !/\.test\.[cm]?[jt]sx?$/.test(entry.name)) {
      acc.push(path.relative(repoRoot, full).replace(/\\/g, "/"));
    }
  }
  return acc;
}

/**
 * Return one finding per line that carries a credential-shaped literal outside a
 * `resolvePublicCred(` call. Pure: no I/O.
 */
function findRawCredentials(source: string, relFile = "<inline>"): string[] {
  const findings: string[] = [];
  const lines = source.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (SANCTIONED_CALL.test(line)) continue;
    for (const { name, re } of CREDENTIAL_FORMATS) {
      if (re.test(line)) findings.push(`${relFile}:${i + 1} ${name}`);
    }
  }
  return findings;
}

// Fixtures are assembled at runtime so this file never contains a scanner-matching
// literal itself (push protection / secret scanning would flag it).
const FAKE = {
  clientId: "1234567890" + "-" + "a".repeat(32) + ".apps." + "googleusercontent.com",
  clientSecret: "GOC" + "SPX-" + "b".repeat(28),
  apiKey: "AI" + "za" + "c".repeat(35),
};

test("detector flags each known credential format and ignores sanctioned / empty forms", () => {
  assert.equal(findRawCredentials(`const ID = "${FAKE.clientId}";`).length, 1);
  assert.equal(findRawCredentials(`secret: "${FAKE.clientSecret}",`).length, 1);
  assert.equal(findRawCredentials(`fetch("https://x.test/v1?key=${FAKE.apiKey}")`).length, 1);
  assert.equal(findRawCredentials(`const GH = "Iv1.${"d".repeat(16)}";`).length, 1);
  assert.equal(findRawCredentials(`body = { client_secret: "s3cr3t" };`).length, 1);

  // Sanctioned and harmless shapes stay clean.
  assert.deepEqual(findRawCredentials(`clientId: resolvePublicCred("gemini_id", "X"),`), []);
  assert.deepEqual(findRawCredentials(`body = { client_secret: "" };`), []);
  assert.deepEqual(findRawCredentials(`body = { client_secret: clientSecret };`), []);
  assert.deepEqual(findRawCredentials(`params.set("client_secret", secret);`), []);
  assert.deepEqual(
    findRawCredentials(`const RE = /^(AIza[A-Za-z0-9_-]{20,}|GOCSPX-[A-Za-z0-9_-]+)$/;`),
    []
  );
});

test("gate blind spots: shapes check:public-creds misses are caught here", () => {
  // The key-based gate only inspects `clientId:` / `clientSecret:` / `apiKey:` keys.
  const blindSpots = [
    `const GEMINI_CLIENT_ID = "${FAKE.clientId}";`,
    `export const SECRET = "${FAKE.clientSecret}";`,
    `const url = "https://identitytoolkit.test/v1/accounts?key=${FAKE.apiKey}";`,
  ];
  for (const src of blindSpots) {
    assert.deepEqual(findLiteralCreds(src, new Set()), [], `gate unexpectedly covers: ${src}`);
    assert.equal(findRawCredentials(src).length, 1, `structural guard missed: ${src}`);
  }
});

test("no raw public credential literal in src/lib/oauth, open-sse or src/shared/constants", () => {
  const files = SCAN_ROOTS.flatMap((root) => walk(path.join(repoRoot, root)));
  assert.ok(files.length > 100, `scan saw only ${files.length} files — roots moved?`);
  assert.ok(files.includes(CANONICAL_FILE), "canonical publicCreds.ts not scanned");

  const findings = files.flatMap((rel) =>
    findRawCredentials(fs.readFileSync(path.join(repoRoot, rel), "utf8"), rel)
  );
  assert.deepEqual(
    findings,
    [],
    "raw public credential literal found — embed it via resolvePublicCred() " +
      "(open-sse/utils/publicCreds.ts, docs/security/PUBLIC_CREDS.md)"
  );
});

test("the canonical decoder stores embedded defaults masked, never raw", () => {
  // CANONICAL_FILE is scanned above with no exemption; additionally pin that the
  // embedded defaults are byte arrays (masked) rather than string literals.
  const source = fs.readFileSync(path.join(repoRoot, CANONICAL_FILE), "utf8");
  const block = /EMBEDDED_DEFAULTS[^=]*=\s*\{([\s\S]*?)\n\}/.exec(source);
  assert.ok(block, "EMBEDDED_DEFAULTS block not found in publicCreds.ts");
  const entries = block[1].split("\n").filter((l) => /^\s*[A-Za-z0-9_]+\s*:/.test(l));
  assert.ok(entries.length > 0, "EMBEDDED_DEFAULTS has no entries");
  for (const entry of entries) {
    assert.match(entry, /:\s*\[/, `embedded default is not a masked byte array: ${entry.trim()}`);
  }
});
