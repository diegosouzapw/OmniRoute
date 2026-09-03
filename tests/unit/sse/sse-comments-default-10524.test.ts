import test from "node:test";
import assert from "node:assert/strict";
import { sseCommentsEnabled } from "../../../open-sse/utils/sseHeartbeat.ts";

// #10524: SSE comment lines (`: x-omniroute-*`) break strict SSE clients.
// Default should be disabled (opt-in via OMNIROUTE_SSE_COMMENTS=on).

test("#10524: sseCommentsEnabled defaults to false when env var is unset", () => {
  const original = process.env.OMNIROUTE_SSE_COMMENTS;
  delete process.env.OMNIROUTE_SSE_COMMENTS;

  assert.strictEqual(sseCommentsEnabled(), false, "SSE comments must be disabled by default");

  if (original !== undefined) process.env.OMNIROUTE_SSE_COMMENTS = original;
});

test("#10524: sseCommentsEnabled returns true when explicitly enabled", () => {
  const original = process.env.OMNIROUTE_SSE_COMMENTS;

  for (const value of ["on", "true", "1", "yes", "ON", "TRUE"]) {
    process.env.OMNIROUTE_SSE_COMMENTS = value;
    assert.strictEqual(sseCommentsEnabled(), true, `SSE comments must be enabled for "${value}"`);
  }

  if (original !== undefined) process.env.OMNIROUTE_SSE_COMMENTS = original;
  else delete process.env.OMNIROUTE_SSE_COMMENTS;
});

test("#10524: sseCommentsEnabled returns false when explicitly disabled", () => {
  const original = process.env.OMNIROUTE_SSE_COMMENTS;

  for (const value of ["off", "false", "0", "no", "OFF", "FALSE"]) {
    process.env.OMNIROUTE_SSE_COMMENTS = value;
    assert.strictEqual(sseCommentsEnabled(), false, `SSE comments must be disabled for "${value}"`);
  }

  if (original !== undefined) process.env.OMNIROUTE_SSE_COMMENTS = original;
  else delete process.env.OMNIROUTE_SSE_COMMENTS;
});
