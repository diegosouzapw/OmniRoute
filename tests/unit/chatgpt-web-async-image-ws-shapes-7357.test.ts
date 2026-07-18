import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";

const { ChatGptWebExecutor, __resetChatGptWebCachesForTesting } = await import(
  "../../open-sse/executors/chatgpt-web.ts"
);
const { __setTlsFetchOverrideForTesting } = await import(
  "../../open-sse/services/chatgptTlsClient.ts"
);

function makeHeaders(map: Record<string, string> = {}) {
  const h = new Headers();
  for (const [k, v] of Object.entries(map)) h.set(k, String(v));
  return h;
}

const CONVERSATION_ID = "conv-async-7357";
const FINAL_POINTER = "file-service://file-final-7357";

// SSE stream: assistant starts, tool kicks off image_gen (the "Processing
// image..." card via metadata.image_gen_task_id), stream ends WITHOUT any
// resolved image_asset_pointer — the real async case where the image only
// shows up later, over the celsius WebSocket.
function asyncImageGenSseText(): string {
  const events = [
    {
      conversation_id: CONVERSATION_ID,
      message: {
        id: "msg-1",
        author: { role: "assistant" },
        content: { content_type: "text", parts: ["Generating your image..."] },
        status: "in_progress",
      },
    },
    {
      conversation_id: CONVERSATION_ID,
      message: {
        id: "tool-1",
        author: { role: "tool", name: "t2uay3k.sj1i4kz" },
        metadata: { image_gen_task_id: "task-7357" },
        content: { content_type: "text", parts: [] },
      },
    },
  ];
  const chunks = events.map((e) => `data: ${JSON.stringify(e)}\r\n\r\n`);
  chunks.push("data: [DONE]\r\n\r\n");
  return chunks.join("");
}

// Fake global WebSocket: opens, then emits ONE frame shaped like chatgpt.com's
// celsius wire format for the PLURAL case — payload.update_content.messages[]
// — carrying the completed tool-role image_asset_pointer message. This is the
// shape issue #7357 reports chatgpt.com sends and the current parser does not
// recognize (it only reads update_content.message, singular).
class FakeWebSocket extends EventEmitter {
  url: string;
  onopen: (() => void) | null = null;
  onmessage: ((ev: { data: string }) => void) | null = null;
  onerror: ((ev: unknown) => void) | null = null;
  onclose: (() => void) | null = null;
  static instances: FakeWebSocket[] = [];

  constructor(url: string) {
    super();
    this.url = url;
    FakeWebSocket.instances.push(this);
    setTimeout(() => {
      this.onopen?.();
      setTimeout(() => {
        const frame = {
          type: "conversation-update",
          payload: {
            conversation_id: CONVERSATION_ID,
            update_content: {
              messages: [
                {
                  message: {
                    id: "img-msg-final",
                    author: { role: "tool", name: "t2uay3k.sj1i4kz" },
                    content: {
                      content_type: "multimodal_text",
                      parts: [
                        {
                          content_type: "image_asset_pointer",
                          asset_pointer: FINAL_POINTER,
                          width: 1024,
                          height: 1024,
                        },
                      ],
                    },
                    status: "finished_successfully",
                  },
                },
              ],
            },
          },
        };
        this.onmessage?.({ data: JSON.stringify(frame) });
      }, 5);
    }, 5);
  }

  close() {}
}

