/**
 * Requests from the OpenCode client go out in the client's own shape first, and any tool
 * OmniRoute adds carries a real parameter schema.
 *
 * Measured on 2026-10-14 against the published endpoint: a tool name the client uses that is
 * declared with an empty parameter object (`properties: {}`) is refused with 403
 * FreeTierError, while the same name with any non-empty schema passes; a title request is
 * accepted with no tools and refused once it carries the client's tools; an agent request is
 * accepted with the client's tools, with an extra placeholder or not. The fake upstream below
 * applies those rules.
 */
import { afterEach, beforeEach, test } from "node:test";
import assert from "node:assert/strict";

import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import {
  applyFreeTierRequestContract,
  mergeClientToolsWithObserved,
} from "../../open-sse/executors/opencodeFreeTierContract.ts";
import { _resetShapeMemoForTests } from "../../open-sse/executors/opencodeRequestShape.ts";
import {
  _observedSchemaCountForTests,
  _resetToolObservationForTests,
  getObservedToolParameters,
  recordAcceptedToolSchemas,
} from "../../open-sse/executors/opencodeToolObservation.ts";

const MODEL = "nemotron-3.5-lightning-free";
const CLIENT_NAMES = ["edit", "glob", "grep", "read", "shell", "write"];
const TITLE_PROMPT = "You are a title generator. You output ONLY a thread title. Nothing else.";
const AGENT_PROMPT = "You are opencode, an interactive CLI tool that helps users.";
const SESSION = "ses_ec3d536bfffew7Ah8yc0khaj7N";
const CLIENT_HEADERS = {
  "user-agent": "opencode/latest/2.0.29/cli",
  "x-opencode-client": "cli",
  "x-opencode-session": SESSION,
  "x-opencode-session-id": SESSION,
};
const READ_PARAMETERS = {
  type: "object",
  properties: { path: { type: "string" }, limit: { type: "integer" } },
  required: ["path"],
};
const REFUSAL_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "FreeTierError",
    message: "OpenCode's free tier can only be used from within OpenCode",
  },
});
const SSE_OK =
  'data: {"id":"c","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"ok"},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n';

type Body = Record<string, unknown>;
type Tool = {
  name?: string;
  parameters?: unknown;
  function?: { name?: string; parameters?: unknown };
};

const toolsOf = (body: Body): Tool[] => (Array.isArray(body.tools) ? (body.tools as Tool[]) : []);
const nameOf = (tool: Tool) => tool.name ?? tool.function?.name ?? "";
const parametersOf = (tool: Tool) =>
  (tool.parameters ?? tool.function?.parameters) as { properties?: Record<string, unknown> };
const emptySchema = (tool: Tool) => Object.keys(parametersOf(tool)?.properties ?? {}).length === 0;

function promptOf(body: Body): string {
  const messages = Array.isArray(body.messages) ? (body.messages as Body[]) : [];
  const system = messages.find((m) => m.role === "system");
  return typeof system?.content === "string" ? system.content : "";
}

/** The rules measured on 2026-10-14. */
function measured(body: Body): number {
  const tools = toolsOf(body);
  if (promptOf(body).includes("title generator")) return tools.length === 0 ? 200 : 403;
  if (tools.length === 0) return 403;
  return tools.some((t) => CLIENT_NAMES.includes(nameOf(t)) && emptySchema(t)) ? 403 : 200;
}

const originalFetch = globalThis.fetch;
let sent: Body[] = [];
let savedPlaceholders: string | undefined;

function installUpstream(rule: (body: Body) => number): void {
  sent = [];
  globalThis.fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body ?? "{}")) as Body;
    sent.push(body);
    const status = rule(body);
    return status === 200
      ? new Response(SSE_OK, { status, headers: { "Content-Type": "text/event-stream" } })
      : new Response(REFUSAL_BODY, { status, headers: { "Content-Type": "application/json" } });
  }) as typeof globalThis.fetch;
}

beforeEach(() => {
  _resetShapeMemoForTests();
  _resetToolObservationForTests();
  savedPlaceholders = process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS;
  delete process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS;
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (savedPlaceholders === undefined) delete process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS;
  else process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS = savedPlaceholders;
});

const clientTools = () =>
  CLIENT_NAMES.map((name) => ({
    type: "function",
    function: {
      name,
      description: `${name} tool`,
      parameters:
        name === "read"
          ? READ_PARAMETERS
          : { type: "object", properties: { arg: { type: "string" } } },
    },
  }));

const request = (prompt: string, tools?: unknown[]): Body => ({
  model: MODEL,
  messages: [
    { role: "system", content: prompt },
    { role: "user", content: "hello" },
  ],
  ...(tools ? { tools } : {}),
});

