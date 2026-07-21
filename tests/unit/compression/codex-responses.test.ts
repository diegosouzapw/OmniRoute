import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { adaptBodyForCompression } from "../../../open-sse/services/compression/bodyAdapter.ts";
import { codexResponsesEngine } from "../../../open-sse/services/compression/engines/codexResponses/index.ts";
import {
  applyCompression,
  applyCompressionAsync,
} from "../../../open-sse/services/compression/index.ts";

function run(input: unknown[], config: Record<string, unknown> = {}) {
  const adapter = adaptBodyForCompression({ input });
  const result = codexResponsesEngine.apply(adapter.body, {
    stepConfig: { enabled: true, ...config },
  });
  return { result, body: adapter.restore(result.body) };
}

describe("Responses tool-output compression", () => {
  it("minifies eligible JSON function output and preserves the Responses envelope", () => {
    const output = JSON.stringify(
      {
        files: Array.from({ length: 12 }, (_, i) => ({
          name: `file-${i}`,
          status: "ok",
          details: "complete",
        })),
        count: 12,
      },
      null,
      2
    );
    const { result, body } = run([
      { type: "function_call", call_id: "call-1", name: "run_command", arguments: "{}" },
      { type: "function_call_output", call_id: "call-1", output },
    ]);
    const restored = (body.input as Array<Record<string, unknown>>)[1];
    assert.equal(result.compressed, true);
    assert.equal(restored.type, "function_call_output");
    assert.deepEqual(JSON.parse(String(restored.output)), JSON.parse(output));
    assert.ok(String(restored.output).length < output.length);
  });

  it("compresses shell/build logs and patch output when they are large enough", () => {
    const log = [
      "npm test",
      ...Array.from({ length: 35 }, (_, i) => `verbose test progress ${i}`),
      "FAIL test/example.test.ts",
      "Error: expected value",
      ...Array.from({ length: 20 }, (_, i) => `tail progress ${i}`),
    ].join("\n");
    const diff = [
      "diff --git a/file.ts b/file.ts",
      "@@ -1,10 +1,10 @@",
      ...Array.from({ length: 60 }, (_, i) => ` context ${i}`),
      "-old value",
      "+new value",
      ...Array.from({ length: 60 }, (_, i) => ` context after ${i}`),
    ].join("\n");
    const logResult = run([
      { type: "function_call", call_id: "shell-1", name: "run_shell", arguments: "{}" },
      { type: "function_call_output", call_id: "shell-1", output: log },
    ]);
    const diffResult = run([{ type: "apply_patch_call_output", id: "patch-1", output: diff }]);
    assert.equal(logResult.result.compressed, true);
    assert.equal(diffResult.result.compressed, true);
    assert.match(
      String((logResult.body.input as Array<Record<string, unknown>>)[1].output),
      /compressed/
    );
    assert.match(
      String((diffResult.body.input as Array<Record<string, unknown>>)[0].output),
      /new value/
    );
  });

  it("keeps lossy shell/log, diff, and search rewrites fail-open", () => {
    const log = [
      "npm test",
      ...Array.from({ length: 50 }, (_, i) => `progress ${i}`),
      "Error: expected value",
    ].join("\n");
    const result = run([{ type: "local_shell_call_output", id: "shell-1", output: log }]);
    const restored = result.body.input as Array<Record<string, unknown>>;
    assert.equal(result.result.compressed, false);
    assert.equal(restored[0].output, log);
  });

  it("protects Read/Grep, retrieval, unknown tools, malformed JSON, and non-string output", () => {
    const noisy = JSON.stringify(
      { data: Array.from({ length: 20 }, (_, i) => ({ i, value: "x" })) },
      null,
      2
    );
    const input = [
      { type: "function_call", call_id: "read-1", name: "Read", arguments: "{}" },
      { type: "function_call_output", call_id: "read-1", output: noisy },
      {
        type: "function_call",
        call_id: "retrieval-1",
        name: "headless_retrieval",
        arguments: "{}",
      },
      { type: "function_call_output", call_id: "retrieval-1", output: noisy },
      { type: "function_call_output", call_id: "unknown", output: noisy },
      { type: "function_call", call_id: "shell-1", name: "run_shell", arguments: "{}" },
      { type: "function_call_output", call_id: "shell-1", output: "{not valid json" },
      {
        type: "local_shell_call_output",
        id: "array-output",
        output: [{ type: "input_text", text: noisy }],
      },
    ];
    const { result, body } = run(input);
    const restored = body.input as Array<Record<string, unknown>>;
    assert.equal(result.compressed, false);
    assert.equal(restored[1].output, noisy);
    assert.equal(restored[3].output, noisy);
    assert.equal(restored[4].output, noisy);
    assert.equal(restored[6].output, "{not valid json");
    assert.deepEqual(restored[7].output, input[7].output);
  });

  it("fails open when disabled and when the candidate exceeds configured limits", () => {
    const output = JSON.stringify(
      { data: Array.from({ length: 50 }, (_, i) => ({ i, value: "x" })) },
      null,
      2
    );
    const input = [{ type: "local_shell_call_output", id: "shell-1", output }];
    const disabled = run(input, { enabled: false });
    const limited = run(input, { maxCandidateBytes: 10 });
    assert.equal(disabled.result.compressed, false);
    assert.equal(limited.result.compressed, false);
    assert.equal((disabled.body.input as Array<Record<string, unknown>>)[0].output, output);
    assert.equal((limited.body.input as Array<Record<string, unknown>>)[0].output, output);
  });

  it("supports standalone mode and stacked pipelines through the public selector", async () => {
    const output = JSON.stringify(
      { data: Array.from({ length: 20 }, (_, i) => ({ id: i, status: "ok" })) },
      null,
      2
    );
    const input = [
      { type: "function_call", call_id: "run-1", name: "run_command", arguments: "{}" },
      { type: "function_call_output", call_id: "run-1", output },
    ];
    const config = {
      // Selecting the engine in an explicit stacked pipeline enables it even
      // when the standalone setting remains at its default disabled value.
      codexResponsesConfig: { enabled: false },
      stackedPipeline: [{ engine: "codex-responses" as const }],
    };
    const standalone = applyCompression({ input }, "codex-responses", { config });
    const stacked = await applyCompressionAsync({ input }, "stacked", { config });
    assert.equal(standalone.compressed, true);
    assert.equal(stacked.compressed, true);
    assert.equal(
      JSON.stringify(standalone.body),
      JSON.stringify(stacked.body),
      "stacked execution should preserve the standalone Responses envelope"
    );

    const stringPipeline = await applyCompressionAsync({ input }, "stacked", {
      config: { ...config, stackedPipeline: ["codex-responses" as const] },
    });
    assert.equal(stringPipeline.compressed, true);
    assert.deepEqual(stringPipeline.body, stacked.body);

    const explicitlyDisabled = await applyCompressionAsync({ input }, "stacked", {
      config: {
        ...config,
        stackedPipeline: [{ engine: "codex-responses", config: { enabled: false } }],
      },
    });
    assert.equal(explicitlyDisabled.compressed, false);
  });
});
