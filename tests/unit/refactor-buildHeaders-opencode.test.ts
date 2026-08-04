import test from "node:test";
import assert from "node:assert/strict";

import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

// ---------------------------------------------------------------------------
// OpencodeExecutor.buildHeaders — request format auth switch
// ---------------------------------------------------------------------------

test("OpencodeExecutor.buildHeaders: default format uses Bearer Authorization", () => {
  const executor = new OpencodeExecutor("opencode");
  // _requestFormat defaults to null → default Bearer path
  const headers = executor.buildHeaders({ apiKey: "sk-oc-1" }, true);
  assert.equal(headers["Authorization"], "Bearer sk-oc-1");
  assert.equal(headers["x-api-key"], undefined);
});

test("OpencodeExecutor.buildHeaders: claude format uses x-api-key header", () => {
  const executor = new OpencodeExecutor("opencode");
  executor._requestFormat = "claude";
  const headers = executor.buildHeaders({ apiKey: "sk-claude-1" }, true);
  assert.equal(headers["x-api-key"], "sk-claude-1");
  assert.equal(headers["Authorization"], undefined);
});

test("OpencodeExecutor.buildHeaders: claude format sets anthropic-version header", () => {
  const executor = new OpencodeExecutor("opencode");
  executor._requestFormat = "claude";
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["anthropic-version"], "2023-06-01");
});

test("OpencodeExecutor.buildHeaders: non-claude format omits anthropic-version", () => {
  const executor = new OpencodeExecutor("opencode");
  executor._requestFormat = "openai";
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["anthropic-version"], undefined);
});

test("OpencodeExecutor.buildHeaders: stream=true sets Accept text/event-stream", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["Accept"], "text/event-stream");
});

test("OpencodeExecutor.buildHeaders: stream=false omits Accept header", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, false);
  assert.equal(headers["Accept"], undefined);
});

test("OpencodeExecutor.buildHeaders: uses accessToken when apiKey is absent", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ accessToken: "tok-oc" }, true);
  assert.equal(headers["Authorization"], "Bearer tok-oc");
});

test("OpencodeExecutor.buildHeaders: apiKey takes precedence over accessToken", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "sk-pri", accessToken: "tok-sec" }, true);
  assert.equal(headers["Authorization"], "Bearer sk-pri");
});

test("OpencodeExecutor.buildHeaders: claude format with accessToken still uses x-api-key", () => {
  const executor = new OpencodeExecutor("opencode");
  executor._requestFormat = "claude";
  const headers = executor.buildHeaders({ apiKey: "sk-a", accessToken: "tok-b" }, true);
  assert.equal(headers["x-api-key"], "sk-a");
  assert.equal(headers["Authorization"], undefined);
});

test("OpencodeExecutor.buildHeaders: Content-Type always application/json", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["Content-Type"], "application/json");
});

test("OpencodeExecutor.buildHeaders: omits User-Agent when no client UA (forward-only, not fabricated)", () => {
  // Forward-only contract (see opencode-executor.test.ts): opencode client identity headers
  // are opencode-internal — inventing them risks upstream rejection, so we never fabricate a
  // default. A pure dedup refactor (#5720) briefly regressed this by defaulting to
  // "opencode/local"; the executor forwards a client-sent User-Agent but adds none of its own.
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["User-Agent"], undefined);
});

test("OpencodeExecutor.buildHeaders: preserves client User-Agent when provided", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true, {
    "User-Agent": "opencode/1.17.12",
  });
  assert.equal(headers["User-Agent"], "opencode/1.17.12");
});

test("OpencodeExecutor.buildHeaders: omits x-opencode-client when absent (forward-only, not fabricated)", () => {
  // x-opencode-client / x-opencode-project valid values are opencode-internal; fabricating a
  // default ("cli") risks upstream rejection, so they stay forward-only (see opencode-executor.test.ts).
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true);
  assert.equal(headers["x-opencode-client"], undefined);
});

test("OpencodeExecutor.buildHeaders: preserves x-opencode-client from client headers", () => {
  const executor = new OpencodeExecutor("opencode");
  const headers = executor.buildHeaders({ apiKey: "key-1" }, true, {
    "x-opencode-client": "desktop",
  });
  assert.equal(headers["x-opencode-client"], "desktop");
});

// ---------------------------------------------------------------------------
// #8467 — Extra API Keys rotation (resolveEffectiveKey)
// ---------------------------------------------------------------------------

test("OpencodeExecutor.buildHeaders: rotates extra API keys (Bearer)", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  const credentials = {
    apiKey: "primary-key",
    connectionId: "opencode-rotation-bearer",
    providerSpecificData: { extraApiKeys: ["extra-key"] } as Record<string, unknown>,
  };

  // Clear sticky selectedKeyId between calls so getValidApiKey round-robin is exercised.
  const seen = new Set<string>();
  for (let i = 0; i < 4; i++) {
    delete credentials.providerSpecificData.selectedKeyId;
    const headers = executor.buildHeaders(credentials, true);
    const token = headers["Authorization"]?.replace(/^Bearer /, "");
    assert.ok(token === "primary-key" || token === "extra-key", `unexpected token: ${token}`);
    seen.add(token ?? "");
  }
  assert.ok(seen.has("primary-key"));
  assert.ok(seen.has("extra-key"));
  assert.ok(
    typeof credentials.providerSpecificData.selectedKeyId === "string" &&
      credentials.providerSpecificData.selectedKeyId.length > 0,
    "selectedKeyId should be persisted after rotation"
  );
});

test("OpencodeExecutor.buildHeaders: rotates extra API keys (claude x-api-key)", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  executor._requestFormat = "claude";
  const credentials = {
    apiKey: "primary-key",
    connectionId: "opencode-rotation-claude",
    providerSpecificData: { extraApiKeys: ["extra-key"] } as Record<string, unknown>,
  };

  const seen = new Set<string>();
  for (let i = 0; i < 4; i++) {
    delete credentials.providerSpecificData.selectedKeyId;
    const headers = executor.buildHeaders(credentials, true);
    const key = headers["x-api-key"];
    assert.ok(key === "primary-key" || key === "extra-key", `unexpected x-api-key: ${key}`);
    seen.add(key ?? "");
  }
  assert.ok(seen.has("primary-key"));
  assert.ok(seen.has("extra-key"));
});

test("OpencodeExecutor.buildHeaders: empty primary + extras still sends Authorization", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const headers = executor.buildHeaders(
    {
      apiKey: "",
      connectionId: "opencode-empty-primary",
      providerSpecificData: { extraApiKeys: ["only-extra-key"] },
    },
    true
  );
  assert.equal(headers["Authorization"], "Bearer only-extra-key");
});

test("OpencodeExecutor.buildHeaders: #8467 guard — override uses resolveEffectiveKey path", async () => {
  // Source-level guard: OpencodeExecutor overrides buildHeaders and must not
  // reintroduce a direct credentials.apiKey read that bypasses extra-keys rotation.
  const fs = await import("node:fs");
  const path = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const here = path.dirname(fileURLToPath(import.meta.url));
  const source = fs.readFileSync(
    path.resolve(here, "../../open-sse/executors/opencode.ts"),
    "utf8"
  );
  const buildHeadersStart = source.indexOf("buildHeaders(");
  assert.ok(buildHeadersStart >= 0);
  const buildHeadersBody = source.slice(buildHeadersStart, buildHeadersStart + 1200);
  assert.match(buildHeadersBody, /resolveEffectiveKey\s*\(/);
  assert.doesNotMatch(
    buildHeadersBody,
    /credentials\?\.apiKey\s*\|\|\s*credentials\?\.accessToken/
  );
});
