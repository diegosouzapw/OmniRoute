import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { LOCAL_ONLY_API_PREFIXES, isLocalOnlyPath } from "../../../src/server/authz/routeGuard.ts";
import { SPAWN_CAPABLE_PREFIXES } from "../../../src/shared/constants/spawnCapablePrefixes.ts";
import { managementPolicy } from "../../../src/server/authz/policies/management.ts";
import {
  BROKER_TIMEOUT_MS,
  POST,
  handleVideoExtractionBrokerRequest,
  readBoundedVideoBrokerBody,
} from "../../../src/app/api/modality-bridge/video/extract/route.ts";
import { buildVideoBridgeBrokerHeaders } from "../../../src/lib/guardrails/videoBridgeBrokerAuth.ts";
import { createVideoExtractionQueue } from "../../../src/lib/guardrails/videoBridgeBrokerQueue.ts";
import { AUTHZ_HEADER_PEER_LOCALITY } from "../../../src/server/authz/headers.ts";
import { VIDEO_BRIDGE_TIMEOUT_MAX_MS } from "../../../src/shared/constants/modalityBridgeDefaults.ts";

const PREFIX = "/api/modality-bridge/video/";
const EXTRACT_PATH = `${PREFIX}extract`;

function trustedBrokerRequest(signal?: AbortSignal): Request {
  return new Request(`http://localhost${EXTRACT_PATH}?frames=1`, {
    method: "POST",
    headers: {
      ...buildVideoBridgeBrokerHeaders(),
      [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
      "Content-Type": "application/octet-stream",
    },
    body: Buffer.from("video"),
    signal,
  });
}

test("Video Bridge runtime and broker share an exact LOCAL_ONLY + SPAWN_CAPABLE prefix", () => {
  assert.ok(LOCAL_ONLY_API_PREFIXES.includes(PREFIX));
  assert.ok(SPAWN_CAPABLE_PREFIXES.includes(PREFIX));
  assert.equal(isLocalOnlyPath(EXTRACT_PATH, "POST"), true);
  assert.equal(isLocalOnlyPath(`${PREFIX}runtime`, "GET"), true);
  assert.equal(BROKER_TIMEOUT_MS, VIDEO_BRIDGE_TIMEOUT_MAX_MS);
});

test("non-loopback broker access is rejected as LOCAL_ONLY before authentication", async () => {
  const outcome = await managementPolicy.evaluate({
    request: {
      method: "POST",
      headers: new Headers({ authorization: "Bearer stolen-token" }),
      url: `https://dashboard.example${EXTRACT_PATH}`,
      nextUrl: { pathname: EXTRACT_PATH },
    },
    classification: {
      routeClass: "MANAGEMENT",
      normalizedPath: EXTRACT_PATH,
      reason: "management_api",
    },
    requestId: "req_video_bridge_remote",
  } as unknown as Parameters<typeof managementPolicy.evaluate>[0]);

  assert.equal(outcome.allow, false);
  if (!outcome.allow) {
    assert.equal(outcome.status, 403);
    assert.equal(outcome.code, "LOCAL_ONLY");
  }
});

test("extract handler rejects direct calls without the loopback broker identity before reading media", async () => {
  const response = await POST(
    new Request(`http://localhost${EXTRACT_PATH}?frames=1`, {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: Buffer.from("video"),
    })
  );
  assert.equal(response.status, 403);
  assert.equal(JSON.stringify(await response.json()).includes("token"), false);
});

test("bounded broker body reading accepts absent length and cancels a lying oversized stream", async () => {
  const bodyWithoutLength = new Request(`http://localhost${EXTRACT_PATH}`, {
    method: "POST",
    body: Buffer.from("safe"),
  });
  assert.deepEqual(await readBoundedVideoBrokerBody(bodyWithoutLength, 4), Buffer.from("safe"));

  let cancelled = false;
  const maliciousBody = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(Buffer.from("1234"));
      controller.enqueue(Buffer.from("5"));
    },
    cancel() {
      cancelled = true;
    },
  });
  const lying = new Request(`http://localhost${EXTRACT_PATH}`, {
    method: "POST",
    headers: { "Content-Length": "1" },
    body: maliciousBody,
    duplex: "half",
  } as RequestInit & { duplex: "half" });
  await assert.rejects(() => readBoundedVideoBrokerBody(lying, 4), /VIDEO_INPUT_TOO_LARGE/);
  assert.equal(cancelled, true);
});

test("broker route maps queue capacity, client disconnect, and deadline to distinct HTTP statuses", async () => {
  const neverExtract = async () => {
    throw new Error("extractor must not run");
  };

  const capacity = await handleVideoExtractionBrokerRequest(trustedBrokerRequest(), {
    queue: createVideoExtractionQueue({ concurrency: 1, maxPending: 0, maxQueuedBytes: 1 }),
    extractFrames: neverExtract,
  });
  assert.equal(capacity.status, 503);
  assert.equal(capacity.headers.get("Retry-After"), "1");

  const clientController = new AbortController();
  clientController.abort();
  const clientAbort = await handleVideoExtractionBrokerRequest(
    trustedBrokerRequest(clientController.signal),
    { extractFrames: neverExtract }
  );
  assert.equal(clientAbort.status, 499);
  assert.equal(clientAbort.headers.get("Retry-After"), null);

  const deadline = await handleVideoExtractionBrokerRequest(trustedBrokerRequest(), {
    deadlineSignal: AbortSignal.abort(),
    extractFrames: neverExtract,
  });
  assert.equal(deadline.status, 504);
  assert.equal(deadline.headers.get("Retry-After"), null);
});

