// tests/unit/tool-disclosure.test.ts
// Opt-in relevance-based tool disclosure: BM25 picks the client tools most relevant to the
// current user turn before the provider tool cap runs. Disabled (the default) the request
// is untouched.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-tool-disclosure-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { applyToolDisclosure, resolveToolDisclosureConfig, _resetToolDisclosureIndexCache } =
  await import("../../open-sse/utils/toolDisclosure.ts");
const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Tool = Record<string, unknown>;

const FILLER_TOPICS = [
  ["weather_forecast", "Get the weather forecast for a city"],
  ["calendar_create_event", "Create a calendar event with attendees"],
  ["send_email", "Send an email message to a recipient"],
  ["read_file", "Read a file from the local filesystem"],
  ["write_file", "Write content into a local file"],
  ["search_web", "Search the web for pages matching a query"],
  ["translate_text", "Translate text between human languages"],
  ["convert_currency", "Convert an amount between currencies"],
  ["list_processes", "List running operating system processes"],
  ["query_database", "Run a SQL query against the analytics database"],
];

function openAiTool(name: string, description: string): Tool {
  return {
    type: "function",
    function: { name, description, parameters: { type: "object", properties: { input: {} } } },
  };
}

function buildOpenAiTools(count: number): Tool[] {
  const tools: Tool[] = [];
  for (let i = 0; tools.length < count - 1; i++) {
    const [name, desc] = FILLER_TOPICS[i % FILLER_TOPICS.length];
    tools.push(openAiTool(`mcp__misc${Math.floor(i / FILLER_TOPICS.length)}__${name}`, desc));
  }
  // The relevant tool sits LAST so array-order truncation would drop it.
  tools.push(
    openAiTool(
      "mcp__github__create_pull_request",
      "Open a new pull request on a GitHub repository from a branch"
    )
  );
  return tools;
}

function toolName(tool: Tool): string {
  const fn = tool.function as Record<string, unknown> | undefined;
  return String(tool.name ?? fn?.name);
}

const ENABLED = { enabled: true, maxTools: 5, alwaysInclude: [] as string[] };

test("keeps the most relevant tool within maxTools instead of the first tools in order", () => {
  _resetToolDisclosureIndexCache();
  const tools = buildOpenAiTools(40);
  const body = {
    messages: [{ role: "user", content: "please open a pull request on github for my branch" }],
    tools,
  };
  const result = applyToolDisclosure(body, ENABLED);
  const kept = result.body.tools as Tool[];
  assert.equal(kept.length, 5);
  assert.ok(kept.map(toolName).includes("mcp__github__create_pull_request"));
  assert.equal(result.stats?.before, 40);
  assert.equal(result.stats?.after, 5);
  // Kept tools stay in their original relative order (prompt-cache friendlier).
  const indices = kept.map((t) => tools.indexOf(t));
  assert.deepEqual(
    indices,
    [...indices].sort((a, b) => a - b)
  );
  // The source body is never mutated.
  assert.equal(body.tools.length, 40);
});

test("a tool called earlier in the conversation is always kept even with zero score", () => {
  const tools = buildOpenAiTools(40);
  const body = {
    messages: [
      { role: "user", content: "convert currency" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "c1", type: "function", function: { name: "mcp__misc2__list_processes" } },
        ],
      },
      { role: "tool", tool_call_id: "c1", content: "[]" },
      { role: "user", content: "now open a pull request on github" },
    ],
    tools,
  };
  const kept = (applyToolDisclosure(body, ENABLED).body.tools as Tool[]).map(toolName);
  assert.ok(kept.includes("mcp__misc2__list_processes"));
  assert.ok(kept.includes("mcp__github__create_pull_request"));
  assert.equal(kept.length, 5);
});

test("Claude tool_use history pins the tool (with the OAuth prefix normalized)", () => {
  const tools = buildOpenAiTools(40).map((t) => {
    const fn = t.function as Record<string, unknown>;
    return { name: `proxy_${fn.name}`, description: fn.description, input_schema: fn.parameters };
  });
  const body = {
    messages: [
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "t1", name: "mcp__misc1__read_file", input: {} }],
      },
      { role: "user", content: [{ type: "tool_result", tool_use_id: "t1", content: "ok" }] },
    ],
    tools,
  };
  const rawBody = {
    messages: [{ role: "user", content: "open a pull request on github" }, ...body.messages],
  };
  const kept = (
    applyToolDisclosure(body, ENABLED, { rawBody, toolNamePrefix: "proxy_" }).body.tools as Tool[]
  ).map(toolName);
  assert.ok(kept.includes("proxy_mcp__misc1__read_file"));
  assert.ok(kept.includes("proxy_mcp__github__create_pull_request"));
});

