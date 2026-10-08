/**
 * Repro for #14485 (part 1): the self-hosted unified-entry divert in
 * `/v1/chat/completions` calls `handleSelfHostedCompletions()` and returns its
 * response BEFORE `enforceApiKeyPolicy()` ever runs (that call lives deep
 * inside `handleChat()`, which the divert never reaches). A disabled/banned
 * OmniRoute API key — normally rejected with 403 "This API key is disabled" —
 * sails straight through to the self-hosted provider once
 * OMNIROUTE_SELF_HOSTED_PROVIDERS is configured.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-selfhosted-policy-14485-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "task-14485-api-key-secret";

const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");
rateLimiter.setRateLimiterTestMode(true);

let upstreamCalls = 0;
const upstream: Server = createServer((req, res) => {
  upstreamCalls++;
  let raw = "";
  req.on("data", (chunk) => (raw += chunk));
  req.on("end", () => {
    // Force the client (the self-hosted executor's fetch) to close its socket
    // after this response instead of keeping it alive for reuse — an idle
    // keep-alive connection otherwise left `http.Server#close()` hanging in
    // this test's teardown (observed during the original repro run).
    res.writeHead(200, { "content-type": "application/json", connection: "close" });
    res.end(
      JSON.stringify({
        id: "chatcmpl-stub",
        object: "chat.completion",
        model: "gpt-oss",
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
      })
    );
  });
});

await new Promise<void>((resolve) => upstream.listen(0, "127.0.0.1", resolve));
const upstreamPort = (upstream.address() as AddressInfo).port;
const upstreamBaseUrl = `http://127.0.0.1:${upstreamPort}/v1`;

process.env.OMNIROUTE_SELF_HOSTED_PROVIDERS = [
  "providers:",
  "  - id: stub",
  "    kind: openai",
  `    baseUrl: ${upstreamBaseUrl}`,
  "    model: gpt-oss",
].join("\n");

const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");

test.after(async () => {
  // The stub upstream keeps its keep-alive sockets open by default, which left
  // node's test runner hanging in post-assertion cleanup (observed during the
  // original repro run). Force-close any still-open connections before closing
  // the server so the process can exit promptly.
  if (typeof upstream.closeAllConnections === "function") {
    upstream.closeAllConnections();
  }
  await new Promise((resolve) => upstream.close(resolve));
  apiKeysDb.resetApiKeyState();
  coreDb.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
});

test("#14485: self-hosted divert must not bypass enforceApiKeyPolicy for a disabled OmniRoute key", async () => {
  const created = await apiKeysDb.createApiKey("Disabled Key 14485", "machine-14485");
  await apiKeysDb.updateApiKeyPermissions(created.id, { isActive: false });

  const request = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${created.key}`,
    },
    body: JSON.stringify({
      model: "local/gpt-oss",
      messages: [{ role: "user", content: "hi" }],
    }),
  });

  const response = await chatRoute.POST(request);

  assert.notEqual(
    response.status,
    200,
    "BUG #14485: a DISABLED OmniRoute API key reached the self-hosted upstream " +
      `(status=${response.status}, upstream received ${upstreamCalls} call(s)) — ` +
      "the divert at src/app/api/v1/chat/completions/route.ts skips enforceApiKeyPolicy entirely"
  );
  assert.equal(
    response.status,
    403,
    "expected the standard disabled-key rejection (403) from enforceApiKeyPolicy"
  );
});

test("#14485: self-hosted divert still respects an active key's allowedModels restriction", async () => {
  const created = await apiKeysDb.createApiKey("Restricted Key 14485", "machine-14485-restricted");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    allowedModels: ["openai/gpt-4.1"], // deliberately excludes the self-hosted model below
  });

  const before = upstreamCalls;
  const request = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${created.key}`,
    },
    body: JSON.stringify({
      model: "local/gpt-oss",
      messages: [{ role: "user", content: "hi" }],
    }),
  });

  const response = await chatRoute.POST(request);

  assert.notEqual(
    response.status,
    200,
    "an allowedModels-restricted key must not reach the self-hosted upstream for a " +
      `disallowed model (status=${response.status})`
  );
  assert.equal(upstreamCalls, before, "the self-hosted upstream must not have been called");
});

test("#14485: an active key with no restrictions still reaches the self-hosted upstream", async () => {
  const created = await apiKeysDb.createApiKey("Unrestricted Key 14485", "machine-14485-ok");

  const before = upstreamCalls;
  const request = new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${created.key}`,
    },
    body: JSON.stringify({
      model: "local/gpt-oss",
      messages: [{ role: "user", content: "hi" }],
    }),
  });

  const response = await chatRoute.POST(request);

  assert.equal(response.status, 200, "a policy-compliant key must still reach self-hosted");
  assert.equal(upstreamCalls, before + 1, "the self-hosted upstream must have been called once");
});

test("#14485: a cloud request (no self-hosted config) runs the key policy ONCE, not twice", async () => {
  // A key allowed exactly one request per minute. The cloud pipeline already
  // enforces the policy inside handleChat(); if the route ALSO enforced it
  // ahead of the (unconfigured) self-hosted divert, this single request would
  // consume the window twice and be rejected with 429 by the second check.
  const created = await apiKeysDb.createApiKey("One-per-minute Key 14485", "machine-14485-rl");
  await apiKeysDb.updateApiKeyPermissions(created.id, {
    rateLimits: [{ limit: 1, window: 60 }],
  });

  const savedConfig = process.env.OMNIROUTE_SELF_HOSTED_PROVIDERS;
  delete process.env.OMNIROUTE_SELF_HOSTED_PROVIDERS;
  const before = upstreamCalls;
  try {
    const request = new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${created.key}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4.1",
        messages: [{ role: "user", content: "hi" }],
      }),
    });

    const response = await chatRoute.POST(request);
    const text = await response.text();

    assert.notEqual(
      response.status,
      429,
      "a single cloud request must not trip a 1-req/min limit — the key policy ran twice " +
        `(route pre-divert + handleChat): ${text.slice(0, 200)}`
    );
    assert.doesNotMatch(text, /Request limit exceeded/);
    assert.equal(upstreamCalls, before, "a cloud request must never reach the self-hosted stub");
  } finally {
    process.env.OMNIROUTE_SELF_HOSTED_PROVIDERS = savedConfig;
  }
});

test("#14485: the shared self-hosted API key is compared with the constant-time helper, not `!==`", async () => {
  const source = fs.readFileSync(
    new URL("../../open-sse/services/selfHostedEntry.ts", import.meta.url),
    "utf8"
  );
  assert.match(
    source,
    /timingSafeCompare\(\s*authHeader\s*,\s*expected\s*\)/,
    "expected the shared self-hosted API key comparison to go through timingSafeCompare(), " +
      "not a raw `!==` (CWE-208 timing side-channel)"
  );
  assert.doesNotMatch(
    source,
    /authHeader\s*!==\s*expected/,
    "the raw non-constant-time comparison must be fully replaced, not just supplemented"
  );
});
