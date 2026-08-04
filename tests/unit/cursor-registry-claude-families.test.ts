import test from "node:test";
import assert from "node:assert/strict";
import { cursorProvider } from "../../open-sse/config/providers/registry/cursor/index.ts";

const EFFORTS = ["low", "medium", "high", "xhigh", "max"] as const;

function modelIds(): Set<string> {
  return new Set(cursorProvider.models.map((m) => m.id));
}

test("cursor registry includes Claude Opus 4.8 effort + thinking + fast variants", () => {
  const ids = modelIds();
  for (const effort of EFFORTS) {
    assert.ok(ids.has(`claude-opus-4-8-${effort}`), `missing claude-opus-4-8-${effort}`);
    assert.ok(ids.has(`claude-opus-4-8-${effort}-fast`), `missing claude-opus-4-8-${effort}-fast`);
    assert.ok(
      ids.has(`claude-opus-4-8-thinking-${effort}`),
      `missing claude-opus-4-8-thinking-${effort}`
    );
    assert.ok(
      ids.has(`claude-opus-4-8-thinking-${effort}-fast`),
      `missing claude-opus-4-8-thinking-${effort}-fast`
    );
  }
});

test("cursor registry includes Claude Fable 5 effort + thinking variants", () => {
  const ids = modelIds();
  for (const effort of EFFORTS) {
    assert.ok(ids.has(`claude-fable-5-${effort}`), `missing claude-fable-5-${effort}`);
    assert.ok(
      ids.has(`claude-fable-5-thinking-${effort}`),
      `missing claude-fable-5-thinking-${effort}`
    );
  }
});

test("cursor registry includes Claude Sonnet 5 effort + thinking variants", () => {
  const ids = modelIds();
  for (const effort of EFFORTS) {
    assert.ok(ids.has(`claude-sonnet-5-${effort}`), `missing claude-sonnet-5-${effort}`);
    assert.ok(
      ids.has(`claude-sonnet-5-thinking-${effort}`),
      `missing claude-sonnet-5-thinking-${effort}`
    );
  }
});
