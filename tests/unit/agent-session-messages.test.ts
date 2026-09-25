import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-session-messages-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-at-least-32-chars-long-0123456789";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const messagesDb = await import("../../src/lib/db/agentSessionMessages.ts");
const { extractUserTurnText, extractAssistantTurnText, extractAgentSessionTurn } =
  await import("../../open-sse/handlers/chatCore/agentSessionTurn.ts");
const { GET: getMessagesRoute } =
  await import("../../src/app/api/v1/me/sessions/[id]/messages/route.ts");
const { SELF_USAGE_SCOPE } = await import("../../src/shared/constants/selfServiceScopes.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

let keyAliceToken = "";
let keyAliceId = "";
let keyBobToken = "";
let _keyBobId = "";
let sessionAliceId = "";

test.before(async () => {
  const aliceKey = await apiKeysDb.createApiKey("Alice Key", "test-machine", [SELF_USAGE_SCOPE]);
  keyAliceToken = aliceKey.key;
  keyAliceId = aliceKey.id;

  const bobKey = await apiKeysDb.createApiKey("Bob Key", "test-machine", [SELF_USAGE_SCOPE]);
  keyBobToken = bobKey.key;
  _keyBobId = bobKey.id;

  // Record a session for Alice with 2 turns
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    tokens: { input: 100, output: 50 },
    success: true,
    latencyMs: 100,
    timestamp: "2026-09-25T10:00:00.000Z",
    apiKeyId: keyAliceId,
    apiKeyName: "Alice Key",
    agentContext: {
      client: "claude-code",
      clientSessionId: "alice-sess-msg-1",
      projectName: "billing-api",
      projectRepo: "github.com/acme/billing",
      projectPath: "/home/alice/billing",
      projectSource: "path",
      gitBranch: "main",
    },
    sessionTurn: {
      userText: "Fix the bug in auth",
      assistantText: "I found the bug and will fix it",
      toolNames: ["Edit", "Bash"],
      truncated: false,
    },
  });

  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    tokens: { input: 200, output: 80 },
    success: true,
    latencyMs: 150,
    timestamp: "2026-09-25T10:05:00.000Z",
    apiKeyId: keyAliceId,
    apiKeyName: "Alice Key",
    agentContext: {
      client: "claude-code",
      clientSessionId: "alice-sess-msg-1",
      projectName: "billing-api",
      projectRepo: "github.com/acme/billing",
      projectPath: "/home/alice/billing",
      projectSource: "path",
      gitBranch: "main",
    },
    sessionTurn: {
      userText: "Run the tests now",
      assistantText: "Tests passed cleanly",
      toolNames: ["Bash"],
      truncated: false,
    },
  });

  const db = core.getDbInstance();
  const sessionRow = db
    .prepare("SELECT id FROM agent_sessions WHERE client_session_id = ?")
    .get("alice-sess-msg-1") as { id: string };
  sessionAliceId = sessionRow.id;
});

// ──────────────── Pure extraction tests ────────────────

test("extractUserTurnText extracts last user message and strips system-reminder", () => {
  const body = {
    messages: [
      { role: "user", content: "first question" },
      { role: "assistant", content: "first answer" },
      {
        role: "user",
        content: "Help me with this.\n<system-reminder>secret context</system-reminder>\nThanks!",
      },
    ],
  };

  const extracted = extractUserTurnText(body);
  assert.equal(extracted.text, "Help me with this.\n\nThanks!");
  assert.equal(extracted.truncated, false);
});

test("extractUserTurnText handles content block array and ignores tool_result", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "tool_result", tool_use_id: "t1", content: "files list" },
          { type: "text", text: "Now refactor the controller" },
        ],
      },
    ],
  };

  const extracted = extractUserTurnText(body);
  assert.equal(extracted.text, "Now refactor the controller");
});

test("extractUserTurnText returns null when user message only has tool_result", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "t1", content: "done" }],
      },
    ],
  };

  const extracted = extractUserTurnText(body);
  assert.equal(extracted.text, null);
});

test("extractAssistantTurnText extracts text and tool names from Anthropic response", () => {
  const response = {
    content: [
      { type: "text", text: "Checking the repo structure..." },
      { type: "tool_use", id: "t1", name: "Glob", input: {} },
      { type: "tool_use", id: "t2", name: "Read", input: {} },
    ],
  };

  const extracted = extractAssistantTurnText(response);
  assert.equal(extracted.text, "Checking the repo structure...");
  assert.deepEqual(extracted.toolNames, ["Glob", "Read"]);
});

