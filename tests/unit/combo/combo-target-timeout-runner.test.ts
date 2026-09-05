import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildTargetTimeoutRunner,
  drainLastTimeoutContexts,
} from "../../../open-sse/services/combo/targetTimeoutRunner.ts";
import type { ComboLogger, SingleModelTarget } from "../../../open-sse/services/combo/types.ts";

const noopLog: ComboLogger = { warn() {}, info() {}, error() {}, debug() {} };

test("timeout<=0: passthrough direto (sem timer)", async () => {
  let called = false;
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => {
      called = true;
      return new Response("ok");
    },
    comboTargetTimeoutMs: 0,
    log: noopLog,
  });
  const res = await runner({}, "m");
  assert.equal(called, true);
  assert.equal(await res.text(), "ok");
});

test("timeout<=0: erro do upstream vira errorResponse 502", async () => {
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => {
      throw new Error("boom");
    },
    comboTargetTimeoutMs: 0,
    log: noopLog,
  });
  const res = await runner({}, "m");
  assert.equal(res.status, 502);
});

test("excede o limite: aborta e retorna 504 combo_target_timeout", async () => {
  let aborted = false;
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: (_b, _m, target) =>
      new Promise<Response>((resolve) => {
        // resolve só se abortado (simula um upstream que respeita o signal)
        const sig = target?.modelAbortSignal ?? undefined;
        sig?.addEventListener("abort", () => {
          aborted = true;
          resolve(new Response(null, { status: 599 }));
        });
      }),
    comboTargetTimeoutMs: 20,
    log: noopLog,
  });
  const res = await runner({}, "slow-model");
  assert.equal(res.status, 504);
  assert.equal(aborted, true, "per-target timeout must abort the in-flight target");
  const body = await res.json();
  assert.match(JSON.stringify(body), /timed out/i);
  assert.equal(body?.error?.code, "combo_target_timeout");
  assert.equal(body?.error?.type, "combo_target_timeout");
});

test("sucesso rápido vence a corrida do timeout", async () => {
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => new Response("fast", { status: 200 }),
    comboTargetTimeoutMs: 1000,
    log: noopLog,
  });
  const res = await runner({}, "m");
  assert.equal(res.status, 200);
  assert.equal(await res.text(), "fast");
});

test("hedge do parent já abortado propaga o abort ao filho", async () => {
  const parent = new AbortController();
  parent.abort(new Error("hedge-cancelled"));
  let sawAbort = false;
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: (_b, _m, target) =>
      new Promise<Response>((resolve) => {
        const sig = target?.modelAbortSignal ?? undefined;
        if (sig?.aborted) sawAbort = true;
        resolve(new Response("ok"));
      }),
    comboTargetTimeoutMs: 1000,
    log: noopLog,
  });
  const parentTarget: SingleModelTarget = { modelAbortSignal: parent.signal };
  await runner({}, "m", parentTarget);
  assert.equal(sawAbort, true);
});

test("rejection from handleSingleModel after timeout does not leak as unhandledRejection", async () => {
  // Simulate: timeout fires, handleSingleModel later rejects with the abort error.
  // Before the fix, this rejection could escape as an unhandledRejection if the
  // .catch() handler itself threw or if the promise chain had a gap.
  let unhandledRejectionFired = false;
  const handler = (reason: unknown) => {
    if (reason instanceof Error && reason.message === "combo-per-model-timeout") {
      unhandledRejectionFired = true;
    }
  };
  process.on("unhandledRejection", handler);

  const runner = buildTargetTimeoutRunner({
    handleSingleModel: (_b, _m, target) =>
      new Promise<Response>((_resolve, reject) => {
        const sig = target?.modelAbortSignal;
        sig?.addEventListener("abort", () => {
          // Simulate an upstream that rejects on abort (common pattern).
          reject(new Error(sig.reason?.message ?? "aborted"));
        });
      }),
    comboTargetTimeoutMs: 10,
    log: noopLog,
  });

  const res = await runner({}, "test-model");
  assert.equal(res.status, 504, "timeout must win the race");

  // Drain microtasks — the rejected promise from handleSingleModel should be
  // caught by the .catch() handler, not surface as unhandledRejection.
  await new Promise((r) => setImmediate(r));
  await new Promise((r) => setImmediate(r));

  process.removeListener("unhandledRejection", handler);
  assert.equal(
    unhandledRejectionFired,
    false,
    "handleSingleModel rejection must be caught, not leak as unhandledRejection"
  );
});

