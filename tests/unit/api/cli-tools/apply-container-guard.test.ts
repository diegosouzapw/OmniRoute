import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";

/**
 * Container-guard homologation for POST /api/cli-tools/apply.
 *
 * Both runtime modes are exercised by SCOPED `OMNIROUTE_CONTAINER` overrides
 * (set per test, restored in finally). The override is the documented test
 * seam of `isRunningInContainer()`; it is never forced globally — forcing it
 * off for the whole suite would hide a regression in the guard itself.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-apply-guard-data-"));
const TEST_XDG_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-apply-guard-xdg-"));
const originalDataDir = process.env.DATA_DIR;
const originalXdg = process.env.XDG_CONFIG_HOME;
// Fresh DB without a configured password → management auth is open, so these
// tests exercise the guard, not the auth stack (covered elsewhere).
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.XDG_CONFIG_HOME = TEST_XDG_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const { POST } = await import("../../../../src/app/api/cli-tools/apply/route.ts");
const { GET: GET_CONFIG, POST: POST_CONFIG } =
  await import("../../../../src/app/api/cli-tools/config/route.ts");

const OPENCODE_CONFIG = path.join(TEST_XDG_DIR, "opencode", "opencode.json");

// The OpenCode generator refuses to write without the live /v1/models catalog
// (context windows are catalog-sourced by design), so serve a minimal catalog
// from an in-test loopback server instead of mocking generator internals.
let catalogServer: http.Server;
let catalogBaseUrl = "";

function startCatalogServer(): Promise<string> {
  return new Promise((resolve) => {
    catalogServer = http.createServer((req, res) => {
      if (String(req.url).startsWith("/v1/models")) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            data: [{ id: "glm/glm-5.2", object: "model", context_length: 128000 }],
          })
        );
        return;
      }
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "not found" }));
    });
    catalogServer.listen(0, "127.0.0.1", () => {
      const address = catalogServer.address();
      const port = typeof address === "object" && address ? address.port : 0;
      resolve(`http://127.0.0.1:${port}`);
    });
  });
}

function applyRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost:3000/api/cli-tools/apply", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function withContainerMode<T>(mode: "1" | "0", run: () => Promise<T>): Promise<T> {
  const original = process.env.OMNIROUTE_CONTAINER;
  const originalAllow = process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE;
  process.env.OMNIROUTE_CONTAINER = mode;
  delete process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE;
  try {
    return await run();
  } finally {
    if (original === undefined) delete process.env.OMNIROUTE_CONTAINER;
    else process.env.OMNIROUTE_CONTAINER = original;
    if (originalAllow !== undefined) {
      process.env.OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE = originalAllow;
    }
  }
}

describe("POST /api/cli-tools/apply — container guard", () => {
  before(async () => {
    catalogBaseUrl = await startCatalogServer();
  });

  after(() => {
    catalogServer?.close();
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(TEST_XDG_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    if (originalDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = originalDataDir;
    if (originalXdg === undefined) delete process.env.XDG_CONFIG_HOME;
    else process.env.XDG_CONFIG_HOME = originalXdg;
  });

  it("refuses an OpenCode write in container mode with a safe 422", async () => {
    const res = await withContainerMode("1", () =>
      POST(
        applyRequest({
          toolId: "opencode",
          baseUrl: catalogBaseUrl,
          apiKey: "sk-test-guard",
        })
      )
    );
    assert.strictEqual(res.status, 422);
    const body = await res.json();
    assert.ok(body.containerEphemeralTarget, "422 must be keyed as containerEphemeralTarget");
    assert.strictEqual(body.hostSetupCommand, "omniroute setup-opencode");
    assert.ok(typeof body.error === "string" && body.error.length > 0);
    assert.ok(!body.error.includes("at /"), "error must not leak a stack trace");
    assert.ok(!body.error.includes("sk-test-guard"), "error must not leak the API key");
    assert.strictEqual(fs.existsSync(OPENCODE_CONFIG), false, "nothing may be written");
  });

  it("still serves dry-run previews in container mode without writing", async () => {
    const res = await withContainerMode("1", () =>
      POST(
        applyRequest({
          toolId: "opencode",
          baseUrl: catalogBaseUrl,
          apiKey: "sk-test-guard",
          dryRun: true,
        })
      )
    );
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.dryRun, true);
    assert.ok(String(body.content).includes(catalogBaseUrl));
    assert.strictEqual(fs.existsSync(OPENCODE_CONFIG), false, "dry-run must not write");
  });

  it("redacts literal credentials from Claude dry-run previews", async () => {
    const credential = "sentinel-claude-preview-secret";
    const res = await withContainerMode("1", () =>
      POST(
        applyRequest({
          toolId: "claude",
          baseUrl: catalogBaseUrl,
          apiKey: credential,
          dryRun: true,
        })
      )
    );
    assert.strictEqual(res.status, 200);
    const serialized = JSON.stringify(await res.json());
    assert.ok(!serialized.includes(credential), "preview response must not echo the credential");
    assert.ok(serialized.includes("[redacted]"), "preview should make the redaction explicit");
  });

  it("sanitizes generator errors into the standard error envelope", async () => {
    const secret = "sentinel-generator-error-secret";
    const res = await withContainerMode("0", () =>
      POST(
        applyRequest({
          toolId: `unknown\n    at /tmp/private/config.ts apiKey=${secret}`,
          baseUrl: catalogBaseUrl,
          apiKey: secret,
        })
      )
    );
    assert.strictEqual(res.status, 400);
    const body = await res.json();
    assert.strictEqual(typeof body.error?.message, "string");
    assert.strictEqual(body.error.type, "invalid_request_error");
    const serialized = JSON.stringify(body);
    assert.ok(!serialized.includes(secret));
    assert.ok(!serialized.includes("/tmp/private"));
    assert.ok(!serialized.includes("at /"));
  });

  it("redacts literal credentials from the config-generation endpoint", async () => {
    const credential = "sentinel-config-endpoint-secret";
    const res = await POST_CONFIG(
      new Request("http://localhost:3000/api/cli-tools/config", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          toolId: "claude",
          baseUrl: catalogBaseUrl,
          apiKey: credential,
        }),
      })
    );
    assert.strictEqual(res.status, 200);
    const serialized = JSON.stringify(await res.json());
    assert.ok(!serialized.includes(credential));
    assert.ok(serialized.includes("[redacted]"));
  });

  it("redacts credentials after a generator escapes quotes and backslashes", async () => {
    const credential = 'sentinel"quoted\\slash';
    const res = await POST_CONFIG(
      new Request("http://localhost:3000/api/cli-tools/config", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          toolId: "claude",
          baseUrl: catalogBaseUrl,
          apiKey: credential,
        }),
      })
    );

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(typeof body.content, "string");
    assert.ok(!body.content.includes("sentinel"), "escaped credentials must not survive redaction");
    assert.ok(body.content.includes("[redacted]"));
  });

  it("rejects credentials carried in the config preview query string", async () => {
    const credential = "sentinel-query-string-secret";
    const url = new URL("http://localhost:3000/api/cli-tools/config");
    url.searchParams.set("baseUrl", catalogBaseUrl);
    url.searchParams.set("apiKey", credential);

    const res = await GET_CONFIG(new Request(url));

    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.headers.get("cache-control"), "no-store");
    assert.ok(!JSON.stringify(await res.json()).includes(credential));
  });

  it("accepts batch-preview credentials only through a non-cacheable header", async () => {
    const credential = "sentinel-config-preview-header-secret";
    const url = new URL("http://localhost:3000/api/cli-tools/config");
    url.searchParams.set("baseUrl", catalogBaseUrl);

    const res = await GET_CONFIG(
      new Request(url, {
        headers: { "x-omniroute-config-api-key": credential },
      })
    );

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get("cache-control"), "no-store");
    const serialized = JSON.stringify(await res.json());
    assert.ok(!serialized.includes(credential));
    assert.ok(serialized.includes("[redacted]"));
  });

  it("rejects an invalid batch-preview baseUrl through the query schema", async () => {
    const url = new URL("http://localhost:3000/api/cli-tools/config");
    url.searchParams.set("baseUrl", "not-an-http-url");

    const res = await GET_CONFIG(
      new Request(url, {
        headers: { "x-omniroute-config-api-key": "sentinel-invalid-url-secret" },
      })
    );

    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.headers.get("cache-control"), "no-store");
    assert.strictEqual((await res.json()).error?.type, "invalid_request_error");
  });

  it("writes the valid OpenCode config on a host", async () => {
    const res = await withContainerMode("0", () =>
      POST(
        applyRequest({
          toolId: "opencode",
          baseUrl: catalogBaseUrl,
          apiKey: "sk-test-guard",
        })
      )
    );
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get("cache-control"), "no-store");
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.configPath, OPENCODE_CONFIG);
    assert.ok(fs.existsSync(OPENCODE_CONFIG), "host write must land");
    assert.strictEqual(
      fs.statSync(OPENCODE_CONFIG).mode & 0o777,
      0o600,
      "generated CLI config must be private"
    );
    const written = fs.readFileSync(OPENCODE_CONFIG, "utf-8");
    assert.ok(written.includes(catalogBaseUrl));
  });

  it("rejects malformed JSON and unknown write options without caching", async () => {
    for (const handler of [POST, POST_CONFIG]) {
      const invalidJson = await handler(
        new Request("http://localhost/api/cli-tools/config", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "{",
        })
      );
      assert.strictEqual(invalidJson.status, 400);
      assert.strictEqual(invalidJson.headers.get("cache-control"), "no-store");
      const invalidField = await handler(
        applyRequest({ toolId: "claude", apiKey: "sentinel", configPath: "/tmp/untrusted" })
      );
      assert.strictEqual(invalidField.status, 400);
      assert.ok(!JSON.stringify(await invalidField.json()).includes("/tmp/untrusted"));
    }
  });

  it("preserves the configured default base URL for preview requests", async () => {
    const originalBase = process.env.OMNIROUTE_BASE_URL;
    process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:23456/v1";
    try {
      const response = await POST_CONFIG(applyRequest({ toolId: "claude", apiKey: "sentinel" }));
      assert.strictEqual(response.status, 200);
      const config = JSON.parse((await response.json()).content);
      assert.strictEqual(config.env.ANTHROPIC_BASE_URL, "http://127.0.0.1:23456");
      assert.strictEqual(config.env.ANTHROPIC_AUTH_TOKEN, "[redacted]");
    } finally {
      if (originalBase === undefined) delete process.env.OMNIROUTE_BASE_URL;
      else process.env.OMNIROUTE_BASE_URL = originalBase;
    }
  });
});
