/**
 * OpenCode Zen: which tool shape a request must carry depends on what it is.
 *
 * Measured on 2026-09-18 against the live gateway, on both the Responses and the Chat
 * Completions surface. A request whose instructions say "Never use tools" (the official
 * client's title agent) is accepted with NO tools and refused with any; every other request
 * is accepted with at least the canonical tool names and refused without. The request
 * contract used to fill an empty `tools` array unconditionally, which turned exactly the
 * title requests into refusals.
 *
 * The executor therefore learns the accepted shape from the refusal: a refused request that
 * received an injection is replayed once without it, and the shape that worked is
 * remembered per prompt so the next identical request goes out in that shape at once.
 * The fake upstream below applies the rule as measured.
 */
import { test, beforeEach, afterEach, before, after } from "node:test";
import net from "node:net";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";
import { resolveProxyForRequest } from "../../open-sse/utils/proxyFetch.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import {
  attemptFor,
  noteFreeTierOutcome,
  prepareFreeTierRequest,
} from "../../open-sse/executors/opencodeFreeTierContract.ts";
import {
  _resetShapeMemoForTests,
  _setShapeClockForTests,
  shapeKeyOf,
} from "../../open-sse/executors/opencodeRequestShape.ts";
import {
  _resetToolObservationForTests,
  getObservedToolNames,
} from "../../open-sse/executors/opencodeToolObservation.ts";

const MODEL = "nemotron-3.5-lightning-free";
const TITLE_PROMPT =
  "You are a title generator. You output ONLY a thread title.\n- Never use tools\n- Keep it short";
const REFUSAL_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "FreeTierError",
    message:
      "Error from provider (Console): OpenCode's free tier can only be used from within OpenCode",
  },
});
const SSE_OK =
  'data: {"id":"gen-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"ok"},"finish_reason":null}]}\n\n' +
  'data: {"id":"gen-1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n' +
  "data: [DONE]\n\n";

type Body = Record<string, unknown>;
type Verdict = number | "network";
type Rule = (body: Body, call: number) => Verdict;

function toolCount(body: Body): number {
  return Array.isArray(body.tools) ? body.tools.length : 0;
}

function promptOf(body: Body): string {
  if (typeof body.instructions === "string") return body.instructions;
  const messages = Array.isArray(body.messages) ? (body.messages as Array<Body>) : [];
  const system = messages.find((m) => m.role === "system" || m.role === "developer");
  return typeof system?.content === "string" ? system.content : "";
}

/** The rule as measured: a "Never use tools" prompt wants no tools, anything else wants some. */
const measuredRule: Rule = (body) => {
  const wantsNone = promptOf(body).includes("Never use tools");
  const has = toolCount(body) > 0;
  return wantsNone !== has ? 200 : 403;
};

/** The same gateway after it flips: every prompt now wants tools. */
const invertedRule: Rule = (body) => (toolCount(body) > 0 ? 200 : 403);

const originalFetch = globalThis.fetch;
let bodies: Body[] = [];
/** Which proxy port (or "direct") each upstream call went through. */
let seen: string[] = [];
/** The responses handed back by the fake upstream, in call order. */
let answers: Response[] = [];

function installUpstream(rule: Rule): void {
  bodies = [];
  seen = [];
  answers = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const via = resolveProxyForRequest(url);
    seen.push(via.proxyUrl ? new URL(via.proxyUrl).port : "direct");
    const body = JSON.parse(String(init?.body ?? "{}")) as Body;
    bodies.push(body);
    const verdict = rule(body, bodies.length);
    if (verdict === "network") throw new TypeError("fetch failed");
    const answer = (response: Response): Response => {
      answers.push(response);
      return response;
    };
    if (verdict === 200) {
      return answer(
        new Response(SSE_OK, {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        })
      );
    }
    if (verdict === 403) {
      return answer(
        new Response(REFUSAL_BODY, {
          status: 403,
          headers: { "Content-Type": "application/json" },
        })
      );
    }
    return answer(
      new Response(JSON.stringify({ error: { message: "upstream said no" } }), {
        status: verdict,
        headers: { "Content-Type": "application/json" },
      })
    );
  }) as typeof globalThis.fetch;
}

beforeEach(() => {
  _resetShapeMemoForTests();
  _resetToolObservationForTests();
  _setShapeClockForTests(() => Date.now());
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  _setShapeClockForTests(() => Date.now());
});

