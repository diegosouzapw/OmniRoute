import test from "node:test";
import assert from "node:assert/strict";

import {
  runWithCapture,
  type Capture,
  type ProviderRequestPrepared,
} from "../../open-sse/utils/providerRequestLogging.ts";

test("runWithCapture captures the actual JSON provider fetch body", async () => {
  const originalFetch = globalThis.fetch;
  const prepared: ProviderRequestPrepared[] = [];
  const sentBodies: unknown[] = [];
  const capture: Capture = {
    capture(request) {
      prepared.push(request);
    },
    body(fallback) {
      return prepared.at(-1)?.body ?? fallback;
    },
  };

  globalThis.fetch = async (_url, init = {}) => {
    sentBodies.push(JSON.parse(String(init.body)));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await runWithCapture(capture, () =>
      fetch("https://provider.example/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: "Bearer provider-key" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          messages: [{ role: "user", content: "hi" }],
          reasoning_effort: "high",
        }),
      })
    );

    assert.equal(prepared.length, 1);
    assert.deepEqual(prepared[0].body, sentBodies[0]);
    assert.equal(prepared[0].url, "https://provider.example/v1/chat/completions");
    assert.equal(prepared[0].headers.authorization, "Bearer provider-key");
    assert.equal((capture.body(null) as Record<string, unknown>).reasoning_effort, "high");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("runWithCapture ignores auth fetch bodies in the same executor scope", async () => {
  const originalFetch = globalThis.fetch;
  const prepared: ProviderRequestPrepared[] = [];
  const capture: Capture = {
    capture(request) {
      prepared.push(request);
    },
    body(fallback) {
      return prepared.at(-1)?.body ?? fallback;
    },
  };

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  try {
    await runWithCapture(capture, async () => {
      await fetch("https://oauth.example/token", {
        method: "POST",
        body: JSON.stringify({
          grant_type: "refresh_token",
          refresh_token: "refresh",
          client_id: "client",
        }),
      });
      await fetch("https://provider.example/v1/chat/completions", {
        method: "POST",
        body: JSON.stringify({
          model: "gpt-5",
          messages: [{ role: "user", content: "hi" }],
        }),
      });
    });

    assert.equal(prepared.length, 1);
    assert.equal((prepared[0].body as Record<string, unknown>).model, "gpt-5");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("runWithCapture does not duplicate an already prepared identical fetch", async () => {
  const originalFetch = globalThis.fetch;
  const prepared: ProviderRequestPrepared[] = [];
  const body = {
    model: "gpt-5",
    messages: [{ role: "user", content: "hi" }],
  };
  const bodyString = JSON.stringify(body);
  const url = "https://provider.example/v1/chat/completions";
  let latest: ProviderRequestPrepared | null = null;
  const capture: Capture = {
    capture(request) {
      latest = request;
      prepared.push(request);
    },
    body(fallback) {
      return latest?.body ?? fallback;
    },
    latest() {
      return latest;
    },
  };

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  try {
    await runWithCapture(capture, async () => {
      await capture.capture({ url, headers: {}, body, bodyString });
      await fetch(url, {
        method: "POST",
        body: bodyString,
      });
    });

    assert.equal(prepared.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