test("a forced tool_choice tool is kept", () => {
  const tools = buildOpenAiTools(40);
  const body = {
    messages: [{ role: "user", content: "open a pull request on github" }],
    tools,
    tool_choice: { type: "function", function: { name: "mcp__misc0__weather_forecast" } },
  };
  const kept = (applyToolDisclosure(body, ENABLED).body.tools as Tool[]).map(toolName);
  assert.ok(kept.includes("mcp__misc0__weather_forecast"));
  assert.ok(kept.includes("mcp__github__create_pull_request"));
});

test("alwaysInclude, ToolSearch, unnamed hosted tools and caller pins survive", () => {
  const tools: Tool[] = [
    ...buildOpenAiTools(30),
    { type: "web_search_preview" },
    openAiTool("ToolSearch", "Search deferred tool schemas"),
    openAiTool("omniroute_web_fetch", "Fetch a URL"),
  ];
  const body = { messages: [{ role: "user", content: "open a pull request on github" }], tools };
  const kept = applyToolDisclosure(
    body,
    { enabled: true, maxTools: 6, alwaysInclude: ["mcp__misc0__send_email"] },
    { isPinnedTool: (tool) => toolName(tool as Tool) === "omniroute_web_fetch" }
  ).body.tools as Tool[];
  const names = kept.map(toolName);
  assert.ok(kept.some((t) => t.type === "web_search_preview"));
  assert.ok(names.includes("ToolSearch"));
  assert.ok(names.includes("omniroute_web_fetch"));
  assert.ok(names.includes("mcp__misc0__send_email"));
  assert.ok(names.includes("mcp__github__create_pull_request"));
  assert.equal(kept.length, 6);
});

test("disabled, missing or under-limit config returns the body by reference", () => {
  const tools = buildOpenAiTools(40);
  const body = { messages: [{ role: "user", content: "open a pull request" }], tools };
  assert.equal(applyToolDisclosure(body, null).body, body);
  assert.equal(applyToolDisclosure(body, { ...ENABLED, enabled: false }).body, body);
  assert.equal(applyToolDisclosure(body, { ...ENABLED, maxTools: 40 }).body, body);
  assert.equal(applyToolDisclosure(body, ENABLED).body === body, false);
});

test("Claude-shape tools: only the last kept tool carries the cache_control anchor", () => {
  const tools = buildOpenAiTools(40).map((t) => {
    const fn = t.function as Record<string, unknown>;
    return { name: fn.name, description: fn.description, input_schema: fn.parameters } as Tool;
  });
  // The translator anchors the final tool; the relevant tool is last, so move the anchor
  // to a filler tool to make sure the anchored tool is dropped.
  const anchored = { ...tools[38], cache_control: { type: "ephemeral", ttl: "1h" } };
  tools[38] = anchored;
  const body = { messages: [{ role: "user", content: "open a pull request on github" }], tools };
  const kept = applyToolDisclosure(body, ENABLED).body.tools as Tool[];
  const withAnchor = kept.filter((t) => t.cache_control !== undefined);
  assert.equal(withAnchor.length, 1);
  assert.equal(withAnchor[0], kept[kept.length - 1]);
  assert.deepEqual(kept[kept.length - 1].cache_control, { type: "ephemeral", ttl: "1h" });
  // Shared tool objects are cloned, never mutated.
  assert.deepEqual(anchored.cache_control, { type: "ephemeral", ttl: "1h" });
  for (const tool of tools) {
    if (tool !== anchored) assert.equal(tool.cache_control, undefined);
  }
});

test("Responses-shape bodies use the input items for the query and the history pins", () => {
  const tools = buildOpenAiTools(40).map((t) => {
    const fn = t.function as Record<string, unknown>;
    return { type: "function", name: fn.name, description: fn.description };
  });
  const body = {
    input: [
      { type: "function_call", call_id: "x", name: "mcp__misc3__translate_text", arguments: "{}" },
      { type: "function_call_output", call_id: "x", output: "ok" },
      { role: "user", content: [{ type: "input_text", text: "open a pull request on github" }] },
    ],
    tools,
  };
  const kept = (applyToolDisclosure(body, ENABLED).body.tools as Tool[]).map(toolName);
  assert.ok(kept.includes("mcp__misc3__translate_text"));
  assert.ok(kept.includes("mcp__github__create_pull_request"));
});