const titleBody = (prompt = TITLE_PROMPT, model = MODEL): Body => ({
  model,
  messages: [
    { role: "system", content: prompt },
    { role: "user", content: "hello" },
  ],
});

type RunOptions = {
  signal?: AbortSignal | null;
  skipUpstreamRetry?: boolean;
  provider?: string;
  stream?: boolean;
  executor?: OpencodeExecutor;
  credentials?: ProviderCredentials;
};

async function run(body: Body, extra: RunOptions = {}): Promise<Response> {
  const executor = extra.executor ?? new OpencodeExecutor(extra.provider ?? "opencode-zen");
  const result = (await executor.execute({
    model: String(body.model),
    body,
    stream: extra.stream ?? true,
    signal: extra.signal ?? null,
    skipUpstreamRetry: extra.skipUpstreamRetry,
    credentials: extra.credentials ?? { apiKey: "k", accessToken: null, connectionId: "c" },
    log: { debug() {}, info() {}, warn() {}, error() {} },
  })) as { response: Response };
  return result.response;
}

test("a refused title request is replayed once without the injected tools and then accepted", async () => {
  installUpstream(measuredRule);
  const response = await run(titleBody());
  assert.equal(response.status, 200);
  assert.equal(bodies.length, 2, "one refusal, one replay");
  assert.ok(toolCount(bodies[0]) > 0, "the first attempt carried the injection");
  assert.equal(toolCount(bodies[1]), 0, "the replay carried no tools");
  assert.equal(bodies[1].stream, true, "the replay is still streamed");
});

for (const [label, verdict] of [
  ["429", 429],
  ["500", 500],
  ["a network error", "network"],
] as Array<[string, Verdict]>) {
  test(`${label} on the first attempt is not a shape refusal: no replay`, async () => {
    installUpstream(() => verdict);
    await run(titleBody(), { skipUpstreamRetry: true }).catch(() => undefined);
    assert.ok(bodies.length >= 1);
    assert.ok(
      bodies.every((b) => toolCount(b) > 0),
      "every attempt kept the injection: nothing was replayed bare"
    );
  });
}

test("a refusal that does not name the request contract is not replayed", async () => {
  globalThis.fetch = (async (_i: RequestInfo | URL, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body ?? "{}")) as Body);
    return new Response(JSON.stringify({ error: { message: "forbidden for another reason" } }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  bodies = [];
  const response = await run(titleBody());
  assert.equal(response.status, 403);
  assert.equal(bodies.length, 1);
});

test("tools declared by the client are never removed, even for a title prompt", async () => {
  installUpstream(measuredRule);
  const body = titleBody();
  body.tools = [{ type: "function", function: { name: "read", parameters: { type: "object" } } }];
  const response = await run(body);
  assert.equal(
    response.status,
    403,
    "the upstream refuses this shape and we do not second-guess it"
  );
  assert.equal(bodies.length, 1, "no replay: the injection was not ours");
  assert.equal(toolCount(bodies[0]), 1, "the client's tool list went out untouched");
});

const shapesOf = (from: number): string[] =>
  bodies.slice(from).map((b) => (toolCount(b) > 0 ? "tools" : "bare"));

test("the shape that worked is remembered: the next identical request goes out bare at once", async () => {
  installUpstream(measuredRule);
  assert.equal((await run(titleBody())).status, 200);
  assert.deepEqual(shapesOf(0), ["tools", "bare"]);
  assert.equal((await run(titleBody())).status, 200);
  assert.deepEqual(shapesOf(2), ["bare"], "no refusal to pay for the second time");
});

test("a remembered bare shape that the upstream stops accepting is replayed with tools and forgotten", async () => {
  installUpstream(measuredRule);
  await run(titleBody());
  installUpstream(invertedRule);
  assert.equal((await run(titleBody())).status, 200);
  assert.deepEqual(shapesOf(0), ["bare", "tools"], "bare refused, replayed with tools");
  assert.equal((await run(titleBody())).status, 200);
  assert.deepEqual(shapesOf(2), ["tools"], "the memory was dropped: tools go out first again");
});

test("an empty prompt is an ordinary class: it is remembered like any other", async () => {
  installUpstream((body) => (toolCount(body) === 0 ? 200 : 403));
  const empty = (): Body => ({ model: MODEL, messages: [{ role: "user", content: "hello" }] });
  assert.equal((await run(empty())).status, 200);
  assert.deepEqual(shapesOf(0), ["tools", "bare"]);
  assert.equal((await run(empty())).status, 200);
  assert.deepEqual(shapesOf(2), ["bare"]);
});

test("the Responses surface takes the same path: the prompt travels as `instructions`", async () => {
  installUpstream(measuredRule);
  const body = (): Body => ({
    model: "muse-spark-1.3-contributor-free",
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] }],
    instructions: TITLE_PROMPT,
  });
  assert.equal((await run(body())).status, 200);
  assert.deepEqual(shapesOf(0), ["tools", "bare"]);
  assert.equal((await run(body())).status, 200);
  assert.deepEqual(shapesOf(2), ["bare"]);
});