test("defensive outer .catch() handles unexpected throws in inner .catch()", async () => {
  // Edge case: if the inner .catch() handler itself throws (e.g. a broken
  // Error.prototype.message getter), the outer defensive .catch() must
  // prevent an unhandledRejection.
  let unhandledRejectionFired = false;
  const handler = (reason: unknown) => {
    if (reason instanceof Error && reason.message === "message getter exploded") {
      unhandledRejectionFired = true;
    }
  };
  process.on("unhandledRejection", handler);

  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async () => {
      const err = new Error("upstream-fail");
      // Sabotage the message getter to throw in the .catch() handler.
      Object.defineProperty(err, "message", {
        get() {
          throw new Error("message getter exploded");
        },
      });
      throw err;
    },
    comboTargetTimeoutMs: 10000, // long enough that timeout doesn't fire
    log: noopLog,
  });

  const res = await runner({}, "broken-model");
  // The defensive outer .catch() should return a 502 instead of letting
  // the throw escape.
  assert.equal(res.status, 502, "defensive catch must return 502");
  assert.match(
    await res.text(),
    /message getter exploded/,
    "error detail must be included in response"
  );

  // Drain microtasks.
  await new Promise((r) => setImmediate(r));
  await new Promise((r) => setImmediate(r));

  process.removeListener("unhandledRejection", handler);
  assert.equal(
    unhandledRejectionFired,
    false,
    "defensive catch must prevent unhandledRejection from inner .catch() throw"
  );
});

test("drainLastTimeoutContexts returns and clears recorded contexts", async () => {
  // Drain any leftover contexts from previous tests.
  drainLastTimeoutContexts();

  const runner = buildTargetTimeoutRunner({
    handleSingleModel: () => new Promise<Response>(() => {}), // never resolves
    comboTargetTimeoutMs: 10,
    log: noopLog,
  });

  // Fire two timeouts to verify the ring buffer.
  await runner({}, "model-a");
  await runner({}, "model-b");

  const contexts = drainLastTimeoutContexts();
  assert.ok(contexts.length >= 1, "at least one context must be recorded");
  assert.equal(contexts[contexts.length - 1].modelStr, "model-b");
  assert.equal(contexts[contexts.length - 1].timeoutMs, 10);
  assert.ok(contexts[contexts.length - 1].abortError instanceof Error);
  assert.ok(contexts[contexts.length - 1].timestamp > 0);

  // drain clears the buffer.
  const second = drainLastTimeoutContexts();
  assert.equal(second.length, 0, "second drain must return empty");
});

test("resolveTargetTimeoutMs provided: uses per-target timeout when present", async () => {
  let aborted = false;
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: (_b, _m, target) =>
      new Promise<Response>((resolve) => {
        const sig = target?.modelAbortSignal ?? undefined;
        sig?.addEventListener("abort", () => {
          aborted = true;
          resolve(new Response(null, { status: 599 }));
        });
      }),
    comboTargetTimeoutMs: 20,
    resolveTargetTimeoutMs: async (target) =>
      target?.connectionId === "conn-1" ? 50 : undefined,
    log: noopLog,
  });
  const res = await runner({}, "slow-model", {
    connectionId: "conn-1",
    modelAbortSignal: undefined as unknown as AbortSignal,
  } as SingleModelTarget);
  assert.equal(res.status, 504);
  assert.equal(aborted, true);
  const body = await res.json();
  assert.equal(body?.error?.code, "combo_target_timeout");
});

test("resolveTargetTimeoutMs without connection: falls back to comboTargetTimeoutMs", async () => {
  let aborted = false;
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: (_b, _m, target) =>
      new Promise<Response>((resolve) => {
        target?.modelAbortSignal?.addEventListener("abort", () => {
          aborted = true;
          resolve(new Response(null, { status: 599 }));
        });
      }),
    comboTargetTimeoutMs: 20,
    resolveTargetTimeoutMs: async () => undefined,
    log: noopLog,
  });
  const res = await runner({}, "slow-model", {
    connectionId: "conn-unknown",
    modelAbortSignal: undefined as unknown as AbortSignal,
  } as SingleModelTarget);
  assert.equal(res.status, 504);
  assert.equal(aborted, true);
});

test("resolveTargetTimeoutMs extended: 50ms outlives the 20ms base (does not abort at 20ms)", async () => {
  let resolvedWith = "";
  const runner = buildTargetTimeoutRunner({
    handleSingleModel: async (_b, _m, target) => {
      await new Promise((resolve) => {
        target?.modelAbortSignal?.addEventListener("abort", resolve);
        setTimeout(resolve, 45);
      });
      resolvedWith = target?.modelAbortSignal?.aborted ? "aborted" : "completed";
      return new Response(resolvedWith, { status: resolvedWith === "aborted" ? 599 : 200 });
    },
    comboTargetTimeoutMs: 20,
    resolveTargetTimeoutMs: async (target) =>
      target?.connectionId === "conn-1" ? 50 : undefined,
    log: noopLog,
  });
  const res = await runner({}, "slow-model", {
    connectionId: "conn-1",
    modelAbortSignal: undefined as unknown as AbortSignal,
  } as SingleModelTarget);
  assert.equal(res.status, 200);
  assert.equal(resolvedWith, "completed");
});
