import assert from "node:assert/strict";
import test from "node:test";

import { resolveAudioCapability } from "../../../src/lib/modelCapabilities.ts";

test("explicit registry audio capability wins", () => {
  assert.equal(resolveAudioCapability(undefined, { supportsAudio: true }, []), true);
});

test("explicit static audio capability is used when registry is silent", () => {
  assert.equal(resolveAudioCapability({ supportsAudio: false }, null, []), false);
});

test("synced input modalities identify audio-capable and text-only models", () => {
  assert.equal(resolveAudioCapability(undefined, null, ["text", "audio"]), true);
  assert.equal(resolveAudioCapability(undefined, null, ["text"]), false);
});

test("missing audio capability evidence stays unknown", () => {
  assert.equal(resolveAudioCapability(undefined, null, []), null);
});
