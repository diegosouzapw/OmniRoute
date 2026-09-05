import assert from "node:assert/strict";
import { test } from "node:test";

import { cursorProvider } from "../../../open-sse/config/providers/registry/cursor/index.ts";
import { normalizeCursorModelId } from "../../../open-sse/utils/cursorAgentProtobuf.ts";

const LEGACY_CURSOR_COMBO_MODEL_IDS = [
  "composer-2",
  "composer-2-fast",
  "gpt-5.4-low-fast",
  "gpt-5.3-codex-spark-preview-low",
  "gpt-5.3-codex-spark-preview",
  "gpt-5.3-codex-spark-preview-high",
  "gpt-5.3-codex-spark-preview-xhigh",
  "claude-4.6-opus-high-thinking-fast",
  "claude-4.6-opus-max-thinking-fast",
  "grok-4.3",
  "grok-4.5-medium",
  "grok-4.5-fast-medium",
  "grok-4.5-high",
  "grok-4.5-fast-high",
  "grok-4.5-xhigh",
  "grok-4.5-fast-xhigh",
  "kimi-k2.5",
] as const;

const LEGACY_GROK_ALIASES = {
  "grok-4.5-medium": "cursor-grok-4.5-medium",
  "grok-4.5-fast-medium": "cursor-grok-4.5-medium-fast",
  "grok-4.5-high": "cursor-grok-4.5-high",
  "grok-4.5-fast-high": "cursor-grok-4.5-high-fast",
  "grok-4.5-xhigh": "cursor-grok-4.5-xhigh",
  "grok-4.5-fast-xhigh": "cursor-grok-4.5-xhigh-fast",
} as const;

test("keeps legacy Cursor combo model ids out of the curated static catalog", () => {
  const catalogIds = new Set(cursorProvider.models.map((model) => model.id));

  for (const modelId of LEGACY_CURSOR_COMBO_MODEL_IDS) {
    assert.equal(catalogIds.has(modelId), false, `unexpected Cursor catalog model: ${modelId}`);
  }
});

test("normalizes legacy Grok combo ids to Cursor model ids", () => {
  for (const [legacyId, canonicalId] of Object.entries(LEGACY_GROK_ALIASES)) {
    assert.equal(normalizeCursorModelId(legacyId), canonicalId);
  }
});
