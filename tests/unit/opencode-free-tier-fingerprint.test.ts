/**
 * OpenCode Zen free-tier client fingerprint.
 *
 * The upstream gate inspects tool names and casing. Measured live against
 * https://opencode.ai/zen/v1 on 2026-10-02, and independently confirmed by @espokaos-ops
 * on 2026-10-03 (121 probe records across 9 gated free models, #15322):
 *
 *   no tools ................................ 403 FreeTierError (9/9 models)
 *   `_noop` placeholder only ................ 403 FreeTierError (9/9 models)
 *   one client tool only .................... 403 FreeTierError (9/9 models)
 *   `Bash + Read` (wrong case) .............. 403 FreeTierError (9/9 models)
 *   `bash` only / `read` only ............... 403 FreeTierError (4/9 models)
 *   `bash` + `glob` (incomplete) ............ 403 FreeTierError (3/9 models)
 *   bash + read (minimal pair) .............. 200 (9/9 models)
 *   bash + glob + grep + read (quartet) ..... 200 (9/9 models)
 *
 * The production constant `OPENCODE_FINGERPRINT_TOOLS` keeps the quartet as a conservative
 * safety margin closer to the real client's fingerprint.
 *
 * Order is irrelevant, extra tools alongside the quartet are accepted, and a client that
 * spells a member differently (`Bash`, `Read`) must be renamed rather than duplicated:
 * sending both spellings passes only because the canonical one is present. These tests pin
 * that behaviour and the response-side restoration that gives the caller its own spelling
 * back.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  OPENCODE_FINGERPRINT_TOOLS,
  OPENCODE_MEASURED_MINIMUM_FINGERPRINT_TOOLS,
  concealFingerprintToolNames,
  fingerprintPlaceholderTool,
  fingerprintToolKey,
  recordRenamedToolNames,
  renamedToolNamesFor,
  restoreFingerprintToolNames,
  restoreToolNames,
  retargetToolChoice,
} from "../../open-sse/utils/opencodeFingerprint.ts";
import {
  applyFreeTierRequestContract,
  isGatedFreeTierRequest,
  restoreFingerprintNames,
} from "../../open-sse/executors/opencodeFreeTierContract.ts";
import { forwardOpencodeClientHeaders } from "../../open-sse/utils/opencodeHeaders.ts";

const chatTool = (name: string) => ({
  type: "function",
  function: { name, description: `${name} desc`, parameters: { type: "object" } },
});
const flatTool = (name: string) => ({
  type: "function",
  name,
  description: `${name} desc`,
  parameters: { type: "object" },
});

type ChatTool = { type: string; function: { name: string } };
type FlatTool = { type: string; name: string };

const namesOf = (tools: unknown): string[] => (tools as ChatTool[]).map((t) => t.function.name);
const flatNamesOf = (tools: unknown): string[] => (tools as FlatTool[]).map((t) => t.name);

test("the required fingerprint set is exactly the lowercase file-search quartet", () => {
  assert.deepEqual(OPENCODE_FINGERPRINT_TOOLS, ["bash", "glob", "grep", "read"]);
});

test("the measured minimum passing combination is {bash, read} as verified on 2026-10-03 (#15322)", () => {
  assert.deepEqual(OPENCODE_MEASURED_MINIMUM_FINGERPRINT_TOOLS, ["bash", "read"]);
  // The quartet kept in production is a superset of the measured minimum:
  for (const minMember of OPENCODE_MEASURED_MINIMUM_FINGERPRINT_TOOLS) {
    assert.ok(
      OPENCODE_FINGERPRINT_TOOLS.includes(minMember),
      `quartet must contain measured minimum member ${minMember}`
    );
  }
});

test("fingerprintToolKey recognises quartet members case-insensitively and nothing else", () => {
  assert.equal(fingerprintToolKey("bash"), "bash");
  assert.equal(fingerprintToolKey("BASH"), "bash");
  assert.equal(fingerprintToolKey("  Read  "), "read");
  assert.equal(fingerprintToolKey("Glob"), "glob");
  assert.equal(fingerprintToolKey("my_custom_tool"), "");
  assert.equal(fingerprintToolKey(""), "");
  assert.equal(fingerprintToolKey(undefined), "");
  assert.equal(fingerprintToolKey("bash2"), "");
});

test("concealFingerprintToolNames renames case variants and keeps the caller's schema", () => {
  const tools = [chatTool("Bash"), chatTool("Read")];
  const { tools: out, map } = concealFingerprintToolNames(tools);
  assert.deepEqual(namesOf(out), ["bash", "read"]);
  // The rename map is what lets the response hand `Bash` back to the caller.
  assert.deepEqual(
    [...map.entries()],
    [
      ["bash", "Bash"],
      ["read", "Read"],
    ]
  );
  // Schema and description survive the rename: only the name changes.
  const renamed = (out as ChatTool[])[0] as unknown as {
    function: { description: string; parameters: unknown };
  };
  assert.equal(renamed.function.description, "Bash desc");
  assert.deepEqual(renamed.function.parameters, { type: "object" });
});

test("concealFingerprintToolNames handles the flat Responses shape", () => {
  const { tools: out, map } = concealFingerprintToolNames([flatTool("Glob")]);
  assert.deepEqual(flatNamesOf(out), ["glob"]);
  assert.deepEqual([...map.entries()], [["glob", "Glob"]]);
});

test("concealFingerprintToolNames drops duplicate quartet declarations", () => {
  // `Bash` + `bash` in one body is a duplicate declaration of the same quartet member.
  const { tools: out, map } = concealFingerprintToolNames([chatTool("Bash"), chatTool("bash")]);
  assert.deepEqual(namesOf(out), ["bash"]);
  assert.deepEqual([...map.entries()], [["bash", "Bash"]]);
});

test("concealFingerprintToolNames leaves non-quartet tools and the array identity alone", () => {
  const tools = [chatTool("my_custom_tool"), chatTool("webfetch")];
  const { tools: out, map } = concealFingerprintToolNames(tools);
  assert.equal(out, tools, "nothing to rename must not rebuild the array");
  assert.equal(map.size, 0);
});

test("concealFingerprintToolNames preserves a quartet member that is already canonical", () => {
  const tools = [chatTool("bash"), chatTool("read")];
  const { tools: out, map } = concealFingerprintToolNames(tools);
  assert.equal(out, tools, "canonical spelling is already correct");
  assert.equal(map.size, 0);
});

test("the contract completes an incomplete quartet", () => {
  const body = prepare({
    messages: [],
    tools: [chatTool("bash"), chatTool("glob")],
  });
  assert.deepEqual(namesOf(body.tools), ["bash", "glob", "grep", "read"]);
});

test("the contract adds nothing when the quartet is already complete", () => {
  const complete = OPENCODE_FINGERPRINT_TOOLS.map(chatTool);
  const body = prepare({ messages: [], tools: complete });
  assert.deepEqual(namesOf(body.tools), ["bash", "glob", "grep", "read"]);
});

test("the contract uses the flat shape on the Responses surface", () => {
  const body = prepare({ input: [] }, "openai-responses");
  assert.deepEqual(flatNamesOf(body.tools), ["bash", "glob", "grep", "read"]);
  assert.equal((body.tools as FlatTool[])[0].type, "function");
  // Flat shape: the name is a sibling of `type`, not nested under `function`.
  assert.equal("function" in (body.tools as object[])[0], false);
});

test("retargetToolChoice points a renamed member's explicit choice at the sent name", () => {
  const map = new Map([["bash", "Bash"]]);
  const nested = { tool_choice: { type: "function", function: { name: "Bash" } } };
  retargetToolChoice(nested, map);
  assert.deepEqual(nested.tool_choice, { type: "function", function: { name: "bash" } });

  const flat = { tool_choice: { type: "function", name: "Bash" } };
  retargetToolChoice(flat, map);
  assert.deepEqual(flat.tool_choice, { type: "function", name: "bash" });
});

test("retargetToolChoice leaves a choice the map does not mention untouched", () => {
  const body = { tool_choice: { type: "function", function: { name: "my_custom_tool" } } };
  const before = structuredClone(body);
  retargetToolChoice(body, new Map([["bash", "Bash"]]));
  assert.deepEqual(body, before);
});

test("retargetToolChoice tolerates a string choice and an empty map", () => {
  const body: Record<string, unknown> = { tool_choice: "auto" };
  retargetToolChoice(body, new Map([["bash", "Bash"]]));
  assert.equal(body.tool_choice, "auto");
  const other: Record<string, unknown> = { tool_choice: 42 };
  retargetToolChoice(other, new Map());
  assert.equal(other.tool_choice, 42);
});

test("fingerprintPlaceholderTool stamps the sentinel description and an empty schema", () => {
  const flat = fingerprintPlaceholderTool("bash", true);
  assert.equal(flat.type, "function");
  assert.equal(flat.name, "bash");
  assert.deepEqual(flat.parameters, { type: "object", properties: {} });
  assert.match(String(flat.description), /never be invoked/i);

  const nested = fingerprintPlaceholderTool("bash", false) as {
    function: { name: string; parameters: unknown };
  };
  assert.equal(nested.function.name, "bash");
  assert.deepEqual(nested.function.parameters, { type: "object", properties: {} });
});

// ── End to end through the production request path ────────────────────────────────────

/** The request-side pass the executor actually runs, via the free-tier contract. */
function prepare(body: Record<string, unknown>, format = "openai", model = "big-pickle") {
  return applyFreeTierRequestContract({ ...body, model }, format) as Record<string, unknown>;
}

