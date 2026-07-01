import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  fallbackCodexProfile,
  isCodexCompatibleTextModel,
  syncCodexProfilesFromModels,
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

test("syncCodexProfilesFromModels writes compatible profiles and skips media", async () => {
  const codexHome = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-codex-profiles-"));
  try {
    const result = await syncCodexProfilesFromModels(
      [
        {
          id: "new-provider/future-chat-1",
          context_length: 250000,
          output_modalities: ["text"],
        },
        {
          id: "video-provider/seedance",
          type: "video",
          output_modalities: ["video"],
        },
      ],
      { codexHome }
    );

    assert.equal(result.written, 1);
    assert.equal(result.skipped, 1);
    const content = await fs.readFile(
      path.join(codexHome, "new-provider-future-chat-1.config.toml"),
      "utf8"
    );
    assert.match(content, /model\s+= "new-provider\/future-chat-1"/);
    await assert.rejects(
      fs.stat(path.join(codexHome, "video-provider-seedance.config.toml")),
      /ENOENT/
    );
  } finally {
    await fs.rm(codexHome, { recursive: true, force: true });
  }
});
