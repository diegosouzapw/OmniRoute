import test from "node:test";
import assert from "node:assert/strict";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";
import { getCallLogById, saveCallLog } from "../../src/lib/usage/callLogs.ts";

test.after(() => {
  resetDbInstance();
});

function rowFor(id: string) {
  return getDbInstance()
    .prepare("SELECT has_content, usage_provenance FROM call_logs WHERE id = ?")
    .get(id) as { has_content: number | null; usage_provenance: string | null };
}

function cleanup(ids: string[]) {
  const stmt = getDbInstance().prepare("DELETE FROM call_logs WHERE id = ?");
  for (const id of ids) stmt.run(id);
}

test("migration exposes nullable has_content and usage_provenance columns", () => {
  const columns = getDbInstance().prepare("PRAGMA table_info(call_logs)").all() as {
    name: string;
    notnull: number;
    dflt_value: unknown;
  }[];
  const byName = new Map(columns.map((c) => [c.name, c]));
  assert.ok(byName.has("has_content"), "call_logs should have has_content column");
  assert.ok(byName.has("usage_provenance"), "call_logs should have usage_provenance column");
  assert.equal(byName.get("has_content")?.notnull, 0);
  assert.equal(byName.get("usage_provenance")?.notnull, 0);
});

test("2xx with text and provider usage is content with reported provenance", async () => {
  const id = "ccp-reported";
  await saveCallLog({
    id,
    status: 200,
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    clientResponse: { choices: [{ message: { content: "hello" } }] },
  });
  try {
    const row = rowFor(id);
    assert.equal(row.has_content, 1);
    assert.equal(row.usage_provenance, "reported");
  } finally {
    cleanup([id]);
  }
});

test("2xx empty with provider usage is no content with reported provenance", async () => {
  const id = "ccp-empty-reported";
  await saveCallLog({
    id,
    status: 200,
    tokens: { prompt_tokens: 10, completion_tokens: 0, total_tokens: 10 },
    clientResponse: { choices: [{ message: { content: null } }] },
  });
  try {
    const row = rowFor(id);
    assert.equal(row.has_content, 0);
    assert.equal(row.usage_provenance, "reported");
  } finally {
    cleanup([id]);
  }
});

test("2xx with content but silent provider is content with absent provenance", async () => {
  const id = "ccp-absent";
  await saveCallLog({
    id,
    status: 200,
    tokens: {},
    clientResponse: { choices: [{ message: { content: "hello" } }] },
  });
  try {
    const row = rowFor(id);
    assert.equal(row.has_content, 1);
    assert.equal(row.usage_provenance, "absent");
  } finally {
    cleanup([id]);
  }
});

test("2xx with threaded usage estimate is content with estimated provenance", async () => {
  const id = "ccp-estimated";
  await saveCallLog({
    id,
    status: 200,
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    usageEstimated: true,
    clientResponse: { choices: [{ message: { content: "hello" } }] },
  });
  try {
    const row = rowFor(id);
    assert.equal(row.has_content, 1);
    assert.equal(row.usage_provenance, "estimated");
  } finally {
    cleanup([id]);
  }
});

test("2xx with rebuilt estimated tokens keeps estimated provenance", async () => {
  const id = "ccp-estimated-rebuilt";
  const estimated = { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15, estimated: true };
  await saveCallLog({
    id,
    status: 200,
    tokens: JSON.parse(JSON.stringify(estimated)),
    usageEstimated: true,
    clientResponse: { choices: [{ message: { content: "hello" } }] },
  });
  try {
    const row = rowFor(id);
    assert.equal(row.usage_provenance, "estimated");
  } finally {
    cleanup([id]);
  }
});

test("2xx reasoning alone is no content", async () => {
  const id = "ccp-reasoning-only";
  await saveCallLog({
    id,
    status: 200,
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    clientResponse: { choices: [{ message: { reasoning_content: "thinking" } }] },
  });
  try {
    assert.equal(rowFor(id).has_content, 0);
  } finally {
    cleanup([id]);
  }
});

