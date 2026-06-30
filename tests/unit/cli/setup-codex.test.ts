import { test } from "node:test";
import assert from "node:assert/strict";
import {
  fallbackCodexProfile,
  isCodexCompatibleTextModel,
} from "../../../bin/cli/commands/setup-codex.mjs";

test("fallbackCodexProfile creates profiles for compatible live catalog models", () => {
  const cfg = fallbackCodexProfile("new-provider/future-chat-1", {
    id: "new-provider/future-chat-1",
    context_length: 250000,
    max_output_tokens: 65536,
    output_modalities: ["text"],
  });

  assert.deepEqual(cfg, {
    name: "new-provider-future-chat-1",
    ctx: 250000,
    compact: 212500,
    summary: false,
    toolLimit: 32768,
  });
});

test("fallbackCodexProfile skips media and non-text models", () => {
  assert.equal(
    isCodexCompatibleTextModel({
      id: "antigravity/gemini-3.1-flash-image",
      type: "image",
      output_modalities: ["image"],
    }),
    false
  );
  assert.equal(
    fallbackCodexProfile("veo-free/seedance", {
      id: "veo-free/seedance",
      name: "Seedance",
      context_length: 128000,
    }),
    null
  );
});
