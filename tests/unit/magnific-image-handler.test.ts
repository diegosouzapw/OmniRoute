import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";

import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";
import {
  IMAGE_PROVIDERS,
  getImageProvider,
  parseImageModel,
} from "../../open-sse/config/imageRegistry.ts";
import { APIKEY_PROVIDERS, resolveProviderId } from "../../src/shared/constants/providers.ts";
import { IMAGE_ONLY_PROVIDER_IDS } from "../../src/shared/constants/providers.ts";
import { connectionBelongsToProviderPage } from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts";

// Stub DNS for fetchRemoteImage/direct-fetch DNS-rebinding guards, mirroring
// tests/unit/nanobanana-image-handler.test.ts.
const originalDnsLookup = dns.promises.lookup;
(dns.promises as { lookup: unknown }).lookup = (async (
  _hostname: string,
  options?: { all?: boolean }
) => {
  const record = { address: "203.0.113.1", family: 4 };
  return options && options.all ? [record] : record;
}) as typeof dns.promises.lookup;
process.on("exit", () => {
  (dns.promises as { lookup: unknown }).lookup = originalDnsLookup;
});

test("magnific provider is registered (registry shape)", () => {
  assert.ok(APIKEY_PROVIDERS.magnific, "magnific should be in APIKEY_PROVIDERS");
  assert.equal(APIKEY_PROVIDERS.magnific.id, "magnific");
  assert.ok(
    IMAGE_ONLY_PROVIDER_IDS.has("magnific"),
    "magnific should be in IMAGE_ONLY_PROVIDER_IDS"
  );
  assert.ok(!IMAGE_ONLY_PROVIDER_IDS.has("freepik"));

  const provider = IMAGE_PROVIDERS.magnific;
  assert.ok(provider, "magnific should be in IMAGE_PROVIDERS");
  assert.equal(provider.format, "magnific-image");
  assert.equal(provider.authType, "apikey");
  assert.equal(provider.authHeader, "x-magnific-api-key");
  assert.equal(provider.baseUrl, "https://api.magnific.com/v1/ai/mystic");
  assert.equal(provider.alias, "freepik");
  assert.ok(provider.models.some((m) => m.id === "realism"));
  assert.ok(provider.models.some((m) => m.id === "fluid"));
  assert.equal(APIKEY_PROVIDERS.magnific.alias, "freepik");
  assert.equal(resolveProviderId("freepik"), "magnific");
  assert.equal(resolveProviderId("magnific"), "magnific");
  assert.equal(getImageProvider("freepik")?.id, "magnific");
  assert.deepEqual(parseImageModel("freepik/realism"), { provider: "magnific", model: "realism" });
  assert.deepEqual(parseImageModel("magnific/realism"), { provider: "magnific", model: "realism" });
  assert.equal(connectionBelongsToProviderPage("freepik", "magnific"), true);
  assert.equal(connectionBelongsToProviderPage("magnific", "freepik"), true);
});

test("handleImageGeneration(magnific): async submit+poll returns b64_json payload", async () => {
  const originalFetch = globalThis.fetch;
  let pollCount = 0;

  globalThis.fetch = (async (
    url: string,
    options: { headers?: Record<string, string>; body?: string } = {}
  ) => {
    const u = String(url);

    if (u === "https://api.magnific.com/v1/ai/mystic") {
      assert.equal(options.headers?.["x-magnific-api-key"], "test-key");
      const parsed = JSON.parse(options.body as string);
      assert.equal(parsed.prompt, "a red panda astronaut");
      assert.equal(parsed.model, "realism");
      return new Response(
        JSON.stringify({ data: { task_id: "task-magnific-1", status: "CREATED" } }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (u === "https://api.magnific.com/v1/ai/mystic/task-magnific-1") {
      pollCount += 1;
      if (pollCount < 2) {
        return new Response(
          JSON.stringify({ data: { task_id: "task-magnific-1", status: "IN_PROGRESS" } }),
          { status: 200, headers: { "content-type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({
          data: {
            task_id: "task-magnific-1",
            status: "COMPLETED",
            generated: ["https://cdn.example.com/magnific-result.png"],
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (u === "https://cdn.example.com/magnific-result.png") {
      return new Response(new Uint8Array([0x89, 0x50, 0x4e, 0x47]), { status: 200 });
    }

    throw new Error(`Unexpected URL: ${u}`);
  }) as typeof fetch;

  try {
    const result = await handleImageGeneration({
      body: {
        model: "magnific/realism",
        prompt: "a red panda astronaut",
        poll_interval_ms: 1,
      },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(result.data.data.length, 1);
    assert.equal(result.data.data[0].b64_json, "iVBORw==");
    assert.equal(pollCount, 2);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration(magnific): FAILED status returns sanitized 502 error", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (url: string) => {
    const u = String(url);
    if (u === "https://api.magnific.com/v1/ai/mystic") {
      return new Response(JSON.stringify({ data: { task_id: "task-fail", status: "CREATED" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (u === "https://api.magnific.com/v1/ai/mystic/task-fail") {
      return new Response(JSON.stringify({ data: { task_id: "task-fail", status: "FAILED" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected URL: ${u}`);
  }) as typeof fetch;

  try {
    const result = await handleImageGeneration({
      body: { model: "magnific/realism", prompt: "broken prompt", poll_interval_ms: 1 },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /Magnific Mystic image generation failed/);
    // Hard Rule #12: error responses must never leak a raw stack trace / file path.
    assert.ok(!result.error.includes("at /"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration(magnific): submit error response is sanitized, not raw upstream body", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async () => {
    // Simulate an upstream error body containing something that looks like a
    // stack trace / absolute source path, to prove sanitizeErrorMessage runs.
    const stackyBody = "Error: boom\n    at /srv/app/handlers/mystic.ts:42:10";
    return new Response(stackyBody, { status: 500 });
  }) as typeof fetch;

  try {
    const result = await handleImageGeneration({
      body: { model: "magnific/realism", prompt: "x" },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 500);
    assert.ok(!result.error.includes("/srv/app/handlers/mystic.ts"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration(freepik/realism): legacy alias routes to the Magnific Mystic adapter", async () => {
  const originalFetch = globalThis.fetch;
  let sawSubmit = false;

  globalThis.fetch = (async (
    url: string,
    options: { headers?: Record<string, string>; body?: string } = {}
  ) => {
    const u = String(url);
    if (u === "https://api.magnific.com/v1/ai/mystic") {
      sawSubmit = true;
      assert.equal(options.headers?.["x-magnific-api-key"], "test-key");
      return new Response(JSON.stringify({ data: { task_id: "task-alias", status: "CREATED" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (u === "https://api.magnific.com/v1/ai/mystic/task-alias") {
      return new Response(
        JSON.stringify({
          data: {
            task_id: "task-alias",
            status: "COMPLETED",
            generated: ["https://cdn.example.com/magnific-result.png"],
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (u === "https://cdn.example.com/magnific-result.png") {
      return new Response(new Uint8Array([0x89, 0x50, 0x4e, 0x47]), { status: 200 });
    }
    throw new Error(`Unexpected URL: ${u}`);
  }) as typeof fetch;

  try {
    const result = await handleImageGeneration({
      body: { model: "freepik/realism", prompt: "alias probe", poll_interval_ms: 1 },
      credentials: { apiKey: "test-key" },
      log: null,
    });
    assert.equal(result.success, true);
    assert.equal(sawSubmit, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
