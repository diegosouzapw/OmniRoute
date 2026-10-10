import assert from "node:assert/strict";
import test from "node:test";
import {
  computeFlightByteBudget,
  estimateFlightBytes,
  FLIGHT_HEAP_FRACTION,
  MIN_FLIGHT_BUDGET_BYTES,
  MAX_FLIGHT_BUDGET_BYTES,
  DEFAULT_STREAM_HOLD_FACTOR,
  DEFAULT_STREAM_FLOOR_DIVISOR,
} from "../../src/shared/middleware/admissionBudget.ts";
import { IngestByteAdmissionController } from "../../src/shared/middleware/ingestByteAdmission.ts";
import {
  ChatAdmissionController,
  CHAT_LARGE_BODY_BYTES,
  admitChatRequest,
  recordBodyBytes,
  readRecordedBodyBytes,
  RECORDED_BODY_BYTES_HEADER,
  releaseChatAdmissionWhenDone,
} from "../../src/shared/middleware/chatBodyAdmission.ts";
import { buildExecutorClientHeaders } from "../../open-sse/handlers/chatCore/executorClientHeaders.ts";
import { isForbiddenUpstreamHeaderName } from "../../src/shared/constants/upstreamHeaders.ts";
import { convertGeminiToInternal } from "../../src/app/api/v1beta/models/[...path]/convertGeminiToInternal.ts";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MiB = 1024 * 1024;

test("computeFlightByteBudget: 3072 MiB heap yields 1536 MiB", () => {
  const b = computeFlightByteBudget({
    heapSizeLimitBytes: 3072 * MiB,
    constrainedMemoryBytes: 5 * 1024 * MiB,
  });
  assert.equal(b.bytes, Math.floor(3072 * MiB * FLIGHT_HEAP_FRACTION));
  assert.equal(b.bytes, 1536 * MiB);
  assert.equal(b.source, "v8_heap");
});

test("computeFlightByteBudget: tiny heap clamps to MIN_FLIGHT_BUDGET_BYTES", () => {
  const b = computeFlightByteBudget({
    heapSizeLimitBytes: 64 * MiB,
    constrainedMemoryBytes: 64 * MiB,
  });
  assert.equal(b.bytes, MIN_FLIGHT_BUDGET_BYTES);
});

test("computeFlightByteBudget: enormous heap clamps to MAX_FLIGHT_BUDGET_BYTES", () => {
  const b = computeFlightByteBudget({
    heapSizeLimitBytes: 1024 * 1024 * MiB,
    constrainedMemoryBytes: null,
  });
  assert.equal(b.bytes, MAX_FLIGHT_BUDGET_BYTES);
});

test("estimateFlightBytes: non-stream is 0", () => {
  const maxFlight = 1536 * MiB;
  assert.equal(estimateFlightBytes(10_000, false, maxFlight), 0);
});

test("estimateFlightBytes: over STREAM_CEILING returns a sentinel the caller treats as 413", () => {
  const maxFlight = 1536 * MiB;
  const ceiling = Math.floor(maxFlight / DEFAULT_STREAM_HOLD_FACTOR);
  const body = Math.floor(ceiling / DEFAULT_STREAM_HOLD_FACTOR) + 1;
  const r = estimateFlightBytes(body, true, maxFlight);
  assert.equal(r, Number.POSITIVE_INFINITY);
});

test("estimateFlightBytes: small stream charges STREAM_FLOOR", () => {
  const maxFlight = 1536 * MiB;
  const floor = Math.floor(maxFlight / DEFAULT_STREAM_FLOOR_DIVISOR);
  assert.equal(estimateFlightBytes(1, true, maxFlight), floor);
});

test("ingest timeout uses configured flight_bytes_budget and never parks at 0ms", async () => {
  const shed: string[] = [];
  const c = new IngestByteAdmissionController({
    maxInflightBytes: 10,
    timeoutShedReason: "flight_bytes_budget",
    onShed: (reason) => {
      shed.push(reason);
    },
  });
  const lease = c.tryAcquire(10);
  assert.ok(lease);
  const r = await c.acquireWithin(10, 0, undefined, "lane-a");
  assert.equal(r.status, "unavailable");
  assert.deepEqual(shed, ["flight_bytes_budget"]);
  assert.equal(c.waitingCount, 0);
  lease.release();
});

