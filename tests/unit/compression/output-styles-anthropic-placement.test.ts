// #12584: on an Anthropic-shaped body the output-style instruction must reach upstream in the
// top-level system field, never as a system turn in messages[]. Each body carries a tool, so the
// two shapes with a system prompt take the mid-conversation-system path, where only a leading
// run of system turns is hoisted out of messages[]. Those two shapes also carry a later system
// turn, which that path keeps in messages[] and the default Claude path would hoist.
//
// Scope: the placement contract is asserted for the English ("en") instruction only; the
// localized instruction texts are not covered here.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";

const { dir: TEST_DATA_DIR, cleanup } = createTempDataDir("omniroute-style-placement-");
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-style-placement-secret";

const core = await import("../../../src/lib/db/core.ts");
const readCacheDb = await import("../../../src/lib/db/readCache.ts");
const compressionDb = await import("../../../src/lib/db/compression.ts");
const { handleChatCore } = await import("../../../open-sse/handlers/chatCore.ts");
const { isClaudeCodeSemanticPassthroughRequest } =
  await import("../../../open-sse/handlers/chatCore/passthroughHelpers.ts");
const { shouldUseMidConversationSystem } =
  await import("../../../open-sse/executors/claudeIdentity.ts");
const { FORMATS } = await import("../../../open-sse/translator/formats.ts");
const { resetAllCircuitBreakers } = await import("../../../src/shared/utils/circuitBreaker.ts");
const { CAVEMAN_INSTRUCTION_BY_LANGUAGE } =
  await import("../../../open-sse/services/compression/outputMode.ts");
const { OUTPUT_STYLE_MARKER } =
  await import("../../../open-sse/services/compression/outputStyles/apply.ts");
const { waitForCallLogSaves, closeCallLogSaves } =
  await import("../../../src/lib/usage/callLogs.ts");

const originalFetch = globalThis.fetch;
const USER_AGENT = "claude-code/2.1.154";
const LATER_SYSTEM_TURN = "Answer in one short paragraph.";

// The Anthropic `system` field is a string or an array of text blocks; anything else fails.
function systemText(system: unknown): string {
  if (typeof system === "string") return system;
  assert.ok(Array.isArray(system), "the upstream system field should be a string or block array");
  return system
    .map((block: { type?: string; text?: string }) => {
      assert.equal(block?.type, "text", "every upstream system block should be a text block");
      assert.ok(
        typeof block.text === "string",
        "every upstream system block should carry string text"
      );
      return block.text;
    })
    .join("\n");
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  resetAllCircuitBreakers();
  readCacheDb.invalidateDbCache();
  // Each request saves a call log in the background; it must land before the DB is reset.
  assert.ok(await waitForCallLogSaves(30_000), "the previous test's call-log saves should finish");
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  // Drain the last test's in-flight save before closing, so it lands instead of erroring.
  assert.ok(await waitForCallLogSaves(30_000), "the last test's call-log save should finish");
  // Stops the call-log writer too, which otherwise keeps the process alive for its idle timeout.
  await closeCallLogSaves(2_000);
  await cleanup();
});

for (const [shape, system] of [
  ["a string system", "You are Claude."],
  ["a content-block system", [{ type: "text", text: "You are Claude." }]],
  ["no system", undefined],
] as const) {
  test(`chatCore: output style lands in the top-level system field on an Anthropic body with ${shape} (#12584)`, async () => {
    await compressionDb.updateCompressionSettings({
      enabled: true,
      defaultMode: "off",
      autoTriggerTokens: 0,
      cavemanOutputMode: {
        enabled: true,
        intensity: "full",
        autoClarity: true,
      },
    });

    let capturedBody = null as {
      system?: unknown;
      messages?: Array<{ role?: string; content?: unknown }>;
    } | null;
    globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
      if (String(url).includes("/v1/messages") && init?.body) {
        capturedBody = JSON.parse(init.body as string);
      }
      return Response.json({
        id: "msg_test",
        type: "message",
        role: "assistant",
        model: "claude-opus-5",
        content: [{ type: "text", text: "OK" }],
        usage: { input_tokens: 4, output_tokens: 1 },
      });
    };

    const body = {
      model: "claude-opus-5",
      max_tokens: 64,
      stream: false,
      ...(system === undefined ? {} : { system }),
      tools: [
        {
          name: "Read",
          description: "Read a file",
          input_schema: { type: "object", properties: {} },
        },
      ],
      messages: [
        { role: "user", content: "Summarize this implementation." },
        ...(system === undefined
          ? []
          : [
              { role: "assistant", content: "Which file?" },
              { role: "system", content: LATER_SYSTEM_TURN },
              { role: "user", content: "src/app.ts" },
            ]),
      ],
    };
    const headers = new Headers({
      accept: "application/json",
      "content-type": "application/json",
      "user-agent": USER_AGENT,
    });

    // The fixture must keep taking the routing these assertions depend on.
    assert.equal(
      isClaudeCodeSemanticPassthroughRequest({
        provider: "claude",
        sourceFormat: FORMATS.CLAUDE,
        targetFormat: FORMATS.CLAUDE,
        headers,
        userAgent: USER_AGENT,
      }),
      true,
      "the fixture should take the Claude Code semantic passthrough"
    );
    assert.equal(
      shouldUseMidConversationSystem(body, body.model),
      system !== undefined,
      "only the shapes with a system prompt should take the mid-conversation-system path"
    );

    try {
      const result = await handleChatCore({
        body: structuredClone(body),
        modelInfo: { provider: "claude", model: "claude-opus-5", extendedContext: false },
        credentials: { apiKey: "test-claude-key", providerSpecificData: {} },
        log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
        clientRawRequest: { endpoint: "/v1/messages", body: structuredClone(body), headers },
        connectionId: null,
        onCredentialsRefreshed: () => {},
        onRequestSuccess: () => {},
        onStreamFailure: () => {},
        onDisconnect: () => {},
        userAgent: USER_AGENT,
        comboName: null,
      });

      assert.ok(result.success, "Request should succeed");
      assert.ok(capturedBody, "the upstream request should be captured");
      const upstreamSystem = systemText(capturedBody.system);
      assert.ok(
        upstreamSystem.includes(
          `${OUTPUT_STYLE_MARKER}\n${CAVEMAN_INSTRUCTION_BY_LANGUAGE.en.full}`
        ),
        "the full output-style instruction should land in the top-level system field"
      );
      assert.equal(
        JSON.stringify(capturedBody).split(OUTPUT_STYLE_MARKER).length - 1,
        1,
        "the instruction should reach upstream exactly once"
      );
      const upstreamMessages = capturedBody.messages ?? [];
      assert.deepEqual(
        upstreamMessages.map((message) => message.role),
        body.messages.map((message) => message.role),
        "messages[] should carry the client's turns and nothing else"
      );
      assert.ok(
        JSON.stringify(upstreamMessages[0]).includes("Summarize this implementation."),
        "the user's text should survive"
      );
      if (system !== undefined) {
        assert.ok(
          upstreamSystem.includes("You are Claude."),
          "the client's own system prompt should survive"
        );
        assert.ok(
          JSON.stringify(upstreamMessages[2]).includes(LATER_SYSTEM_TURN),
          "the later system turn should stay in messages[] on the mid-conversation-system path"
        );
        assert.equal(
          upstreamSystem.includes(LATER_SYSTEM_TURN),
          false,
          "the later system turn should not be hoisted into the top-level system field"
        );
      }
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
}