test("extractAssistantTurnText extracts from OpenAI choices shape", () => {
  const response = {
    choices: [
      {
        message: {
          content: "Here is the plan.",
          tool_calls: [{ function: { name: "search" } }],
        },
      },
    ],
  };

  const extracted = extractAssistantTurnText(response);
  assert.equal(extracted.text, "Here is the plan.");
  assert.deepEqual(extracted.toolNames, ["search"]);
});

test("extractAgentSessionTurn caps text at 4000 characters and sets truncated flag", () => {
  const longText = "a".repeat(5000);
  const body = { messages: [{ role: "user", content: longText }] };
  const response = { content: [{ type: "text", text: "ok" }] };

  const turn = extractAgentSessionTurn(body, response);
  assert.ok(turn);
  assert.equal(turn.userText?.length, 4000);
  assert.equal(turn.truncated, true);
});

// ──────────────── Persistence & Route tests ────────────────

test("GET /v1/me/sessions/[id]/messages lists messages for the calling key", async () => {
  const req = new Request(`http://localhost:20128/v1/me/sessions/${sessionAliceId}/messages`, {
    headers: { Authorization: `Bearer ${keyAliceToken}` },
  });

  const res = await getMessagesRoute(req, { params: Promise.resolve({ id: sessionAliceId }) });
  assert.equal(res.status, 200);

  const data = (await res.json()) as {
    sessionId: string;
    messages: messagesDb.AgentSessionMessageRecord[];
  };
  assert.equal(data.sessionId, sessionAliceId);
  assert.equal(data.messages.length, 2);
  assert.equal(data.messages[0].user, "Fix the bug in auth");
  assert.deepEqual(data.messages[0].tools, ["Edit", "Bash"]);
  assert.equal(data.messages[1].user, "Run the tests now");
  assert.deepEqual(data.messages[1].tools, ["Bash"]);
});

test("GET /v1/me/sessions/[id]/messages returns 404 for another key's session", async () => {
  const req = new Request(`http://localhost:20128/v1/me/sessions/${sessionAliceId}/messages`, {
    headers: { Authorization: `Bearer ${keyBobToken}` },
  });

  const res = await getMessagesRoute(req, { params: Promise.resolve({ id: sessionAliceId }) });
  assert.equal(res.status, 404);
});

test("GET /v1/me/sessions/[id]/messages supports limit and cursor pagination", async () => {
  const req = new Request(
    `http://localhost:20128/v1/me/sessions/${sessionAliceId}/messages?limit=1`,
    { headers: { Authorization: `Bearer ${keyAliceToken}` } }
  );

  const res = await getMessagesRoute(req, { params: Promise.resolve({ id: sessionAliceId }) });
  assert.equal(res.status, 200);
  const data = (await res.json()) as {
    messages: messagesDb.AgentSessionMessageRecord[];
    nextCursor: number | null;
  };
  assert.equal(data.messages.length, 1);
  assert.ok(data.nextCursor);

  // Fetch second page
  const req2 = new Request(
    `http://localhost:20128/v1/me/sessions/${sessionAliceId}/messages?limit=1&cursor=${data.nextCursor}`,
    { headers: { Authorization: `Bearer ${keyAliceToken}` } }
  );
  const res2 = await getMessagesRoute(req2, { params: Promise.resolve({ id: sessionAliceId }) });
  const data2 = (await res2.json()) as {
    messages: messagesDb.AgentSessionMessageRecord[];
    nextCursor: number | null;
  };
  assert.equal(data2.messages.length, 1);
  assert.equal(data2.messages[0].user, "Run the tests now");
  assert.equal(data2.nextCursor, null);
});

test("deleteAgentSessionMessagesBefore removes older messages", () => {
  const db = core.getDbInstance();
  const deleted = messagesDb.deleteAgentSessionMessagesBefore(db, "2026-09-25T10:02:00.000Z");
  assert.equal(deleted, 1);

  const remaining = messagesDb.listAgentSessionMessages(db, sessionAliceId);
  assert.equal(remaining.messages.length, 1);
  assert.equal(remaining.messages[0].user, "Run the tests now");
});