test("2xx tool calls alone count as content", async () => {
  const id = "ccp-tool-only";
  await saveCallLog({
    id,
    status: 200,
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    clientResponse: {
      choices: [{ message: { tool_calls: [{ id: "1", function: { name: "f" } }] } }],
    },
  });
  try {
    assert.equal(rowFor(id).has_content, 1);
  } finally {
    cleanup([id]);
  }
});

test("non-text route leaves content unmeasured", async () => {
  const id = "ccp-nontext";
  await saveCallLog({
    id,
    status: 200,
    path: "/v1/audio/speech",
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    clientResponse: { audio: "aGVsbG8=" },
  });
  try {
    assert.equal(rowFor(id).has_content, null);
  } finally {
    cleanup([id]);
  }
});

test("failure leaves both columns null", async () => {
  const id = "ccp-failure";
  await saveCallLog({
    id,
    status: 429,
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    clientResponse: { choices: [{ message: { content: "hello" } }] },
  });
  try {
    const row = rowFor(id);
    assert.equal(row.has_content, null);
    assert.equal(row.usage_provenance, null);
  } finally {
    cleanup([id]);
  }
});

test("2xx Responses tool_call item alone counts as content", async () => {
  const id = "ccp-resp-tool-only";
  await saveCallLog({
    id,
    status: 200,
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    clientResponse: { output: [{ type: "function_call", name: "f", arguments: "{}" }] },
  });
  try {
    assert.equal(rowFor(id).has_content, 1);
  } finally {
    cleanup([id]);
  }
});

test("2xx Claude tool_use block alone counts as content", async () => {
  const id = "ccp-claude-tooluse-only";
  await saveCallLog({
    id,
    status: 200,
    tokens: { input_tokens: 10, output_tokens: 5 },
    clientResponse: { content: [{ type: "tool_use", id: "t1", name: "f", input: {} }] },
  });
  try {
    assert.equal(rowFor(id).has_content, 1);
  } finally {
    cleanup([id]);
  }
});

test("2xx Responses blank text block alone is no content", async () => {
  const id = "ccp-blank-text-only";
  await saveCallLog({
    id,
    status: 200,
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    clientResponse: { output: [{ type: "message", content: [{ type: "text", text: "   " }] }] },
  });
  try {
    assert.equal(rowFor(id).has_content, 0);
  } finally {
    cleanup([id]);
  }
});

test("2xx Claude text block counts as content", async () => {
  const id = "ccp-claude-text";
  await saveCallLog({
    id,
    status: 200,
    tokens: { input_tokens: 10, output_tokens: 5 },
    clientResponse: { content: [{ type: "text", text: "hello" }] },
  });
  try {
    assert.equal(rowFor(id).has_content, 1);
  } finally {
    cleanup([id]);
  }
});

test("2xx Claude blank text block alone is no content", async () => {
  const id = "ccp-claude-blank-text";
  await saveCallLog({
    id,
    status: 200,
    tokens: { input_tokens: 10, output_tokens: 5 },
    clientResponse: { content: [{ type: "text", text: "   " }] },
  });
  try {
    assert.equal(rowFor(id).has_content, 0);
  } finally {
    cleanup([id]);
  }
});

test("log detail exposes an empty reply apart from missing metering", async () => {
  const emptyId = "ccp-detail-empty";
  const silentId = "ccp-detail-silent";
  await saveCallLog({
    id: emptyId,
    status: 200,
    tokens: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    clientResponse: { choices: [{ message: { content: "" }, finish_reason: "stop" }] },
  });
  await saveCallLog({
    id: silentId,
    status: 200,
    tokens: {},
    clientResponse: { choices: [{ message: { content: "hi" }, finish_reason: "stop" }] },
  });
  try {
    const empty = await getCallLogById(emptyId);
    assert.equal(empty?.hasContent, 0);
    assert.equal(empty?.usageProvenance, "reported");
    const silent = await getCallLogById(silentId);
    assert.equal(silent?.hasContent, 1);
    assert.equal(silent?.usageProvenance, "absent");
  } finally {
    cleanup([emptyId, silentId]);
  }
});
