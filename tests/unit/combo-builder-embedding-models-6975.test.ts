/**
 * Issue #6975 — Embedding-only models were silently filtered out of the combo
 * builder picker because `isChatCapable` only accepted the "chat" endpoint.
 *
 * The fix renames it to `isComboSelectable` and also accepts "embedding",
 * since the combo runtime already supports embedding combos (see `dimensions`
 * override in `createComboSchema`).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { isComboSelectable } from "../../src/lib/combos/builderOptions.ts";

test("#6975: embedding-only endpoints are selectable", () => {
  assert.equal(isComboSelectable(["embedding"]), true);
});

test("#6975: chat-only endpoints are selectable (no regression)", () => {
  assert.equal(isComboSelectable(["chat"]), true);
});

test("#6975: combined chat+embedding endpoints are selectable", () => {
  assert.equal(isComboSelectable(["chat", "embedding"]), true);
});

test("#6975: empty/undefined endpoints default to selectable (backward compat)", () => {
  assert.equal(isComboSelectable([]), true);
  assert.equal(isComboSelectable(undefined), true);
});

test("#6975: non-chat non-embedding endpoints are NOT selectable", () => {
  assert.equal(isComboSelectable(["image_generation"]), false);
  assert.equal(isComboSelectable(["audio_transcription"]), false);
  assert.equal(isComboSelectable(["moderation"]), false);
});

test("#6975: mixed embedding + other (non-chat) is selectable", () => {
  assert.equal(isComboSelectable(["embedding", "image_generation"]), true);
});
