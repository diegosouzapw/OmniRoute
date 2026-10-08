import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  isCompressionWorkerEligible,
  isStrictlySerializable,
} from "../../open-sse/services/compression/compressionWorkerProtocol.ts";
import type { CompressionConfig } from "../../open-sse/services/compression/types.ts";

const body = {
  model: "gpt-test",
  messages: [{ role: "user", content: "hi" }],
};
const config = {
  enabled: true,
  defaultMode: "stacked",
  autoTriggerTokens: 1,
  cacheMinutes: 0,
  preserveSystemPrompt: true,
  stackedPipeline: [{ engine: "rtk" }, { engine: "caveman" }],
} as CompressionConfig;

describe("#13154: compression worker gate rejects structured-cloneable bodies", () => {
  it("structuredClone accepts a workerOptions shape with an explicit `undefined` key", () => {
    const workerOptions = {
      model: "gpt-test",
      supportsVision: true,
      providerTransport: "direct" as const,
      provider: undefined,
      imageTransportFidelity: "unknown" as const,
      sourceFormat: "chat" as const,
      targetFormat: "chat" as const,
      compressionStage: "pre-translation" as const,
      config,
    };
    assert.doesNotThrow(() => structuredClone({ body, mode: "stacked", options: workerOptions }));
  });

  it("the gate should accept that same structured-cloneable shape", () => {
    const workerOptions = {
      model: "gpt-test",
      supportsVision: true,
      providerTransport: "direct" as const,
      provider: undefined,
      imageTransportFidelity: "unknown" as const,
      sourceFormat: "chat" as const,
      targetFormat: "chat" as const,
      compressionStage: "pre-translation" as const,
      config,
    };
    assert.equal(isStrictlySerializable({ body, mode: "stacked", options: workerOptions }), true);
    assert.equal(isCompressionWorkerEligible(body, "stacked", workerOptions), true);
  });

  it("realistic runCompressionAsync-shaped call (only `provider` unset) should be eligible", () => {
    const workerOptions = {
      model: "gpt-test",
      supportsVision: undefined,
      providerTransport: undefined,
      provider: undefined,
      imageTransportFidelity: undefined,
      sourceFormat: undefined,
      targetFormat: undefined,
      compressionStage: undefined,
      config,
    };
    assert.doesNotThrow(() => structuredClone({ body, mode: "stacked", options: workerOptions }));
    assert.equal(isCompressionWorkerEligible(body, "stacked", workerOptions), true);
  });
});