async function run(body: Body, clientHeaders: Record<string, string> | null): Promise<number> {
  const result = (await new OpencodeExecutor("opencode-zen").execute({
    model: MODEL,
    body,
    stream: true,
    signal: null,
    credentials: { apiKey: "k", accessToken: null, connectionId: "c" },
    clientHeaders,
    log: { debug() {}, info() {}, warn() {}, error() {} },
  } as never)) as { response: Response };
  return result.response.status;
}

test("every tool the contract adds carries a non-empty parameter schema, on both surfaces", () => {
  const chat = applyFreeTierRequestContract({ messages: [] }, "openai", ["read", "_noop"]) as Body;
  const responses = applyFreeTierRequestContract({ input: [] }, "openai-responses", [
    "read",
  ]) as Body;
  const merged = mergeClientToolsWithObserved(
    {
      messages: [],
      tools: [{ type: "function", function: { name: "glob", parameters: { type: "object" } } }],
    },
    "openai",
    "opencode",
    MODEL,
    undefined,
    ["read"]
  ) as Body;
  for (const tool of [...toolsOf(chat), ...toolsOf(responses), toolsOf(merged)[1]]) {
    assert.equal(emptySchema(tool), false, `${nameOf(tool)} went out with an empty schema`);
  }
});

test("a borrowed name reuses the schema the client last sent for it", async () => {
  installUpstream(measured);
  assert.equal(await run(request(AGENT_PROMPT, clientTools()), CLIENT_HEADERS), 200);

  // A caller without tools borrows the names the client used, with the client's own schemas.
  assert.equal(await run(request(AGENT_PROMPT), null), 200);
  const borrowed = toolsOf(sent[sent.length - 1]).find((t) => nameOf(t) === "read");
  assert.ok(borrowed, "the borrowed list carries read");
  assert.deepEqual(parametersOf(borrowed), READ_PARAMETERS);
});

test("a client title request goes out without tools and is accepted at once", async () => {
  installUpstream(measured);
  assert.equal(await run(request(AGENT_PROMPT, clientTools()), CLIENT_HEADERS), 200);
  sent = [];

  assert.equal(await run(request(TITLE_PROMPT), CLIENT_HEADERS), 200);
  assert.equal(sent.length, 1, "no refusal paid");
  assert.equal(toolsOf(sent[0]).length, 0);
  assert.equal(sent[0].stream, true);
});

test("a client request refused without tools is replayed with them, and the class remembers it", async () => {
  installUpstream(measured);
  assert.equal(await run(request(AGENT_PROMPT), CLIENT_HEADERS), 200);
  assert.deepEqual(
    sent.map((b) => toolsOf(b).length > 0),
    [false, true],
    "sent as the client wrote it, then replayed with tools"
  );

  sent = [];
  assert.equal(await run(request(AGENT_PROMPT), CLIENT_HEADERS), 200);
  assert.equal(sent.length, 1, "the second request carries tools at once");
  assert.ok(toolsOf(sent[0]).length > 0);
});

test("a client request with its own tools goes out with those tools only", async () => {
  process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS = "bash";
  installUpstream(measured);
  assert.equal(await run(request(AGENT_PROMPT, clientTools()), CLIENT_HEADERS), 200);
  assert.deepEqual(toolsOf(sent[0]).map(nameOf), CLIENT_NAMES);
});

test("another client carrying its own tools still gets the configured names appended", async () => {
  process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS = "read";
  installUpstream(() => 200);
  const own = [
    { type: "function", function: { name: "run_code", parameters: { type: "object" } } },
  ];
  await run(request(AGENT_PROMPT, own), {
    "x-claude-code-session-id": "abc",
    "user-agent": "claude-cli/1.0",
  });
  assert.deepEqual(toolsOf(sent[0]).map(nameOf), ["run_code", "read"]);
});

test("a caller whose session comes from another client keeps the tools-first order", async () => {
  installUpstream(measured);
  await run(request(TITLE_PROMPT), {
    "x-claude-code-session-id": "abc",
    "user-agent": "claude-cli/1.0",
  });
  assert.ok(toolsOf(sent[0]).length > 0, "the first attempt carried tools, as before");
});

test("the schema table is bounded and keeps no oversized schema", () => {
  const many = Array.from({ length: 100 }, (_, i) => ({
    type: "function",
    function: {
      name: `tool_${i}`,
      parameters: { type: "object", properties: { a: { type: "string" } } },
    },
  }));
  recordAcceptedToolSchemas(many);
  assert.equal(_observedSchemaCountForTests(), 64);
  const huge = {
    type: "object",
    properties: { a: { type: "string", description: "x".repeat(9000) } },
  };
  recordAcceptedToolSchemas([{ type: "function", function: { name: "huge", parameters: huge } }]);
  assert.equal(getObservedToolParameters("huge"), null);
  _resetToolObservationForTests();
  assert.equal(_observedSchemaCountForTests(), 0);
});
