/**
 * Unit tests: MCP tool guard (Jev input/output decisions on every registered
 * tool) and Jev-assisted tool selection inside `omniroute_tool_search`.
 *
 * Fail-open is the contract under test: when the lane is off, the credential is
 * missing, or Jev errors, behavior must be byte-identical to the unguarded path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { withJevToolGuard } from "../../../open-sse/mcp-server/jevGuard.ts";
import { handleToolSearch } from "../../../open-sse/mcp-server/toolSearch/handler.ts";
import { searchTools, type ScoredTool } from "../../../open-sse/mcp-server/toolSearch/search.ts";
import { getAllToolDefinitions } from "../../../open-sse/mcp-server/toolSearch/catalog.ts";
import { zodToTsSignature } from "../../../open-sse/mcp-server/toolSearch/signature.ts";
import {
  __resetJevClientForTests,
  __resetJevRuntimeCacheForTests,
  TOOL_SELECTION_NONE,
} from "../../../open-sse/services/jev/index.ts";

const JEV_ENV_KEYS = [
  "OMNIROUTE_JEV_ENABLED",
  "OMNIROUTE_JEV_API_KEY",
  "OMNIROUTE_JEV_BASE_URL",
  "OMNIROUTE_JEV_MODEL",
  "OMNIROUTE_JEV_TIMEOUT_MS",
  "OMNIROUTE_JEV_FEATURES",
  "OMNIROUTE_JEV_BLOCK_THRESHOLD",
  "OMNIROUTE_JEV_PROVIDER",
  "OMNIROUTE_JEV_WIRE",
  "TYPESAFE_API_KEY",
  "TYPESAFE_BASE_URL",
];
const savedEnv: Record<string, string | undefined> = {};
for (const key of JEV_ENV_KEYS) savedEnv[key] = process.env[key];

type FetchCall = { url: string; state: string };
let fetchCalls: FetchCall[] = [];
const originalFetch = globalThis.fetch;

function jsonResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

/** Extract the `state` field of a Jev request body without trusting its shape. */
function readState(init: RequestInit | undefined): string {
  let body: unknown;
  try {
    body = JSON.parse(String(init?.body ?? "{}"));
  } catch {
    return "";
  }
  if (!body || typeof body !== "object" || !("state" in body)) return "";
  return String(body.state ?? "");
}

/** Replace `fetch` with a Jev wire stub that records every call's `state`. */
function stubJev(responder: (state: string) => Response): void {
  fetchCalls = [];
  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    const state = readState(init);
    fetchCalls.push({ url, state });
    return responder(state);
  }) as typeof fetch;
}

const inputAnswers = (harmful: number) => ({
  model: "jev-test",
  answers: {
    harmful: { type: "noul", noul: harmful },
    destructive: { type: "noul", noul: 0.1 },
  },
});

test.beforeEach(() => {
  for (const key of JEV_ENV_KEYS) delete process.env[key];
  process.env.OMNIROUTE_JEV_API_KEY = "test-key";
  // #15641: the decision layer is opt-in — a credential alone engages nothing.
  process.env.OMNIROUTE_JEV_ENABLED = "on";
  process.env.OMNIROUTE_JEV_BASE_URL = "https://jev.test";
  process.env.OMNIROUTE_JEV_TIMEOUT_MS = "2000";
  __resetJevClientForTests();
  __resetJevRuntimeCacheForTests();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  for (const [key, value] of Object.entries(savedEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

// ---------------------------------------------------------------------------
// Tool guard
// ---------------------------------------------------------------------------

test("guard: lane off ⇒ handler runs with zero Jev calls", async () => {
  process.env.OMNIROUTE_JEV_ENABLED = "off";
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    throw new Error("Jev must not be called when the mcp lane is off");
  }) as typeof fetch;

  const guarded = withJevToolGuard("test_tool", async () => ({
    content: [{ type: "text", text: "ok" }],
  }));
  const result = await guarded({ q: "anything" });

  assert.equal(calls, 0);
  assert.deepEqual(result, { content: [{ type: "text", text: "ok" }] });
});

test("guard: harmful input is blocked before the handler runs", async () => {
  stubJev(() => jsonResponse(inputAnswers(0.95)));
  let invoked = false;
  const guarded = withJevToolGuard("test_tool", async () => {
    invoked = true;
    return { content: [{ type: "text", text: "ran" }] };
  });

  const result = await guarded({ cmd: "disable audit logging" });

  assert.equal(invoked, false);
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /blocked by Jev safety gate/);
  assert.match(result.content[0].text, /p=0\.950/);
  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].url, "https://jev.test/v1/systemone");
});

test("guard: destructive (but not harmful) input still reaches the handler", async () => {
  stubJev(() =>
    jsonResponse({
      model: "jev-test",
      answers: {
        harmful: { type: "noul", noul: 0.05 },
        destructive: { type: "noul", noul: 0.99 },
      },
    })
  );
  let invoked = 0;
  const guarded = withJevToolGuard("test_tool", async () => {
    invoked += 1;
    return { content: [{ type: "text", text: "done" }] };
  });

  const result = await guarded({ drop: "table" });

  assert.equal(invoked, 1);
  assert.deepEqual(result, { content: [{ type: "text", text: "done" }] });
});

