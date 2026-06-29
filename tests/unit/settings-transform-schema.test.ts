import test from "node:test";
import assert from "node:assert/strict";

import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";

const commonOperations = [
  {
    kind: "drop_paragraph_if_contains",
    needles: ["needle"],
    caseSensitive: true,
  },
  {
    kind: "drop_paragraph_if_starts_with",
    prefixes: ["prefix"],
  },
  {
    kind: "replace_text",
    match: "before",
    replacement: "after",
    allOccurrences: true,
  },
  {
    kind: "replace_regex",
    pattern: "before",
    flags: "gi",
    replacement: "after",
  },
  {
    kind: "drop_block_if_contains",
    needles: ["needle"],
  },
  {
    kind: "prepend_system_block",
    text: "prefix block",
    idempotencyKey: "prefix-key",
  },
  {
    kind: "append_system_block",
    text: "suffix block",
  },
  {
    kind: "inject_billing_header",
    entrypoint: "claude-code",
    versionFormat: "ex-machina",
    cchAlgo: "sha256-first-user",
    version: "1.0.0",
  },
] as const;

test("settings schema accepts the shared transform operations in legacy and v2 configs", () => {
  const parsed = updateSettingsSchema.parse({
    ccBridgeTransforms: {
      enabled: true,
      pipeline: commonOperations,
    },
    systemTransforms: {
      providers: {
        claude: {
          enabled: true,
          pipeline: commonOperations,
        },
      },
    },
  });

  assert.equal(parsed.ccBridgeTransforms?.pipeline.length, commonOperations.length);
  assert.equal(parsed.systemTransforms?.providers.claude.pipeline.length, commonOperations.length);
});

test("settings schema keeps obfuscate_words limited to systemTransforms", () => {
  const obfuscateWords = {
    kind: "obfuscate_words",
    words: ["opencode"],
    targets: ["system"],
  } as const;

  assert.equal(
    updateSettingsSchema.safeParse({
      systemTransforms: {
        providers: {
          claude: {
            enabled: true,
            pipeline: [obfuscateWords],
          },
        },
      },
    }).success,
    true
  );

  assert.equal(
    updateSettingsSchema.safeParse({
      ccBridgeTransforms: {
        enabled: true,
        pipeline: [obfuscateWords],
      },
    }).success,
    false
  );
});
