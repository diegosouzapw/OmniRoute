import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyCavemanOutputMode,
  CAVEMAN_INSTRUCTION_BY_LANGUAGE,
} from "../../../open-sse/services/compression/outputMode.ts";
import { resolveOutputStyleSelection } from "../../../open-sse/services/compression/outputStyles/backCompat.ts";
import {
  applyOutputStyles,
  OUTPUT_STYLE_MARKER,
} from "../../../open-sse/services/compression/outputStyles/apply.ts";

const LEGACY_MARKER = "[OmniRoute Caveman Output Mode]";
const LEVELS = ["lite", "full", "ultra"] as const;

// The instruction text below the marker line. The instruction lands in a top-level
// `system` field or a trailing system message (#13383), so every text surface is
// gathered and read from the marker on — a placement change cannot fake a failure here.
function instructionText(
  result: {
    applied: boolean;
    body: { messages?: Array<{ role?: string; content?: unknown }>; system?: unknown };
  },
  marker: string
): string {
  assert.equal(result.applied, true, "the injector applied the instruction");
  const parts: string[] = [];
  if (typeof result.body.system === "string") parts.push(result.body.system);
  else if (Array.isArray(result.body.system)) {
    for (const block of result.body.system) {
      const text = (block as { text?: unknown } | null)?.text;
      if (typeof text === "string") parts.push(text);
    }
  }
  for (const message of result.body.messages ?? []) {
    if (typeof message.content === "string") parts.push(message.content);
  }
  const joined = parts.join("\n");
  const markerAt = joined.indexOf(marker);
  assert.ok(
    markerAt >= 0 && joined[markerAt + marker.length] === "\n",
    `the instruction starts with ${marker}`
  );
  return joined.slice(markerAt + marker.length + 1);
}

// The languages come from the legacy table at runtime, so a language pack added there without a
// matching terse-prose translation fails here.
for (const language of Object.keys(CAVEMAN_INSTRUCTION_BY_LANGUAGE)) {
  for (const intensity of LEVELS) {
    test(`legacy ${language} ${intensity}: the unified injector writes the legacy text below its marker`, () => {
      const body = { messages: [{ role: "user", content: "Summarize this API response." }] };
      const config = { enabled: true, intensity, autoClarity: true };
      const legacy = applyCavemanOutputMode(structuredClone(body), config, language);
      const next = applyOutputStyles(
        structuredClone(body),
        resolveOutputStyleSelection({ cavemanOutputMode: config }),
        language,
        { autoClarity: true }
      );
      assert.equal(
        instructionText(next, OUTPUT_STYLE_MARKER),
        instructionText(legacy, LEGACY_MARKER)
      );
    });
  }
}
