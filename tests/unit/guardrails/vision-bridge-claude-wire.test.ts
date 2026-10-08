/**
 * Regression: claude-wire format vision targets (MiniMax, Z.AI, Kimi, …)
 * reject remote image URLs (MiniMax 403 code 2013). The vision bridge must
 * normalize remote URLs to base64 data URIs for these targets.
 */
import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";

// Stub DNS for fetchRemoteImage's GHSA-cmhj-wh2f-9cgx DNS-rebinding guard
// (assertHostnameResolvesPublic in src/shared/network/remoteImageFetch.ts).
// Since GHSA-34rg-3pqj-35g9 the vision bridge pins `guard: "public-only"`, so every
// remote image hostname is resolved before the injected fetch is reached; the
// example.com hosts below must not depend on real DNS in CI. Node --test runs each
// file in its own process, so this rebinding does not leak across files.
const originalDnsLookup = dns.promises.lookup;
(dns.promises as { lookup: unknown }).lookup = (async (
  _hostname: string,
  options?: { all?: boolean }
) => {
  const record = { address: "203.0.113.1", family: 4 };
  return options && options.all ? [record] : record;
}) as typeof dns.promises.lookup;
process.on("exit", () => {
  (dns.promises as { lookup: unknown }).lookup = originalDnsLookup;
});

const { isClaudeWireFormatModel, ensureBase64ImagesForClaudeWire } =
  await import("../../../src/lib/guardrails/visionBridgeHelpers.ts");

test("isClaudeWireFormatModel: true for anthropic and claude-format registry providers", () => {
  assert.strictEqual(isClaudeWireFormatModel("anthropic/claude-sonnet-4"), true);
  assert.strictEqual(isClaudeWireFormatModel("zai/glm-5"), true);
  assert.strictEqual(isClaudeWireFormatModel("claude/claude-opus"), true);
  assert.strictEqual(isClaudeWireFormatModel("wafer/wafer-model"), true);
});

test("isClaudeWireFormatModel: false for openai-format providers", () => {
  assert.strictEqual(isClaudeWireFormatModel("openai/gpt-4o-mini"), false);
  // minimax deliberately moved claude→openai format so images work (#9463).
  assert.strictEqual(isClaudeWireFormatModel("minimax/MiniMax-M3"), false);
  assert.strictEqual(isClaudeWireFormatModel("kiro/minimax-m2.5"), false);
  assert.strictEqual(isClaudeWireFormatModel("auto/best-vision"), false);
  assert.strictEqual(isClaudeWireFormatModel(null), false);
});

test("ensureBase64ImagesForClaudeWire: passthrough for non-claude-wire models", async () => {
  const body = {
    model: "openai/gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "hi" },
          { type: "image_url", image_url: { url: "https://example.com/a.png" } },
        ],
      },
    ],
  };
  const out = await ensureBase64ImagesForClaudeWire(body, "openai/gpt-4o-mini");
  assert.strictEqual(out, body, "non-claude-wire body must be returned untouched");
});

test("ensureBase64ImagesForClaudeWire: keeps data-URI images as-is", async () => {
  const dataUri = "data:image/png;base64,iVBORw0KGgo=";
  const body = {
    model: "zai/glm-5",
    messages: [
      {
        role: "user",
        content: [{ type: "image_url", image_url: { url: dataUri } }],
      },
    ],
  };
  const out = await ensureBase64ImagesForClaudeWire(body, "zai/glm-5");
  const part = out.messages[0].content[0];
  assert.strictEqual(part.image_url.url, dataUri);
});

