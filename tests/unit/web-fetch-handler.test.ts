import test from "node:test";
import assert from "node:assert/strict";
import { chmod, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const { handleWebFetch } = await import("../../open-sse/handlers/webFetch.ts");

// ── handleWebFetch — basic routing ───────────────────────────────────────────

test("handleWebFetch routes to firecrawl when provider=firecrawl", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        data: {
          markdown: "# Hello World",
          links: ["https://example.com/page"],
          metadata: { title: "Hello", description: "A test page" },
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleWebFetch(
      { url: "https://example.com", format: "markdown" },
      { apiKey: "test-key" },
      "firecrawl"
    );

    assert.equal(result.success, true, "should succeed");
    assert.ok(result.data, "should have data");
    assert.equal(result.data.provider, "firecrawl");
    assert.equal(result.data.url, "https://example.com");
    assert.ok(typeof result.data.content === "string", "content should be string");
    assert.ok(Array.isArray(result.data.links), "links should be array");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleWebFetch routes to jina-reader when provider=jina-reader", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        data: {
          content: "# Jina content",
          title: "Test",
          description: "desc",
          links: [],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleWebFetch(
      { url: "https://example.com", format: "markdown" },
      { apiKey: "jina-key" },
      "jina-reader"
    );

    assert.equal(result.success, true);
    assert.equal(result.data?.provider, "jina-reader");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleWebFetch routes to tinyfish when provider=tinyfish", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        results: [{ url: "https://example.com", title: "Test", text: "# TinyFish content" }],
        errors: [],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleWebFetch(
      { url: "https://example.com", format: "markdown" },
      { apiKey: "tf-key" },
      "tinyfish"
    );

    assert.equal(result.success, true);
    assert.equal(result.data?.provider, "tinyfish");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleWebFetch routes to rs-trafilatura without apiKey", async () => {
  const originalBin = process.env.OMNIROUTE_RS_WEBFETCH_BIN;
  const dir = await mkdtemp(join(tmpdir(), "omniroute-rs-webfetch-"));
  const bin = join(dir, "rs-webfetch-mock.mjs");
  await writeFile(
    bin,
    `#!/usr/bin/env node
console.log(JSON.stringify({
  url: "https://example.com",
  finalUrl: "https://example.com/final",
  content: { text: "# Local content\\n[link](https://example.com/page)" },
  metadata: { title: "Local title", description: "Local description" }
}));
`
  );
  await chmod(bin, 0o700);
  process.env.OMNIROUTE_RS_WEBFETCH_BIN = bin;

  try {
    const result = await handleWebFetch(
      { url: "https://example.com", format: "markdown", include_metadata: true },
      {},
      "rs-trafilatura"
    );

    assert.equal(result.success, true);
    assert.equal(result.data?.provider, "rs-trafilatura");
    assert.equal(result.data?.url, "https://example.com/final");
    assert.equal(result.data?.content, "# Local content\n[link](https://example.com/page)");
    assert.deepEqual(result.data?.metadata, {
      title: "Local title",
      description: "Local description",
    });
  } finally {
    if (originalBin === undefined) {
      delete process.env.OMNIROUTE_RS_WEBFETCH_BIN;
    } else {
      process.env.OMNIROUTE_RS_WEBFETCH_BIN = originalBin;
    }
  }
});

test("handleWebFetch rejects rs-trafilatura screenshots without apiKey", async () => {
  const result = await handleWebFetch(
    { url: "https://example.com", format: "screenshot" },
    {},
    "rs-trafilatura"
  );

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error ?? "", /does not support screenshots/);
});

test("handleWebFetch returns error 401 when no apiKey for firecrawl", async () => {
  const result = await handleWebFetch({ url: "https://example.com" }, {}, "firecrawl");

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.ok(result.error, "should have error message");
  // Error must not expose stack traces
  assert.ok(!result.error.includes("at /"), "error must not contain stack trace paths");
});

test("handleWebFetch returns error 401 when no apiKey for jina-reader", async () => {
  const result = await handleWebFetch({ url: "https://example.com" }, {}, "jina-reader");

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.ok(!result.error?.includes("at /"), "error must not contain stack trace paths");
});

test("handleWebFetch wraps fetch errors via buildErrorBody (no raw stack)", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    throw new Error("at /internal/path/executor.ts:42:10\nnetwork failure");
  };

  try {
    const result = await handleWebFetch(
      { url: "https://example.com" },
      { apiKey: "test-key" },
      "firecrawl"
    );

    assert.equal(result.success, false);
    assert.ok(result.status != null, "should have status");
    // Stack trace must be stripped
    assert.ok(!result.error?.includes("at /"), "error must not contain stack trace paths");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleWebFetch passes depth and wait_for_selector to firecrawl", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { body: Record<string, unknown> } = { body: {} };

  globalThis.fetch = async (_url, init) => {
    captured.body = JSON.parse(String((init as RequestInit).body ?? "{}"));
    return new Response(JSON.stringify({ data: { markdown: "" } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    await handleWebFetch(
      { url: "https://example.com", depth: 2, wait_for_selector: "main" },
      { apiKey: "test-key" },
      "firecrawl"
    );

    assert.equal(captured.body.maxDepth, 2, "should forward depth");
    assert.equal(captured.body.waitFor, "main", "should forward wait_for_selector");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
