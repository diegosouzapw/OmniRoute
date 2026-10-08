import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveOutputStyleSelection } from "../../../open-sse/services/compression/outputStyles/backCompat.ts";
import {
  applyOutputStyles,
  OUTPUT_STYLE_MARKER,
} from "../../../open-sse/services/compression/outputStyles/apply.ts";
import { applyCavemanOutputMode } from "../../../open-sse/services/compression/outputMode.ts";

test("explicit outputStyles win when present", () => {
  const sel = resolveOutputStyleSelection({
    outputStyles: [{ id: "less-code", level: "ultra" }],
    cavemanOutputMode: { enabled: true, intensity: "lite", autoClarity: true },
  });
  assert.deepEqual(sel, [{ id: "less-code", level: "ultra" }]);
});

test("legacy cavemanOutputMode maps to terse-prose at the same intensity", () => {
  const sel = resolveOutputStyleSelection({
    cavemanOutputMode: { enabled: true, intensity: "full", autoClarity: true },
  });
  assert.deepEqual(sel, [{ id: "terse-prose", level: "full" }]);
});

test("disabled legacy mode and no styles → empty selection", () => {
  assert.deepEqual(
    resolveOutputStyleSelection({
      cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
    }),
    []
  );
  assert.deepEqual(resolveOutputStyleSelection({}), []);
});

const LEGACY_MARKER = "[OmniRoute Caveman Output Mode]";

// Runs one user turn through the legacy injector and the unified one with the same config.
// Language scope: "en" only — the legacy-vs-unified identity contracts below are not asserted
// for the localized (hu/ja/zh) instruction texts.
function injectBoth(content: string, autoClarity: boolean) {
  const body = { messages: [{ role: "user", content }] };
  const config = { enabled: true, intensity: "full" as const, autoClarity };
  const legacy = applyCavemanOutputMode(structuredClone(body), config);
  const next = applyOutputStyles(
    structuredClone(body),
    resolveOutputStyleSelection({ cavemanOutputMode: config }),
    "en",
    { autoClarity }
  );
  return { body, legacy, next };
}

// The instruction text below the marker line. With no system turn in the body, both injectors
// append it as a trailing system message (#13383), so it is found by role, not at messages[0].
function instructionText(
  result: { body: { messages?: Array<{ role?: string; content?: unknown }> } },
  marker: string
) {
  const injected = result.body.messages?.find((message) => message.role === "system");
  assert.ok(injected, "the injector added a system message");
  const text = String(injected.content);
  assert.ok(text.startsWith(`${marker}\n`), `the instruction starts with ${marker}`);
  return text.slice(marker.length + 1);
}

test("golden: legacy config injects the same prose instruction as the old injector", () => {
  const { legacy, next } = injectBoth("Summarize this API response.", true);
  // The prose instruction text (minus the marker line) must be byte-identical.
  assert.equal(instructionText(next, OUTPUT_STYLE_MARKER), instructionText(legacy, LEGACY_MARKER));
});

test("golden: with Auto-Clarity off, both injectors apply the same instruction on a bypass turn", () => {
  const { legacy, next } = injectBoth("Explain this security vulnerability in detail.", false);
  assert.equal(instructionText(next, OUTPUT_STYLE_MARKER), instructionText(legacy, LEGACY_MARKER));
});

test("golden: with Auto-Clarity on, both injectors skip a bypass turn as security_warning", () => {
  const { body, legacy, next } = injectBoth("Explain this security vulnerability in detail.", true);
  for (const result of [legacy, next]) {
    assert.equal(result.applied, false);
    assert.equal(result.skippedReason, "security_warning");
    assert.deepEqual(result.body, body);
  }
});