test("a gated request is canonicalised, completed and records the renames", () => {
  const body = prepare({
    messages: [{ role: "user", content: "hi" }],
    tools: [chatTool("Bash"), chatTool("my_custom_tool")],
  });
  assert.deepEqual(namesOf(body.tools), ["bash", "my_custom_tool", "glob", "grep", "read"]);
  assert.deepEqual([...renamedToolNamesFor(body)!.entries()], [["bash", "Bash"]]);
});

test("an explicit tool_choice naming a renamed member follows the rename", () => {
  // Otherwise the request would name a tool it no longer declares.
  const body = prepare({
    messages: [{ role: "user", content: "hi" }],
    tools: [chatTool("Bash")],
    tool_choice: { type: "function", function: { name: "Bash" } },
  });
  assert.deepEqual(body.tool_choice, { type: "function", function: { name: "bash" } });
});

test("tool_choice is never imposed on a chat request", () => {
  // The upstream answers 400 `only "auto" is supported for tool_choice` (measured
  // 2026-09-18), so a default must not be added on this surface.
  const body = prepare({ messages: [{ role: "user", content: "hi" }] });
  assert.equal("tool_choice" in body, false);
});

test("applying the production pass twice does not duplicate the quartet", () => {
  const once = prepare({ messages: [], tools: [chatTool("Bash")] });
  const twice = prepare(once);
  assert.deepEqual(namesOf(twice.tools), ["bash", "glob", "grep", "read"]);
});

