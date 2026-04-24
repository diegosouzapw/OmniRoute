import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-memory-summarization-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const summarization = await import("../../src/lib/memory/summarization.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function insertMemory({ id, apiKeyId = "key-a", sessionId = "session-a", content, createdAt }) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO memories (
      id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    apiKeyId,
    sessionId,
    "factual",
    `memory:${id}`,
    content,
    "{}",
    createdAt,
    createdAt,
    null
  );
}

function getContent(id) {
  const db = core.getDbInstance();
  return (db.prepare("SELECT content FROM memories WHERE id = ?").get(id) as any).content ?? null;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("summarizeMemories returns zeroed metrics for empty conversations", async () => {
  const result = await summarization.summarizeMemories("missing-key", "missing-session");
  assert.deepEqual(result, {
    originalCount: 0,
    summarizedCount: 0,
    tokensSaved: 0,
  });
});

test("summarizeMemories keeps the newest items inside the token budget and summarizes older ones", async () => {
  insertMemory({
    id: "old",
    content: "Alpha. Beta. Gamma. Delta.",
    createdAt: "2026-04-01T00:00:00.000Z",
  });
  insertMemory({
    id: "new",
    content: "One. Two. Three. Four.",
    createdAt: "2026-04-02T00:00:00.000Z",
  });

  const result = await summarization.summarizeMemories("key-a", "session-a", 8);

  assert.equal(result.originalCount, 2);
  assert.equal(result.summarizedCount, 1);
  assert.ok(result.tokensSaved > 0);
  assert.equal(getContent("new"), "One. Two. Three. Four.");
  assert.equal(getContent("old"), "Alpha. Beta. Gamma.");
});

test("summarizeMemories restricts the operation to the requested session", async () => {
  insertMemory({
    id: "target-1",
    sessionId: "session-target",
    content: "One. Two. Three. Four.",
    createdAt: "2026-04-01T00:00:00.000Z",
  });
  insertMemory({
    id: "target-2",
    sessionId: "session-target",
    content: "Five. Six. Seven. Eight.",
    createdAt: "2026-04-02T00:00:00.000Z",
  });
  insertMemory({
    id: "other-session",
    sessionId: "session-other",
    content: "Nine. Ten. Eleven. Twelve.",
    createdAt: "2026-04-03T00:00:00.000Z",
  });

  const result = await summarization.summarizeMemories("key-a", "session-target", 8);

  assert.equal(result.originalCount, 2);
  assert.equal(result.summarizedCount, 1);
  assert.equal(getContent("target-1"), "One. Two. Three.");
  assert.equal(getContent("target-2"), "Five. Six. Seven. Eight.");
  assert.equal(getContent("other-session"), "Nine. Ten. Eleven. Twelve.");
});

test("summarizeMemories can operate across every session of the same api key and ignores other keys", async () => {
  insertMemory({
    id: "a-older",
    apiKeyId: "key-a",
    sessionId: "session-a1",
    content: "Red. Blue. Green. Yellow.",
    createdAt: "2026-04-01T00:00:00.000Z",
  });
  insertMemory({
    id: "a-newer",
    apiKeyId: "key-a",
    sessionId: "session-a2",
    content: "Black. White. Gray. Silver.",
    createdAt: "2026-04-02T00:00:00.000Z",
  });
  insertMemory({
    id: "b-other",
    apiKeyId: "key-b",
    sessionId: "session-b1",
    content: "North. South. East. West.",
    createdAt: "2026-04-03T00:00:00.000Z",
  });

  const result = await summarization.summarizeMemories("key-a", undefined, 9);

  assert.equal(result.originalCount, 2);
  assert.equal(result.summarizedCount, 1);
  assert.equal(getContent("a-older"), "Red. Blue. Green.");
  assert.equal(getContent("a-newer"), "Black. White. Gray. Silver.");
  assert.equal(getContent("b-other"), "North. South. East. West.");
});

test("summarizeMemories leaves short entries unchanged when the generated summary is identical", async () => {
  insertMemory({
    id: "short",
    content: "One. Two. Three.",
    createdAt: "2026-04-01T00:00:00.000Z",
  });

  const result = await summarization.summarizeMemories("key-a", "session-a", 0);

  assert.deepEqual(result, {
    originalCount: 1,
    summarizedCount: 1,
    tokensSaved: 0,
  });
  assert.equal(getContent("short"), "One. Two. Three.");
});
