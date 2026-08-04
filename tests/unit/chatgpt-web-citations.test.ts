// ChatGPT-web citation-marker → Markdown link rendering (#6635).
//
// content_references metadata (grouped_webpages, sources_footnote, webpage/url
// mentions) is resolved into real Markdown links instead of raw ChatGPT UI
// private-use marker tokens (citeturn0search0, entity[...], etc.).
// These tests live in a dedicated file (chatgpt-web.test.ts is a frozen
// god-file at the file-size cap and cannot grow) — mirrors the minimal-mock
// pattern already used by chatgpt-web-tools-5240.test.ts.

import test from "node:test";
import assert from "node:assert/strict";

const { ChatGptWebExecutor, __resetChatGptWebCachesForTesting } = await import(
  "../../open-sse/executors/chatgpt-web.ts"
);
const { __setTlsFetchOverrideForTesting } = await import(
  "../../open-sse/services/chatgptTlsClient.ts"
);

// ─── Minimal TLS-fetch mock ──────────────────────────────────────────────────
// Tailored to the citation flow: root/DPL, session→accessToken, sentinel→token
// (no PoW), conv→SSE built from the caller-supplied events. Warmup GETs fall
// through to 404, which the executor tolerates.

function makeHeaders(map: Record<string, string> = {}) {
  const h = new Headers();
  for (const [k, v] of Object.entries(map)) h.set(k, String(v));
  return h;
}

function sseText(events: unknown[]): string {
  const chunks: string[] = [];
  for (const evt of events) {
    const { __event, ...payload } = evt as Record<string, unknown> & { __event?: string };
    if (__event) chunks.push(`event: ${__event}\r\n`);
    chunks.push(`data: ${JSON.stringify(payload)}\r\n\r\n`);
  }
  chunks.push("data: [DONE]\r\n\r\n");
  return chunks.join("");
}