test("broker route accepts finite focus bounds and forwards them to the isolated extractor", async () => {
  let receivedFocus: unknown;
  const response = await handleVideoExtractionBrokerRequest(
    new Request(`http://localhost${EXTRACT_PATH}?frames=2&start=2&end=8`, {
      method: "POST",
      headers: {
        ...buildVideoBridgeBrokerHeaders(),
        [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
        "Content-Type": "application/octet-stream",
      },
      body: Buffer.from("video"),
    }),
    {
      extractFrames: async (_bytes, options) => {
        receivedFocus = options.focusWindow;
        return {
          durationSeconds: 10,
          frames: [{ timestampSeconds: 3, dataUri: "data:image/jpeg;base64,QQ==" }],
        };
      },
    }
  );

  assert.equal(response.status, 200);
  assert.deepEqual(receivedFocus, { endSeconds: 8, startSeconds: 2 });
});

test("configured base path preserves the exact self-hop without widening broker authentication", async () => {
  const previousBasePath = process.env.OMNIROUTE_BASE_PATH;
  process.env.OMNIROUTE_BASE_PATH = "/omniroute";
  try {
    const headers = new Headers({
      ...buildVideoBridgeBrokerHeaders(),
      [AUTHZ_HEADER_PEER_LOCALITY]: "loopback",
      "Content-Type": "text/plain",
    });
    const response = await POST(
      new Request(`http://localhost/omniroute${EXTRACT_PATH}?frames=1`, {
        method: "POST",
        headers,
        body: "video",
      })
    );
    assert.equal(response.status, 400, "the exact base-path route must pass path and broker auth");

    const adjacent = await POST(
      new Request(`http://localhost/omniroute${PREFIX}runtime?frames=1`, {
        method: "POST",
        headers,
        body: "video",
      })
    );
    assert.equal(adjacent.status, 404);

    const policyOutcome = await managementPolicy.evaluate({
      request: {
        method: "POST",
        headers,
        ip: "127.0.0.1",
        url: `http://localhost/omniroute${EXTRACT_PATH}`,
        nextUrl: { pathname: `/omniroute${EXTRACT_PATH}` },
      },
      classification: {
        routeClass: "MANAGEMENT",
        normalizedPath: EXTRACT_PATH,
        reason: "management_api",
      },
      requestId: "req_video_bridge_base_path",
    } as unknown as Parameters<typeof managementPolicy.evaluate>[0]);
    assert.equal(policyOutcome.allow, true);
  } finally {
    if (previousBasePath === undefined) delete process.env.OMNIROUTE_BASE_PATH;
    else process.env.OMNIROUTE_BASE_PATH = previousBasePath;
  }
});

test("OpenAPI marks both Video Bridge process routes loopback-only", () => {
  const openapi = readFileSync("docs/openapi.yaml", "utf8");
  for (const path of [`${PREFIX}runtime`, EXTRACT_PATH]) {
    const start = openapi.indexOf(`  ${path}:`);
    assert.notEqual(start, -1, `${path} missing from OpenAPI`);
    assert.match(openapi.slice(start, start + 800), /x-loopback-only:\s*true/);
  }
});

test("public docs describe the exact Video Bridge quota, deadline, and abort contracts", () => {
  const openapi = readFileSync("docs/openapi.yaml", "utf8");
  const statsStart = openapi.indexOf("  /api/modality-bridge/stats:");
  const runtimeStart = openapi.indexOf(`  ${PREFIX}runtime:`);
  const extractStart = openapi.indexOf(`  ${EXTRACT_PATH}:`);
  const statsContract = openapi.slice(statsStart, runtimeStart);
  const runtimeContract = openapi.slice(runtimeStart, extractStart);
  const extractContract = openapi.slice(extractStart, openapi.indexOf("  /api/cache/stats:"));

  assert.match(statsContract, /latencySamples/);
  assert.match(runtimeContract, /trusted loopback[^\n]*before authentication/i);
  assert.match(extractContract, /50 MiB/);
  assert.match(extractContract, /32 MiB/);
  assert.match(extractContract, /"499":[\s\S]*Client request aborted/);
  assert.match(extractContract, /"503":[\s\S]*Retry-After/);
  assert.match(extractContract, /"504":[\s\S]*deadline/i);

  const guardrails = readFileSync("docs/security/GUARDRAILS.md", "utf8");
  assert.match(guardrails, /inline[\s\S]{0,120}36 MiB/i);
  assert.match(guardrails, /remote[\s\S]{0,120}50 MiB/i);
  assert.match(guardrails, /`signal\?: AbortSignal`/);
  assert.match(guardrails, /request abort[^\n]*fail-open exception/i);
  assert.doesNotMatch(guardrails, /modalityBridgeVideoTimeout`[^\n]*300000/);
  assert.match(guardrails, /latencySamples/);
  assert.match(guardrails, /averageLatencyMs[\s\S]{0,160}latencySamples/);
  assert.doesNotMatch(guardrails, /reference-bearing containers/);
  assert.match(guardrails, /external MOV data references[\s\S]{0,160}disabled by default/i);
});