test("resolveToolDisclosureConfig is off by default and clamps operator input", () => {
  assert.equal(resolveToolDisclosureConfig(null), null);
  assert.equal(resolveToolDisclosureConfig({}), null);
  assert.equal(resolveToolDisclosureConfig({ toolDisclosure: { enabled: false } }), null);
  assert.deepEqual(resolveToolDisclosureConfig({ toolDisclosure: { enabled: true } }), {
    enabled: true,
    maxTools: 20,
    alwaysInclude: [],
  });
  assert.deepEqual(
    resolveToolDisclosureConfig({
      toolDisclosure: { enabled: true, maxTools: 7.9, alwaysInclude: ["a", 3, "", "b"] },
    }),
    { enabled: true, maxTools: 7, alwaysInclude: ["a", "b"] }
  );
});

test("the settings schema accepts the toolDisclosure block and rejects bad values", () => {
  assert.equal(
    updateSettingsSchema.safeParse({
      toolDisclosure: { enabled: true, maxTools: 25, alwaysInclude: ["ToolSearch"] },
    }).success,
    true
  );
  assert.equal(
    updateSettingsSchema.safeParse({ toolDisclosure: { enabled: true, maxTools: 0 } }).success,
    false
  );
  assert.equal(
    updateSettingsSchema.safeParse({ toolDisclosure: { enabled: true, unknown: 1 } }).success,
    false
  );
});

test("prepareUpstreamBody applies disclosure before the provider cap only when configured", async () => {
  const tools = buildOpenAiTools(40);
  const translatedBody = {
    model: "gpt-4o",
    messages: [{ role: "user", content: "open a pull request on github" }],
    tools,
  };
  const baseOpts = {
    translatedBody,
    modelToCall: "gpt-4o",
    provider: "openai",
    targetFormat: FORMATS.OPENAI,
    credentials: { apiKey: "sk-test" },
  };
  const off = await prepareUpstreamBody(baseOpts);
  assert.equal((off.tools as Tool[]).length, 40);
  assert.deepEqual((off.tools as Tool[]).map(toolName), tools.map(toolName));

  const on = await prepareUpstreamBody({ ...baseOpts, toolDisclosure: ENABLED });
  const kept = (on.tools as Tool[]).map(toolName);
  assert.equal(kept.length, 5);
  assert.ok(kept.includes("mcp__github__create_pull_request"));
  assert.equal(translatedBody.tools.length, 40);
});

// ── Safety rails + optional conservative mode ───────────────────────────────

test("fail-open: a tool that throws while being read returns the body untouched", () => {
  const tools = buildOpenAiTools(40);
  const poisoned: Tool = {};
  Object.defineProperty(poisoned, "name", {
    enumerable: true,
    get() {
      throw new Error("boom");
    },
  });
  tools.splice(3, 0, poisoned);
  const body = { messages: [{ role: "user", content: "open a pull request on github" }], tools };
  const errors: unknown[] = [];
  const result = applyToolDisclosure(body, ENABLED, { onError: (err) => errors.push(err) });
  assert.equal(result.body, body);
  assert.equal(result.stats, null);
  assert.equal(errors.length, 1);
  assert.equal(body.tools.length, 41);
});

test("a tool whose name appears in the user turn is kept even with a zero score", () => {
  const tools = [...buildOpenAiTools(40), openAiTool("b_c", "gamma frobnicate")];
  const body = {
    messages: [
      { role: "user", content: "load the b_c config, then open a pull request on github" },
    ],
    tools,
  };
  const kept = (applyToolDisclosure(body, ENABLED).body.tools as Tool[]).map(toolName);
  assert.ok(kept.includes("b_c"));
  assert.ok(kept.includes("mcp__github__create_pull_request"));
  assert.equal(kept.length, 5);

  // Only a whole-name match pins: "xb_cx" must not pin "b_c".
  const partial = {
    messages: [{ role: "user", content: "load xb_cx, then open a pull request on github" }],
    tools,
  };
  const partialKept = (applyToolDisclosure(partial, ENABLED).body.tools as Tool[]).map(toolName);
  assert.equal(partialKept.includes("b_c"), false);
});

const ZERO = {
  enabled: true,
  maxTools: 20,
  alwaysInclude: [] as string[],
  mode: "zeroOverlap" as const,
  minTools: 16,
  keepRatio: 0.5,
  dropCap: 0.4,
};
const relTool = (i: number): Tool => ({
  name: `RunTask${i}`,
  description: "run project build commands via shell server deploy",
});
const irrelTool = (i: number): Tool => ({
  name: `ZoneTask${i}`,
  description: "quantum zigzag widget frobnicate",
});
const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const SHELL_MSGS = [
  {
    role: "user",
    content: [{ type: "text", text: "please use the shell to run project build commands" }],
  },
];
const FRUIT_MSGS = [{ role: "user", content: "zebra mango pineapple upside down cake" }];

