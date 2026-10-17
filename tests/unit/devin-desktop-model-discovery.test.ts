import { test } from "node:test";
import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";

import {
  DEVIN_DESKTOP_MODEL_CONFIG_URL,
  decodeDiscoveredDevinModels,
  discoverDevinDesktopModels,
} from "../../open-sse/services/devinDesktopModels.ts";
import { maybeHandleDevinDesktopModelDiscovery } from "../../src/app/api/providers/[id]/models/devinDesktopDiscovery.ts";

// Minimal protobuf writers for GetCliModelConfigs fixtures (field 1 = repeated config;
// config: 1=name, 4=disabled flag, 5=image input, 18=context window, 22=model id).
function varint(value: number | bigint): Buffer {
  const out: number[] = [];
  let current = BigInt(value);
  while (current > 127n) {
    out.push(Number(current & 127n) | 128);
    current >>= 7n;
  }
  out.push(Number(current));
  return Buffer.from(out);
}
const bytesField = (number: number, value: string | Buffer) => {
  const bytes = Buffer.from(value);
  return Buffer.concat([varint((number << 3) | 2), varint(bytes.length), bytes]);
};
const numberField = (number: number, value: number) =>
  Buffer.concat([varint(number << 3), varint(value)]);

const ENABLED_VISION = Buffer.concat([
  bytesField(1, "SWE-2 High"),
  numberField(4, 0),
  numberField(5, 1),
  numberField(18, 262144),
  bytesField(22, "swe-2-high"),
]);
const DISABLED = Buffer.concat([
  bytesField(1, "Disabled"),
  numberField(4, 1),
  bytesField(22, "disabled-model"),
]);
const CURATED = Buffer.concat([
  bytesField(1, "Live SWE-1.7"),
  numberField(4, 0),
  numberField(18, 100000),
  bytesField(22, "swe-1-7"),
]);
const PAYLOAD = Buffer.concat([bytesField(1, ENABLED_VISION), bytesField(1, DISABLED)]);

test("decodes enabled configs, skips disabled ones and reads vision + context", () => {
  assert.deepEqual(decodeDiscoveredDevinModels(PAYLOAD), [
    {
      id: "swe-2-high",
      name: "SWE-2 High",
      contextLength: 262144,
      maxOutputTokens: 64000,
      supportsVision: true,
    },
  ]);
});

test("decodes a gzip-compressed payload the same way", () => {
  assert.deepEqual(
    decodeDiscoveredDevinModels(gzipSync(PAYLOAD)),
    decodeDiscoveredDevinModels(PAYLOAD)
  );
});

test("rejects truncated payloads and oversized varints instead of returning garbage", () => {
  assert.throws(() => decodeDiscoveredDevinModels(PAYLOAD.subarray(0, PAYLOAD.length - 3)));
  assert.throws(() => decodeDiscoveredDevinModels(Buffer.from([0x08, ...Array(11).fill(0xff)])));
});

test("discovery posts the Devin metadata to GetCliModelConfigs", async () => {
  let seen: { url: string; init: RequestInit } | null = null;
  const models = await discoverDevinDesktopModels("devin-session-token$abc", {
    fetchImpl: (async (url: string, init: RequestInit) => {
      seen = { url, init };
      return new Response(PAYLOAD, { status: 200 });
    }) as typeof fetch,
  });
  assert.ok(seen);
  assert.equal(seen!.url, DEVIN_DESKTOP_MODEL_CONFIG_URL);
  assert.match(seen!.url, /ApiServerService\/GetCliModelConfigs$/);
  const headers = seen!.init.headers as Record<string, string>;
  assert.equal(headers["Content-Type"], "application/proto");
  assert.ok(Buffer.from(seen!.init.body as ArrayBuffer).includes("devin-session-token$abc"));
  assert.equal(models[0].id, "swe-2-high");
});

test("discovery throws a status-only error on a non-OK response", async () => {
  await assert.rejects(
    discoverDevinDesktopModels("tok", {
      fetchImpl: (async () => new Response("secret body", { status: 403 })) as typeof fetch,
    }),
    (error: Error) => {
      assert.match(error.message, /403/);
      assert.doesNotMatch(error.message, /secret body/);
      return true;
    }
  );
});

type Payload = Record<string, unknown>;
function routeOptions(
  overrides: Partial<Parameters<typeof maybeHandleDevinDesktopModelDiscovery>[0]>
) {
  const responses: Payload[] = [];
  const options = {
    provider: "devin-desktop",
    connectionId: "conn-1",
    apiKey: null,
    accessToken: "devin-session-token$abc",
    maybeReturnCachedDiscovery: () => null,
    maybeReturnAutoFetchDisabled: () => null,
    buildDiscoveryFallbackResponse: () => null,
    buildResponse: (payload: Payload) => {
      responses.push(payload);
      return Response.json(payload);
    },
    buildApiDiscoveryResponse: async (models: unknown[]) => {
      responses.push({ source: "api", models });
      return Response.json({ source: "api", models });
    },
    ...overrides,
  };
  return { options, responses };
}

test("route handler ignores other providers", async () => {
  const { options } = routeOptions({ provider: "codex" });
  assert.equal(await maybeHandleDevinDesktopModelDiscovery(options), null);
});

test("route handler returns live models overlaid with curated catalog metadata", async () => {
  const { options, responses } = routeOptions({
    fetchImpl: (async () =>
      new Response(Buffer.concat([bytesField(1, CURATED), bytesField(1, ENABLED_VISION)]), {
        status: 200,
      })) as typeof fetch,
  });
  const response = await maybeHandleDevinDesktopModelDiscovery(options);
  assert.ok(response);
  assert.equal(responses[0].source, "api");
  const models = responses[0].models as Array<Record<string, unknown>>;
  const curated = models.find((model) => model.id === "swe-1-7");
  assert.equal(curated?.name, "SWE-1.7 Max", "curated display name wins");
  assert.equal(curated?.maxOutputTokens, 128_000, "curated output limit wins");
  assert.ok(
    models.some((model) => model.id === "swe-2-high"),
    "uncurated live model is kept"
  );
});

test("route handler falls back to the static catalog on a malformed payload (no throw)", async () => {
  const { options, responses } = routeOptions({
    fetchImpl: (async () => new Response(PAYLOAD.subarray(0, 7), { status: 200 })) as typeof fetch,
  });
  const response = await maybeHandleDevinDesktopModelDiscovery(options);
  assert.ok(response);
  assert.equal(responses[0].source, "local_catalog");
  assert.match(String(responses[0].warning), /Devin model discovery failed/);
  assert.ok((responses[0].models as unknown[]).length > 0);
});

test("route handler without a token serves the static catalog without calling upstream", async () => {
  let called = false;
  const { options, responses } = routeOptions({
    accessToken: "",
    fetchImpl: (async () => {
      called = true;
      return new Response(PAYLOAD);
    }) as typeof fetch,
  });
  await maybeHandleDevinDesktopModelDiscovery(options);
  assert.equal(called, false);
  assert.equal(responses[0].source, "local_catalog");
});

test("route handler prefers the cached discovery response when available", async () => {
  const cached = Response.json({ source: "cache" });
  const { options } = routeOptions({ maybeReturnCachedDiscovery: () => cached });
  assert.equal(await maybeHandleDevinDesktopModelDiscovery(options), cached);
});
