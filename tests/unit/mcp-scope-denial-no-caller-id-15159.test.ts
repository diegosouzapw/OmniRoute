// #15159 S-04 — the MCP scope-denial message echoed the caller's identity back to
// the client.
//
//   open-sse/mcp-server/server.ts:221-224
//     const msg =
//       `Insufficient MCP scopes for ${toolName}. ` +
//       `Missing: ${missingScopes}. ` +
//       `Caller=${scopeContext.callerId}, source=${scopeContext.source}.`;
//     return { content: [{ type: "text", text: `Error: ${msg}` }], isError: true };
//
// `callerId` is attacker-influenced: resolveCallerScopeContext() derives it from
// `extra.authInfo.clientId` (a caller-supplied string) → `extra.sessionId` →
// "anonymous" (scopeEnforcement.ts:72-97). So a caller can put arbitrary text into
// the denial string it receives back, on a pre-auth error surface, and the same
// value is echoed into logs. It is already recorded in the `_scopeCheck` audit
// payload at :231-232, which is where an operator needs it — the client-facing text
// does not need it.
//
// The fix drops Caller=/source= from the client string and keeps the tool name and
// the missing scopes, which are what the caller can act on.
//
// These tests drive the real enforcement wrapper through a registered tool so they
// assert on the actual client-facing result, not on a string literal in source.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  resolveCallerScopeContext,
  evaluateToolScopes,
  buildScopeDenialMessage,
} from "../../open-sse/mcp-server/scopeEnforcement.ts";

/**
 * The exact text `withScopeEnforcement` returns to the client, built from the real
 * exported composer rather than a copy of the literal in this file — a duplicated
 * string in the test would assert against itself and pass no matter what production
 * did.
 */
function denialText(toolName: string, missing: string[]): string {
  return `Error: ${buildScopeDenialMessage(toolName, missing)}`;
}

// A caller-supplied clientId carrying a secret and a marker string. If any of it
// reaches the client, the leak is live.
const HOSTILE_CALLER_ID = "attacker-chosen-secret-sk-live-LEAKCANARY";

// ─── RED: the client-facing denial must not carry the caller identity ────────

test("S-04: the caller identity is not echoed into the client-facing denial", () => {
  const ctx = resolveCallerScopeContext(
    { authInfo: { clientId: HOSTILE_CALLER_ID, scopes: [] } },
    []
  );
  const check = evaluateToolScopes("some_tool", ctx.scopes, true, ["admin:write"]);

  assert.equal(check.allowed, false);
  assert.equal(ctx.callerId, HOSTILE_CALLER_ID, "the resolver still derives the raw caller id");

  const text = denialText("some_tool", check.missing);

  assert.ok(
    !text.includes("LEAKCANARY"),
    `a caller-chosen clientId reached the client-facing denial text: ${text}`
  );
  assert.ok(
    !text.includes(HOSTILE_CALLER_ID),
    `the raw caller id reached the client-facing denial text: ${text}`
  );
  assert.ok(!/Caller=/.test(text), `the denial must not carry a Caller= field: ${text}`);
  assert.ok(!/source=/.test(text), `the denial must not carry a source= field: ${text}`);
});

// ─── The actionable parts must survive ─────────────────────────────────────
// Removing the identity must not reduce the message to something undiagnosable:
// the caller still needs the tool name and which scopes are missing.

test("S-04: the denial still names the tool and the missing scopes", () => {
  const ctx = resolveCallerScopeContext(
    { authInfo: { clientId: HOSTILE_CALLER_ID, scopes: ["read:models"] } },
    []
  );
  const check = evaluateToolScopes("combo_switch", ctx.scopes, true, [
    "read:models",
    "write:combos",
  ]);

  assert.equal(check.allowed, false);
  assert.deepEqual(check.missing, ["write:combos"]);

  const text = denialText("combo_switch", check.missing);
  assert.match(text, /combo_switch/, "the tool name must survive");
  assert.match(text, /write:combos/, "the missing scopes must survive");
});

// ─── An empty missing list must still read sensibly ───────────────────────
// The old code fell back to "unavailable" for this case; keep that rather than
// emitting "Missing: ." which would be a confusing regression.

test("S-04: a denial with no computed missing scopes degrades readably", () => {
  const text = denialText("some_tool", []);
  assert.match(text, /Missing: unavailable/, `expected the readable fallback: ${text}`);
});

// ─── Source guard: the real wrapper must match the corrected shape ─────────
// withScopeEnforcement is private to server.ts, so this pins the composed literal
// there. It is the assertion that would fail if the production string were restored.

test("S-04: the server's denial literal does not interpolate callerId or source", async () => {
  const fs = await import("node:fs");
  const source = fs.readFileSync(
    new URL("../../open-sse/mcp-server/server.ts", import.meta.url),
    "utf8"
  );

  // Isolate the `const msg = …` block inside withScopeEnforcement.
  const start = source.indexOf("const msg =");
  assert.notEqual(start, -1, "withScopeEnforcement must still build a `msg`");
  const block = source.slice(start, start + 400);

  assert.ok(
    !/\$\{scopeContext\.callerId\}/.test(block),
    "the client-facing msg must not interpolate scopeContext.callerId"
  );
  assert.ok(
    !/\$\{scopeContext\.source\}/.test(block),
    "the client-facing msg must not interpolate scopeContext.source"
  );
  assert.match(
    block,
    /buildScopeDenialMessage\(toolName, scopeCheck\.missing\)/,
    "withScopeEnforcement must delegate to the shared composer"
  );

  // The leading clause now lives in the extracted composer, so assert it there.
  const composerSource = fs.readFileSync(
    new URL("../../open-sse/mcp-server/scopeEnforcement.ts", import.meta.url),
    "utf8"
  );
  const composerStart = composerSource.indexOf("export function buildScopeDenialMessage");
  assert.notEqual(composerStart, -1, "the shared composer must exist");
  const composerBody = composerSource.slice(composerStart, composerStart + 600);
  assert.match(
    composerBody,
    /Insufficient MCP scopes for/,
    "the composer must keep the leading clause"
  );
  assert.match(composerBody, /\$\{missingScopes\}/, "the composer must still list missing scopes");
  assert.ok(
    !/callerId|source=/.test(composerBody.replace(/\/\*\*[\s\S]*?\*\//, "")),
    "the composer must not reference the caller identity in its returned string"
  );

  // The audit payload must KEEP recording the identity — that is where an operator
  // needs it. Losing it would make scope denials untraceable.
  assert.match(
    source,
    /_scopeCheck:\s*\{[\s\S]{0,200}?callerId:\s*scopeContext\.callerId/,
    "the audit payload must still record callerId"
  );
});
