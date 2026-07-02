import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DefaultExecutor transitively touches the DB layer (provider/key rotation
// lookups) at import/call time. Point DATA_DIR at an isolated temp dir
// BEFORE importing it so these tests never read/write the operator's real
// ~/.omniroute database (see CLAUDE.md "Database Handles in Tests").
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-client-identity-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const {
  CLIENT_IDENTITY_PROFILES,
  CLIENT_IDENTITY_PROFILE_OPTIONS,
  getClientIdentityProfileHeaders,
  isClientIdentityProfileId,
} = await import("../../src/shared/constants/clientIdentityProfiles.ts");
const { isForbiddenCustomHeaderName } = await import("../../src/shared/constants/upstreamHeaders.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("getClientIdentityProfileHeaders: default profile adds no headers", () => {
  assert.deepEqual(getClientIdentityProfileHeaders("default"), {});
  assert.deepEqual(getClientIdentityProfileHeaders(undefined), {});
  assert.deepEqual(getClientIdentityProfileHeaders(null), {});
});

test("getClientIdentityProfileHeaders: unknown profile id falls back to no headers", () => {
  assert.deepEqual(getClientIdentityProfileHeaders("not-a-real-profile"), {});
});

test("getClientIdentityProfileHeaders: known CLI profiles expose their preset headers", () => {
  const claudeCli = getClientIdentityProfileHeaders("claude-cli");
  assert.equal(claudeCli["User-Agent"], "claude-cli/2.1.195 (external, cli)");
  assert.equal(claudeCli["X-App"], "cli");

  const codexCli = getClientIdentityProfileHeaders("codex-cli");
  assert.equal(codexCli["User-Agent"], "codex_cli_rs/0.136.0");
  assert.equal(codexCli.originator, "codex_cli_rs");

  const geminiCli = getClientIdentityProfileHeaders("gemini-cli");
  assert.equal(geminiCli["User-Agent"], "GeminiCLI/0.1.0 (linux; x64)");
});

test("getClientIdentityProfileHeaders: returns a fresh mutable copy (catalog stays frozen)", () => {
  const headers = getClientIdentityProfileHeaders("claude-cli");
  headers["User-Agent"] = "tampered";
  assert.equal(
    CLIENT_IDENTITY_PROFILES["claude-cli"].headers["User-Agent"],
    "claude-cli/2.1.195 (external, cli)"
  );
});

test("isClientIdentityProfileId / CLIENT_IDENTITY_PROFILE_OPTIONS stay in sync with the catalog", () => {
  for (const id of Object.keys(CLIENT_IDENTITY_PROFILES)) {
    assert.equal(isClientIdentityProfileId(id), true);
  }
  assert.equal(isClientIdentityProfileId("bogus"), false);

  const optionValues = CLIENT_IDENTITY_PROFILE_OPTIONS.map((o) => o.value);
  assert.deepEqual(optionValues, Object.keys(CLIENT_IDENTITY_PROFILES));
  assert.equal(CLIENT_IDENTITY_PROFILE_OPTIONS[0].value, "default");
});

test("a selected profile's headers land in providerSpecificData.customHeaders", () => {
  // This is exactly what the compatible-provider modal does when an operator
  // picks a profile from the <Select>: merge the preset onto the existing
  // customHeaders record before persisting the node/connection.
  const profileHeaders = getClientIdentityProfileHeaders("codex-cli");
  const providerSpecificData = {
    baseUrl: "https://proxy.example.com/v1",
    customHeaders: { ...profileHeaders, "X-Operator-Set": "keep-me" },
  };

  assert.equal(providerSpecificData.customHeaders["User-Agent"], "codex_cli_rs/0.136.0");
  assert.equal(providerSpecificData.customHeaders.originator, "codex_cli_rs");
  assert.equal(providerSpecificData.customHeaders["X-Operator-Set"], "keep-me");
});

test("profile headers merged into customHeaders survive applyCustomHeaders sanitization via DefaultExecutor", () => {
  const executor = new DefaultExecutor("openai-compatible-test");
  const profileHeaders = getClientIdentityProfileHeaders("claude-cli");

  const headers = executor.buildHeaders(
    {
      apiKey: "test-key",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1",
        customHeaders: profileHeaders,
      },
    },
    true
  ) as Record<string, string>;

  assert.equal(headers["User-Agent"], "claude-cli/2.1.195 (external, cli)");
  assert.equal(headers["X-App"], "cli");
  assert.equal(headers["Authorization"], "Bearer test-key");
});

test("a malicious profile-shaped header set has its auth/cookie entries dropped by applyCustomHeaders", () => {
  const executor = new DefaultExecutor("openai-compatible-test");

  // Simulate a compromised/hand-crafted profile that tries to smuggle in
  // credential-owning header names alongside a legitimate identity header.
  // isForbiddenCustomHeaderName is the single source of truth used by both
  // the Zod schema and the executor, so assert against it directly too.
  const maliciousProfileHeaders: Record<string, string> = {
    "User-Agent": "totally-legit-cli/1.0",
    Authorization: "Bearer stolen-token",
    "x-api-key": "stolen-key",
    cookie: "session=stolen",
  };
  assert.equal(isForbiddenCustomHeaderName("Authorization"), true);
  assert.equal(isForbiddenCustomHeaderName("x-api-key"), true);
  assert.equal(isForbiddenCustomHeaderName("cookie"), true);

  const headers = executor.buildHeaders(
    {
      apiKey: "real-key",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com/v1",
        customHeaders: maliciousProfileHeaders,
      },
    },
    true
  ) as Record<string, string>;

  assert.equal(headers["User-Agent"], "totally-legit-cli/1.0");
  assert.equal(headers["Authorization"], "Bearer real-key");
  assert.notEqual(headers["Authorization"], "Bearer stolen-token");
  assert.equal(headers["x-api-key"], undefined);
  assert.equal(headers["cookie"], undefined);
});

test("DefaultExecutor.execute sends the selected profile's headers for a compatible-node connection", async () => {
  const executor = new DefaultExecutor("openai-compatible-test");
  const originalFetch = globalThis.fetch;
  let capturedHeaders: Record<string, string> = {};

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    capturedHeaders = (init.headers as Record<string, string>) || {};
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "gpt-4.1",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        apiKey: "real-key",
        providerSpecificData: {
          baseUrl: "https://test.proxy.com/v1",
          customHeaders: getClientIdentityProfileHeaders("gemini-cli"),
        },
      },
    });

    assert.equal(capturedHeaders["User-Agent"], "GeminiCLI/0.1.0 (linux; x64)");
    assert.equal(capturedHeaders["Authorization"], "Bearer real-key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
