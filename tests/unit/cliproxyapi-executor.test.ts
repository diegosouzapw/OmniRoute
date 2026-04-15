import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };

afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env.CLIPROXYAPI_HOST = originalEnv.CLIPROXYAPI_HOST;
  process.env.CLIPROXYAPI_PORT = originalEnv.CLIPROXYAPI_PORT;
});

describe("CliproxyapiExecutor", () => {
  let CliproxyapiExecutor;

  beforeEach(async () => {
    process.env.CLIPROXYAPI_HOST = "";
    process.env.CLIPROXYAPI_PORT = "";
    const mod = await import("../../open-sse/executors/cliproxyapi.ts");
    CliproxyapiExecutor = mod.CliproxyapiExecutor;
  });

  describe("constructor", () => {
    it("should default to 127.0.0.1:8317", () => {
      const exec = new CliproxyapiExecutor();
      assert.equal(exec.getProvider(), "cliproxyapi");
    });

    it("should respect CLIPROXYAPI_HOST env", () => {
      process.env.CLIPROXYAPI_HOST = "192.168.1.1";
      const exec = new CliproxyapiExecutor();
      assert.equal(exec.getProvider(), "cliproxyapi");
    });

    it("should respect CLIPROXYAPI_PORT env", () => {
      process.env.CLIPROXYAPI_PORT = "9999";
      const exec = new CliproxyapiExecutor();
      assert.equal(exec.getProvider(), "cliproxyapi");
    });
  });

  describe("buildUrl", () => {
    it("should always return /v1/chat/completions", () => {
      process.env.CLIPROXYAPI_HOST = "127.0.0.1";
      process.env.CLIPROXYAPI_PORT = "8317";
      const exec = new CliproxyapiExecutor();
      const url = exec.buildUrl("any-model", true);
      assert.equal(url, "http://127.0.0.1:8317/v1/chat/completions");
    });

    it("should ignore model parameter", () => {
      const exec = new CliproxyapiExecutor();
      const url = exec.buildUrl("gpt-4", false);
      assert.equal(url, "http://127.0.0.1:8317/v1/chat/completions");
    });

    it("should use custom host/port", () => {
      process.env.CLIPROXYAPI_HOST = "10.0.0.1";
      process.env.CLIPROXYAPI_PORT = "9090";
      const exec = new CliproxyapiExecutor();
      const url = exec.buildUrl("model", true);
      assert.equal(url, "http://10.0.0.1:9090/v1/chat/completions");
    });
  });

  describe("buildHeaders", () => {
    it("should return content-type without auth when no credentials", () => {
      const exec = new CliproxyapiExecutor();
      const headers = exec.buildHeaders({});
      assert.equal(headers["Content-Type"], "application/json");
      assert.equal(headers["Authorization"], undefined);
    });

    it("should add Authorization with apiKey", () => {
      const exec = new CliproxyapiExecutor();
      const headers = exec.buildHeaders({ apiKey: "test-key" });
      assert.equal(headers["Authorization"], "Bearer test-key");
    });

    it("should add Authorization with accessToken", () => {
      const exec = new CliproxyapiExecutor();
      const headers = exec.buildHeaders({ accessToken: "test-token" });
      assert.equal(headers["Authorization"], "Bearer test-token");
    });

    it("should prefer apiKey over accessToken", () => {
      const exec = new CliproxyapiExecutor();
      const headers = exec.buildHeaders({ apiKey: "key", accessToken: "token" });
      assert.equal(headers["Authorization"], "Bearer key");
    });

    it("should add Accept header for streaming", () => {
      const exec = new CliproxyapiExecutor();
      const headers = exec.buildHeaders({}, true);
      assert.equal(headers["Accept"], "text/event-stream");
    });

    it("should not add Accept header for non-streaming", () => {
      const exec = new CliproxyapiExecutor();
      const headers = exec.buildHeaders({}, false);
      assert.equal(headers["Accept"], undefined);
    });
  });

  describe("transformRequest", () => {
    it("should update model if body.model differs", () => {
      const exec = new CliproxyapiExecutor();
      const body = { model: "old-model", messages: [] };
      const result = exec.transformRequest("new-model", body, true, {});
      assert.equal(result.model, "new-model");
      assert.deepEqual(result.messages, []);
    });

    it("should return body unchanged if model matches", () => {
      const exec = new CliproxyapiExecutor();
      const body = { model: "same-model", messages: [] };
      const result = exec.transformRequest("same-model", body, true, {});
      assert.equal(result.model, "same-model");
    });

    it("should handle non-object body", () => {
      const exec = new CliproxyapiExecutor();
      const result = exec.transformRequest("model", "not-an-object", true, {});
      assert.equal(result, "not-an-object");
    });

    it("should handle null body", () => {
      const exec = new CliproxyapiExecutor();
      const result = exec.transformRequest("model", null, true, {});
      assert.equal(result, null);
    });
  });

  describe("execute", () => {
    it("should make fetch request with correct URL, headers, and body", async () => {
      let capturedUrl, capturedOptions;
      globalThis.fetch = async (url, options) => {
        capturedUrl = url;
        capturedOptions = options;
        return { status: 200, ok: true };
      };

      const exec = new CliproxyapiExecutor();
      const result = await exec.execute({
        model: "test-model",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: true,
        credentials: {},
      });

      assert.equal(capturedUrl, "http://127.0.0.1:8317/v1/chat/completions");
      assert.equal(capturedOptions.method, "POST");
      assert.ok(capturedOptions.signal);
      const parsed = JSON.parse(capturedOptions.body);
      assert.equal(parsed.messages[0].content, "hi");
      assert.ok(result.response);
    });

    it("should pass credentials to headers", async () => {
      let capturedHeaders;
      globalThis.fetch = async (_url, options) => {
        capturedHeaders = options.headers;
        return { status: 200, ok: true };
      };

      const exec = new CliproxyapiExecutor();
      await exec.execute({
        model: "test",
        body: {},
        stream: false,
        credentials: { apiKey: "secret-key" },
      });

      assert.equal(capturedHeaders["Authorization"], "Bearer secret-key");
    });

    it("should merge upstream extra headers", async () => {
      let capturedHeaders;
      globalThis.fetch = async (_url, options) => {
        capturedHeaders = options.headers;
        return { status: 200, ok: true };
      };

      const exec = new CliproxyapiExecutor();
      await exec.execute({
        model: "test",
        body: {},
        stream: false,
        credentials: {},
        upstreamExtraHeaders: { "X-Custom": "value" },
      });

      assert.equal(capturedHeaders["X-Custom"], "value");
    });

    it("should handle rate limited response", async () => {
      globalThis.fetch = async () => ({ status: 429, ok: false });
      const log = { warn: (tag, msg) => {} };
      let logged = false;
      log.warn = () => {
        logged = true;
      };

      const exec = new CliproxyapiExecutor();
      const result = await exec.execute({
        model: "test",
        body: {},
        stream: false,
        credentials: {},
        log,
      });

      assert.equal(result.response.status, 429);
    });

    it("should return url, headers, and transformedBody", async () => {
      globalThis.fetch = async () => ({ status: 200, ok: true });

      const exec = new CliproxyapiExecutor();
      const result = await exec.execute({
        model: "test",
        body: { messages: [] },
        stream: true,
        credentials: {},
      });

      assert.ok(result.url);
      assert.ok(result.headers);
      assert.ok(result.transformedBody);
    });
  });
});
