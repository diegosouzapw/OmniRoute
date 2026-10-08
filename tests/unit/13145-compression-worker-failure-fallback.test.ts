import test from "node:test";
import assert from "node:assert/strict";

/**
 * #13145 — a compression-worker failure must not silently disable compression.
 *
 * Before the fix, `applyCompressionAsync` caught any worker error and returned
 * `{ body, compressed: false, stats: null }`. That made every worker-eligible request
 * bypass the pipeline entirely while the response header still announced the selected
 * plan, and left `compression_analytics` empty — with nothing logged at any level.
 *
 * The worker is a throughput optimisation, not a behavioural variant, so a worker
 * failure must fall through to the in-process path and still compress.
 */

const TOOL_OUTPUT = Array.from({ length: 150 }, (_, i) =>
  [
    `/opt/project/src/module_${i % 20}/handler_${i}.ts:${i + 10}:  export const handler${i} = async (req) => {`,
    `-rw-r--r-- 1 user user ${1000 + i} Sep 14 10:0${i % 10} /opt/project/src/module_${i % 20}/handler_${i}.ts`,
  ].join("\n")
).join("\n");

function buildBody() {
  return {
    model: "test-model",
    messages: [
      { role: "system", content: "You are a helpful coding assistant." },
      {
        role: "user",
        content:
          "Review the search results and tell me which of the handlers should be refactored first.",
      },
      { role: "tool", tool_call_id: "call_1", content: TOOL_OUTPUT },
    ],
  };
}

function buildOptions() {
  return {
    // Every field must be populated: `runCompressionAsync` forwards these into
    // `workerOptions`, and `isStrictlySerializable` rejects the object if any value is
    // `undefined` — which would silently route the test through the in-process path and
    // prove nothing. Production requests always carry all of them.
    model: "test-model",
    provider: "test-provider",
    supportsVision: false,
    providerTransport: "direct",
    imageTransportFidelity: "lossless",
    sourceFormat: "openai",
    targetFormat: "openai",
    compressionStage: "pre-translation",
    config: {
      enabled: true,
      defaultMode: "stacked",
      stackedPipeline: [
        { engine: "rtk", intensity: "standard" },
        { engine: "caveman", intensity: "full" },
      ],
      cavemanConfig: {
        enabled: true,
        intensity: "full",
        compressRoles: ["user"],
        minMessageLength: 50,
        skipRules: [],
        preservePatterns: [],
      },
      rtkConfig: {
        enabled: true,
        intensity: "standard",
        applyToToolResults: true,
        applyToCodeBlocks: false,
        maxLinesPerResult: 120,
        maxCharsPerResult: 12000,
        deduplicateThreshold: 3,
        enableGrouping: true,
      },
      preserveSystemPrompt: true,
      preserveSystemPromptMode: "always",
    },
  };
}

test("#13145 the configured stacked pipeline is worker-eligible (guards the premise)", async () => {
  const { isCompressionWorkerEligible } =
    await import("../../open-sse/services/compression/compressionWorkerProtocol.ts");
  assert.equal(
    isCompressionWorkerEligible(buildBody() as never, "stacked" as never, buildOptions() as never),
    true,
    "an rtk+caveman stacked pipeline must take the worker path, otherwise this test proves nothing"
  );
});

test("#13145 a timeout degrades to the uncompressed body instead of stalling the event loop", async () => {
  // A dispatch timeout means the worker already spent its whole budget on this body, so
  // re-running the same CPU-bound pipeline in-process would block every other in-flight
  // request. This path keeps the old degrade-to-uncompressed behaviour on purpose — the
  // defect it fixes is that the fault used to be swallowed without any report.
  const previous = process.env.OMNI_COMPRESSION_WORKER_TIMEOUT_MS;
  process.env.OMNI_COMPRESSION_WORKER_TIMEOUT_MS = "1";
  try {
    const { applyCompressionAsync } =
      await import("../../open-sse/services/compression/strategySelector.ts");
    const result = await applyCompressionAsync(
      buildBody() as never,
      "stacked" as never,
      buildOptions() as never
    );
    assert.equal(result.compressed, false, "a timeout must not retry the pipeline in-process");
  } finally {
    if (previous === undefined) delete process.env.OMNI_COMPRESSION_WORKER_TIMEOUT_MS;
    else process.env.OMNI_COMPRESSION_WORKER_TIMEOUT_MS = previous;
    const { closeCompressionWorkerPoolForTests } =
      await import("../../open-sse/services/compression/compressionWorkerPool.ts");
    await closeCompressionWorkerPoolForTests();
  }
});

test("#13145 a synchronous worker spawn fault falls back to in-process compression", async () => {
  const { applyCompressionAsync } =
    await import("../../open-sse/services/compression/strategySelector.ts");
  const {
    __setCompressionWorkerFactoryForTests,
    closeCompressionWorkerPoolForTests,
    CompressionWorkerError,
  } = await import("../../open-sse/services/compression/compressionWorkerPool.ts");
  assert.equal(
    new CompressionWorkerError("boom", true).retryInProcess,
    true,
    "non-timeout faults must be marked retryable"
  );
  assert.equal(
    new CompressionWorkerError("timed out", false).retryInProcess,
    false,
    "timeouts must be marked non-retryable"
  );

  // #13423 changed the serializability gate. A shared (but non-cyclic) object across
  // sibling branches must still be worker-eligible, then exercise the injected spawn.
  const shared = { type: "input_text", text: "shared context" };
  const eligibleBody = buildBody();
  eligibleBody.messages.push({
    role: "user",
    content: [shared, shared],
  } as never);
  const options = buildOptions();
  const { isCompressionWorkerEligible } =
    await import("../../open-sse/services/compression/compressionWorkerProtocol.ts");
  assert.equal(
    isCompressionWorkerEligible(eligibleBody as never, "stacked" as never, options as never),
    true,
    "the #13423 shared-subobject shape must route through the worker"
  );

  let spawns = 0;
  await __setCompressionWorkerFactoryForTests(() => {
    spawns++;
    const error = new Error("Cannot find module './compressionWorker.ts'");
    (error as NodeJS.ErrnoException).code = "MODULE_NOT_FOUND";
    throw error;
  });
  try {
    const result = await applyCompressionAsync(
      eligibleBody as never,
      "stacked" as never,
      options as never
    );
    assert.equal(spawns, 1, "worker-eligible input must exercise the throwing factory");
    assert.equal(result.compressed, true, "a fast spawn fault must retry compression in-process");
    assert.ok(result.stats && result.stats.originalTokens > result.stats.compressedTokens);
  } finally {
    await closeCompressionWorkerPoolForTests();
    await __setCompressionWorkerFactoryForTests(null);
  }
});