test("ensureBase64ImagesForClaudeWire: resolves remote URLs to base64 for claude-wire targets", async () => {
  const pngBase64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(new Uint8Array(Buffer.from(pngBase64, "base64")), {
      status: 200,
      headers: { "content-type": "image/png" },
    });

  try {
    const body = {
      model: "zai/glm-5",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What is this?" },
            { type: "image_url", image_url: { url: "https://example.com/cat.png" } },
          ],
        },
      ],
    };
    const out = await ensureBase64ImagesForClaudeWire(
      body,
      "zai/glm-5",
      async () =>
        new Response(new Uint8Array(Buffer.from(pngBase64, "base64")), {
          status: 200,
          headers: { "content-type": "image/png" },
        })
    );
    const part = out.messages[0].content[1];
    assert.ok(
      part.image_url.url.startsWith("data:image/png;base64,"),
      "remote URL must be resolved to a base64 data URI"
    );
    assert.ok(part.image_url.url.includes(pngBase64));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("ensureBase64ImagesForClaudeWire: fail-open when the remote fetch fails", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("network down");
  };

  try {
    const body = {
      model: "zai/glm-5",
      messages: [
        {
          role: "user",
          content: [{ type: "image_url", image_url: { url: "https://example.com/cat.png" } }],
        },
      ],
    };
    const out = await ensureBase64ImagesForClaudeWire(body, "zai/glm-5", async () => {
      throw new Error("network down");
    });
    const part = out.messages[0].content[0];
    assert.strictEqual(part.image_url.url, "https://example.com/cat.png");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// GHSA-34rg-3pqj-35g9 — the vision bridge inlines a user-supplied `image_url` to base64 for
// claude-wire targets (`visionBridge.ts` reroute) and for the Anthropic describe self-call.
// `fetchRemoteImageAsDataUri()` called `fetchRemoteImage()` with only `{ signal, fetchImpl }`,
// so the URL was validated under the OPERATOR outbound policy (`block-metadata` on a
// default install: loopback/LAN allowed, DNS check skipped) instead of `public-only`. The
// helper is fail-open, so the observable contract is: the injected fetch is NEVER invoked
// for a private host and the part is left untouched (not inlined).
for (const privateUrl of ["http://127.0.0.1:1/x.png", "http://192.168.1.50/x.png"]) {
  test(`ensureBase64ImagesForClaudeWire: never fetches a private image_url (${privateUrl}) (GHSA-34rg-3pqj-35g9)`, async () => {
    const fetchedUrls: string[] = [];
    const body = {
      model: "zai/glm-5",
      messages: [
        {
          role: "user",
          content: [{ type: "image_url", image_url: { url: privateUrl } }],
        },
      ],
    };

    const out = await ensureBase64ImagesForClaudeWire(body, "zai/glm-5", async (input) => {
      fetchedUrls.push(String(input));
      // Canary: on the vulnerable code these bytes are inlined into the rerouted body.
      return new Response(new Uint8Array([0x89, 0x50, 0x4e, 0x47]), {
        status: 200,
        headers: { "content-type": "image/png" },
      });
    });

    assert.deepStrictEqual(fetchedUrls, [], "the private URL must never be fetched");
    const part = out.messages[0].content[0];
    assert.strictEqual(part.image_url.url, privateUrl, "part must be left untouched (fail-open)");
  });
}

test("ensureBase64ImagesForClaudeWire: still inlines a public image_url whose DNS resolves to a public IP (GHSA-34rg-3pqj-35g9)", async () => {
  // The module-level DNS stub answers a public IP, so the `public-only` rebinding guard
  // passes and the injected fetch is reached.
  const fetchedUrls: string[] = [];
  const body = {
    model: "zai/glm-5",
    messages: [
      {
        role: "user",
        content: [{ type: "image_url", image_url: { url: "https://cdn.example.com/public.png" } }],
      },
    ],
  };
  const out = await ensureBase64ImagesForClaudeWire(body, "zai/glm-5", async (input) => {
    fetchedUrls.push(String(input));
    return new Response(new Uint8Array([0x89, 0x50, 0x4e, 0x47]), {
      status: 200,
      headers: { "content-type": "image/png" },
    });
  });
  assert.deepStrictEqual(fetchedUrls, ["https://cdn.example.com/public.png"]);
  assert.ok(out.messages[0].content[0].image_url.url.startsWith("data:image/png;base64,"));
});