test("a distinct prompt is a distinct class: the memory does not leak across prompts", async () => {
  installUpstream(measuredRule);
  await run(titleBody(TITLE_PROMPT));
  const from = bodies.length;
  await run(titleBody(`${TITLE_PROMPT}\n- Another wording`));
  assert.deepEqual(shapesOf(from), ["tools", "bare"], "a new prompt starts from the default");
});

test("the memory is bounded: the oldest class is forgotten after 64 others", async () => {
  installUpstream(measuredRule);
  const prompt = (i: number) => `${TITLE_PROMPT}\n- Variant ${i}`;
  for (let i = 1; i <= 65; i++) await run(titleBody(prompt(i)));
  let from = bodies.length;
  await run(titleBody(prompt(65)));
  assert.deepEqual(shapesOf(from), ["bare"], "the newest is still remembered");
  from = bodies.length;
  await run(titleBody(prompt(1)));
  assert.deepEqual(shapesOf(from), ["tools", "bare"], "the oldest was evicted");
});

test("two identical requests in flight both succeed and leave one shared memory", async () => {
  installUpstream(measuredRule);
  const [a, b] = await Promise.all([run(titleBody()), run(titleBody())]);
  assert.equal(a.status, 200);
  assert.equal(b.status, 200);
  const from = bodies.length;
  await run(titleBody());
  assert.deepEqual(shapesOf(from), ["bare"]);
});

test("when both shapes are refused the refusal is returned and further replays pause for a minute", async () => {
  let now = 1_000_000;
  _setShapeClockForTests(() => now);
  installUpstream(() => 403);
  const first = await run(titleBody());
  assert.equal(first.status, 403);
  assert.match(await first.text(), /FreeTierError/, "the upstream verdict is returned as it came");
  assert.equal(bodies.length, 2, "one injection, one bare replay");

  now += 59_000;
  let from = bodies.length;
  await run(titleBody());
  assert.equal(bodies.length - from, 1, "inside the pause: no replay");

  now += 2_000;
  from = bodies.length;
  await run(titleBody());
  assert.equal(bodies.length - from, 2, "after the pause: replay allowed again");
});

test("a refusal that is rescued by the replay does not count against the learned tool names", async () => {
  installUpstream(measuredRule);
  const tools = ["read", "edit", "glob", "grep", "shell", "write"].map((name) => ({
    type: "function",
    function: { name, parameters: { type: "object" } },
  }));
  const main: Body = {
    model: MODEL,
    messages: [
      { role: "system", content: "You are a coding agent." },
      { role: "user", content: "go" },
    ],
    tools,
  };
  assert.equal((await run(main)).status, 200);
  assert.ok(getObservedToolNames("opencode-zen", MODEL), "the accepted list was learned");

  // Three different prompts: a repeated one would be sent bare from the second time on and
  // never reach the refusal path this test is about.
  for (let i = 1; i <= 3; i++) {
    const from = bodies.length;
    assert.equal((await run(titleBody(`${TITLE_PROMPT}\n- Variant ${i}`))).status, 200);
    assert.deepEqual(shapesOf(from), ["tools", "bare"], `title ${i}: refused once, then rescued`);
  }
  assert.ok(
    getObservedToolNames("opencode-zen", MODEL),
    "three rescued refusals in a row did not make the store forget a list that works"
  );
});

