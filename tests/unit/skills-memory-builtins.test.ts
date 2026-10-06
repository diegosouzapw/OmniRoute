import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-memory-builtins-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const {
  memoryBuiltinHandlers,
  buildMemoryToolsForProvider,
  MEMORY_SAVE_TOOL_NAME,
  MEMORY_UPDATE_TOOL_NAME,
  MEMORY_SEARCH_TOOL_NAME,
  MEMORY_DELETE_TOOL_NAME,
} = await import("../../src/lib/skills/memoryBuiltins.ts");
const { interceptToolCalls } = await import("../../src/lib/skills/interception.ts");
const { listMemories } = await import("../../src/lib/memory/store.ts");

function getMemoryMap() {
  return { apiKeyId: "key-mem", sessionId: "session-mem" };
}

test.beforeEach(() => {
  coreDb.resetDbInstance();
  fs.rmSync(path.join(TEST_DATA_DIR, "storage.sqlite"), { force: true });
  fs.rmSync(path.join(TEST_DATA_DIR, "storage.sqlite-wal"), { force: true });
  fs.rmSync(path.join(TEST_DATA_DIR, "storage.sqlite-shm"), { force: true });
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("memory_save creates a new memory entry", async () => {
  const result = await memoryBuiltinHandlers[MEMORY_SAVE_TOOL_NAME](
    { key: "preference:coffee", content: "prefers dark roast", type: "factual" },
    getMemoryMap()
  );
  assert.equal(result.success, true);
  assert.equal(result.memory.key, "preference:coffee");
  assert.equal(result.memory.content, "prefers dark roast");
  assert.equal(result.memory.type, "factual");

  const stored = await listMemories({ apiKeyId: "key-mem" });
  assert.equal(stored.data.length, 1);
});

test("memory_save upserts when the key already exists", async () => {
  await memoryBuiltinHandlers[MEMORY_SAVE_TOOL_NAME](
    { key: "fact:city", content: "lives in Berlin" },
    getMemoryMap()
  );
  const second = await memoryBuiltinHandlers[MEMORY_SAVE_TOOL_NAME](
    { key: "fact:city", content: "lives in Madrid" },
    getMemoryMap()
  );

  assert.equal(second.success, true);
  assert.equal(second.memory.content, "lives in Madrid");
  const stored = await listMemories({ apiKeyId: "key-mem" });
  assert.equal(stored.data.length, 1, "same key must upsert, not duplicate");
});

test("memory_save rejects missing key or content", async () => {
  await assert.rejects(
    () => memoryBuiltinHandlers[MEMORY_SAVE_TOOL_NAME]({ content: "no key" }, getMemoryMap()),
    /Missing required field: key/
  );
  await assert.rejects(
    () => memoryBuiltinHandlers[MEMORY_SAVE_TOOL_NAME]({ key: "k" }, getMemoryMap()),
    /Missing required field: content/
  );
});

test("memory_search returns saved memories by query and type", async () => {
  await memoryBuiltinHandlers[MEMORY_SAVE_TOOL_NAME](
    { key: "pref:color", content: "likes green", type: "factual" },
    getMemoryMap()
  );
  const found = await memoryBuiltinHandlers[MEMORY_SEARCH_TOOL_NAME](
    { query: "green", type: "factual" },
    getMemoryMap()
  );
  assert.equal(found.success, true);
  assert.equal(found.data.count, 1);
  assert.equal(found.data.memories[0].content, "likes green");

  const none = await memoryBuiltinHandlers[MEMORY_SEARCH_TOOL_NAME](
    { type: "episodic" },
    getMemoryMap()
  );
  assert.equal(none.data.count, 0);
});

test("memory_update changes content and re-saves", async () => {
  const saved = await memoryBuiltinHandlers[MEMORY_SAVE_TOOL_NAME](
    { key: "fact:job", content: "works as engineer" },
    getMemoryMap()
  );
  const updated = await memoryBuiltinHandlers[MEMORY_UPDATE_TOOL_NAME](
    { id: saved.memory.id, content: "works as architect" },
    getMemoryMap()
  );
  assert.equal(updated.success, true);

  const found = await memoryBuiltinHandlers[MEMORY_SEARCH_TOOL_NAME](
    { query: "architect" },
    getMemoryMap()
  );
  assert.equal(found.data.count, 1);
  assert.equal(found.data.memories[0].content, "works as architect");
});

test("memory_update rejects memory owned by another API key", async () => {
  const saved = await memoryBuiltinHandlers[MEMORY_SAVE_TOOL_NAME](
    { key: "fact:secret", content: "mine" },
    getMemoryMap()
  );
  await assert.rejects(
    () =>
      memoryBuiltinHandlers[MEMORY_UPDATE_TOOL_NAME](
        { id: saved.memory.id, content: "theirs" },
        { apiKeyId: "key-other", sessionId: "s" }
      ),
    /does not belong/
  );
});

test("memory_delete removes the entry and rejects foreign keys", async () => {
  const saved = await memoryBuiltinHandlers[MEMORY_SAVE_TOOL_NAME](
    { key: "fact:temp", content: "to be deleted" },
    getMemoryMap()
  );

  await assert.rejects(
    () =>
      memoryBuiltinHandlers[MEMORY_DELETE_TOOL_NAME](
        { id: saved.memory.id },
        { apiKeyId: "key-other", sessionId: "s" }
      ),
    /does not belong/
  );

  const deleted = await memoryBuiltinHandlers[MEMORY_DELETE_TOOL_NAME](
    { id: saved.memory.id },
    getMemoryMap()
  );
  assert.equal(deleted.success, true);

  const stored = await listMemories({ apiKeyId: "key-mem" });
  assert.equal(stored.data.length, 0);
});

test("buildMemoryToolsForProvider emits provider-shaped tool definitions", () => {
  const openai = buildMemoryToolsForProvider("openai") as {
    type: string;
    function: { name: string; description: string; parameters: { required: string[] } };
  }[];
  assert.equal(openai.length, 4);
  assert.equal(openai[0].type, "function");
  assert.equal(openai[0].function.name, MEMORY_SAVE_TOOL_NAME);
  assert.deepEqual(openai[0].function.parameters.required, ["key", "content"]);

  const claude = buildMemoryToolsForProvider("anthropic") as {
    name: string;
    input_schema: { required: string[] };
  }[];
  assert.equal(claude.length, 4);
  assert.equal(claude[0].name, MEMORY_SAVE_TOOL_NAME);
  assert.ok(claude[0].input_schema, "anthropic tools use input_schema");

  const gemini = buildMemoryToolsForProvider("google") as {
    name: string;
    parameters: { required: string[] };
  }[];
  assert.equal(gemini.length, 4);
  assert.equal(gemini[2].name, MEMORY_SEARCH_TOOL_NAME);
  assert.ok(gemini[0].parameters, "gemini tools use parameters");
});

test("interceptToolCalls executes memory tools when allowed via builtinToolNames", async () => {
  const results = await interceptToolCalls(
    [
      {
        id: "call-save",
        name: MEMORY_SAVE_TOOL_NAME,
        arguments: { key: "pref:tea", content: "likes oolong" },
      },
    ],
    {
      apiKeyId: "key-mem",
      sessionId: "session-mem",
      requestId: "request-mem",
      builtinToolNames: [MEMORY_SAVE_TOOL_NAME],
    }
  );

  assert.equal(results.length, 1);
  assert.equal(results[0].id, "call-save");
  assert.equal(results[0].result.success, true);

  const stored = await listMemories({ apiKeyId: "key-mem" });
  assert.equal(stored.data.length, 1);
  assert.equal(stored.data[0].content, "likes oolong");
});

test("interceptToolCalls skips memory tools not allowed by builtinToolNames", async () => {
  const results = await interceptToolCalls(
    [{ id: "call-x", name: MEMORY_DELETE_TOOL_NAME, arguments: { id: "anything" } }],
    {
      apiKeyId: "key-mem",
      sessionId: "session-mem",
      requestId: "request-mem",
      builtinToolNames: [],
    }
  );
  // The tool is not in the allowed builtin list, so it falls through to the
  // custom-skill resolver, which has no such skill registered.
  assert.equal(results.length, 1);
  assert.match(String(results[0].result.error), /Skill not found/);
});
