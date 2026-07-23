import test from "node:test";
import assert from "node:assert/strict";
import {
  PRESERVE_SYSTEM_PROMPT_MODES,
  isPreserveSystemPromptMode,
  normalizePreserveSystemPromptMode,
  resolvePreserveSystemPrompt,
  modeToBaselineBoolean,
} from "../../../open-sse/services/compression/preserveSystemPromptMode.ts";

// T05/C5 — preserveSystemPrompt boolean -> enum (always | whenNoCache | never) + back-compat shim.

test("isPreserveSystemPromptMode only accepts the three known tokens", () => {
  for (const m of PRESERVE_SYSTEM_PROMPT_MODES) assert.equal(isPreserveSystemPromptMode(m), true);
  for (const bad of ["", "Always", "no-cache", true, false, 1, null, undefined, {}]) {
    assert.equal(isPreserveSystemPromptMode(bad), false, `${String(bad)} must be rejected`);
  }
});

test("normalize: an explicit mode wins over the legacy boolean", () => {
  assert.equal(
    normalizePreserveSystemPromptMode({ preserveSystemPrompt: true, preserveSystemPromptMode: "never" }),
    "never"
  );
  assert.equal(
    normalizePreserveSystemPromptMode({ preserveSystemPrompt: false, preserveSystemPromptMode: "always" }),
    "always"
  );
});

test("normalize: the shim maps the legacy boolean 1:1 (true->always, false->whenNoCache)", () => {
  // The shim is a behaviour identity: legacy `false` already meant "compress unless
  // there is a cache" via the #3890/#3955 guard, i.e. exactly `whenNoCache`.
  assert.equal(normalizePreserveSystemPromptMode({ preserveSystemPrompt: true }), "always");
  assert.equal(normalizePreserveSystemPromptMode({ preserveSystemPrompt: false }), "whenNoCache");
});

test("normalize: an invalid mode string falls back to the legacy boolean", () => {
  assert.equal(
    normalizePreserveSystemPromptMode({
      preserveSystemPrompt: false,
      preserveSystemPromptMode: "garbage" as unknown as "always",
    }),
    "whenNoCache"
  );
});

test("resolve: always preserves and never compresses regardless of cache", () => {
  assert.equal(resolvePreserveSystemPrompt("always", { hasCache: true }), true);
  assert.equal(resolvePreserveSystemPrompt("always", { hasCache: false }), true);
  assert.equal(resolvePreserveSystemPrompt("never", { hasCache: true }), false);
  assert.equal(resolvePreserveSystemPrompt("never", { hasCache: false }), false);
});

test("resolve: whenNoCache preserves only when a cache is present", () => {
  assert.equal(resolvePreserveSystemPrompt("whenNoCache", { hasCache: true }), true);
  assert.equal(resolvePreserveSystemPrompt("whenNoCache", { hasCache: false }), false);
});

test("modeToBaselineBoolean is the no-cache projection", () => {
  assert.equal(modeToBaselineBoolean("always"), true);
  assert.equal(modeToBaselineBoolean("whenNoCache"), false);
  assert.equal(modeToBaselineBoolean("never"), false);
});

test("back-compat identity: legacy config resolves to the old cache-guard outcome", () => {
  // Old behaviour: preserveSystemPrompt=false stays false without cache, forced true with cache.
  const legacyFalse = { preserveSystemPrompt: false };
  const mode = normalizePreserveSystemPromptMode(legacyFalse);
  assert.equal(resolvePreserveSystemPrompt(mode, { hasCache: false }), false);
  assert.equal(resolvePreserveSystemPrompt(mode, { hasCache: true }), true);

  // Old behaviour: preserveSystemPrompt=true is always preserved.
  const legacyTrue = { preserveSystemPrompt: true };
  const modeT = normalizePreserveSystemPromptMode(legacyTrue);
  assert.equal(resolvePreserveSystemPrompt(modeT, { hasCache: false }), true);
  assert.equal(resolvePreserveSystemPrompt(modeT, { hasCache: true }), true);
});
