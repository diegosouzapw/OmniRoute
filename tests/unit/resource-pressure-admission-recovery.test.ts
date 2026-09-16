import assert from "node:assert/strict";
import test from "node:test";

import {
  createResourcePressureRuntime,
  getAdmissionResourcePressureSeverity,
  reloadResourcePressureRuntime,
  type ResourceSignals,
} from "../../open-sse/utils/resourcePressure.ts";
import { withChatAdmission } from "../../src/shared/middleware/withChatAdmission.ts";

const MiB = 1024 ** 2;

function signals(observedAtMs: number, heapUsedMb: number): ResourceSignals {
  return {
    observedAtMs,
    v8: { heapUsedBytes: heapUsedMb * MiB, heapLimitBytes: 1_000 * MiB },
    process: {
      rssBytes: 200 * MiB,
      externalBytes: 10 * MiB,
      arrayBuffersBytes: MiB,
      availableBytes: null,
      constrainedBytes: null,
    },
    cgroup: { currentBytes: null, maxBytes: null, highBytes: null, fileBytes: null, events: null },
    psi: null,
  };
}

function messagesRequest(contentType = "application/json"): Request {
  const body = JSON.stringify({ model: "test", messages: [{ role: "user", content: "hello" }] });
  return new Request("http://x/v1/messages", {
    method: "POST",
    headers: { "content-type": contentType, "content-length": String(body.length) },
    body,
  });
}

test("JON-563: actual /v1/messages route refreshes stale critical pressure and recovers", async (t) => {
  let now = 0;
  let heapUsedMb = 950;
  let sampleCalls = 0;
  const runtime = reloadResourcePressureRuntime({
    nowMs: () => now,
    staleAfterMs: 100,
    maxStaleMs: 30_000,
    immediateHeapUsedMb: () => 100,
    sample: async () => {
      sampleCalls += 1;
      return signals(now, heapUsedMb);
    },
    thresholds: {
      sustainedSamplesCritical: 1,
      sustainedSamplesRecovery: 1,
      heapAbsoluteThresholdMb: null,
    },
    selfRestart: { enabled: false },
  });
  t.after(() => {
    reloadResourcePressureRuntime({ selfRestart: { enabled: false } });
  });

  runtime.check();
  await runtime.whenRefreshSettled();
  assert.equal(runtime.getObservation().state.severity, "critical");
  assert.equal(sampleCalls, 1);

  heapUsedMb = 100;
  now = 3_600_000;
  const messagesRoute = await import("../../src/app/api/v1/messages/route.ts");
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));

  let response: Response;
  try {
    response = await messagesRoute.POST(messagesRequest("text/plain"));
  } finally {
    console.warn = originalWarn;
  }

  assert.equal(response.status, 415, "415 proves the request passed structural admission");
  assert.equal(sampleCalls, 2, "the rejected front door must coalesce and await one fresh sample");
  assert.equal(runtime.getObservation().state.severity, "normal");
  assert.equal(
    warnings.some((warning) => warning.includes("returning 503")),
    false,
    "a recovery refresh must not emit a false 503 decision log"
  );
});

test("JON-563: concurrent stale-critical requests coalesce one recovery sample", async (t) => {
  let now = 0;
  let heapUsedMb = 950;
  let sampleCalls = 0;
  const runtime = reloadResourcePressureRuntime({
    nowMs: () => now,
    staleAfterMs: 100,
    maxStaleMs: 30_000,
    immediateHeapUsedMb: () => 100,
    sample: async () => {
      sampleCalls += 1;
      await Promise.resolve();
      return signals(now, heapUsedMb);
    },
    thresholds: {
      sustainedSamplesCritical: 1,
      sustainedSamplesRecovery: 1,
      heapAbsoluteThresholdMb: null,
    },
    selfRestart: { enabled: false },
  });
  t.after(() => {
    reloadResourcePressureRuntime({ selfRestart: { enabled: false } });
  });

  runtime.check();
  await runtime.whenRefreshSettled();
  heapUsedMb = 100;
  now = 3_600_000;

  const admitted = withChatAdmission(async () => new Response("ok"));
  const responses = await Promise.all(
    Array.from({ length: 20 }, () => admitted(messagesRequest()))
  );

  assert.deepEqual(
    responses.map((response) => response.status),
    Array.from({ length: 20 }, () => 200)
  );
  assert.equal(sampleCalls, 2, "concurrent retries must share one in-flight recovery sample");
});