// ── Response side: the caller gets its own spelling back ─────────────────────────────

test("restoreToolNames rewrites an OpenAI Chat Completions delta tool call", () => {
  const payload = {
    choices: [{ delta: { tool_calls: [{ function: { name: "bash", arguments: "{}" } }] } }],
  };
  const out = restoreToolNames(payload, new Map([["bash", "Bash"]])) as typeof payload;
  assert.equal(out.choices[0].delta.tool_calls[0].function.name, "Bash");
  // The arguments are untouched.
  assert.equal(out.choices[0].delta.tool_calls[0].function.arguments, "{}");
});

test("restoreToolNames rewrites an OpenAI Chat Completions JSON message tool call", () => {
  const payload = {
    choices: [{ message: { tool_calls: [{ function: { name: "read", arguments: "{}" } }] } }],
  };
  const out = restoreToolNames(payload, new Map([["read", "Read"]])) as typeof payload;
  assert.equal(out.choices[0].message.tool_calls[0].function.name, "Read");
});

test("restoreToolNames rewrites Claude streaming and JSON tool_use blocks", () => {
  const streamEvent = {
    type: "content_block_start",
    content_block: { type: "tool_use", name: "bash", input: {} },
  };
  const restored = restoreToolNames(streamEvent, new Map([["bash", "Bash"]])) as typeof streamEvent;
  assert.equal(restored.content_block.name, "Bash");

  const message = {
    content: [
      { type: "tool_use", name: "glob", input: {} },
      { type: "text", text: "hi" },
    ],
  };
  const restoredMessage = restoreToolNames(message, new Map([["glob", "Glob"]])) as typeof message;
  assert.equal(restoredMessage.content[0].name, "Glob");
  assert.equal(restoredMessage.content[1].type, "text");
});