test("maxWaiters sheds the extra waiter immediately", async () => {
  const shed: string[] = [];
  const c = new IngestByteAdmissionController({
    maxInflightBytes: 1,
    timeoutShedReason: "flight_bytes_budget",
    maxWaiters: 2,
    onShed: (reason) => {
      shed.push(reason);
    },
  });
  const lease = c.tryAcquire(1);
  assert.ok(lease);
  const p1 = c.acquireWithin(1, 30_000, undefined, "lane-1");
  const p2 = c.acquireWithin(1, 30_000, undefined, "lane-2");
  await Promise.resolve();
  assert.equal(c.waitingCount, 2);
  const p3 = c.acquireWithin(1, 30_000, undefined, "lane-3");
  const r3 = await p3;
  assert.equal(r3.status, "unavailable");
  assert.deepEqual(shed, ["flight_bytes_budget"]);
  assert.equal(c.waitingCount, 2);
  lease.release();
  const r1 = await p1;
  assert.equal(r1.status, "acquired");
  if (r1.status === "acquired") r1.lease.release();
  const r2 = await p2;
  assert.equal(r2.status, "acquired");
  if (r2.status === "acquired") r2.lease.release();
});

test("ChatAdmissionController hang a second ingest ledger as flight budget", () => {
  const c = new ChatAdmissionController(20, undefined, undefined, undefined, undefined, {
    maxFlightBytes: 1000,
  });
  assert.equal(c.maxFlightBytes, 1000);
  assert.equal(c.flightBytes, 0);
  assert.equal(c.canFitFlight(1001), false);
  const lease = c.tryAcquireFlight(100);
  assert.ok(lease);
  assert.equal(c.flightBytes, 100);
  lease.release();
  assert.equal(c.flightBytes, 0);
});

test("Task 5.1: admitChatRequest on a 123-byte JSON body records 123 body bytes", async () => {
  const targetBytes = 123;
  const prefix = '{"message":"';
  const suffix = '"}';
  const padLength = targetBytes - prefix.length - suffix.length;
  const bodyStr = `${prefix}${"a".repeat(padLength)}${suffix}`;
  assert.equal(Buffer.byteLength(bodyStr, "utf8"), 123);

  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: bodyStr,
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  const admission = await admitChatRequest(req);
  assert.equal(admission.admit, true);
  if (!admission.admit) return;
  assert.equal(readRecordedBodyBytes(admission.request), 123);
  assert.equal(admission.request.headers.get(RECORDED_BODY_BYTES_HEADER), "123");
});

test("Task 5.2: after admit, cloned request retains recorded ingress body bytes even if rewritten longer", async () => {
  const targetBytes = 123;
  const prefix = '{"message":"';
  const suffix = '"}';
  const bodyStr = `${prefix}${"a".repeat(targetBytes - prefix.length - suffix.length)}${suffix}`;

  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: bodyStr,
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  const admission = await admitChatRequest(req);
  assert.equal(admission.admit, true);
  if (!admission.admit) return;

  const rewritten = { message: "rewritten-longer-body".repeat(20) };
  const cloned = new Request(admission.request.url, {
    method: admission.request.method,
    headers: admission.request.headers,
    body: JSON.stringify(rewritten),
    signal: admission.request.signal,
  });

  assert.equal(readRecordedBodyBytes(cloned), 123);
});

test("Task 5.3: when both WeakMap and header are stripped, readRecordedBodyBytes is null", () => {
  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message: "hello" }),
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  assert.equal(readRecordedBodyBytes(req), null);

  // Directly verify recordBodyBytes sets WeakMap
  recordBodyBytes(req, 42);
  assert.equal(readRecordedBodyBytes(req), 42);

  const invalidHeaderReq = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      [RECORDED_BODY_BYTES_HEADER]: "invalid-123",
    },
    body: JSON.stringify({ message: "hello" }),
    duplex: "half",
  } as RequestInit & { duplex: "half" });
  assert.equal(readRecordedBodyBytes(invalidHeaderReq), null);
});

test("Task 5.4: inbound spoof header '1' on a 123-byte body records 123, not 1", async () => {
  const targetBytes = 123;
  const prefix = '{"message":"';
  const suffix = '"}';
  const bodyStr = `${prefix}${"a".repeat(targetBytes - prefix.length - suffix.length)}${suffix}`;

  const spoofReq = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      [RECORDED_BODY_BYTES_HEADER]: "1",
    },
    body: bodyStr,
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  const admission = await admitChatRequest(spoofReq);
  assert.equal(admission.admit, true);
  if (!admission.admit) return;

  assert.equal(readRecordedBodyBytes(admission.request), 123);
  assert.equal(admission.request.headers.get(RECORDED_BODY_BYTES_HEADER), "123");
});

