import test from "node:test";
import assert from "node:assert/strict";

import { handleNoCredentials } from "../../src/sse/handlers/chatHelpers.ts";

// #FIX: the "No active credentials for provider: X" 404 response used to be
// a wall of silence — operators had no way to know which providers actually
// catalog the model id they requested. Surface a hint listing the top 3
// candidate aliases (provider/model prefix form) so the operator can
// prefix and route to a working provider on the next request.

test("handleNoCredentials includes candidate aliases hint when supplied", async () => {
  const res = handleNoCredentials(
    /* credentials */ {},
    /* excludeConnectionId */ null,
    /* provider */ "kiro",
    /* model */ "claude-opus-5",
    /* lastError */ null,
    /* lastStatus */ null,
    /* candidateAliases */ ["anthropic", "claude", "agentrouter"]
  );

  assert.equal(res.status, 404);
  const body = (await res.json()) as { error?: { message?: string } };
  const message = body?.error?.message ?? "";
  assert.match(
    message,
    /No active credentials for provider: kiro/,
    "must keep the original error prefix"
  );
  assert.match(
    message,
    /Try one of: anthropic\/claude-opus-5, claude\/claude-opus-5, agentrouter\/claude-opus-5/,
    "must append a candidate-prefix hint when candidates are provided"
  );
});

test("handleNoCredentials omits hint when no candidates supplied", async () => {
  const res = handleNoCredentials(
    {},
    null,
    "kiro",
    "claude-opus-5",
    null,
    null
    /* no candidateAliases */
  );

  assert.equal(res.status, 404);
  const body = (await res.json()) as { error?: { message?: string } };
  const message = body?.error?.message ?? "";
  assert.match(message, /No active credentials for provider: kiro/);
  assert.doesNotMatch(
    message,
    /Try one of:/,
    "must NOT append a hint when no candidates are provided"
  );
});

test("handleNoCredentials trims candidate list to top 3", async () => {
  const res = handleNoCredentials(
    {},
    null,
    "kiro",
    "claude-opus-5",
    null,
    null,
    ["anthropic", "claude", "agentrouter", "github", "vertex-partner"]
  );

  const body = (await res.json()) as { error?: { message?: string } };
  const message = body?.error?.message ?? "";
  // Top-3 (anthropic, claude, agentrouter) — github and vertex-partner are
  // dropped to keep the hint actionable.
  assert.match(message, /Try one of: anthropic\/claude-opus-5, claude\/claude-opus-5, agentrouter\/claude-opus-5/);
  assert.doesNotMatch(message, /github\/claude-opus-5/);
  assert.doesNotMatch(message, /vertex-partner\/claude-opus-5/);
});