import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the DB modules load (they open SQLite on import).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-autolearn-deprecated-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
const { getParamFilterConfig, setParamFilterConfig } =
  await import("../../src/lib/db/paramFilters.ts");
const core = await import("../../src/lib/db/core.ts");

class PassthroughExecutor extends BaseExecutor {
  constructor() {
    super("autolearn-test", { baseUrls: ["https://upstream.example/v1/messages"] });
  }
  async transformRequest(_model: string, body: Record<string, unknown>) {
    return { ...body };
  }
}

test.after(() => {
  core.resetDbInstance?.();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("auto-learn strips a param Anthropic reports as deprecated, retries, and persists it per model", async () => {
  setParamFilterConfig("autolearn-test", { block: [], allow: [], autoLearn: true });
  const executor = new PassthroughExecutor();
  const originalFetch = globalThis.fetch;
  const bodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    bodies.push(body);
    if ("temperature" in body) {
      return new Response(
        JSON.stringify({
          type: "error",
          error: {
            type: "invalid_request_error",
            message: "`temperature` is deprecated for this model.",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "claude-next-1",
      body: { messages: [{ role: "user", content: "hi" }], temperature: 0.2, max_tokens: 16 },
      stream: false,
      credentials: {},
    });

    assert.equal(bodies.length, 2, "one rejected call + one retry");
    assert.equal(bodies[0].temperature, 0.2);
    assert.equal("temperature" in bodies[1], false, "retry must omit temperature");
    assert.equal(bodies[1].max_tokens, 16, "other params survive the retry");
    assert.equal(result.response.status, 200);

    const cfg = getParamFilterConfig("autolearn-test");
    assert.deepEqual(cfg?.models?.["claude-next-1"]?.block, ["temperature"]);
    assert.deepEqual(cfg?.block, [], "learned per model, not provider-wide");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
