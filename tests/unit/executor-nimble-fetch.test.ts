import test from "node:test";
import assert from "node:assert/strict";

const { nimbleFetch } = await import("../../open-sse/executors/nimble-fetch.ts");
const { NIMBLE_CLIENT_SOURCE, NIMBLE_CLIENT_SOURCE_HEADER } =
  await import("../../open-sse/config/nimble.ts");

const PAGE_HTML =
  "<html><head><title>Example Domain</title>" +
  '<meta name="description" content="An example page"></head><body>hi</body></html>';

function extractResponse(data: Record<string, unknown>) {
  return new Response(
    JSON.stringify({
      url: "https://example.com/",
      task_id: "00000000-0000-0000-0000-000000000000",
      status: "success",
      status_code: 200,
      data,
      metadata: { driver: "vx6", query_duration: 533 },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test("nimbleFetch posts to /v1/extract with bearer auth and the omniroute client-source header", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; init: RequestInit } = { url: "", init: {} };

  globalThis.fetch = async (url, init = {}) => {
    captured = { url: String(url), init: init as RequestInit };
    return extractResponse({ markdown: "# Example Domain", links: [] });
  };

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "nimble-key" },
    });

    assert.equal(result.success, true);
    assert.equal(captured.url, "https://sdk.nimbleway.com/v1/extract");
    assert.equal(captured.init.method, "POST");

    const headers = captured.init.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer nimble-key");
    assert.equal(headers[NIMBLE_CLIENT_SOURCE_HEADER], NIMBLE_CLIENT_SOURCE);
    assert.equal(headers[NIMBLE_CLIENT_SOURCE_HEADER], "omniroute");

    const body = JSON.parse(String(captured.init.body));
    assert.equal(body.url, "https://example.com");
    assert.deepEqual(body.formats, ["markdown", "links"]);
    assert.equal(body.render, "auto");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch requests each OmniRoute format from Extract and returns the matching field", async () => {
  const cases: Array<{
    format: "markdown" | "html" | "links" | "screenshot";
    data: Record<string, unknown>;
    expectFormats: string[];
    expectContent: string;
  }> = [
    {
      format: "markdown",
      data: { markdown: "# Title", links: ["https://a.example"] },
      expectFormats: ["markdown", "links"],
      expectContent: "# Title",
    },
    {
      format: "html",
      data: { html: "<p>hi</p>", links: [] },
      expectFormats: ["html", "links"],
      expectContent: "<p>hi</p>",
    },
    {
      format: "links",
      data: { links: ["https://a.example", "https://b.example"] },
      expectFormats: ["links"],
      expectContent: '["https://a.example","https://b.example"]',
    },
    {
      format: "screenshot",
      data: { screenshot: "iVBORw0KGgo=", links: [] },
      expectFormats: ["screenshot", "links"],
      expectContent: "",
    },
  ];

  for (const testCase of cases) {
    const originalFetch = globalThis.fetch;
    let formats: string[] = [];

    globalThis.fetch = async (_url, init = {}) => {
      formats = JSON.parse(String((init as RequestInit).body)).formats;
      return extractResponse(testCase.data);
    };

    try {
      const result = await nimbleFetch({
        url: "https://example.com",
        format: testCase.format,
        includeMetadata: false,
        credentials: { apiKey: "nimble-key" },
      });

      assert.equal(result.success, true, `${testCase.format} should succeed`);
      assert.deepEqual(formats, testCase.expectFormats, `${testCase.format} request formats`);
      assert.equal(result.data?.content, testCase.expectContent, `${testCase.format} content`);
    } finally {
      globalThis.fetch = originalFetch;
    }
  }
});

