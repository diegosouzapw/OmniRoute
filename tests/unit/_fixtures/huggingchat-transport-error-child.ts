import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHILD_RESULT_PREFIX = "HUGGINGCHAT_TRANSPORT_RESULT=";
const scenario = process.argv[2];

if (scenario !== "conversation-creation" && scenario !== "message-send") {
  throw new Error(`Unknown HuggingChat transport scenario: ${String(scenario)}`);
}

const testRoot = mkdtempSync(join(tmpdir(), "omniroute-huggingchat-transport-child-"));
const testDataDir = join(testRoot, "data");
const testPluginsDir = join(testRoot, "plugins");
const testConfigDir = join(testRoot, "config");

mkdirSync(testDataDir, { recursive: true });
mkdirSync(testPluginsDir, { recursive: true });
mkdirSync(testConfigDir, { recursive: true });
process.env.DATA_DIR = testDataDir;
process.env.OMNIROUTE_PLUGINS_DIR = testPluginsDir;
process.env.XDG_CONFIG_HOME = testConfigDir;
process.env.APP_LOG_TO_FILE = "false";
process.env.API_KEY_SECRET = "synthetic-huggingchat-transport-test-key";

const hostileTransportMessage =
  "TLS request failed at /srv/omniroute/providers/huggingchat/client.ts:44:9 " +
  "access_token=transport-secret\n" +
  "    at sendRequest (/srv/omniroute/runtime/fetch.ts:12:3)";

const originalFetch = globalThis.fetch;
let fetchCalls = 0;
const errorLogs: string[] = [];
let childResult: Record<string, unknown> | null = null;

try {
  const { HuggingChatExecutor } = await import("../../../open-sse/executors/huggingchat.ts");

  globalThis.fetch = (async () => {
    fetchCalls += 1;

    if (scenario === "conversation-creation") {
      throw new Error(hostileTransportMessage);
    }

    if (fetchCalls === 1) {
      return Response.json({ conversationId: "conversation-test" });
    }
    if (fetchCalls === 2) {
      return Response.json({ rootMessageId: "root-message-test" });
    }
    if (fetchCalls === 3) {
      throw new Error(hostileTransportMessage);
    }
    throw new Error(`Unexpected fetch call ${fetchCalls}`);
  }) as typeof globalThis.fetch;

  const result = await new HuggingChatExecutor().execute({
    model: "test/huggingchat-model",
    body: { messages: [{ role: "user", content: "hello" }] },
    stream: false,
    credentials: { apiKey: "hf-chat=fake-cookie" },
    signal: null,
    log: { error: (_tag, message) => errorLogs.push(message) },
  });

  childResult = {
    fetchCalls,
    status: result.response.status,
    contentType: result.response.headers.get("content-type") || "",
    errorLogs,
    payload: await result.response.json(),
  };
} finally {
  globalThis.fetch = originalFetch;
  const coreDb = await import("../../../src/lib/db/core.ts");
  coreDb.resetDbInstance();
  rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}

if (!childResult) {
  throw new Error(`HuggingChat ${scenario} probe did not produce a result`);
}

process.stdout.write(`${CHILD_RESULT_PREFIX}${JSON.stringify(childResult)}\n`);