test("with the contract switched off nothing is injected and nothing is replayed", async () => {
  const previous = process.env.OPENCODE_FREE_TIER_REQUEST_CONTRACT;
  process.env.OPENCODE_FREE_TIER_REQUEST_CONTRACT = "off";
  try {
    installUpstream(measuredRule);
    assert.equal((await run(titleBody())).status, 200, "the bare title is what the upstream wants");
    assert.equal(bodies.length, 1);
    assert.equal(toolCount(bodies[0]), 0);
    const from = bodies.length;
    const plain = await run(titleBody("You are a coding agent."));
    assert.equal(plain.status, 403, "no injection: the refusal stands");
    assert.equal(bodies.length - from, 1, "and no replay");
  } finally {
    if (previous === undefined) delete process.env.OPENCODE_FREE_TIER_REQUEST_CONTRACT;
    else process.env.OPENCODE_FREE_TIER_REQUEST_CONTRACT = previous;
  }
});

test("a paid model and the other surface are out of scope: one send, no injection, no replay", async () => {
  installUpstream(() => 403);
  const paid = await run(titleBody(TITLE_PROMPT, "gpt-5.6-luna"));
  assert.equal(paid.status, 403);
  assert.equal(bodies.length, 1);
  assert.equal(toolCount(bodies[0]), 0);

  // Integration guard only: the surface rule itself is pinned by
  // opencode-free-tier-request-contract.test.ts (removing it fails there, not here, because
  // the go provider is also excluded as a keyed-only provider).
  const from = bodies.length;
  const go = await run(titleBody(TITLE_PROMPT, "ox-alpha-free"), { provider: "opencode-go" });
  assert.equal(go.status, 403);
  assert.equal(bodies.length - from, 1);
  assert.equal(toolCount(bodies[from]), 0);
});

// --- several accounts, each behind its own proxy -----------------------------

const FPS = ["a", "b", "c"].map((c) => c.repeat(32));
const proxyServers: net.Server[] = [];
const proxyPorts: number[] = [];

before(async () => {
  for (let i = 0; i < FPS.length; i++) {
    const server = net.createServer((socket) => socket.destroy());
    proxyServers.push(server);
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
    proxyPorts.push((server.address() as net.AddressInfo).port);
  }
});

after(() => {
  proxyServers.forEach((server) => server.close());
  resetDbInstance();
});

function multiAccountCredentials(): ProviderCredentials {
  return {
    apiKey: null,
    accessToken: null,
    connectionId: "noauth",
    providerSpecificData: {
      fingerprints: FPS,
      accountProxies: FPS.map((fingerprint, i) => ({
        fingerprint,
        proxy: { type: "http", host: "127.0.0.1", port: proxyPorts[i] },
      })),
    },
  };
}

type Health = Array<{ cooldownUntil: number; consecutiveFails: number }>;
const healthOf = (executor: OpencodeExecutor): Health =>
  (executor as unknown as { accounts: Health }).accounts;

/** Materialise the account list, then give every account a failure history to protect. */
async function warmedAccounts(): Promise<{
  executor: OpencodeExecutor;
  credentials: ProviderCredentials;
}> {
  const executor = new OpencodeExecutor("opencode-zen");
  const credentials = multiAccountCredentials();
  installUpstream(() => 200);
  const warm = await run(
    {
      model: MODEL,
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "read", parameters: { type: "object" } } }],
    },
    { executor, credentials }
  );
  await warm.body?.cancel();
  for (const account of healthOf(executor)) account.consecutiveFails = 2;
  return { executor, credentials };
}

test("several accounts: a refused title is replayed bare and no account is put on cooldown", async () => {
  const { executor, credentials } = await warmedAccounts();
  installUpstream(measuredRule);
  const response = await run(titleBody(), { executor, credentials });
  assert.equal(response.status, 200);
  assert.deepEqual(shapesOf(0), ["tools", "bare"]);
  assert.equal(seen.length, 2, "one refusal and one replay, not one send per account");
  for (const account of healthOf(executor)) {
    assert.equal(account.cooldownUntil, 0, "a refused request does not cool an account down");
  }
  assert.ok(
    healthOf(executor).filter((a) => a.consecutiveFails === 2).length >= 2,
    "at most the account that served the replay had its failure history reset"
  );
});

