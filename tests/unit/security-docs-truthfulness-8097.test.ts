import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { fixtures } from "../fixtures/sanitizerFixtures.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");

/**
 * INPUT_SANITIZER_ENABLED is intentionally on-by-default (see #8093 ruling —
 * the flag is not a PII-mutating flag and defaults to `true`). Docs must
 * reflect that truthfully and must not claim the guard blocks unconditionally.
 */
test("SECURITY.md and ENVIRONMENT.md do not overstate sanitizer defaults", () => {
  const envDoc = readFileSync(
    join(root, "docs/reference/ENVIRONMENT.md"),
    "utf8"
  );
  const secDoc = readFileSync(join(root, "SECURITY.md"), "utf8");

  // The table row for INPUT_SANITIZER_ENABLED must show `true` (on-by-default per #8093).
  const envRow = envDoc.match(
    /\|\s*`INPUT_SANITIZER_ENABLED`\s*\|\s*`(\w+)`\s*\|/
  );
  assert.ok(envRow, "INPUT_SANITIZER_ENABLED row not found in ENVIRONMENT.md");
  assert.equal(
    envRow![1],
    "true",
    "ENVIRONMENT.md must show default `true` for INPUT_SANITIZER_ENABLED (on-by-default per #8093 ruling)"
  );

  // SECURITY.md must not claim the guard "blocks" unconditionally.
  const injectionHeader = secDoc.match(
    /###\s*🧠\s*Prompt Injection Guard\s*\n\s*\n([^\n]+)/
  );
  assert.ok(injectionHeader, "Prompt Injection Guard section not found");
  assert.ok(
    !/blocks prompt injection attacks/.test(injectionHeader![1]),
    "SECURITY.md must not claim the guard 'blocks prompt injection attacks' — it is best-effort heuristic"
  );
});

/** Docs must state severity accurately: role_hijack and jailbreak_dan are Medium, not High. */
test("SECURITY.md severity table matches code", () => {
  const secDoc = readFileSync(join(root, "SECURITY.md"), "utf8");

  const roleHijackRow = secDoc.match(
    /\|\s*Role Hijack\s*\|\s*(\w+)\s*\|/
  );
  assert.ok(roleHijackRow, "Role Hijack row not found in SECURITY.md");
  assert.equal(
    roleHijackRow![1],
    "Medium",
    "Role Hijack severity must be Medium (code: role_hijack = medium)"
  );

  const danRow = secDoc.match(
    /\|\s*DAN\/Jailbreak\s*\|\s*(\w+)\s*\|/
  );
  assert.ok(danRow, "DAN/Jailbreak row not found in SECURITY.md");
  assert.equal(
    danRow![1],
    "Medium",
    "DAN/Jailbreak severity must be Medium (code: jailbreak_dan = medium)"
  );
});

/** Docs must not claim redact mode strips injection text from requests. */
test("ENVIRONMENT.md does not overstate redact mode", () => {
  const envDoc = readFileSync(
    join(root, "docs/reference/ENVIRONMENT.md"),
    "utf8"
  );

  // Find the INPUT_SANITIZER_MODE description cell.
  const modeRow = envDoc.match(
    /\|\s*`INPUT_SANITIZER_MODE`\s*\|[^\n]*?\|\s*([^\n]+?)\s*\|/
  );
  assert.ok(modeRow, "INPUT_SANITIZER_MODE row not found in ENVIRONMENT.md");
  const desc = modeRow![1];
  assert.ok(
    !/strip suspicious patterns/.test(desc),
    "ENVIRONMENT.md must not claim redact mode strips injection text — it only logs + tags"
  );
});

/** Fixtures exist and cover all three categories. */
test("sanitizer fixtures cover benign, injection, and pii categories", () => {
  const categories = new Set(fixtures.map((f) => f.expect));
  assert.ok(categories.has("benign"), "Missing benign fixtures");
  assert.ok(categories.has("injection"), "Missing injection fixtures");
  assert.ok(categories.has("pii"), "Missing pii fixtures");
  assert.ok(fixtures.length >= 6, "Need at least 6 fixtures for meaningful coverage");
});