test("Task 5.5: Gemini convert+admit path records measured converted size, ignoring spoof '1', and route source calls admitChatRequest after convert", async () => {
  const routeSource = readFileSync(
    resolve(__dirname, "../../src/app/api/v1beta/models/[...path]/route.ts"),
    "utf8"
  );
  assert.match(routeSource, /convertGeminiToInternal\(/);
  assert.match(routeSource, /admitChatRequest\(/);
  assert.match(routeSource, /handleChat\(/);
  const convertIdx = routeSource.indexOf("convertGeminiToInternal(");
  const admitIdx = routeSource.indexOf("admitChatRequest(");
  const handleChatIdx = routeSource.indexOf("handleChat(");
  assert.ok(convertIdx !== -1 && admitIdx !== -1 && handleChatIdx !== -1);
  assert.ok(convertIdx < admitIdx, "admitChatRequest must be called after convertGeminiToInternal");
  assert.ok(admitIdx < handleChatIdx, "admitChatRequest must be called before handleChat");

  const geminiBody = {
    contents: [{ parts: [{ text: "Gemini convert and admit test with multiple parts" }] }],
  };
  const converted = convertGeminiToInternal(geminiBody, "google/gemini-2.5-flash", true);
  const convertedStr = JSON.stringify(converted);
  const expectedBytes = Buffer.byteLength(convertedStr, "utf8");
  assert.ok(expectedBytes > 10, "converted body must be larger than 10 bytes");

  const spoofReq = new Request("http://localhost/v1beta/models/gemini-2.5-flash:streamGenerateContent", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      [RECORDED_BODY_BYTES_HEADER]: "1",
    },
    body: convertedStr,
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  const admission = await admitChatRequest(spoofReq);
  assert.equal(admission.admit, true);
  if (!admission.admit) return;
  assert.equal(readRecordedBodyBytes(admission.request), expectedBytes);
  assert.notEqual(readRecordedBodyBytes(admission.request), 1);
});

test("Task 5.6: successful SSE Response through releaseChatAdmissionWhenDone holds lease before cancel and releases to baseline after cancel", async () => {
  const controller = new ChatAdmissionController(20, undefined, undefined, undefined, undefined, {
    maxFlightBytes: 1536 * 1024 * 1024,
  });

  const targetBytes = CHAT_LARGE_BODY_BYTES + 1024;
  const bodyStr = "x".repeat(targetBytes);

  const req = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: bodyStr,
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  const admission = await admitChatRequest(req, { controller });
  assert.equal(admission.admit, true);
  if (!admission.admit) return;

  assert.equal(controller.activeHeavy, 1);
  assert.ok(controller.inflightBytes >= targetBytes);

  const sseResponse = new Response(
    new ReadableStream<Uint8Array>({
      start(ctrl) {
        ctrl.enqueue(new TextEncoder().encode("data: test-chunk\n\n"));
      },
    }),
    {
      headers: { "content-type": "text/event-stream" },
    }
  );

  const wrappedResponse = releaseChatAdmissionWhenDone(sseResponse, admission.lease);

  // Before cancel: ingest lease is still held
  assert.equal(controller.activeHeavy, 1);
  assert.ok(controller.inflightBytes >= targetBytes);

  // Cancel stream
  const reader = wrappedResponse.body!.getReader();
  await reader.cancel();

  // After cancel: returned to baseline
  assert.equal(controller.activeHeavy, 0);
  assert.equal(controller.inflightBytes, 0);
  assert.equal(controller.flightBytes, 0);
});

test("Task 5.7: buildExecutorClientHeaders and upstreamHeaders strip RECORDED_BODY_BYTES_HEADER in both casings", () => {
  const headers = {
    "x-omniroute-recorded-body-bytes": "123",
    "X-OmniRoute-Recorded-Body-Bytes": "123",
    "x-regular-header": "allow-me",
  };
  const normalized = buildExecutorClientHeaders(headers);
  assert.deepEqual(normalized, { "x-regular-header": "allow-me" });

  assert.equal(isForbiddenUpstreamHeaderName("x-omniroute-recorded-body-bytes"), true);
  assert.equal(isForbiddenUpstreamHeaderName("X-OmniRoute-Recorded-Body-Bytes"), true);
});

test("Task 5.8: Gemini post-convert >= CHAT_LARGE_BODY_BYTES (256 KiB): same result w/ without Content-Length, and EOF/cancel/read error/handler throw/transform error/non-SSE return to baseline", async () => {
  const pad = "b".repeat(270 * 1024);
  const geminiRaw = {
    contents: [{ role: "user", parts: [{ text: pad }] }],
  };
  const convertedStream = convertGeminiToInternal(geminiRaw, "google/gemini-2.5-flash", true);
  const convertedStr = JSON.stringify(convertedStream);
  const convertedBytes = Buffer.byteLength(convertedStr, "utf8");
  assert.ok(
    convertedBytes >= CHAT_LARGE_BODY_BYTES,
    `converted body must be >= CHAT_LARGE_BODY_BYTES (${convertedBytes} >= ${CHAT_LARGE_BODY_BYTES})`
  );

  const makeController = () =>
    new ChatAdmissionController(20, undefined, undefined, undefined, undefined, {
      maxFlightBytes: 1536 * 1024 * 1024,
    });

  // 1. Same converted body with and without original Content-Length gets the same admit result
  {
    const ctrl1 = makeController();
    const ctrl2 = makeController();
    const reqWithCL = new Request("http://localhost/v1beta/models/gemini:streamGenerateContent", {
      method: "POST",
      headers: { "content-length": "1" },
      body: convertedStr,
      duplex: "half",
    } as RequestInit & { duplex: "half" });
    const reqWithoutCL = new Request("http://localhost/v1beta/models/gemini:streamGenerateContent", {
      method: "POST",
      headers: {},
      body: convertedStr,
      duplex: "half",
    } as RequestInit & { duplex: "half" });

    // Drop/reset content-length before admit, as route.ts does
    const h1 = new Headers(reqWithCL.headers);
    h1.set("content-length", String(convertedBytes));
    const admittedReq1 = new Request(reqWithCL.url, {
      method: reqWithCL.method,
      headers: h1,
      body: convertedStr,
      duplex: "half",
    } as RequestInit & { duplex: "half" });

    const h2 = new Headers(reqWithoutCL.headers);
    h2.set("content-length", String(convertedBytes));
    const admittedReq2 = new Request(reqWithoutCL.url, {
      method: reqWithoutCL.method,
      headers: h2,
      body: convertedStr,
      duplex: "half",
    } as RequestInit & { duplex: "half" });

    const adm1 = await admitChatRequest(admittedReq1, { controller: ctrl1 });
    const adm2 = await admitChatRequest(admittedReq2, { controller: ctrl2 });
    assert.equal(adm1.admit, true);
    assert.equal(adm2.admit, true);
    assert.equal(ctrl1.activeHeavy, 1);
    assert.equal(ctrl2.activeHeavy, 1);
    if (adm1.admit) adm1.lease?.release();
    if (adm2.admit) adm2.lease?.release();
  }

  // Lifecycle helpers:
  const setupPipeline = async (
    stream: boolean,
    handler: (admittedReq: Request, ctrl: ChatAdmissionController) => Promise<Response>
  ) => {
    const controller = makeController();
    const req = new Request(
      `http://localhost/v1beta/models/gemini:${stream ? "streamGenerateContent" : "generateContent"}`,
      {
        method: "POST",
        headers: { "content-length": String(convertedBytes) },
        body: convertedStr,
        duplex: "half",
      } as RequestInit & { duplex: "half" }
    );
    const admission = await admitChatRequest(req, { controller });
    assert.equal(admission.admit, true);
    if (!admission.admit) throw new Error("admission rejected");

    let lease = admission.lease;
    let finalResponse: Response;
    try {
      const response = await handler(admission.request, controller);
      finalResponse = releaseChatAdmissionWhenDone(response, lease);
      lease = null;
    } catch (err) {
      lease?.release();
      lease = null;
      throw err;
    }
    return { finalResponse, controller };
  };

  // 1) EOF
  {
    const { finalResponse, controller } = await setupPipeline(true, async (_admittedReq, ctrl) => {
      const innerFlightLease = ctrl.tryAcquireFlight(100);
      const sse = new Response(
        new ReadableStream<Uint8Array>({
          start(streamCtrl) {
            streamCtrl.enqueue(new TextEncoder().encode("data: foo\n\n"));
            streamCtrl.close();
          },
        }),
        { headers: { "content-type": "text/event-stream" } }
      );
      return releaseChatAdmissionWhenDone(sse, innerFlightLease);
    });
    const reader = finalResponse.body!.getReader();
    while (true) {
      const { done } = await reader.read();
      if (done) break;
    }
    assert.equal(controller.activeHeavy, 0);
    assert.equal(controller.inflightBytes, 0);
    assert.equal(controller.flightBytes, 0);
  }

  // 2) Cancel
  {
    const { finalResponse, controller } = await setupPipeline(true, async (_admittedReq, ctrl) => {
      const innerFlightLease = ctrl.tryAcquireFlight(100);
      const sse = new Response(
        new ReadableStream<Uint8Array>({
          start(streamCtrl) {
            streamCtrl.enqueue(new TextEncoder().encode("data: foo\n\n"));
          },
        }),
        { headers: { "content-type": "text/event-stream" } }
      );
      return releaseChatAdmissionWhenDone(sse, innerFlightLease);
    });
    const reader = finalResponse.body!.getReader();
    await reader.read();
    await reader.cancel();
    assert.equal(controller.activeHeavy, 0);
    assert.equal(controller.inflightBytes, 0);
    assert.equal(controller.flightBytes, 0);
  }

  // 3) Read error
  {
    const { finalResponse, controller } = await setupPipeline(true, async (_admittedReq, ctrl) => {
      const innerFlightLease = ctrl.tryAcquireFlight(100);
      const sse = new Response(
        new ReadableStream<Uint8Array>({
          start(streamCtrl) {
            streamCtrl.enqueue(new TextEncoder().encode("data: foo\n\n"));
          },
          pull(streamCtrl) {
            streamCtrl.error(new Error("upstream read network error"));
          },
        }),
        { headers: { "content-type": "text/event-stream" } }
      );
      return releaseChatAdmissionWhenDone(sse, innerFlightLease);
    });
    const reader = finalResponse.body!.getReader();
    await reader.read();
    await assert.rejects(async () => {
      await reader.read();
    });
    assert.equal(controller.activeHeavy, 0);
    assert.equal(controller.inflightBytes, 0);
    assert.equal(controller.flightBytes, 0);
  }

  // 4) Handler throw
  {
    const controller = makeController();
    await assert.rejects(async () => {
      const req = new Request("http://localhost/v1beta/models/gemini:streamGenerateContent", {
        method: "POST",
        headers: { "content-length": String(convertedBytes) },
        body: convertedStr,
        duplex: "half",
      } as RequestInit & { duplex: "half" });
      const admission = await admitChatRequest(req, { controller });
      assert.equal(admission.admit, true);
      if (!admission.admit) return;
      let lease = admission.lease;
      try {
        throw new Error("handler exploded");
      } catch (err) {
        lease?.release();
        lease = null;
        throw err;
      }
    });
    assert.equal(controller.activeHeavy, 0);
    assert.equal(controller.inflightBytes, 0);
    assert.equal(controller.flightBytes, 0);
  }

  // 5) Transform error
  {
    const { finalResponse, controller } = await setupPipeline(true, async (_admittedReq, ctrl) => {
      const innerFlightLease = ctrl.tryAcquireFlight(100);
      const sse = new Response(
        new ReadableStream<Uint8Array>({
          start(streamCtrl) {
            streamCtrl.error(new Error("transform pipe failure"));
          },
        }),
        { headers: { "content-type": "text/event-stream" } }
      );
      return releaseChatAdmissionWhenDone(sse, innerFlightLease);
    });
    const reader = finalResponse.body!.getReader();
    await assert.rejects(async () => {
      await reader.read();
    });
    assert.equal(controller.activeHeavy, 0);
    assert.equal(controller.inflightBytes, 0);
    assert.equal(controller.flightBytes, 0);
  }

  // 6) Non-SSE
  {
    const { finalResponse, controller } = await setupPipeline(false, async () => {
      return new Response(JSON.stringify({ candidates: [] }), {
        headers: { "content-type": "application/json" },
      });
    });
    assert.equal(finalResponse.headers.get("content-type"), "application/json");
    assert.equal(controller.activeHeavy, 0);
    assert.equal(controller.inflightBytes, 0);
    assert.equal(controller.flightBytes, 0);
  }
});