test("#7357: async image_gen pointer delivered via update_content.messages[] should resolve to markdown (currently lost → 502)", async () => {
  __resetChatGptWebCachesForTesting();
  const previousWebSocket = (globalThis as Record<string, unknown>).WebSocket;
  const previousTimeout = process.env.OMNIROUTE_CGPT_WEB_IMAGE_TIMEOUT_MS;
  process.env.OMNIROUTE_CGPT_WEB_IMAGE_TIMEOUT_MS = "300"; // keep the probe fast
  (globalThis as Record<string, unknown>).WebSocket = FakeWebSocket;

  __setTlsFetchOverrideForTesting(async (url, opts = {}) => {
    const u = String(url);
    const method = opts.method || "GET";
    if ((u === "https://chatgpt.com/" || u === "https://chatgpt.com") && method === "GET") {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "text/html" }),
        text: '<html data-build="prod-test"><script src="https://cdn.oaistatic.com/main.js"></script></html>',
        body: null,
      };
    }
    if (u.includes("/api/auth/session")) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "application/json" }),
        text: JSON.stringify({
          accessToken: "jwt-7357",
          expires: new Date(Date.now() + 3600_000).toISOString(),
          user: { id: "u-7357" },
        }),
        body: null,
      };
    }
    if (u.includes("/backend-api/sentinel/chat-requirements")) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "application/json" }),
        text: JSON.stringify({ token: "t", proofofwork: { required: false } }),
        body: null,
      };
    }
    if (u.endsWith("/backend-api/f/conversation") || u.endsWith("/backend-api/conversation")) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "text/event-stream" }),
        text: asyncImageGenSseText(),
        body: null,
      };
    }
    if (u.includes("/backend-api/celsius/ws/user")) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "application/json" }),
        text: JSON.stringify({ websocket_url: "wss://chatgpt.com/fake-celsius-socket" }),
        body: null,
      };
    }
    // Resolution path for FINAL_POINTER, exercised ONLY if the WS listener
    // actually extracts the pointer from the update_content.messages[] frame.
    if (u.match(/\/backend-api\/files\/[^/]+\/download/)) {
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "application/json" }),
        text: JSON.stringify({
          download_url: "https://chatgpt.com/backend-api/estuary/content?id=file-final-7357",
        }),
        body: null,
      };
    }
    if (u.startsWith("https://chatgpt.com/backend-api/estuary/content")) {
      const pngBytes = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
      return {
        status: 200,
        headers: makeHeaders({ "Content-Type": "image/png" }),
        text: `data:image/png;base64,${pngBytes.toString("base64")}`,
        body: null,
      };
    }
    return { status: 404, headers: makeHeaders(), text: "not mocked", body: null };
  });

  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.5",
      body: { messages: [{ role: "user", content: "generate an image of a kitten" }] },
      stream: false,
      credentials: { apiKey: "test-session-cookie" },
      signal: AbortSignal.timeout(20_000),
      log: null,
    });

    assert.equal(result.response.status, 200, "executor itself does not error");
    const json = await result.response.json();
    const content = String(json?.choices?.[0]?.message?.content || "");

    assert.ok(FakeWebSocket.instances.length >= 1, "a WebSocket connection was opened");

    // Expected/correct behavior: the celsius WebSocket delivered a complete,
    // well-formed tool-role image_asset_pointer message via chatgpt.com's
    // update_content.messages[] (plural) shape. OmniRoute should extract it,
    // resolve it, and append image markdown — just like the already-covered
    // update_content.message (singular) case in tests/unit/chatgpt-web.test.ts.
    assert.match(
      content,
      /!\[image\]\([^)]*\/v1\/chatgpt-web\/image\/[a-f0-9]+\)/,
      "BUG #7357: image pointer delivered via update_content.messages[] (plural) was not " +
        "resolved into markdown — waitForImageViaWebSocket() only recognizes the singular " +
        "update_content.message / payload.message / data.message shapes and silently drops " +
        "this frame, losing an already-completed upstream image."
    );
    assert.equal(
      json.x_image_resolution_failed,
      undefined,
      "resolution succeeded — no unresolved-pointer flag expected"
    );
  } finally {
    __setTlsFetchOverrideForTesting(null);
    if (previousWebSocket === undefined) delete (globalThis as Record<string, unknown>).WebSocket;
    else (globalThis as Record<string, unknown>).WebSocket = previousWebSocket;
    if (previousTimeout === undefined) delete process.env.OMNIROUTE_CGPT_WEB_IMAGE_TIMEOUT_MS;
    else process.env.OMNIROUTE_CGPT_WEB_IMAGE_TIMEOUT_MS = previousTimeout;
  }
});
