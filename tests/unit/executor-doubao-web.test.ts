import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/doubao-web.ts");

describe("DoubaoWebExecutor", () => {
  it("can be instantiated", () => {
    const executor = new mod.DoubaoWebExecutor();
    assert.ok(executor);
  });

  it("builds Dola cookie headers from JSON token extraction data", () => {
    const cookie = mod.buildDolaCookieHeader(
      JSON.stringify({
        sessionid: "sid",
        ttwid: "tt",
        s_v_web_id: "verify_abc",
      })
    );

    assert.equal(cookie, "sessionid=sid; ttwid=tt; s_v_web_id=verify_abc");
  });

  it("strips Cookie prefix from full Dola cookie headers", () => {
    const cookie = mod.buildDolaCookieHeader(
      "Cookie: sessionid=sid; ttwid=tt; s_v_web_id=verify_abc"
    );
    assert.equal(cookie, "sessionid=sid; ttwid=tt; s_v_web_id=verify_abc");
  });

  it("builds Dola query params without browser-only anti-bot signature params", () => {
    const params = mod.buildDolaQueryParams("sessionid=sid; ttwid=tt; s_v_web_id=verify_abc", {
      device_id: "1234567890123456789",
    });

    assert.equal(params.get("aid"), "495671");
    assert.equal(params.get("device_id"), "1234567890123456789");
    assert.equal(params.get("fp"), "verify_abc");
    assert.equal(params.has("msToken"), false);
    assert.equal(params.has("a_bogus"), false);
  });

  it("prefers s_v_web_id over fp when both fingerprint values exist", () => {
    const cookie = "sessionid=sid; ttwid=tt; s_v_web_id=verify_cookie; fp=verify_fp";
    const params = mod.buildDolaQueryParams(cookie, { fp: "verify_data" });

    assert.equal(mod.resolveDolaFingerprint(cookie, { fp: "verify_data" }), "verify_cookie");
    assert.equal(params.get("fp"), "verify_cookie");
  });

  it("accepts fp from the pasted credential when s_v_web_id is absent", () => {
    const credential = "sessionid=sid; ttwid=tt; fp=verify_from_url";
    const cookie = mod.buildDolaCookieHeader(credential);
    const params = mod.buildDolaQueryParams(cookie, undefined, credential);

    assert.equal(mod.resolveDolaFingerprint(cookie, undefined, credential), "verify_from_url");
    assert.equal(params.get("fp"), "verify_from_url");
  });

  it("builds the Dola new-conversation payload shape", () => {
    const payload = mod.buildDolaPayload(
      "user: hello",
      "dola-speed",
      "sessionid=sid; ttwid=tt; s_v_web_id=verify_abc"
    );
    const clientMeta = payload.client_meta as Record<string, unknown>;
    const option = payload.option as Record<string, unknown>;
    const ext = payload.ext as Record<string, unknown>;
    const messages = payload.messages as Array<Record<string, unknown>>;

    assert.equal(clientMeta.conversation_id, "");
    assert.equal(clientMeta.bot_id, "7339470689562525703");
    assert.equal(option.need_create_conversation, true);
    assert.deepEqual(option.conversation_init_option, { need_ack_conversation: true });
    assert.equal(option.need_deep_think, 0);
    assert.equal(ext.fp, "verify_abc");
    assert.equal(ext.use_deep_think, "0");
    assert.equal(ext.conversation_init_option, '{"need_ack_conversation":true}');
    assert.equal(messages.length, 1);
  });

  it("maps Dola Pro to deep-think value 3", () => {
    const payload = mod.buildDolaPayload(
      "user: hello",
      "dola-pro",
      "sessionid=sid; ttwid=tt; s_v_web_id=verify_abc"
    );
    const option = payload.option as Record<string, unknown>;
    const ext = payload.ext as Record<string, unknown>;

    assert.equal(option.need_deep_think, 3);
    assert.equal(ext.use_deep_think, "3");
  });

  it("extracts text deltas from Dola STREAM_MSG_NOTIFY and STREAM_CHUNK events", () => {
    const initial = mod.extractDolaTextDeltas({
      content: {
        content_block: [
          {
            content: {
              text_block: {
                text: "hello",
              },
            },
          },
        ],
      },
    });
    const deltas = mod.extractDolaTextDeltas({
      message_id: "1154824514127377",
      patch_op: [
        {
          patch_object: 1,
          patch_type: 1,
          patch_value: {
            content_block: [
              {
                block_type: 10000,
                content: {
                  text_block: {
                    text: " world",
                  },
                },
                is_finish: false,
                patch_type: 1,
              },
            ],
          },
        },
      ],
    });

    assert.deepEqual(initial, ["hello"]);
    assert.deepEqual(deltas, [" world"]);
  });

  it("defers Dola Pro reasoning text until the answer boundary", () => {
    const state = { deferUntilAnswer: true, answerStarted: false, bufferedDeltas: [] as string[] };
    const reasoning = mod.extractDolaTextDeltas(
      {
        patch_op: [
          {
            patch_value: {
              content_block: [
                {
                  block_type: 10000,
                  content: { text_block: { text: "reasoning" } },
                  is_finish: false,
                },
              ],
            },
          },
        ],
      },
      state
    );
    const answer = mod.extractDolaTextDeltas(
      {
        patch_op: [
          {
            patch_value: {
              content_block: [
                { block_type: 10040, content: { text_block: {} }, is_finish: true },
                { block_type: 10000, content: { text_block: { text: "2" } }, is_finish: false },
              ],
            },
          },
        ],
      },
      state
    );

    assert.deepEqual(reasoning, []);
    assert.deepEqual(answer, ["2"]);
  });

  it("detects Dola busy messages", () => {
    assert.equal(
      mod.isDolaBusyMessage("A lot of people are using the app right now. Please try again later."),
      true
    );
    assert.equal(mod.isDolaBusyMessage("2"), false);
  });

  it("returns a credential error when sessionid is missing", async () => {
    const executor = new mod.DoubaoWebExecutor();
    const result = await executor.execute({
      model: "dola-speed",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "" },
      signal: null,
    });

    assert.equal(result.response.status, 401);
    assert.equal(new URL(result.url).hostname, "www.dola.com");
  });

  it("returns a credential error when browser fingerprint is missing", async () => {
    const executor = new mod.DoubaoWebExecutor();
    const result = await executor.execute({
      model: "dola-speed",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "sessionid=sid; ttwid=tt" },
      signal: null,
    });
    const text = await result.response.text();

    assert.equal(result.response.status, 401);
    assert.match(text, /s_v_web_id|fp=verify/);
  });

  it("classifies Dola busy SSE text as a rate limit error", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(
        [
          "event: STREAM_MSG_NOTIFY",
          `data: ${JSON.stringify({
            content: {
              content_block: [
                {
                  content: {
                    text_block: {
                      text: "A lot of people are using the app right now. Please try again later.",
                    },
                  },
                },
              ],
            },
          })}`,
          "",
          "",
        ].join("\n"),
        { headers: { "Content-Type": "text/event-stream" } }
      )) as typeof fetch;

    try {
      const executor = new mod.DoubaoWebExecutor();
      const result = await executor.execute({
        model: "dola-speed",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "sessionid=sid; ttwid=tt; s_v_web_id=verify_abc" },
        signal: null,
      });
      const text = await result.response.text();

      assert.equal(result.response.status, 429);
      assert.match(text, /temporarily busy/i);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
