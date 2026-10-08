import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-timer-cleanup-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const SAFETY_TIMEOUT_MS = 31_337;

function makeLog() {
  const warnings: string[] = [];
  return {
    info() {},
    warn(_tag: string, message: string) {
      warnings.push(message);
    },
    error() {},
    debug() {},
    warnings,
  };
}

async function withControlledSafetyTimer(
  run: (clock: {
    fireSafetyTimers(): void;
    activeCount(): number;
    clearedCount(): number;
    createdCount(): number;
  }) => Promise<void>
): Promise<void> {
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const safetyTimers = new Map<ReturnType<typeof setTimeout>, () => void>();
  let safetyTimersCreated = 0;
  let safetyTimersCleared = 0;

  globalThis.setTimeout = ((
    callback: (...args: unknown[]) => void,
    delay?: number,
    ...args: unknown[]
  ) => {
    if (delay === SAFETY_TIMEOUT_MS) {
      const safetyHandle = { unref() {} } as unknown as ReturnType<typeof setTimeout>;
      safetyTimers.set(safetyHandle, () => callback(...args));
      safetyTimersCreated += 1;
      return safetyHandle;
    }
    return originalSetTimeout(callback, delay, ...args);
  }) as typeof setTimeout;
  globalThis.clearTimeout = ((handle: ReturnType<typeof setTimeout>) => {
    if (safetyTimers.delete(handle)) {
      safetyTimersCleared += 1;
      return;
    }
    originalClearTimeout(handle);
  }) as typeof clearTimeout;

  try {
    await run({
      fireSafetyTimers() {
        const pending = [...safetyTimers.entries()];
        safetyTimers.clear();
        for (const [, callback] of pending) callback();
      },
      activeCount() {
        return safetyTimers.size;
      },
      clearedCount() {
        return safetyTimersCleared;
      },
      createdCount() {
        return safetyTimersCreated;
      },
    });
  } finally {
    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
  }
}

test.after(() => {
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("terminal upstream exhaustion clears the combo loop safety timer before returning", async () => {
  await withControlledSafetyTimer(async (clock) => {
    const log = makeLog();
    let dispatches = 0;

    const response = await handleComboChat({
      body: { messages: [{ role: "user", content: "stop" }] },
      combo: {
        name: "timer-cleanup-terminal-exhaustion",
        strategy: "priority",
        models: [{ model: "synthetic/model" }],
        config: { targetTimeoutMs: 0, comboTimeoutMs: SAFETY_TIMEOUT_MS, maxRetries: 0 },
      },
      handleSingleModel: async () => {
        dispatches += 1;
        return new Response(
          JSON.stringify({ error: { message: "synthetic upstream unavailable" } }),
          { status: 502, headers: { "content-type": "application/json" } }
        );
      },
      log,
      settings: {},
      allCombos: [],
    });

    assert.equal(response.status, 502);
    assert.equal(dispatches, 1);

    clock.fireSafetyTimers();
    assert.equal(
      log.warnings.filter((message) => /loop safety timeout/i.test(message)).length,
      0,
      "a cleared timer must not log after the request already returned"
    );
    assert.equal(clock.createdCount(), 1);
    assert.equal(clock.clearedCount(), 1, "terminal return must clear its safety timer");
    assert.equal(clock.activeCount(), 0);
  });
});

test("success, terminal 499, and thrown handler clear their attempt timer", async () => {
  const scenarios = [
    {
      name: "success",
      maxSetRetries: 0,
      expectedStatus: 200,
      expectedTimers: 1,
      handleSingleModel: async () =>
        new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
    },
    {
      name: "terminal-499",
      maxSetRetries: 0,
      expectedStatus: 499,
      expectedTimers: 1,
      handleSingleModel: async () => new Response("Client disconnected", { status: 499 }),
    },
    {
      name: "throw",
      maxSetRetries: 0,
      expectedStatus: 502,
      expectedTimers: 1,
      handleSingleModel: async () => {
        throw new Error("synthetic dispatch exception");
      },
    },
  ];

  for (const scenario of scenarios) {
    await withControlledSafetyTimer(async (clock) => {
      const log = makeLog();
      const response = await handleComboChat({
        body: { messages: [{ role: "user", content: scenario.name }] },
        combo: {
          name: `timer-cleanup-${scenario.name}`,
          strategy: "priority",
          models: [{ model: `synthetic-${scenario.name}/model` }],
          config: {
            targetTimeoutMs: 0,
            comboTimeoutMs: SAFETY_TIMEOUT_MS,
            maxRetries: 0,
            maxSetRetries: scenario.maxSetRetries,
            setRetryDelayMs: 0,
          },
        },
        handleSingleModel: scenario.handleSingleModel,
        log,
        settings: {},
        allCombos: [],
      });

      assert.equal(response.status, scenario.expectedStatus, scenario.name);
      assert.equal(clock.createdCount(), scenario.expectedTimers, scenario.name);
      assert.equal(clock.clearedCount(), scenario.expectedTimers, scenario.name);
      assert.equal(clock.activeCount(), 0, scenario.name);
      clock.fireSafetyTimers();
      assert.equal(
        log.warnings.filter((message) => /loop safety timeout/i.test(message)).length,
        0,
        scenario.name
      );
    });
  }
});