function installMockFetch({
  conv,
  conversationDetail,
}: {
  conv: { status: number; events: unknown[] };
  conversationDetail?: { status: number; body: unknown };
}) {
  const calls = { urls: [] as string[], bodies: [] as unknown[], conversationDetail: 0 };

  __setTlsFetchOverrideForTesting(
    async (url: string, opts: { method?: string; body?: unknown } = {}) => {
      const u = String(url);
      calls.urls.push(u);
      calls.bodies.push(opts.body);
      const json = (body: unknown, status = 200) => ({
        status,
        headers: makeHeaders({ "Content-Type": "application/json" }),
        text: JSON.stringify(body),
        body: null,
      });

      if (
        (u === "https://chatgpt.com/" || u === "https://chatgpt.com") &&
        (opts.method || "GET") === "GET"
      ) {
        return {
          status: 200,
          headers: makeHeaders({ "Content-Type": "text/html" }),
          text: '<html data-build="prod-test123"><script src="https://cdn.oaistatic.com/_next/static/chunks/main-test.js"></script></html>',
          body: null,
        };
      }
      if (u.includes("/api/auth/session")) {
        return json({
          accessToken: "jwt-abc",
          expires: new Date(Date.now() + 3600_000).toISOString(),
          user: { id: "user-1" },
        });
      }
      if (u.includes("/sentinel/chat-requirements")) {
        return json({ token: "req-token", proofofwork: { required: false } });
      }
      // /backend-api/conversation/<id> — detail poll used by GPT-5.5 Pro handoff.
      if (conversationDetail) {
        const m1 = u.match(/\/backend-api\/conversation\/([^/?#]+)$/);
        if (m1) {
          calls.conversationDetail++;
          return json(conversationDetail.body, conversationDetail.status);
        }
      }
      if (
        u.endsWith("/backend-api/f/conversation") ||
        u.endsWith("/backend-api/conversation") ||
        /\/backend-api\/(f\/)?conversation\?/.test(u)
      ) {
        return {
          status: conv.status,
          headers: makeHeaders({ "Content-Type": "text/event-stream" }),
          text: sseText(conv.events),
          body: null,
        };
      }
      // Warmup (/me, /conversations, /models) — tolerated.
      return { status: 404, headers: makeHeaders(), text: "not mocked", body: null };
    }
  );

  return {
    calls,
    restore() {
      __setTlsFetchOverrideForTesting(null);
    },
  };
}

test("Non-streaming: resolves ChatGPT web citation markers into markdown links", async () => {
  __resetChatGptWebCachesForTesting();
  const urlMarker = "urlTesla";
  const citationMarker = "citeturn0search0turn0search3";
  const answerPrefix = `${urlMarker} FSD v14 is rolling out `;
  const m = installMockFetch({
    conv: {
      status: 200,
      events: [
        {
          conversation_id: "c1",
          message: {
            id: "m1",
            author: { role: "assistant" },
            content: {
              content_type: "text",
              parts: [`${answerPrefix}${citationMarker}`],
            },
            status: "finished_successfully",
            metadata: {
              content_references: [
                {
                  type: "webpage",
                  title: "Tesla",
                  matched_text: urlMarker,
                  start_idx: 0,
                  end_idx: urlMarker.length,
                  safe_urls: ["https://www.tesla.com/en_au/support/autopilot"],
                },
                {
                  type: "grouped_webpages",
                  matched_text: citationMarker,
                  start_idx: answerPrefix.length,
                  end_idx: answerPrefix.length + citationMarker.length,
                  items: [
                    {
                      title: "Tesla FSD v14 release notes",
                      url: "https://www.tesla.com/support/fsd-v14?utm_source=chatgpt.com",
                      attribution: "tesla.com",
                    },
                    {
                      title: "Owner discussion",
                      url: "https://example.com/owners/fsd-v14",
                      attribution: "example.com",
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.5-pro-extended",
      body: { messages: [{ role: "user", content: "latest Tesla FSD in Australia" }] },
      stream: false,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const json = await result.response.json();
    const content = json.choices[0].message.content;
    assert.match(
      content,
      /\[Tesla\]\(https:\/\/www\.tesla\.com\/en_au\/support\/autopilot\) FSD v14 is rolling out/
    );
    assert.match(
      content,
      /\[1\]\(https:\/\/www\.tesla\.com\/support\/fsd-v14\?utm_source=chatgpt\.com\)/
    );
    assert.match(content, /\[2\]\(https:\/\/example\.com\/owners\/fsd-v14\)/);
    assert.doesNotMatch(content, /|||turn0search/);
  } finally {
    m.restore();
  }
});

test("Streaming: buffers split ChatGPT citation markers until metadata can link them", async () => {
  __resetChatGptWebCachesForTesting();
  const citationMarker = "citeturn0search0turn0search3";
  const prefix = "Tesla FSD v14 is rolling out ";
  const m = installMockFetch({
    conv: {
      status: 200,
      events: [
        {
          conversation_id: "c1",
          message: {
            id: "m1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: [prefix] },
            status: "in_progress",
          },
        },
        {
          conversation_id: "c1",
          message: {
            id: "m1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: [prefix + "citeturn0search0"] },
            status: "in_progress",
          },
        },
        {
          conversation_id: "c1",
          message: {
            id: "m1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: [prefix + citationMarker + "."] },
            status: "finished_successfully",
            metadata: {
              content_references: [
                {
                  type: "grouped_webpages",
                  matched_text: citationMarker,
                  start_idx: prefix.length,
                  end_idx: prefix.length + citationMarker.length,
                  items: [
                    {
                      title: "Tesla source",
                      url: "https://www.tesla.com/fsd",
                      attribution: "tesla.com",
                    },
                    {
                      title: "Owners source",
                      url: "https://example.com/owners",
                      attribution: "example.com",
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.5-pro-extended",
      body: {
        messages: [{ role: "user", content: "latest Tesla FSD in Australia" }],
        stream: true,
      },
      stream: true,
      credentials: { apiKey: "test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(result.response.status, 200);
    const text = await result.response.text();
    const content = text
      .split("\n")
      .filter((l) => l.startsWith("data: ") && l !== "data: [DONE]")
      .map((l) => {
        try {
          return JSON.parse(l.slice(6));
        } catch {
          return null;
        }
      })
      .filter((j) => j?.choices?.[0]?.delta?.content)
      .map((j) => j.choices[0].delta.content)
      .join("");

    assert.equal(
      content,
      "Tesla FSD v14 is rolling out [1](https://www.tesla.com/fsd)[2](https://example.com/owners)."
    );
    assert.doesNotMatch(content, /|||turn0search/);
  } finally {
    m.restore();
  }
});

test("GPT-5.5 Pro non-streaming: stream_handoff polls conversation detail for final answer", async () => {
  __resetChatGptWebCachesForTesting();
  const citationMarker = "citeturn0search0";
  const m = installMockFetch({
    conv: {
      status: 200,
      events: [
        {
          conversation_id: "conv-pro",
          message: {
            id: "progress-1",
            author: { role: "assistant" },
            content: { content_type: "text", parts: ["Working on it…"] },
            status: "in_progress",
          },
        },
        { __event: "stream_handoff", conversation_id: "conv-pro" },
      ],
    },
    conversationDetail: {
      status: 200,
      body: {
        mapping: {
          thought: {
            message: {
              id: "thought",
              author: { role: "assistant" },
              content: { content_type: "thoughts", parts: ["hidden thinking"] },
              status: "finished_successfully",
              end_turn: true,
              create_time: 1,
              update_time: 1,
            },
          },
          final: {
            message: {
              id: "final",
              author: { role: "assistant" },
              content: {
                content_type: "text",
                parts: [`👉 Final full Pro answer. ${citationMarker}`],
              },
              status: "finished_successfully",
              end_turn: true,
              create_time: 2,
              update_time: 2,
              metadata: {
                content_references: [
                  {
                    type: "grouped_webpages",
                    matched_text: citationMarker,
                    start_idx: "👉 Final full Pro answer. ".length,
                    end_idx: "👉 Final full Pro answer. ".length + citationMarker.length,
                    items: [
                      {
                        title: "Polled Pro source",
                        url: "https://example.com/pro-source",
                        attribution: "example.com",
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  });
  try {
    const executor = new ChatGptWebExecutor();
    const result = await executor.execute({
      model: "gpt-5.5-pro-extended",
      body: { messages: [{ role: "user", content: "hard problem" }] },
      stream: false,
      credentials: { apiKey: "cookie-pro-poll" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    const json = await result.response.json();
    assert.equal(
      json.choices[0].message.content,
      "👉 Final full Pro answer. [1](https://example.com/pro-source)"
    );
    assert.equal(m.calls.conversationDetail, 1);
    const convIdx = m.calls.urls.findIndex((u) => u.endsWith("/backend-api/f/conversation"));
    const sentBody = JSON.parse(m.calls.bodies[convIdx]);
    assert.equal(sentBody.history_and_training_disabled, true);
  } finally {
    m.restore();
  }
});