test("restoreToolNames rewrites OpenAI Responses output items and SSE item events", () => {
  const body = { output: [{ type: "function_call", name: "read", call_id: "c1" }] };
  const restored = restoreToolNames(body, new Map([["read", "Read"]])) as typeof body;
  assert.equal(restored.output[0].name, "Read");

  const event = {
    type: "response.output_item.added",
    item: { type: "function_call", name: "grep" },
  };
  const restoredEvent = restoreToolNames(event, new Map([["grep", "Grep"]])) as typeof event;
  assert.equal(restoredEvent.item.name, "Grep");
});

test("restoreToolNames keeps identity when nothing matches, so serialisation can be skipped", () => {
  const payload = { choices: [{ message: { tool_calls: [{ function: { name: "other" } }] } }] };
  assert.equal(restoreToolNames(payload, new Map([["bash", "Bash"]])), payload);
  assert.equal(restoreToolNames(payload, new Map()), payload);
  assert.equal(restoreToolNames("a string", new Map([["bash", "Bash"]])), "a string");
  assert.equal(restoreToolNames(null, new Map([["bash", "Bash"]])), null);
});

test("restoreFingerprintToolNames passes a response through when there is nothing to restore", () => {
  const response = new Response("{}", { headers: { "content-type": "application/json" } });
  assert.equal(restoreFingerprintToolNames(response, null), response);
  assert.equal(restoreFingerprintToolNames(response, new Map()), response);
  // A refusal has nothing to restore and the executor still needs to read its body.
  const refusal = new Response("{}", {
    status: 403,
    headers: { "content-type": "application/json" },
  });
  assert.equal(restoreFingerprintToolNames(refusal, new Map([["bash", "Bash"]])), refusal);
});