test("JON-563: fresh critical pressure still sheds and sampler failure is bounded", async (t) => {
  let now = 0;
  let sampleCalls = 0;
  const runtime = reloadResourcePressureRuntime({
    nowMs: () => now,
    staleAfterMs: 10,
    maxStaleMs: 100,
    retryAfterMs: 20,
    immediateHeapUsedMb: () => 100,
    sample: async () => {
      sampleCalls += 1;
      if (sampleCalls === 1) return signals(now, 950);
      throw new Error("sampler unavailable");
    },
    thresholds: {
      sustainedSamplesCritical: 1,
      sustainedSamplesRecovery: 1,
      heapAbsoluteThresholdMb: null,
    },
    selfRestart: { enabled: false },
  });
  t.after(() => {
    reloadResourcePressureRuntime({ selfRestart: { enabled: false } });
  });

  runtime.check();
  await runtime.whenRefreshSettled();
  let handlerCalls = 0;
  const admitted = withChatAdmission(async () => {
    handlerCalls += 1;
    return new Response("ok");
  });
  const freshCritical = await admitted(messagesRequest());
  assert.equal(freshCritical.status, 503);
  assert.equal(freshCritical.headers.get("Retry-After"), "2");
  assert.equal(handlerCalls, 0);
  assert.equal(sampleCalls, 1, "a fresh critical sample must shed without redundant sampling");

  now = 11;
  assert.equal(
    await getAdmissionResourcePressureSeverity(),
    "critical",
    "a failed refresh retains a still-bounded critical observation"
  );
  assert.equal(sampleCalls, 2);

  now = 100;
  assert.equal(await getAdmissionResourcePressureSeverity(), "critical");
  assert.equal(sampleCalls, 3);

  now = 101;
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));
  try {
    assert.equal(
      await getAdmissionResourcePressureSeverity(),
      "normal",
      "an observation fails open only after maxStaleMs is exceeded"
    );
  } finally {
    console.warn = originalWarn;
  }
  assert.equal(sampleCalls, 3, "failure backoff prevents another sample at the expiry edge");
  assert.equal(
    warnings.filter((warning) => warning.includes("cached critical observation expired")).length,
    1
  );
  assert.match(warnings.join("\n"), /sampleAgeMs=101 maxStaleMs=100/);
});

test("JON-563: duplicate module evaluations share one process pressure runtime", async (t) => {
  const moduleUrl = new URL("../../open-sse/utils/resourcePressure.ts", import.meta.url).href;
  const first = await import(`${moduleUrl}?jon563=first`);
  const second = await import(`${moduleUrl}?jon563=second`);
  t.after(() => {
    second.reloadResourcePressureRuntime({ selfRestart: { enabled: false } });
  });

  const runtime = first.reloadResourcePressureRuntime({
    immediateHeapUsedMb: () => 100,
    sample: async () => signals(77, 950),
    thresholds: { sustainedSamplesCritical: 1, heapAbsoluteThresholdMb: null },
    selfRestart: { enabled: false },
  });
  runtime.check();
  await runtime.whenRefreshSettled();

  assert.equal(second.getResourcePressureObservation().state.severity, "critical");
  assert.equal(second.checkResourcePressureGuard()?.status, 503);
});

