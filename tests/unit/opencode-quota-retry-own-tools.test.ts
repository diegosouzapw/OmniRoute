/**
 * A 403 or 451 carrying `insufficient_quota` on a request that declares its
 * own tools is retried once with the observed names appended; the retry
 * answer is served when it passes, otherwise the original refusal stands.
 */
import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import {
  classifyProviderError,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";
import {
  _resetShapeMemoForTests,
  _setShapeClockForTests,
} from "../../open-sse/executors/opencodeRequestShape.ts";
import {
  _resetToolObservationForTests,
  getObservedToolNames,
  recordAcceptedToolNames,
} from "../../open-sse/executors/opencodeToolObservation.ts";

const MODEL = "muse-spark-1.3-contributor-free";
const QUOTA_BODY = JSON.stringify({
  error: { type: "insufficient_quota", message: "insufficient_quota" },
});
const ANSWER_OK = JSON.stringify({ ok: true });

type Body = Record<string, unknown>;

function toolNamesOf(body: Body): Array<string | null> {
  if (!Array.isArray(body.tools)) return [];
  return (body.tools as Array<unknown>).map((entry) => {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
    const rec = entry as { name?: unknown; function?: { name?: unknown } };
    const name = typeof rec.name === "string" ? rec.name : rec.function?.name;
    return typeof name === "string" ? name : null;
  });
}

const originalFetch = globalThis.fetch;
let bodies: Body[] = [];

function quotaRefusal(status: number, body: string = QUOTA_BODY): Response {
  return new Response(body, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function answerOk(): Response {
  return new Response(ANSWER_OK, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function installFirstRefusedThen(status: number, second: () => Response): void {
  bodies = [];
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body ?? "{}")) as Body);
    if (bodies.length === 1) return quotaRefusal(status);
    return second();
  }) as typeof globalThis.fetch;
}

function installAlwaysRefused(status: number, body: string = QUOTA_BODY): void {
  bodies = [];
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body ?? "{}")) as Body);
    return quotaRefusal(status, body);
  }) as typeof globalThis.fetch;
}

const directCredentials: ProviderCredentials = {
  apiKey: "k",
  accessToken: null,
  connectionId: "c",
};

const loopCredentials: ProviderCredentials = {
  apiKey: "k",
  accessToken: null,
  connectionId: "c",
  providerSpecificData: {
    fingerprints: ["loop-account-a", "loop-account-b"],
  },
};

function ownToolsBody(): Body {
  return {
    model: MODEL,
    messages: [{ role: "user", content: "hi" }],
    stream: false,
    tools: [{ type: "function", function: { name: "read", parameters: { type: "object" } } }],
  };
}

async function run(executor: OpencodeExecutor, body: Body, credentials: ProviderCredentials) {
  const result = (await executor.execute({
    model: MODEL,
    body,
    stream: false,
    signal: null,
    credentials,
    log: { debug() {}, info() {}, warn() {}, error() {} },
  })) as { response: Response };
  return result.response;
}

beforeEach(() => {
  _resetShapeMemoForTests();
  _resetToolObservationForTests();
  _setShapeClockForTests(() => Date.now());
  process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS = "bash";
  recordAcceptedToolNames("opencode-zen", MODEL, undefined, ["edit", "write"]);
});

afterEach(() => {
  delete process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS;
  globalThis.fetch = originalFetch;
  _setShapeClockForTests(() => Date.now());
  _resetToolObservationForTests();
  resetDbInstance();
});

for (const status of [403, 451]) {
  for (const path of ["direct", "loop"] as const) {
    test(`a ${status} carrying the quota token on own tools is retried once and served (${path} path)`, async () => {
      installFirstRefusedThen(status, answerOk);
      const executor = new OpencodeExecutor("opencode-zen");
      const response = await run(
        executor,
        ownToolsBody(),
        path === "direct" ? directCredentials : loopCredentials
      );
      assert.equal(response.status, 200);
      assert.equal(bodies.length, 2);
      // The free-tier contract always declares the complete lowercase quartet, so the
      // caller's own `read` is joined by the three missing members — the configured
      // placeholder (`bash`) is an extra appended on top, never a replacement (#15322).
      assert.deepEqual(toolNamesOf(bodies[0]), ["read", "bash", "glob", "grep"]);
      assert.ok(toolNamesOf(bodies[1]).includes("read"));
      assert.ok(toolNamesOf(bodies[1]).includes("edit"));
      await response.body?.cancel();
    });
  }
}

test("when both attempts are refused the original refusal is served and the store is untouched", async () => {
  installAlwaysRefused(403);
  const executor = new OpencodeExecutor("opencode-zen");
  const response = await run(executor, ownToolsBody(), directCredentials);
  assert.equal(response.status, 403);
  assert.equal(bodies.length, 2);
  assert.equal(await response.text(), QUOTA_BODY);
  assert.equal(
    classifyProviderError(403, QUOTA_BODY, "opencode-zen"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );
  assert.deepEqual(getObservedToolNames("opencode-zen", MODEL), ["edit", "write"]);
});

test("a quota refusal carrying a user_blocked marker is not retried", async () => {
  installAlwaysRefused(
    403,
    JSON.stringify({ error: { message: "insufficient_quota [user_blocked] egress refused" } })
  );
  const executor = new OpencodeExecutor("opencode-zen");
  const response = await run(executor, ownToolsBody(), directCredentials);
  assert.equal(response.status, 403);
  assert.equal(bodies.length, 1);
  await response.body?.cancel();
});

test("no retry when there is nothing observed to add", async () => {
  _resetToolObservationForTests();
  delete process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS;
  installAlwaysRefused(403);
  const executor = new OpencodeExecutor("opencode-zen");
  const response = await run(executor, ownToolsBody(), directCredentials);
  assert.equal(response.status, 403);
  assert.equal(bodies.length, 1);
  await response.body?.cancel();
});
