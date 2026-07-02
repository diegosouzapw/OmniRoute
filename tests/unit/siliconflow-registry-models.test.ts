import test from "node:test";
import assert from "node:assert/strict";

import { siliconflowProvider } from "../../open-sse/config/providers/registry/siliconflow/index.ts";

test("siliconflow registry uses the .com baseUrl", () => {
  assert.ok(
    siliconflowProvider.baseUrl.startsWith("https://api.siliconflow.com/"),
    `expected .com baseUrl, got ${siliconflowProvider.baseUrl}`
  );
});

test("siliconflow registry includes the synced net-new model IDs", () => {
  const ids = new Set(siliconflowProvider.models.map((m) => m.id));

  // Net-new IDs introduced by the upstream model-list sync — each was MISSING
  // from OmniRoute's registry before the port (failing-before assertion).
  const expectedNewIds = [
    "zai-org/GLM-5.1",
    "zai-org/GLM-5",
    "moonshotai/Kimi-K2.6",
    "moonshotai/Kimi-K2-Thinking",
    "Qwen/Qwen3.6-35B-A3B",
    "Qwen/Qwen3.5-397B-A17B",
    "MiniMaxAI/MiniMax-M2.5",
    "MiniMaxAI/MiniMax-M2.1",
    "tencent/Hunyuan-A13B-Instruct",
    "google/gemma-4-31B-it",
    "inclusionAI/Ling-flash-2.0",
    "ByteDance-Seed/Seed-OSS-36B-Instruct",
    "openai/gpt-oss-20b",
  ];

  for (const id of expectedNewIds) {
    assert.ok(ids.has(id), `expected model id "${id}" to be present`);
  }
});

test("siliconflow registry preserves the pre-existing model IDs", () => {
  const ids = new Set(siliconflowProvider.models.map((m) => m.id));
  for (const id of [
    "deepseek-ai/DeepSeek-V3.2",
    "deepseek-ai/DeepSeek-R1",
    "zai-org/GLM-4.7",
    "moonshotai/Kimi-K2.5",
    "baidu/ERNIE-4.5-300B-A47B",
  ]) {
    assert.ok(ids.has(id), `expected pre-existing model id "${id}" to remain`);
  }
});

test("siliconflow registry has no duplicate model IDs", () => {
  const ids = siliconflowProvider.models.map((m) => m.id);
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const id of ids) {
    if (seen.has(id)) duplicates.push(id);
    seen.add(id);
  }
  assert.deepEqual(duplicates, [], `duplicate model IDs found: ${duplicates.join(", ")}`);
});
