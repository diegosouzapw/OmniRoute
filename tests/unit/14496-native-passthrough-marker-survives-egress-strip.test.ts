import test from "node:test";
import assert from "node:assert/strict";

/**
 * Regression for the #14252 fallout found while draining #14496.
 *
 * #14252 started calling `stripInternalBodyFields()` at the shared pre-executor
 * boundary (`normalizeAttemptBody`) so `_omniroute*` routing markers cannot leak
 * upstream. Correct intent — but the same helper also deletes the four
 * `_native*Passthrough` markers, and those are **not** consumed by routing: they
 * are read INSIDE the executor (`codex.ts:1259`, `xai.ts:130`), which deletes
 * them itself right after.
 *
 * Stripping them one layer early silently turns every Responses-native request
 * into a translated one: `nativeCodexPassthrough` reads `false`, the request goes
 * through the Chat→Responses translation and then through the #2608 allowlist,
 * which drops client fields the native path is supposed to forward verbatim
 * (`metadata` was how this surfaced — `chatcore-translation-paths` caught it).
 *
 * The split below keeps the leak fix intact: `_omniroute*` (and anything routing
 * owns) still goes at the boundary; executor-owned markers survive to their
 * reader and are removed at serialization, where `applyFingerprint()` runs the
 * full strip anyway.
 */

const { stripInternalBodyFields, EXECUTOR_CONSUMED_BODY_FIELDS } =
  await import("../../open-sse/config/cliFingerprints.ts");

const NATIVE_MARKERS = [
  "_nativeCodexPassthrough",
  "_nativeXaiResponsesPassthrough",
  "_nativeOpenAICompatibleResponsesPassthrough",
] as const;

test("the pre-executor boundary keeps the markers the executor itself reads", () => {
  for (const marker of NATIVE_MARKERS) {
    const body: Record<string, unknown> = {
      model: "gpt-5.6-sol",
      metadata: { source: "codex-client" },
      [marker]: true,
      _omnirouteSkipContextRelay: true,
    };

    stripInternalBodyFields(body, { keepExecutorMarkers: true });

    assert.equal(body[marker], true, `${marker} must reach the executor that reads it`);
    assert.deepEqual(
      body.metadata,
      { source: "codex-client" },
      "client payload must not be touched by the marker strip"
    );
    assert.equal(
      "_omnirouteSkipContextRelay" in body,
      false,
      "routing-owned markers must still be stripped at the boundary (#14252)"
    );
  }
});

test("the serialization strip still removes every internal marker", () => {
  const body: Record<string, unknown> = {
    model: "gpt-5.6-sol",
    _nativeCodexPassthrough: true,
    _claudeCodeRequiresLowercaseToolNames: true,
    _omnirouteInternalRequest: true,
    metadata: { source: "codex-client" },
  };

  stripInternalBodyFields(body);

  for (const key of Object.keys(body)) {
    assert.equal(key.startsWith("_"), false, `${key} must not survive the full strip`);
  }
  assert.deepEqual(body.metadata, { source: "codex-client" });
});

test("every executor-consumed marker is one an executor actually deletes", () => {
  // Guards the split itself: a marker listed as executor-consumed but never read
  // by an executor would silently leak upstream.
  assert.ok(EXECUTOR_CONSUMED_BODY_FIELDS.length > 0);
  for (const marker of EXECUTOR_CONSUMED_BODY_FIELDS) {
    assert.match(marker, /^_native|^_claudeCode/, `${marker} is not an executor-owned marker`);
  }
});