test("guard: Jev failure is fail-open", async () => {
  stubJev(() => jsonResponse({ error: "boom" }, 500));
  let invoked = 0;
  const guarded = withJevToolGuard("test_tool", async () => {
    invoked += 1;
    return { content: [{ type: "text", text: "ran anyway" }] };
  });

  const result = await guarded({ q: "x" });

  assert.equal(invoked, 1);
  assert.deepEqual(result, { content: [{ type: "text", text: "ran anyway" }] });
  assert.ok(fetchCalls.length >= 1);
  for (const call of fetchCalls) assert.equal(call.url, "https://jev.test/v1/systemone");
});

test("guard: secret-shaped output is redacted and annotated", async () => {
  const secret = "sk-FAKE-TEST-VALUE-NOT-A-REAL-KEY-0001";
  stubJev((state) =>
    jsonResponse(
      state.includes("\noutput:")
        ? {
            model: "jev-test",
            answers: {
              wrongFormat: { type: "noul", noul: 0.02 },
              leaksSecrets: { type: "noul", noul: 0.95 },
            },
          }
        : inputAnswers(0.02)
    )
  );
  let invoked = 0;
  const guarded = withJevToolGuard("test_tool", async () => {
    invoked += 1;
    return { content: [{ type: "text", text: `key=${secret}` }] };
  });

  const result = await guarded({ q: "x" });

  assert.equal(invoked, 1);
  assert.equal(result.isError, undefined);
  assert.ok(
    result.content[0].text.startsWith("[jev-guard] redacted probable secret in tool output\n")
  );
  assert.ok(!result.content[0].text.includes(secret));
  assert.match(result.content[0].text, /\[redacted\]/);
  assert.equal(fetchCalls.length, 2);
});

test("guard: wrong-format output is annotated without touching the payload", async () => {
  stubJev((state) =>
    jsonResponse(
      state.includes("\noutput:")
        ? {
            model: "jev-test",
            answers: {
              wrongFormat: { type: "noul", noul: 0.95 },
              leaksSecrets: { type: "noul", noul: 0.05 },
            },
          }
        : inputAnswers(0.02)
    )
  );
  const guarded = withJevToolGuard("test_tool", async () => ({
    content: [{ type: "text", text: "sk-FAKE-TEST-VALUE-NOT-A-REAL-KEY-0001" }],
  }));

  const result = await guarded({ q: "x" });

  assert.equal(result.isError, undefined);
  assert.match(result.content[0].text, /output may be structurally malformed \(p=0\.950\)/);
  assert.ok(result.content[0].text.includes("sk-FAKE-TEST-VALUE-NOT-A-REAL-KEY-0001"));
  assert.equal(fetchCalls.length, 2);
});

test("guard: clean output is untouched with a single input decision", async () => {
  stubJev(() => jsonResponse(inputAnswers(0.01)));
  const guarded = withJevToolGuard("test_tool", async (args) => ({
    content: [{ type: "text", text: `result:${JSON.stringify(args)}` }],
  }));

  const result = await guarded({ q: "x" });

  assert.deepEqual(result, { content: [{ type: "text", text: 'result:{"q":"x"}' }] });
  assert.equal(fetchCalls.length, 1);
});

// ---------------------------------------------------------------------------
// Tool selection
// ---------------------------------------------------------------------------

const QUERY = "health";
const lexical = searchTools(
  getAllToolDefinitions().filter((t) => t.name !== "omniroute_tool_search"),
  QUERY,
  8
);

function expectedPayload(hits: ScoredTool[]) {
  return {
    query: QUERY,
    count: hits.length,
    tools: hits.map((h) => ({
      name: h.name,
      description: h.description,
      scopes: [...h.scopes],
      signature: zodToTsSignature(h.name, h.inputSchema),
    })),
  };
}

function choiceFor(tool: string): Response {
  return jsonResponse({
    model: "jev-test",
    answers: {
      tool: { type: "choice", choice: tool, confidence: 0.9, probabilities: { [tool]: 0.9 } },
    },
  });
}

test("tool search: lane off ⇒ pure lexical output, zero Jev calls", async () => {
  assert.ok(lexical.length >= 2, "fixture needs at least two lexical hits");
  process.env.OMNIROUTE_JEV_ENABLED = "off";
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    throw new Error("tool_search lane is off");
  }) as typeof fetch;

  const result = await handleToolSearch({ query: QUERY });

  assert.equal(calls, 0);
  assert.deepEqual(result, expectedPayload(lexical));
});

test("tool search: the decision model's pick is promoted to the front", async () => {
  assert.ok(lexical.length >= 2, "fixture needs at least two lexical hits");
  const picked = lexical[1];
  stubJev(() => choiceFor(picked.name));

  const result = await handleToolSearch({ query: QUERY });

  assert.equal(fetchCalls.length, 1);
  assert.deepEqual(result, expectedPayload([picked, lexical[0], ...lexical.slice(2)]));
});

test("tool search: TOOL_SELECTION_NONE keeps the lexical order", async () => {
  assert.ok(lexical.length >= 2, "fixture needs at least two lexical hits");
  stubJev(() => choiceFor(TOOL_SELECTION_NONE));

  const result = await handleToolSearch({ query: QUERY });

  assert.deepEqual(result, expectedPayload(lexical));
  assert.equal(result.count, lexical.length);
});

test("tool search: a pick outside the hits keeps the lexical order", async () => {
  assert.ok(lexical.length >= 2, "fixture needs at least two lexical hits");
  stubJev(() => choiceFor("omniroute_does_not_exist"));

  const result = await handleToolSearch({ query: QUERY });

  assert.deepEqual(result, expectedPayload(lexical));
});