test(
  "JON-563: a non-settling pressure sample cannot hang structural admission",
  { timeout: 250 },
  async (t) => {
    let now = 0;
    let sampleCalls = 0;
    const runtime = reloadResourcePressureRuntime({
      nowMs: () => now,
      staleAfterMs: 10,
      maxStaleMs: 100,
      admissionRefreshTimeoutMs: 20,
      immediateHeapUsedMb: () => 100,
      sample: async () => {
        sampleCalls += 1;
        if (sampleCalls === 1) return signals(now, 950);
        return new Promise<ResourceSignals>(() => {});
      },
      thresholds: { sustainedSamplesCritical: 1, heapAbsoluteThresholdMb: null },
      selfRestart: { enabled: false },
    });
    t.after(() => {
      reloadResourcePressureRuntime({ selfRestart: { enabled: false } });
    });

    runtime.check();
    await runtime.whenRefreshSettled();
    now = 11;
    const startedAt = performance.now();

    assert.equal(await getAdmissionResourcePressureSeverity(), "critical");
    assert.ok(performance.now() - startedAt < 200, "admission refresh wait must be bounded");
    assert.equal(sampleCalls, 2);
  }
);

test(
  "JON-563: dispose releases refresh waiters even while the sampler is in flight",
  { timeout: 250 },
  async (t) => {
    let resolveSample!: (value: ResourceSignals) => void;
    const pendingSample = new Promise<ResourceSignals>((resolve) => {
      resolveSample = resolve;
    });
    t.after(() => resolveSample(signals(1, 100)));
    const runtime = createResourcePressureRuntime({
      immediateHeapUsedMb: () => 100,
      sample: () => pendingSample,
      selfRestart: { enabled: false },
    });

    runtime.check();
    await new Promise<void>((resolve) => setImmediate(resolve));
    runtime.dispose();

    await runtime.whenRefreshSettled();
  }
);

test("JON-563: invalid reload leaves the working process runtime intact", async (t) => {
  let now = 0;
  let heapUsedMb = 100;
  const runtime = reloadResourcePressureRuntime({
    nowMs: () => now,
    staleAfterMs: 10,
    immediateHeapUsedMb: () => 100,
    sample: async () => signals(now, heapUsedMb),
    thresholds: { sustainedSamplesCritical: 1, heapAbsoluteThresholdMb: null },
    selfRestart: { enabled: false },
  });
  t.after(() => {
    reloadResourcePressureRuntime({ selfRestart: { enabled: false } });
  });

  runtime.check();
  await runtime.whenRefreshSettled();
  assert.throws(() => reloadResourcePressureRuntime({ staleAfterMs: -1 }), /staleAfterMs/);

  heapUsedMb = 950;
  now = 11;
  await getAdmissionResourcePressureSeverity();
  await runtime.whenRefreshSettled();
  assert.equal(await getAdmissionResourcePressureSeverity(), "critical");
});

test("JON-563: a scheduler that never starts work cannot hang structural admission", async (t) => {
  let now = 0;
  let heapUsedMb = 950;
  let sampleCalls = 0;
  let scheduleCalls = 0;
  const runtime = reloadResourcePressureRuntime({
    nowMs: () => now,
    staleAfterMs: 10,
    maxStaleMs: 100,
    admissionRefreshTimeoutMs: 20,
    immediateHeapUsedMb: () => 100,
    schedule: (refresh) => {
      scheduleCalls += 1;
      if (scheduleCalls === 1) setImmediate(refresh);
    },
    sample: async () => {
      sampleCalls += 1;
      return signals(now, heapUsedMb);
    },
    thresholds: { sustainedSamplesCritical: 1, heapAbsoluteThresholdMb: null },
    selfRestart: { enabled: false },
  });
  t.after(() => {
    reloadResourcePressureRuntime({ selfRestart: { enabled: false } });
  });

  runtime.check();
  await runtime.whenRefreshSettled();

  heapUsedMb = 100;
  now = 11;
  assert.equal(await getAdmissionResourcePressureSeverity(), "critical");
  assert.equal(sampleCalls, 1, "the dead scheduler cannot start a second sample");
  assert.equal(scheduleCalls, 2);
});
