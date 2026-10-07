import assert from "node:assert/strict";
import test, { afterEach } from "node:test";

import {
  ChatGptSuspensionClock,
  connectAfterClosingBrowserConnection,
  remainingStageBudgetMs,
} from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/browser-worker.ts";
import { insertPlainTextIntoComposer } from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/composer-edit.ts";
import {
  CHATGPT_TURN_REVISION_CONFLICT_MESSAGE,
  extractChatGptTurnUserRevision,
} from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/environment.ts";
import { TurnBroker } from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/turn-broker.ts";
import type { CodexParsedRequest } from "../../open-sse/vendor/codex-chatgpt-web/types.ts";
import { VERSION } from "../../open-sse/vendor/codex-chatgpt-web/version.ts";

test("vendors the exact codex-chatgpt-web v4.0.7 release", () => {
  assert.equal(VERSION, "4.0.7");
});

interface FakeSelection {
  isCollapsed: boolean;
  anchorNode: object | null;
  removeAllRanges(): void;
  addRange(range: object): void;
}

const originalDocument = globalThis.document;
const originalWindow = globalThis.window;

afterEach(() => {
  globalThis.document = originalDocument;
  globalThis.window = originalWindow;
});

function composerHarness(options: {
  focusable: boolean;
  caretInsideComposer: boolean;
  execCommandResult?: boolean;
}) {
  const inside = { name: "text-node-inside-composer" };
  const calls: Array<{ command: string; value: string }> = [];
  const selection: FakeSelection = {
    isCollapsed: true,
    anchorNode: options.caretInsideComposer ? inside : { name: "effort-menu-node" },
    removeAllRanges() {
      selection.anchorNode = null;
    },
    addRange() {
      selection.anchorNode = inside;
      selection.isCollapsed = true;
    },
  };
  const fakeDocument = {
    activeElement: null as object | null,
    createRange: () => ({ selectNodeContents() {}, collapse() {} }),
    execCommand(command: string, _showUi: boolean, value: string) {
      calls.push({ command, value });
      return options.execCommandResult ?? true;
    },
  };
  const composer = {
    focus() {
      if (options.focusable) fakeDocument.activeElement = composer;
    },
    contains: (node: object | null) => node === inside || node === composer,
  };
  globalThis.document = fakeDocument as unknown as Document;
  globalThis.window = { getSelection: () => selection } as unknown as Window & typeof globalThis;
  return { calls, composer: composer as unknown as HTMLElement, selection };
}

test("v4.0.7 composer insertion repairs a missing caret after effort selection", () => {
  const { calls, composer, selection } = composerHarness({
    focusable: true,
    caretInsideComposer: false,
  });

  assert.equal(insertPlainTextIntoComposer(composer, "staged part"), true);
  assert.deepEqual(calls, [{ command: "insertText", value: "staged part" }]);
  assert.equal(selection.isCollapsed, true);
});

test("v4.0.7 composer insertion fails closed when focus cannot move", () => {
  const { calls, composer } = composerHarness({
    focusable: false,
    caretInsideComposer: false,
  });

  assert.equal(insertPlainTextIntoComposer(composer, "staged part"), false);
  assert.deepEqual(calls, []);
});

test("a failed stale-browser disconnect prevents a replacement connection", async () => {
  let replacementAttempts = 0;
  const disconnectFailure = new Error("stale CDP transport did not close");

  await assert.rejects(
    connectAfterClosingBrowserConnection(
      {
        close: async () => {
          throw disconnectFailure;
        },
      },
      async () => {
        replacementAttempts += 1;
        return "replacement";
      }
    ),
    disconnectFailure
  );
  assert.equal(replacementAttempts, 0);
});

test("the suspension clock refunds system sleep from browser stage budgets", () => {
  const clock = new ChatGptSuspensionClock(1_000, 5_000);
  clock.tick(1_000);
  clock.tick(2_000);
  clock.tick(3_100);
  assert.equal(clock.suspendedMs(), 0);

  clock.tick(3_100 + 15 * 60_000);
  assert.equal(clock.suspendedMs(), 15 * 60_000 - 1_000);
  assert.equal(remainingStageBudgetMs(120_000, 901_000, 890_000), 109_000);
  assert.equal(remainingStageBudgetMs(120_000, 120_000, 0), 0);
});

function rawWireRequest(): CodexParsedRequest {
  const turnId = "turn_current";
  return {
    modelId: "gpt-5.6-sol",
    stream: true,
    context: { messages: [{ role: "user", content: "Inspect the project", timestamp: 1 }] },
    options: {},
    _rawBody: {
      client_metadata: {
        "x-codex-turn-metadata": JSON.stringify({
          thread_id: "thread_current",
          turn_id: turnId,
        }),
      },
      input: [
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "Inspect the project" }],
          internal_chat_message_metadata_passthrough: { turn_id: turnId },
        },
      ],
    },
  };
}

test("an interrupted prior turn notice is not treated as the next instruction", () => {
  const request = rawWireRequest();
  const input = (request._rawBody as { input: unknown[] }).input;
  input.push({
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "<turn_aborted>previous turn</turn_aborted>" }],
    internal_chat_message_metadata_passthrough: { turn_id: "turn_previous" },
  });

  assert.deepEqual(extractChatGptTurnUserRevision(request), [
    { type: "input_text", text: "Inspect the project" },
  ]);

  input.push({
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: "Actually do something else" }],
    internal_chat_message_metadata_passthrough: { turn_id: "turn_other" },
  });
  assert.throws(
    () => extractChatGptTurnUserRevision(request),
    new RegExp(CHATGPT_TURN_REVISION_CONFLICT_MESSAGE)
  );
});

test("macOS-sized Unix socket paths fail with an explicit broker error", async () => {
  if (process.platform === "win32") return;
  const socketPath = `/tmp/${"x".repeat(99)}`;
  assert.equal(Buffer.byteLength(socketPath), 104);
  const broker = TurnBroker.forSocket(socketPath);
  try {
    await assert.rejects(broker.listen(), /103-byte limit/);
  } finally {
    await broker.close();
  }
});