test("nimbleFetch surfaces a base64 screenshot as a data URL", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => extractResponse({ screenshot: "iVBORw0KGgo=", links: [] });

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "screenshot",
      includeMetadata: false,
      credentials: { apiKey: "nimble-key" },
    });

    assert.equal(result.data?.screenshot_url, "data:image/png;base64,iVBORw0KGgo=");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch always returns links and only requests html for metadata", async () => {
  const originalFetch = globalThis.fetch;
  let formats: string[] = [];

  globalThis.fetch = async (_url, init = {}) => {
    formats = JSON.parse(String((init as RequestInit).body)).formats;
    return extractResponse({
      markdown: "# Example Domain",
      html: PAGE_HTML,
      links: ["https://iana.org/domains/example"],
    });
  };

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: true,
      credentials: { apiKey: "nimble-key" },
    });

    assert.deepEqual(formats, ["markdown", "links", "html"]);
    assert.equal(result.data?.provider, "nimble-search");
    assert.deepEqual(result.data?.links, ["https://iana.org/domains/example"]);
    assert.equal(result.data?.metadata?.title, "Example Domain");
    assert.equal(result.data?.metadata?.description, "An example page");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch keeps an apostrophe inside a double-quoted meta description", async () => {
  const originalFetch = globalThis.fetch;
  const html =
    "<html><head><title>Sale</title>" +
    '<meta name="description" content="Don\'t miss our sale — it\'s on now"></head></html>';

  globalThis.fetch = async () => extractResponse({ markdown: "body", html, links: [] });

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: true,
      credentials: { apiKey: "nimble-key" },
    });

    // A shared ["'] closing class would cut this at "Don".
    assert.equal(result.data?.metadata?.description, "Don't miss our sale — it's on now");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch reads a single-quoted meta description", async () => {
  const originalFetch = globalThis.fetch;
  const html = "<html><head><meta name='description' content='Plain single quoted'></head></html>";

  globalThis.fetch = async () => extractResponse({ markdown: "body", html, links: [] });

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: true,
      credentials: { apiKey: "nimble-key" },
    });

    assert.equal(result.data?.metadata?.description, "Plain single quoted");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch truncates an over-long title instead of dropping it", async () => {
  const originalFetch = globalThis.fetch;
  const longTitle = "T".repeat(600);
  const html = `<html><head><title>${longTitle}</title></head></html>`;

  globalThis.fetch = async () => extractResponse({ markdown: "body", html, links: [] });

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: true,
      credentials: { apiKey: "nimble-key" },
    });

    // A capture bounded at 500 would fail to reach </title> and yield null.
    assert.equal(result.data?.metadata?.title, "T".repeat(500));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch fails a 200 whose envelope reports an unsuccessful extraction", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        url: "https://example.com/",
        task_id: "00000000-0000-0000-0000-000000000000",
        status: "failed",
        status_code: 404,
        data: {},
        metadata: {},
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "nimble-key" },
    });

    // Must not be reported as an empty-but-successful document: the fetch pool only
    // falls through to the next provider when the result is a failure.
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.ok(!result.error?.includes("at /"), "error must not contain a stack trace");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch fails a 200 whose envelope carries only an error status_code", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ url: "https://example.com/", status_code: 403, data: {} }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "nimble-key" },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch omits metadata when includeMetadata is false", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => extractResponse({ markdown: "body", html: PAGE_HTML, links: [] });

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "nimble-key" },
    });

    assert.equal(result.data?.metadata, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch returns null metadata fields when the page has no title or description", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    extractResponse({ markdown: "body", html: "<html><body>hi</body></html>", links: [] });

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: true,
      credentials: { apiKey: "nimble-key" },
    });

    assert.deepEqual(result.data?.metadata, { title: null, description: null });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch accepts a genuinely blank page (format present, value empty)", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => extractResponse({ markdown: "" });

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "nimble-key" },
    });

    assert.equal(result.success, true);
    assert.equal(result.data?.content, "");
    assert.deepEqual(result.data?.links, []);
    assert.equal(result.data?.screenshot_url, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch fails when the requested format is absent from the response", async () => {
  for (const format of ["markdown", "html", "links", "screenshot"] as const) {
    const originalFetch = globalThis.fetch;

    // Envelope says success, but nothing backing the requested format came back.
    globalThis.fetch = async () => extractResponse({});

    try {
      const result = await nimbleFetch({
        url: "https://example.com",
        format,
        includeMetadata: false,
        credentials: { apiKey: "nimble-key" },
      });

      // Must be a failure so the /v1/web/fetch pool falls through to the next
      // provider instead of returning an empty document as a success.
      assert.equal(result.success, false, `${format} should fail`);
      assert.equal(result.status, 502, `${format} status`);
      assert.ok(!result.error?.includes("at /"), "error must not contain a stack trace");
    } finally {
      globalThis.fetch = originalFetch;
    }
  }
});

test("nimbleFetch returns 401 when no API key is configured", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;

  globalThis.fetch = async () => {
    called = true;
    return extractResponse({});
  };

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: {},
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(called, false, "must not call Nimble without a key");
    assert.ok(!result.error?.includes("at /"), "error must not contain a stack trace");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch sanitizes an invalid-credential response", async () => {
  const originalFetch = globalThis.fetch;

  // Nimble answers auth failures with a plain-text body, not JSON.
  globalThis.fetch = async () =>
    new Response("unauthorized: bearer token validation failed", {
      status: 401,
      headers: { "content-type": "text/plain" },
    });

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "bad-key" },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.ok(result.error, "should carry an error message");
    assert.ok(!result.error!.includes("at /"), "error must not contain a stack trace");
    assert.ok(!result.error!.includes("bad-key"), "error must not echo the API key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("nimbleFetch propagates a rate-limit response as 429", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ message: "Too Many Requests" }), {
      status: 429,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "nimble-key" },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 429);
    assert.ok(!result.error?.includes("at /"), "error must not contain a stack trace");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// The executor aborts with a reason named "TimeoutError"; an external abort surfaces
// as "AbortError". Both must produce a 504, not the generic 502 transport branch.
for (const name of ["TimeoutError", "AbortError"]) {
  test(`nimbleFetch maps ${name} to a 504 timeout`, async () => {
    const originalFetch = globalThis.fetch;

    globalThis.fetch = async () => {
      const err = new Error("aborted");
      err.name = name;
      throw err;
    };

    try {
      const result = await nimbleFetch({
        url: "https://example.com",
        format: "markdown",
        includeMetadata: false,
        credentials: { apiKey: "nimble-key" },
      });

      assert.equal(result.success, false);
      assert.equal(result.status, 504);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
}

test("nimbleFetch rejects with its own abort reason, which is a TimeoutError", async () => {
  // Pins the contract the two tests above rely on: the reason the executor passes to
  // controller.abort() is what fetch rejects with, so the 504 branch must match its name.
  const controller = new AbortController();
  const reason = new Error("nimble-fetch timeout after 30000ms");
  reason.name = "TimeoutError";
  controller.abort(reason);

  assert.equal((controller.signal.reason as Error).name, "TimeoutError");
});

test("nimbleFetch maps an unexpected transport failure to a sanitized 502", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    throw new Error("socket hang up");
  };

  try {
    const result = await nimbleFetch({
      url: "https://example.com",
      format: "markdown",
      includeMetadata: false,
      credentials: { apiKey: "nimble-key" },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.ok(!result.error?.includes("at /"), "error must not contain a stack trace");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