test("several accounts: when both shapes are refused the verdict is returned without touching account health", async () => {
  const { executor, credentials } = await warmedAccounts();
  installUpstream(() => 403);
  const response = await run(titleBody(), { executor, credentials });
  assert.equal(response.status, 403);
  assert.equal(seen.length, 2, "two sends in total: no walk across the three accounts");
  for (const account of healthOf(executor)) {
    assert.equal(account.consecutiveFails, 2, "a refusal is never counted as a success");
    assert.equal(account.cooldownUntil, 0);
  }
});

// --- abort, JSON callers, prepare without an origin, no stray rejections -------------------

test("a caller that already gave up gets no replay", async () => {
  const controller = new AbortController();
  installUpstream((_body, call) => {
    if (call === 1) controller.abort();
    return 403;
  });
  await run(titleBody(), { signal: controller.signal }).catch(() => undefined);
  assert.equal(bodies.length, 1, "the abandoned request was not sent a second time");
});

test("a JSON caller gets a JSON body from the replayed request", async () => {
  installUpstream(measuredRule);
  const response = await run(titleBody(), { stream: false });
  assert.equal(response.status, 200);
  assert.ok(
    bodies.every((b) => b.stream === true),
    "both attempts were streamed upstream"
  );
  const json = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
  assert.equal(json.choices?.[0]?.message?.content, "ok");
});

test("without an origin, preparing a request behaves exactly as before", () => {
  const body = { model: MODEL, messages: [{ role: "user", content: "hi" }] };
  const { attempt, body: out } = prepareFreeTierRequest(body, null, "zen", "opencode", MODEL);
  assert.ok(attempt);
  assert.equal(attempt.probe, false, "no replay can happen without an origin to key it on");
  assert.equal(((out as Body).tools as unknown[]).length, 1);
  noteFreeTierOutcome(attempt, false);
});

test("the first refusal is released before the replay is sent", async () => {
  const stray: unknown[] = [];
  const onStray = (reason: unknown) => stray.push(reason);
  process.on("unhandledRejection", onStray);
  try {
    installUpstream(measuredRule);
    await run(titleBody());
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(answers.length, 2);
    assert.equal(answers[0].status, 403);
    assert.equal(answers[0].bodyUsed, true, "its body was cancelled, not left hanging");
    assert.deepEqual(stray, [], "and cancelling it raised nothing");
  } finally {
    process.off("unhandledRejection", onStray);
  }
});

test("a body that is not an object is passed through: nothing to key a replay on, nothing thrown", () => {
  const { attempt, body } = prepareFreeTierRequest(
    "not an object" as never,
    null,
    "zen",
    "opencode",
    MODEL,
    undefined,
    "not an object" as never
  );
  assert.ok(attempt);
  assert.equal(attempt.probe, false, "no replay is possible without an object to key it on");
  assert.equal(body, "not an object");
});

test("a system prompt that is not text still gets its own class", () => {
  const withObject = { messages: [{ role: "system", content: { rules: ["a"] } }] };
  const otherObject = { messages: [{ role: "system", content: { rules: ["b"] } }] };
  const none = { messages: [{ role: "user", content: "hi" }] };
  const key = (b: unknown) => shapeKeyOf("opencode-zen", MODEL, b);
  assert.notEqual(key(withObject), key(none), "not the same class as no prompt at all");
  assert.notEqual(key(withObject), key(otherObject), "and not the same as another such prompt");
});

test("two requests in flight on one executor each keep their own outcome", async () => {
  installUpstream(measuredRule);
  const inner = globalThis.fetch;
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const sent = JSON.parse(String(init?.body ?? "{}")) as Body;
    if (promptOf(sent).includes("coding agent")) await gate;
    return inner(input, init);
  }) as typeof globalThis.fetch;

  const executor = new OpencodeExecutor("opencode-zen");
  const tools = ["read", "edit", "glob", "grep", "shell", "write"].map((name) => ({
    type: "function",
    function: { name, parameters: { type: "object" } },
  }));
  const slow = run(
    {
      model: MODEL,
      messages: [
        { role: "system", content: "You are a coding agent." },
        { role: "user", content: "go" },
      ],
      tools,
    },
    { executor }
  );
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(
    (await run(titleBody(), { executor })).status,
    200,
    "the quick request finishes first"
  );
  release();
  assert.equal((await slow).status, 200);
  assert.ok(
    getObservedToolNames("opencode-zen", MODEL),
    "the slow request was accepted with its own tools: they were learned, not lost to the other request"
  );
});

