import test from "node:test";
import assert from "node:assert/strict";

const { GrokCliExecutor } = await import("@omniroute/open-sse/executors/grok-cli");

// Responses clients (Codex CLI / desktop, `store: false`) replay every prior reasoning item
// with its `encrypted_content`. When a combo served an earlier turn from another Responses
// provider (codex), the blob was encrypted by OpenAI and Grok Build refuses the request:
//   400 Could not decrypt the provided encrypted_content. Ensure the value is the unmodified
//   encrypted_content from a previous response.
// so the conversation can never return to grok-cli. Probed against Grok Build: its reasoning
// ids are `rs_<uuid>` (OpenAI's are `rs_` + hex), its server-side tool reasoning is `tco_…`
// (id and blob), its own blobs replay fine (the `tco_` ones also without their id), and a
// reasoning item without `encrypted_content` is accepted (also with `summary: []`).

type JsonRecord = Record<string, unknown>;

const OPENAI_ID = "rs_0ace61e8ac94df2a016ab3bddd086487d0b29ca58423f85d49";
const GROK_ID = "rs_d50f4f10-bb85-4c1e-9a53-0e6f2d1c7b21";

function reasoning(id: string | undefined, blob: string): JsonRecord {
  const item: JsonRecord = { type: "reasoning", summary: [], encrypted_content: blob };
  if (id !== undefined) item.id = id;
  return item;
}

function transformInput(input: unknown[]): unknown[] {
  const executor = new GrokCliExecutor();
  const out = executor.transformRequest(
    "grok-4.6",
    { model: "grok-4.6", input, store: false },
    true,
    {} as never
  ) as JsonRecord;
  return out.input as unknown[];
}

const user = { role: "user", content: "hi" };
const call = { type: "function_call", call_id: "call_1", name: "exec_command", arguments: "{}" };
const callOutput = { type: "function_call_output", call_id: "call_1", output: "ok" };

test("grok-cli adds the empty summary Grok accepts when a stripped item has none", () => {
  const out = transformInput([{ type: "reasoning", id: OPENAI_ID, encrypted_content: "gAAAA" }]);

  assert.deepEqual(out, [{ type: "reasoning", id: OPENAI_ID, summary: [] }]);
});

test("grok-cli drops encrypted_content from reasoning another provider produced", () => {
  const out = transformInput([user, reasoning(OPENAI_ID, "gAAAAABo-openai"), call, callOutput]);

  assert.deepEqual(out, [
    user,
    { type: "reasoning", summary: [], id: OPENAI_ID },
    call,
    callOutput,
  ]);
});

test("grok-cli keeps Grok Build's own encrypted reasoning next to a foreign item", () => {
  const own = reasoning(GROK_ID, "U16FEQIOxM-grok");
  const out = transformInput([user, own, reasoning(OPENAI_ID, "gAAAAABo-openai"), user]);

  assert.deepEqual(out, [user, own, { type: "reasoning", summary: [], id: OPENAI_ID }, user]);
});

test("grok-cli fails closed: blobs without a Grok Build id are dropped too (review)", () => {
  // The base sanitizer deletes reasoning ids that do not start with `rs_` before the executor
  // runs, so a foreign `txo_…` item arrives without an id. Forwarding its blob is a hard 400,
  // dropping one of Grok's own blobs only loses reasoning continuity.
  const out = transformInput([
    user,
    {
      type: "reasoning",
      id: "txo_1f0c9a5e-2b7d-4e21-9d3c-5a8b7c6d4e3f",
      encrypted_content: "txo_x",
    },
    reasoning(undefined, "no-id-blob"),
  ]);

  assert.deepEqual(out, [
    user,
    { type: "reasoning", summary: [] },
    { type: "reasoning", summary: [] },
  ]);
});

test("grok-cli keeps Grok Build's own tco_ tool reasoning blob, with or without its id", () => {
  // After a server-side web search Grok emits `tco_…` reasoning whose blob starts with `tco_`
  // too. The base sanitizer deletes the `tco_` id, and Grok accepts the id-less blob back.
  const out = transformInput([
    user,
    reasoning(
      "tco_7b1c2d3e-4f50-6172-8394-a5b6c7d8e9f0_call-0a1b2c3d-4e5f-6071-8293-a4b5c6d7e8f9-0",
      "tco_7b-a"
    ),
    reasoning(undefined, "tco_7b-b"),
  ]);

  assert.deepEqual(out, [
    user,
    { type: "reasoning", summary: [], encrypted_content: "tco_7b-a" },
    { type: "reasoning", summary: [], encrypted_content: "tco_7b-b" },
  ]);
});

test("grok-cli leaves reasoning without an encrypted blob untouched", () => {
  const input = [
    user,
    { type: "reasoning", id: OPENAI_ID, summary: [{ type: "summary_text", text: "plan" }] },
    { type: "reasoning", content: [{ type: "reasoning_text", text: "plaintext" }], summary: [] },
  ];

  assert.deepEqual(transformInput(input), input);
});

test("grok-cli does not mutate the caller's input (combo fallback reuses it)", () => {
  const input = [user, reasoning(OPENAI_ID, "gAAAAABo-openai")];
  const snapshot = structuredClone(input);

  transformInput(input);

  assert.deepEqual(input, snapshot);
});
