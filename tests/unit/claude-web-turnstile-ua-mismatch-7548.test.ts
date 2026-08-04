import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { CLAUDE_WEB_FINGERPRINT } from "../../open-sse/config/claudeWebFingerprint.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");
const readSource = (rel: string) => readFileSync(join(REPO_ROOT, rel), "utf8");

function detectPlatform(ua: string): string {
  if (/Windows/i.test(ua)) return "Windows";
  if (/Macintosh|Mac OS X/i.test(ua)) return "macOS";
  if (/X11; Linux/i.test(ua)) return "Linux";
  return "unknown";
}

const IMPORT_PATTERN = /import\s*\{\s*CLAUDE_WEB_FINGERPRINT[^}]*\}\s*from\s*"[^"]*config\/claudeWebFingerprint\.ts"/;

test("claude-web: Turnstile solver derives its UA from the shared fingerprint module (#7548)", () => {
  const solverSrc = readSource("open-sse/services/claudeTurnstileSolver.ts");

  assert.ok(
    IMPORT_PATTERN.test(solverSrc),
    "claudeTurnstileSolver.ts must import CLAUDE_WEB_FINGERPRINT from the shared module"
  );
  assert.match(solverSrc, /userAgent:\s*CLAUDE_WEB_FINGERPRINT\.userAgent/);
  // No stray hardcoded UA literal left behind (that's exactly how #7548 regressed).
  assert.ok(
    !/Mozilla\/5\.0[^"]*"/.test(solverSrc),
    "solver must not hardcode a UA literal anymore — it must come from CLAUDE_WEB_FINGERPRINT"
  );
});

test("claude-web: executor CLAUDE_USER_AGENT and Sec-Ch-Ua-Platform derive from the shared fingerprint (#7548)", () => {
  const executorSrc = readSource("open-sse/executors/claude-web.ts");

  assert.ok(
    IMPORT_PATTERN.test(executorSrc),
    "claude-web.ts must import CLAUDE_WEB_FINGERPRINT from the shared module"
  );
  assert.match(executorSrc, /const CLAUDE_USER_AGENT = CLAUDE_WEB_FINGERPRINT\.userAgent;/);
  assert.match(executorSrc, /"Sec-Ch-Ua-Platform":\s*CLAUDE_WEB_FINGERPRINT\.secChUaPlatform/);
});

test("claude-web: httpBackedChat fast path uses the shared fingerprint for the claude.ai branch (#7548)", () => {
  const fastPathSrc = readSource("open-sse/services/browserBackedChat.ts");
  const resolverSrc = readSource("open-sse/services/httpBackedChatFingerprint.ts");

  assert.match(
    fastPathSrc,
    /resolveHttpBackedChatFingerprint/,
    "browserBackedChat.ts must resolve headers via resolveHttpBackedChatFingerprint()"
  );
  assert.ok(
    IMPORT_PATTERN.test(resolverSrc),
    "httpBackedChatFingerprint.ts must import CLAUDE_WEB_FINGERPRINT from the shared module"
  );
  assert.match(resolverSrc, /chatUrlMatchDomain === "claude\.ai" \? CLAUDE_WEB_FINGERPRINT/);
});

test("claude-web: solver, executor and fast-path UAs are all the same value at runtime, platform Linux (#7548)", () => {
  // This is the actual regression: before the fix these three literals were
  // "Windows", "Linux" and "macOS" respectively — a cf_clearance token minted
  // under one UA got replayed under a different one and Cloudflare rejected
  // it, surfacing as a persistent 429 on every claude-web request.
  assert.equal(detectPlatform(CLAUDE_WEB_FINGERPRINT.userAgent), "Linux");
  assert.equal(CLAUDE_WEB_FINGERPRINT.secChUaPlatform, '"Linux"');
});
