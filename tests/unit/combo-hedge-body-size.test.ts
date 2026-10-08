/**
 * Hedge dispatch sends the request body twice. The gate must refuse bodies over
 * 256KB and bodies whose size cannot be measured (circular), while still hedging
 * a normal small body.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-hedge-body-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-hedge-body-test-secret";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const log = {
  info: () => {},
  warn: () => {},
  debug: () => {},
  error: () => {},
};

const HEDGE_CONFIG = {
  maxRetries: 0,
  retryDelayMs: 1,
  zeroLatencyOptimizationsEnabled: true,
  hedging: true,
  hedgeDelayMs: 1,
};

function okResponse(content: string): Response {
  return new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

type HedgeMode = "serial-hold" | "hedge-race";

async function dispatchWithHedge(
  body: Record<string, unknown>,
  mode: HedgeMode
): Promise<{ status: number; calls: string[]; content: string }> {
  const calls: string[] = [];
  const result = await handleComboChat({
    body,
    combo: {
      name: "hedge-body-size",
      strategy: "priority",
      models: ["model-a", "model-b"],
      config: HEDGE_CONFIG,
    },
    handleSingleModel: async (_body, modelStr, target) => {
      calls.push(modelStr);
      if (mode === "hedge-race" && modelStr === "model-b") {
        return okResponse("fast");
      }
      if (mode === "hedge-race") {
        await new Promise<void>((resolve) => {
          const timer = setTimeout(resolve, 100);
          target?.modelAbortSignal?.addEventListener(
            "abort",
            () => {
              clearTimeout(timer);
              resolve();
            },
            { once: true }
          );
        });
        return okResponse("slow");
      }
      await new Promise((resolve) => setTimeout(resolve, 80));
      return okResponse(modelStr);
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });
  const payload = (await result.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return {
    status: result.status,
    calls: [...calls],
    content: payload.choices?.[0]?.message?.content ?? "",
  };
}

test("combo hedge does not start a second target when the body is over 256KB", async () => {
  const oversized = "x".repeat(256 * 1024 + 1);
  const outcome = await dispatchWithHedge(
    { messages: [{ role: "user", content: oversized }] },
    "serial-hold"
  );

  assert.equal(outcome.status, 200);
  assert.equal(outcome.content, "model-a");
  assert.deepEqual(outcome.calls, ["model-a"]);
});

test("combo hedge does not start a second target when the body cannot be stringified", async () => {
  const circular: Record<string, unknown> = {
    messages: [{ role: "user", content: "hi" }],
  };
  circular.self = circular;

  const outcome = await dispatchWithHedge(circular, "serial-hold");

  assert.equal(
    outcome.status,
    200,
    `hedge must not dispatch a second target (calls=${outcome.calls.join(",")})`
  );
  assert.equal(outcome.content, "model-a");
  assert.deepEqual(outcome.calls, ["model-a"]);
});

test("combo hedge still starts the fallback for a small plain body", async () => {
  const outcome = await dispatchWithHedge(
    { messages: [{ role: "user", content: "hi" }] },
    "hedge-race"
  );

  assert.equal(outcome.status, 200);
  assert.equal(outcome.content, "fast");
  assert.deepEqual(outcome.calls, ["model-a", "model-b"]);
});