test("zeroOverlap mode drops only zero-overlap tools and keeps the original order", () => {
  const tools = [...range(16).map(relTool), irrelTool(0), irrelTool(1)];
  const result = applyToolDisclosure({ messages: SHELL_MSGS, tools }, ZERO);
  const kept = result.body.tools as Tool[];
  assert.deepEqual(
    kept.map(toolName),
    range(16).map((i) => `RunTask${i}`)
  );
  assert.deepEqual([...(result.stats?.dropped ?? [])].sort(), ["ZoneTask0", "ZoneTask1"]);
  assert.equal(result.stats?.before, 18);
  assert.equal(result.stats?.after, 16);
});

test("zeroOverlap mode honors the keep floor and the drop cap, largest tools first", () => {
  const twenty = range(20).map(irrelTool);
  const floor = applyToolDisclosure({ messages: FRUIT_MSGS, tools: twenty }, ZERO);
  assert.equal((floor.body.tools as Tool[]).length, 12);
  assert.equal(floor.stats?.dropped.length, 8);

  const thirty = range(30).map(irrelTool);
  const cap = applyToolDisclosure({ messages: FRUIT_MSGS, tools: thirty }, ZERO);
  assert.equal((cap.body.tools as Tool[]).length, 18);
  assert.equal(cap.stats?.dropped.length, 12);

  // The biggest zero-overlap definitions go first.
  const sized = range(20).map((i) =>
    i < 8 ? { ...irrelTool(i), description: `${"frobnicate ".repeat(20)}quantum` } : irrelTool(i)
  );
  const bySize = applyToolDisclosure({ messages: FRUIT_MSGS, tools: sized }, ZERO);
  assert.deepEqual(
    [...(bySize.stats?.dropped ?? [])].sort(),
    range(8)
      .map((i) => `ZoneTask${i}`)
      .sort()
  );
});

test("zeroOverlap mode leaves small tool sets and empty queries alone", () => {
  const small = { messages: FRUIT_MSGS, tools: range(15).map(irrelTool) };
  assert.equal(applyToolDisclosure(small, ZERO).body, small);
  const tools = range(20).map(irrelTool);
  for (const messages of [[], [{ role: "user" }], [{ role: "user", content: "" }]]) {
    const body = { messages, tools };
    assert.equal(applyToolDisclosure(body, ZERO).body, body);
  }
});

test("zeroOverlap mode keeps pinned and name-mentioned tools", () => {
  const tools = range(20).map(irrelTool);
  const body = {
    messages: [{ role: "user", content: "zebra mango cake, maybe ZoneTask5 later" }],
    tools,
    tool_choice: { type: "tool", name: "ZoneTask9" },
  };
  const result = applyToolDisclosure(body, ZERO);
  const kept = (result.body.tools as Tool[]).map(toolName);
  assert.ok(kept.includes("ZoneTask5"));
  assert.ok(kept.includes("ZoneTask9"));
  assert.equal(result.stats?.dropped.includes("ZoneTask5"), false);
  assert.equal(result.stats?.dropped.length, 8);
});

test("resolveToolDisclosureConfig adds zeroOverlap defaults only when that mode is chosen", () => {
  assert.deepEqual(
    resolveToolDisclosureConfig({ toolDisclosure: { enabled: true, mode: "zeroOverlap" } }),
    { ...ZERO }
  );
  assert.deepEqual(
    resolveToolDisclosureConfig({
      toolDisclosure: {
        enabled: true,
        mode: "zeroOverlap",
        minTools: 4.7,
        keepRatio: 2,
        dropCap: -1,
      },
    }),
    { ...ZERO, minTools: 4, keepRatio: 1, dropCap: 0 }
  );
  const topK = resolveToolDisclosureConfig({ toolDisclosure: { enabled: true, mode: "topK" } });
  assert.equal(topK?.mode, undefined);
});

test("the settings schema accepts the zeroOverlap knobs and rejects bad ones", () => {
  assert.equal(
    updateSettingsSchema.safeParse({
      toolDisclosure: {
        enabled: true,
        mode: "zeroOverlap",
        minTools: 16,
        keepRatio: 0.5,
        dropCap: 0.4,
      },
    }).success,
    true
  );
  assert.equal(
    updateSettingsSchema.safeParse({ toolDisclosure: { enabled: true, mode: "bogus" } }).success,
    false
  );
  assert.equal(
    updateSettingsSchema.safeParse({ toolDisclosure: { enabled: true, keepRatio: 1.5 } }).success,
    false
  );
});
