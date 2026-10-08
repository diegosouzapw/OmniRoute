import assert from "node:assert/strict";
import test from "node:test";
import {
  resolveGeminiTarget,
  runSetupGeminiCommand,
} from "../../../bin/cli/commands/setup-gemini.mjs";

test("Gemini setup rejects credential-bearing and non-HTTP endpoints", () => {
  for (const remote of [
    "https://user:private-secret@example.test",
    "file:///tmp/config",
    "https://example.test?token=private-secret",
    "https://example.test#private-secret",
  ]) {
    assert.throws(
      () => resolveGeminiTarget({ remote, apiKey: "test-key" }),
      /HTTP.*credentials.*query.*fragment/
    );
  }
});

test("Gemini setup reports invalid endpoints without exposing their values", async () => {
  const output: string[] = [];
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    output.push(args.join(" "));
  };
  try {
    assert.equal(
      await runSetupGeminiCommand({
        remote: "https://user:private-secret@example.test",
        model: "test-model",
        dryRun: true,
        yes: true,
      }),
      2
    );
    assert.ok(!output.join("\n").includes("private-secret"));
  } finally {
    console.error = originalError;
  }
});