test("the attempt of a finished request is released with it", async () => {
  installUpstream(measuredRule);
  const body = titleBody();
  assert.equal((await run(body)).status, 200);
  assert.equal(
    attemptFor(body),
    null,
    "a body reused later must not inherit this request's attempt"
  );
});

test("a system prompt with a circular structure does not break the request", () => {
  const circular: Record<string, unknown> = { rules: [] };
  circular.self = circular;
  const body = { messages: [{ role: "system", content: circular }] };
  assert.doesNotThrow(() => shapeKeyOf("opencode-zen", MODEL, body));
});

test("an empty successful answer is not a shape refusal: no replay", async () => {
  bodies = [];
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body ?? "{}")) as Body);
    return new Response(null, { status: 200, headers: { "Content-Type": "text/event-stream" } });
  }) as typeof globalThis.fetch;
  const response = await run(titleBody());
  assert.equal(response.status, 200);
  assert.equal(bodies.length, 1);
});

test("a refusal whose body cannot be read is returned as it came, without a replay", async () => {
  bodies = [];
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body ?? "{}")) as Body);
    const refusal = new Response(REFUSAL_BODY, { status: 403 });
    refusal.clone = () => {
      throw new Error("body already consumed");
    };
    return refusal;
  }) as typeof globalThis.fetch;
  const response = await run(titleBody());
  assert.equal(response.status, 403, "the verdict reaches the caller");
  assert.equal(bodies.length, 1, "and nothing was replayed on a body we could not read");
});

test("when the replay itself fails, the error surfaces and the first refusal still counts against the borrowed names", async () => {
  const tools = ["read", "edit", "glob", "grep", "shell", "write"].map((name) => ({
    type: "function",
    function: { name, parameters: { type: "object" } },
  }));
  installUpstream(measuredRule);
  await run({
    model: MODEL,
    messages: [
      { role: "system", content: "You are a coding agent." },
      { role: "user", content: "go" },
    ],
    tools,
  });
  assert.ok(getObservedToolNames("opencode-zen", MODEL), "a list was learned");

  // The replay of every title fails on the network, so the only verdict on the borrowed names
  // is the first refusal. Three different prompts, as three refusals in a row forget the list.
  installUpstream((body) =>
    promptOf(body).includes("Never use tools") ? (toolCount(body) > 0 ? 403 : "network") : 200
  );
  for (let i = 1; i <= 3; i++) {
    await assert.rejects(
      run(titleBody(`${TITLE_PROMPT}\n- Variant ${i}`), { skipUpstreamRetry: true })
    );
  }
  assert.equal(
    getObservedToolNames("opencode-zen", MODEL),
    null,
    "three refusals in a row, none rescued: the borrowed list is forgotten"
  );
});

// The compaction request of the official client: no system prompt, no tools, and the whole
// instruction plus the serialized conversation in one user message (3 to 52 thousand characters
// were seen). By the measured rule it is a plain request, so it needs tools like any other.
const compactionBody = (size: number): Body => ({
  model: MODEL,
  messages: [
    {
      role: "user",
      content: `Create a new anchored summary from the conversation history.\n\nOutput exactly the Markdown structure shown inside <template>.\n${"x".repeat(size)}`,
    },
  ],
});

for (const size of [3_000, 60_000]) {
  test(`a compaction-shaped request (${size} characters) goes out with tools, in one send`, async () => {
    installUpstream(measuredRule);
    const response = await run(compactionBody(size));
    assert.equal(response.status, 200);
    assert.equal(bodies.length, 1, "accepted at once: nothing to replay");
    assert.ok(toolCount(bodies[0]) > 0, "it carried the tools the contract adds");
  });
}

test("what a title taught does not reach the compaction shape", async () => {
  installUpstream(measuredRule);
  assert.equal((await run(titleBody())).status, 200);
  assert.deepEqual(shapesOf(0), ["tools", "bare"], "the title class learned to go out bare");
  const from = bodies.length;
  assert.equal((await run(compactionBody(3_000))).status, 200);
  assert.deepEqual(
    shapesOf(from),
    ["tools"],
    "the compaction class is its own: tools first, one send"
  );
});