test("restoreFingerprintToolNames restores names in a streaming SSE response", async () => {
  const sse = [
    `data: ${JSON.stringify({ choices: [{ delta: { tool_calls: [{ function: { name: "bash" } }] } }] })}`,
    "",
    `data: ${JSON.stringify({ choices: [{ delta: { tool_calls: [{ function: { name: "read" } }] } }] })}`,
    "",
    "data: [DONE]",
    "",
  ].join("\n");
  const upstream = new Response(sse, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
  const restored = restoreFingerprintToolNames(
    upstream,
    new Map([
      ["bash", "Bash"],
      ["read", "Read"],
    ])
  );
  const text = await restored.text();
  assert.match(text, /"name":"Bash"/);
  assert.match(text, /"name":"Read"/);
  // A terminal line survives the pass.
  assert.match(text, /\[DONE\]/);
});

test("restoreFingerprintToolNames restores names in a JSON response", async () => {
  const upstream = new Response(
    JSON.stringify({ choices: [{ message: { tool_calls: [{ function: { name: "glob" } }] } }] }),
    { status: 200, headers: { "content-type": "application/json; charset=utf-8" } }
  );
  const restored = restoreFingerprintToolNames(upstream, new Map([["glob", "Glob"]]));
  const json = (await restored.json()) as {
    choices: Array<{ message: { tool_calls: Array<{ function: { name: string } }> } }>;
  };
  assert.equal(json.choices[0].message.tool_calls[0].function.name, "Glob");
});

test("restoreFingerprintToolNames leaves a non-JSON, non-SSE body untouched", () => {
  const upstream = new Response("plain text", {
    status: 200,
    headers: { "content-type": "text/plain" },
  });
  assert.equal(restoreFingerprintToolNames(upstream, new Map([["bash", "Bash"]])), upstream);
});

// The executor result after the release-tip rework can be a bare Response (forced-stream
// rebuild) or an `{ response }` wrapper — both must get the caller's names back (#15322).
const gluedJson = (name: string) =>
  new Response(
    JSON.stringify({ choices: [{ message: { tool_calls: [{ function: { name } }] } }] }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
const firstToolName = async (r: Response) =>
  (
    (await r.json()) as {
      choices: Array<{ message: { tool_calls: Array<{ function: { name: string } }> } }>;
    }
  ).choices[0].message.tool_calls[0].function.name;

test("restoreFingerprintNames restores a bare Response result", async () => {
  const body = { model: "big-pickle" };
  recordRenamedToolNames(body, new Map([["bash", "Bash"]]));
  const restored = restoreFingerprintNames(body, gluedJson("bash"));
  assert.equal(await firstToolName(restored), "Bash");
});

test("restoreFingerprintNames restores an { response } result and keeps its other fields", async () => {
  const body = { model: "big-pickle" };
  recordRenamedToolNames(body, new Map([["read", "Read"]]));
  const result = { response: gluedJson("read"), url: "u", headers: {} };
  const restored = restoreFingerprintNames(body, result);
  assert.notEqual(restored, result);
  assert.equal(restored.url, "u");
  assert.equal(await firstToolName(restored.response), "Read");
});

test("restoreFingerprintNames is identity when the request recorded no renames", () => {
  const response = gluedJson("bash");
  assert.equal(restoreFingerprintNames({ model: "big-pickle" }, response), response);
  const result = { response };
  assert.equal(restoreFingerprintNames({ model: "big-pickle" }, result), result);
});

// ── End to end: the contract + fingerprint together produce a gate-passing body ────────

test("a Claude Code style request is canonicalised so the gate sees the lowercase quartet", () => {
  // Claude Code declares Bash/Read/Glob/Grep with capital letters. That alone is refused,
  // and sending both spellings passes only because the canonical one is present — so the
  // request must carry the lowercase quartet.
  const body = applyFreeTierRequestContract(
    {
      model: "big-pickle",
      messages: [{ role: "user", content: "hi" }],
      tools: ["Bash", "Read", "Glob", "Grep"].map(chatTool),
    },
    "openai"
  ) as Record<string, unknown>;

  const names = namesOf(body.tools);
  for (const member of OPENCODE_FINGERPRINT_TOOLS) {
    assert.ok(names.includes(member), `quartet member ${member} must be declared`);
  }
  // Exactly one declaration per quartet member — never a capitalised duplicate.
  assert.equal(names.length, 4, `expected only the quartet, got ${names.join(",")}`);
});

test("the gated scope predicate covers the free models this fingerprint applies to", () => {
  assert.equal(isGatedFreeTierRequest("zen", "opencode", "big-pickle"), true);
  assert.equal(isGatedFreeTierRequest("zen", "opencode", "muse-spark-1.3-contributor-free"), true);
  // Paid models on the same host are not inspected upstream.
  assert.equal(isGatedFreeTierRequest("zen", "opencode", "gpt-5.6-luna"), false);
  // The /zen/go/v1 surface and other providers are out of scope.
  assert.equal(isGatedFreeTierRequest("go", "opencode-go", "grok-4.5"), false);
  assert.equal(isGatedFreeTierRequest("other", "openai", "gpt-5.6-luna"), false);
});

test("the CLI identity headers the same gate validates are still synthesized", () => {
  const headers: Record<string, string> = {};
  forwardOpencodeClientHeaders(
    headers,
    {},
    {
      synthesizeRequestId: true,
      cliDefaults: { userAgent: "opencode/1.18.31", client: "desktop", project: "global" },
    }
  );
  assert.equal(headers["User-Agent"], "opencode/1.18.31");
  assert.equal(headers["x-opencode-client"], "desktop");
  assert.equal(headers["x-opencode-project"], "global");
  assert.match(headers["x-opencode-session"], /^ses_[0-9a-f]{12}[0-9A-Za-z]{14}$/);
});
