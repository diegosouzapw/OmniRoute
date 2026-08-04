import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveOutputStyleSelection } from "../../../open-sse/services/compression/outputStyles/backCompat.ts";
import { applyOutputStyles } from "../../../open-sse/services/compression/outputStyles/apply.ts";
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

test("golden: legacy config injects the same prose instruction as the old injector", () => {
  const body = { messages: [{ role: "user", content: "Summarize this API response." }] };
  const legacy = applyCavemanOutputMode(structuredClone(body), {
    enabled: true,
    intensity: "full",
    autoClarity: true,
  });
  const sel = resolveOutputStyleSelection({
    cavemanOutputMode: { enabled: true, intensity: "full", autoClarity: true },
  });
  const next = applyOutputStyles(structuredClone(body), sel);

  const legacyInstr = String(legacy.body.messages?.[0]?.content);
  const nextInstr = String(next.body.messages?.[0]?.content);
  // The prose instruction text (minus the marker line) must be byte-identical.
  const strip = (s: string) => s.split("\n").slice(1).join("\n");
  assert.equal(strip(nextInstr), strip(legacyInstr));
});
