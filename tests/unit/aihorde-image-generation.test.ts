import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-aihorde-image-"));

import {
  capHordeN,
  mapHordeGenerateRequest,
  parseHordeSize,
  stripHordeModelPrefix,
} from "../../open-sse/handlers/imageGeneration/providers/aihordeMapRequest.ts";
import { handleAiHordeImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/aihorde.ts";
import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";
import { aiHordeImageCatalog } from "../../open-sse/services/aihordeImageCatalog.ts";

test("map helpers snap size, cap n, and strip prefixes", () => {
  assert.equal(stripHordeModelPrefix("aihorde/FLUX.1-schnell"), "FLUX.1-schnell");
  assert.equal(stripHordeModelPrefix("horde/AlbedoBase XL (SDXL)"), "AlbedoBase XL (SDXL)");
  assert.deepEqual(parseHordeSize("1000x1000"), { width: 1024, height: 1024 });
  assert.equal(capHordeN(9), 4);
});

test("mapHordeGenerateRequest builds a native Horde payload", () => {
  const payload = mapHordeGenerateRequest({
    model: "aihorde/FLUX.1-schnell",
    prompt: "a red fox in snow",
    n: 2,
    size: "1024x768",
  });
  assert.equal(payload.prompt, "a red fox in snow");
  assert.deepEqual(payload.models, ["FLUX.1-schnell"]);
  assert.equal((payload.params as { n: number }).n, 2);
  assert.equal((payload.params as { width: number }).width, 1024);
  assert.equal((payload.params as { height: number }).height, 768);
  assert.equal(payload.r2, true);
});

test("handleAiHordeImageGeneration rejects a model with zero workers", async () => {
  aiHordeImageCatalog.replace([
    { name: "AlbedoBase XL (SDXL)", count: 1, queued: 0, eta: 1, performance: 1, jobs: 0 },
  ]);
  const result = await handleAiHordeImageGeneration({
    model: "FLUX.1-schnell",
    provider: "aihorde",
    body: { model: "aihorde/FLUX.1-schnell", prompt: "fox" },
    credentials: { apiKey: "horde-key" },
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(String(result.error), /No Horde workers/);
});

test("exceeding the deadline issues a DELETE cancel to Horde, not just a local timeout", async () => {
  const originalFetch = globalThis.fetch;
  const calls: Array<{ method: string; url: string }> = [];

  aiHordeImageCatalog.replace([
    { name: "FLUX.1-schnell", count: 3, queued: 0, eta: 1, performance: 1, jobs: 0 },
  ]);

  globalThis.fetch = (async (input: string | URL, init?: RequestInit) => {
    const url = String(input);
    const method = (init?.method || "GET").toUpperCase();
    calls.push({ method, url });

    if (url.includes("/v2/generate/async")) {
      return new Response(JSON.stringify({ id: "job-timeout" }), { status: 202 });
    }
    if (method === "DELETE" && url.includes("/v2/generate/status/")) {
      return new Response(JSON.stringify({ id: "job-timeout" }), { status: 200 });
    }
    if (url.includes("/v2/generate/check/")) {
      // Never reports done — the generation deadline must be what ends the loop.
      return new Response(JSON.stringify({ done: false, is_possible: true, faulted: false }), {
        status: 200,
      });
    }
    return new Response("unexpected", { status: 500 });
  }) as typeof fetch;

  try {
    const result = await handleAiHordeImageGeneration({
      model: "FLUX.1-schnell",
      provider: "aihorde",
      body: { model: "aihorde/FLUX.1-schnell", prompt: "a red fox in snow" },
      credentials: { apiKey: "horde-key" },
      // Small enough that the poll loop's 1s interval crosses the deadline
      // on its first iteration, but non-zero so submit itself isn't rejected.
      timeoutMs: 50,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 504);
    assert.match(String(result.error), /timed out/);

    const cancelCall = calls.find(
      (call) => call.method === "DELETE" && call.url.includes("/v2/generate/status/job-timeout")
    );
    assert.ok(cancelCall, "expected a DELETE cancel call to Horde's status endpoint");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("a private-host R2 image URL is blocked by the SSRF guard, not fetched", async () => {
  const originalFetch = globalThis.fetch;
  let downloadAttempted = false;

  aiHordeImageCatalog.replace([
    { name: "FLUX.1-schnell", count: 3, queued: 0, eta: 1, performance: 1, jobs: 0 },
  ]);

  globalThis.fetch = (async (input: string | URL, init?: RequestInit) => {
    const url = String(input);
    const method = (init?.method || "GET").toUpperCase();

    if (url.includes("/v2/generate/async")) {
      return new Response(JSON.stringify({ id: "job-ssrf" }), { status: 202 });
    }
    if (method === "DELETE") {
      return new Response("{}", { status: 200 });
    }
    if (url.includes("/v2/generate/check/")) {
      return new Response(JSON.stringify({ done: true, is_possible: true, faulted: false }), {
        status: 200,
      });
    }
    if (url.includes("/v2/generate/status/")) {
      return new Response(
        JSON.stringify({ generations: [{ img: "http://127.0.0.1:9999/internal-secret.png" }] }),
        { status: 200 }
      );
    }
    // A real HTTP fetch reaching the private host means the guard failed to
    // block it before the network call.
    downloadAttempted = true;
    return new Response("unexpected", { status: 500 });
  }) as typeof fetch;

  try {
    const result = await handleAiHordeImageGeneration({
      model: "FLUX.1-schnell",
      provider: "aihorde",
      body: { model: "aihorde/FLUX.1-schnell", prompt: "a red fox in snow" },
      credentials: { apiKey: "horde-key" },
    });

    assert.equal(result.success, false);
    assert.equal(downloadAttempted, false, "the private-host URL must never reach fetch()");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("an oversized R2 image download is rejected instead of buffered whole", async () => {
  const originalFetch = globalThis.fetch;

  aiHordeImageCatalog.replace([
    { name: "FLUX.1-schnell", count: 3, queued: 0, eta: 1, performance: 1, jobs: 0 },
  ]);

  globalThis.fetch = (async (input: string | URL, init?: RequestInit) => {
    const url = String(input);
    const method = (init?.method || "GET").toUpperCase();

    if (url.includes("/v2/generate/async")) {
      return new Response(JSON.stringify({ id: "job-oversized" }), { status: 202 });
    }
    if (method === "DELETE") {
      return new Response("{}", { status: 200 });
    }
    if (url.includes("/v2/generate/check/")) {
      return new Response(JSON.stringify({ done: true, is_possible: true, faulted: false }), {
        status: 200,
      });
    }
    // A raw public IP literal (not a hostname) skips the SSRF guard's real DNS
    // lookup entirely — this test only cares about the byte-cap, not the host
    // resolution path (already covered by the private-host test above), and
    // the sandboxed test env has no DNS egress.
    if (url.includes("/v2/generate/status/")) {
      return new Response(
        JSON.stringify({ generations: [{ img: "https://93.184.216.34/huge.png" }] }),
        { status: 200 }
      );
    }
    if (url.includes("93.184.216.34")) {
      return new Response("x", {
        status: 200,
        headers: { "content-length": String(30 * 1024 * 1024) },
      });
    }
    return new Response("unexpected", { status: 500 });
  }) as typeof fetch;

  try {
    const result = await handleAiHordeImageGeneration({
      model: "FLUX.1-schnell",
      provider: "aihorde",
      body: { model: "aihorde/FLUX.1-schnell", prompt: "a red fox in snow" },
      credentials: { apiKey: "horde-key" },
    });

    assert.equal(result.success, false);
    assert.match(String(result.error), /exceeds|byte limit|too large/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration dispatches aihorde and sends the apikey header", async () => {
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; headers: Record<string, string>; body?: unknown }> = [];

  aiHordeImageCatalog.replace([
    { name: "FLUX.1-schnell", count: 3, queued: 0, eta: 1, performance: 1, jobs: 0 },
  ]);

  globalThis.fetch = (async (input: string | URL, init?: RequestInit) => {
    const url = String(input);
    const headers = Object.fromEntries(new Headers(init?.headers).entries());
    let body: unknown;
    if (typeof init?.body === "string") {
      try {
        body = JSON.parse(init.body);
      } catch {
        body = init.body;
      }
    }
    calls.push({ url, headers, body });

    if (url.includes("/v2/generate/async")) {
      return new Response(JSON.stringify({ id: "job-1" }), { status: 202 });
    }
    if (url.includes("/v2/generate/check/")) {
      return new Response(JSON.stringify({ done: true, is_possible: true, faulted: false }), {
        status: 200,
      });
    }
    if (url.includes("/v2/generate/status/")) {
      return new Response(
        JSON.stringify({ generations: [{ img: Buffer.from("png-bytes").toString("base64") }] }),
        { status: 200 }
      );
    }
    return new Response("unexpected", { status: 500 });
  }) as typeof fetch;

  try {
    const result = await handleImageGeneration({
      body: { model: "aihorde/FLUX.1-schnell", prompt: "a red fox in snow", size: "1024x1024" },
      credentials: { apiKey: "horde-registered-key" },
      log: null,
    });
    assert.equal(result.success, true);
    const submit = calls.find((call) => call.url.includes("/v2/generate/async"));
    assert.ok(submit);
    assert.equal(submit.headers.apikey, "horde-registered-key");
    assert.ok(submit.headers["client-agent"]);
    assert.deepEqual((submit.body as { models: string[] }).models, ["FLUX.1-schnell"]);
    assert.equal(
      (result as { data: { data: Array<{ b64_json: string }> } }).data.data[0].b64_json,
      Buffer.from("png-bytes").toString("base64")
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
