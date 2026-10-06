import assert from "node:assert/strict";
import test from "node:test";
import { Command } from "commander";

const modulePath = "../../../bin/cli/commands/model-validation.mjs";
const command = await import(modulePath).catch(() => null);
const receipt = {
  schemaVersion: 1,
  persistenceVerified: true,
  model: { id: "test-model", apiKey: "must-not-print" },
  validation: {
    id: "b738b890-78ed-49ba-84ad-14e01ba24ecd",
    status: "passed",
    provider: "test-provider",
    modelId: "test-model",
    connectionId: "connection-full-id",
    validatedAt: "2026-09-22T12:00:00.000Z",
    stages: { generation: "passed", toolCall: "passed", continuation: "passed" },
    credential: "must-not-print",
  },
};
const options = {
  provider: "test-provider",
  connection: "connection-full-id",
  allowInference: true,
  yes: true,
  baseUrl: "http://127.0.0.1:20128",
  apiKey: "synthetic-management-key",
};

function harness(response: unknown = receipt, status = 201) {
  const requests: Array<{ path: string; options: Record<string, unknown> }> = [];
  const output: string[] = [];
  const errors: string[] = [];
  return {
    requests,
    output,
    errors,
    deps: {
      fetch: async (path: string, requestOptions: Record<string, unknown>) => {
        requests.push({ path, options: requestOptions });
        return Response.json(response, { status });
      },
      writeOut: (value: string) => output.push(value),
      writeError: (value: string) => errors.push(value),
      resolveContext: async () => ({ baseUrl: "https://context.example.test" }),
    },
  };
}

test("models exposes the Test & Add command implementation", () => {
  assert.equal(typeof command?.runModelValidation, "function");
});

test("no inference or mutation without both explicit cost consent and confirmation", async () => {
  for (const denied of [{ allowInference: false }, { yes: false }]) {
    const h = harness();
    assert.equal(
      await command.runModelValidation("test-model", { ...options, ...denied }, h.deps),
      2
    );
    assert.equal(h.requests.length, 0);
  }
});

test("dry-run is local only and never prints management credentials", async () => {
  const h = harness();
  assert.equal(
    await command.runModelValidation("test-model", { ...options, dryRun: true }, h.deps),
    0
  );
  assert.equal(h.requests.length, 0);
  assert.equal(JSON.parse(h.output[0]).dryRun, true);
  assert.ok(!h.output.join("").includes(options.apiKey));
});

test("validation makes exactly one non-retried management request with context options", async () => {
  const h = harness();
  assert.equal(
    await command.runModelValidation("test-model", { ...options, json: true }, h.deps),
    0
  );
  assert.equal(h.requests.length, 1);
  assert.equal(h.requests[0].path, "/api/provider-models/validate-and-add");
  assert.equal(h.requests[0].options.retry, false);
  assert.equal(h.requests[0].options.redirect, "error");
  assert.equal(h.requests[0].options.apiKey, options.apiKey);
  assert.deepEqual(h.requests[0].options.body, {
    provider: "test-provider",
    modelId: "test-model",
    connectionId: "connection-full-id",
    allowInference: true,
    apiFormat: "chat-completions",
  });
  assert.ok(!h.output.join("").includes("must-not-print"));
});

test("an explicit context supplies the destination instead of ambient URL", async () => {
  const h = harness();
  assert.equal(
    await command.runModelValidation(
      "test-model",
      { ...options, baseUrl: undefined, context: "remote" },
      h.deps
    ),
    0
  );
  assert.equal(h.requests[0].options.baseUrl, "https://context.example.test");
  assert.equal(h.requests[0].options.context, "remote");
});

test("invalid IDs, metadata, or formats fail before any request", async () => {
  for (const invalid of [
    { provider: "bad\nprovider" },
    { connection: "" },
    { maxInputTokens: "" },
    { maxOutputTokens: "0" },
    { apiFormat: "embeddings" },
  ]) {
    const h = harness();
    assert.equal(
      await command.runModelValidation("test-model", { ...options, ...invalid }, h.deps),
      2
    );
    assert.equal(h.requests.length, 0);
  }
});

test("connection mismatch, incomplete stages and unverified persistence are not success", async () => {
  const variants = [
    { ...receipt, persistenceVerified: false },
    { ...receipt, validation: { ...receipt.validation, connectionId: "another-connection" } },
    { ...receipt, validation: { ...receipt.validation, modelId: "another-model" } },
    {
      ...receipt,
      validation: {
        ...receipt.validation,
        stages: { ...receipt.validation.stages, continuation: "failed" },
      },
    },
  ];
  for (const variant of variants) {
    const h = harness(variant);
    assert.notEqual(await command.runModelValidation("test-model", options, h.deps), 0);
    assert.equal(h.output.length, 0);
  }
});

test("HTTP errors never print server bodies and preserve authentication failure exit code", async () => {
  const h = harness({ error: { message: "secret-bearing server stack must-not-print" } }, 403);
  assert.equal(await command.runModelValidation("test-model", options, h.deps), 4);
  assert.equal(h.requests.length, 1);
  assert.ok(!h.errors.join("").includes("must-not-print"));
});

test("network failure warns that persistence is unverified without retrying", async () => {
  const h = harness();
  h.deps.fetch = async () => {
    throw new Error("secret in network message");
  };
  assert.notEqual(await command.runModelValidation("test-model", options, h.deps), 0);
  assert.match(h.errors.join(""), /not verified/i);
  assert.ok(!h.errors.join("").includes("secret in network message"));
});

test("oversized receipts are rejected even when their verification fields look valid", async () => {
  const h = harness({ ...receipt, oversized: "x".repeat(70_000) });
  assert.notEqual(await command.runModelValidation("test-model", options, h.deps), 0);
  assert.equal(h.output.length, 0);
});

test("a receipt body that never finishes is cancelled and never reported as persisted", async () => {
  const h = harness();
  let cancelled = false;
  h.deps.fetch = async () =>
    new Response(
      new ReadableStream({
        cancel() {
          cancelled = true;
        },
      }),
      { status: 201 }
    );
  assert.notEqual(
    await command.runModelValidation("test-model", options, {
      ...h.deps,
      receiptTimeoutMs: 10,
    }),
    0
  );
  assert.equal(cancelled, true);
  assert.equal(h.output.length, 0);
});

test("registration attaches to the existing models command", () => {
  const program = new Command();
  const models = program.command("models [provider]");
  command.registerModelValidation(program);
  assert.deepEqual(
    models.commands.map((entry) => entry.name()),
    ["test-add"]
  );
  assert.ok(models.commands[0].options.some((option) => option.long === "--allow-inference"));
});
