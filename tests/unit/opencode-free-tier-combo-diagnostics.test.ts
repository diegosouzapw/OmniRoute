import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const originalDataDir = process.env.DATA_DIR;
const originalPluginsDir = process.env.OMNIROUTE_PLUGINS_DIR;
const originalFileLogging = process.env.APP_LOG_TO_FILE;
const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-combo-diagnostics-"));
process.env.DATA_DIR = testDataDir;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(testDataDir, "plugins");
process.env.APP_LOG_TO_FILE = "false";

// The keepalive dependency reaches error.ts and the DB; isolate before any app import.
const { OPENAI_RESPONSES_ERROR_FRAME, withEarlyStreamKeepalive } =
  await import("../../open-sse/utils/earlyStreamKeepalive.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { buildErrorBody, createErrorResult, projectPublicErrorIdentifier } =
  await import("../../open-sse/utils/error.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { resetAll: resetAllSemaphores } =
  await import("../../open-sse/services/rateLimitSemaphore.ts");

const refusal = "OpenCode's free tier can only be used from within OpenCode.";
const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };
let comboIndex = 0;

type Failure = { model: string; status: number; message: string; type?: string; code?: string };

function resetRuntime() {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  clearAllModelLockouts();
  resetAllSemaphores();
}

test.beforeEach(resetRuntime);
test.after(() => {
  resetRuntime();
  resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalPluginsDir === undefined) delete process.env.OMNIROUTE_PLUGINS_DIR;
  else process.env.OMNIROUTE_PLUGINS_DIR = originalPluginsDir;
  if (originalFileLogging === undefined) delete process.env.APP_LOG_TO_FILE;
  else process.env.APP_LOG_TO_FILE = originalFileLogging;
});

async function runCombo(strategy: string, failures: Failure[]) {
  const attempts: string[] = [];
  const input = {
    model: "diagnostic-combo",
    messages: [{ role: "user", content: "hi" }],
    stream: true,
  };
  const original = structuredClone(input);
  const response = await handleComboChat({
    body: input,
    combo: {
      name: `opencode-diagnostics-${comboIndex++}`,
      strategy,
      models: failures.map((failure) => failure.model),
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (body, model) => {
      const failure = failures[attempts.length];
      assert.ok(failure, "must not retry a refused request");
      assert.equal(model, failure.model);
      assert.deepEqual(body, original);
      attempts.push(model);
      return new Response(
        JSON.stringify({
          error: {
            message: failure.message,
            type: failure.type,
            code: failure.code,
          },
        }),
        { status: failure.status, headers: { "Content-Type": "application/json" } }
      );
    },
    isModelAvailable: async () => true,
    settings: {},
    allCombos: [],
    log,
  });
  assert.deepEqual(
    attempts,
    failures.map((failure) => failure.model)
  );
  assert.deepEqual(input, original);
  return response;
}

test(
  "public error projection retains the known refusal identity safely",
  { timeout: 5_000 },
  async () => {
    for (const identifier of ["FreeTierError", "freetiererror", "FREETIERERROR"]) {
      assert.equal(projectPublicErrorIdentifier(identifier, "permission_denied"), identifier);
      const body = buildErrorBody(403, refusal, undefined, { type: identifier, code: identifier });
      assert.equal(body.error.type, identifier);
      assert.equal(body.error.code, identifier);
    }
    const message = `${refusal} access_token=fixture-secret\n    at call (/srv/private/handler.ts:42:7)`;
    const result = createErrorResult(403, message, null, "FreeTierError", "FreeTierError");
    assert.equal(result.response.status, 403);
    const body = await result.response.json();
    assert.equal(body.error.type, "FreeTierError");
    assert.equal(body.error.code, "FreeTierError");
    assert.doesNotMatch(body.error.message, /fixture-secret|handler\.ts|at call/);
  }
);

for (const strategy of ["priority", "round-robin"]) {
  test(
    `${strategy}: homogeneous refusal keeps status and machine-readable restriction`,
    { timeout: 10_000 },
    async () => {
      for (const status of [403, 451]) {
        const response = await runCombo(strategy, [
          {
            model: "oc/mimo-v2.6-flash-free",
            status,
            message: refusal,
            type: "FreeTierError",
          },
        ]);
        assert.equal(response.status, status);
        const body = await response.json();
        assert.equal(body.error.code, "FreeTierError");
        assert.match(body.error.message, /access restriction/);
        assert.doesNotMatch(body.error.message, /: auth —/);
        assert.ok(body.error.message.includes(refusal));
      }
    }
  );

  test(
    `${strategy}: mixed auth and restriction preserve the existing aggregate verdict`,
    { timeout: 10_000 },
    async () => {
      const response = await runCombo(strategy, [
        {
          model: "openai/gpt-4o-mini",
          status: 401,
          message: "Invalid API key",
          code: "invalid_api_key",
        },
        { model: "oc/mimo-v2.6-flash-free", status: 403, message: refusal, code: "FreeTierError" },
      ]);
      assert.equal(response.status, 403);
      const body = await response.json();
      assert.equal(body.error.code, "permission_denied");
      assert.match(body.error.message, /auth — Invalid API key/);
      assert.match(body.error.message, /access restriction/);
    }
  );

  test(
    `${strategy}: actual refusal reaches the Responses SSE error frame without secrets`,
    { timeout: 10_000 },
    async () => {
      let resolve!: (response: Response) => void;
      const pending = new Promise<Response>((done) => {
        resolve = done;
      });
      const stream = await withEarlyStreamKeepalive(pending, {
        thresholdMs: 1,
        intervalMs: 10,
        errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
      });
      try {
        resolve(
          await runCombo(strategy, [
            {
              model: "oc/mimo-v2.6-flash-free",
              status: 403,
              message: `${refusal} access_token=fixture-secret\n    at call (/srv/private/handler.ts:42:7)`,
              type: "FreeTierError",
            },
          ])
        );
        assert.equal(stream.status, 200);
        const frames = [...(await stream.text()).matchAll(/^data: (.+)$/gm)];
        const frame = JSON.parse(frames.at(-1)![1]);
        assert.equal(frame.type, "error");
        assert.equal(frame.code, "FreeTierError");
        assert.match(frame.message, /access restriction/);
        assert.doesNotMatch(JSON.stringify(frame), /fixture-secret|handler\.ts|at call/);
      } finally {
        resolve(new Response("fixture cleanup", { status: 500 }));
        if (!stream.bodyUsed) await stream.body?.cancel();
      }
    }
  );
}
