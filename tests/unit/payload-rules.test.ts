import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { applyPayloadRules, getPayloadRulesConfig, resetPayloadRulesConfigForTests } =
  await import("../../open-sse/services/payloadRules.ts");

const ORIGINAL_PAYLOAD_RULES_PATH = process.env.OMNIROUTE_PAYLOAD_RULES_PATH;
const ORIGINAL_PAYLOAD_RULES_RELOAD_MS = process.env.OMNIROUTE_PAYLOAD_RULES_RELOAD_MS;

test.afterEach(() => {
  resetPayloadRulesConfigForTests();

  if (ORIGINAL_PAYLOAD_RULES_PATH === undefined) {
    delete process.env.OMNIROUTE_PAYLOAD_RULES_PATH;
  } else {
    process.env.OMNIROUTE_PAYLOAD_RULES_PATH = ORIGINAL_PAYLOAD_RULES_PATH;
  }

  if (ORIGINAL_PAYLOAD_RULES_RELOAD_MS === undefined) {
    delete process.env.OMNIROUTE_PAYLOAD_RULES_RELOAD_MS;
  } else {
    process.env.OMNIROUTE_PAYLOAD_RULES_RELOAD_MS = ORIGINAL_PAYLOAD_RULES_RELOAD_MS;
  }
});

test("payload rules apply default, default-raw, override, and filter operations", () => {
  const { payload, applied } = applyPayloadRules(
    {
      temperature: 0.4,
      metadata: { removeMe: true },
      dangerous: { enabled: true },
    },
    "gpt-5.4",
    "openai",
    {
      default: [
        {
          models: [{ name: "gpt-*", protocol: "openai" }],
          params: {
            "metadata.routeTag": "feature-110",
          },
        },
      ],
      defaultRaw: [
        {
          models: [{ name: "gpt-*", protocol: "openai" }],
          params: {
            response_format:
              '{"type":"json_schema","json_schema":{"name":"shape","schema":{"type":"object"}}}',
          },
        },
      ],
      override: [
        {
          models: [{ name: "gpt-*", protocol: "openai" }],
          params: {
            "reasoning.effort": "high",
          },
        },
      ],
      filter: [
        {
          models: [{ name: "gpt-*", protocol: "openai" }],
          params: ["dangerous", "metadata.removeMe"],
        },
      ],
    }
  );

  assert.equal(payload.temperature, 0.4);
  assert.equal((payload.metadata as any).routeTag, "feature-110");
  assert.equal("removeMe" in payload.metadata, false);
  assert.equal("dangerous" in payload, false);
  assert.equal((payload as any).reasoning.effort, "high");
  assert.deepEqual(payload.response_format, {
    type: "json_schema",
    json_schema: {
      name: "shape",
      schema: { type: "object" },
    },
  });
  assert.deepEqual(
    applied.map((rule) => `${rule.type}:${rule.path}`),
    [
      "default:metadata.routeTag",
      "default-raw:response_format",
      "override:reasoning.effort",
      "filter:dangerous",
      "filter:metadata.removeMe",
    ]
  );
});

test("payload rules load from JSON file and reload changed content", async () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-payload-rules-"));
  const configPath = path.join(tempDir, "payloadRules.json");

  process.env.OMNIROUTE_PAYLOAD_RULES_PATH = configPath;

  fs.writeFileSync(
    configPath,
    JSON.stringify({
      override: [
        {
          models: [{ name: "gpt-*", protocol: "openai" }],
          params: { temperature: 0.1 },
        },
      ],
    }),
    "utf-8"
  );

  const first = await getPayloadRulesConfig({ forceRefresh: true });
  assert.equal(first.override.length, 1);
  assert.equal(first.override[0].params.temperature, 0.1);
  assert.equal(first.defaultRaw.length, 0);

  await new Promise((resolve) => setTimeout(resolve, 20));

  fs.writeFileSync(
    configPath,
    JSON.stringify({
      "default-raw": [
        {
          models: [{ name: "gpt-*", protocol: "openai" }],
          params: { response_format: { type: "json_object" } },
        },
      ],
    }),
    "utf-8"
  );

  const second = await getPayloadRulesConfig({ forceRefresh: true });
  assert.equal(second.override.length, 0);
  assert.equal(second.defaultRaw.length, 1);
  assert.deepEqual(second.defaultRaw[0].params.response_format, { type: "json_object" });

  fs.rmSync(tempDir, { recursive: true, force: true });
});
