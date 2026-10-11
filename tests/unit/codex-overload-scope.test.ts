import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-overload-scope-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const profile = {
  ...fallback.getProviderProfile("codex"),
  baseCooldownMs: 5000,
  maxCooldownMs: 5000,
  useUpstreamRetryHints: true,
};

async function seed(provider = "codex", disableCooling = false) {
  return providers.createProviderConnection({
    provider,
    authType: "oauth",
    accessToken: "synthetic",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { disableCooling, quotaPreflightEnabled: false },
  });
}
test.after(async () => {
  await new Promise((resolve) => setImmediate(resolve));
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const status of [502, 503])
  test(`Codex ${status} overload cools only the exact model for the existing brief duration`, async () => {
    const conn = await seed();
    const result = await auth.markAccountUnavailable(
      conn.id,
      status,
      "Our servers are currently overloaded. Please try again later.",
      "codex",
      "gpt-5.3-codex",
      profile,
      { structuredError: { code: "server_is_overloaded" } }
    );
    assert.equal(result.cooldownMs, 5000);
    const after = await providers.getProviderConnectionById(conn.id);
    assert.ok(!after.rateLimitedUntil, "must not cool sibling models via the parent connection");
    assert.equal(after.testStatus, "active");
    assert.equal(fallback.isModelLocked("codex", conn.id, "gpt-5.3-codex"), true);
    assert.equal(fallback.isModelLocked("codex", conn.id, "gpt-5.4"), false);
    const sibling = await auth.getProviderCredentials("codex", null, conn.id, "gpt-5.4");
    assert.equal(sibling.connectionId, conn.id);
    sibling.releaseOAuthSession?.();
    const blocked = await auth.getProviderCredentials("codex", null, conn.id, "gpt-5.3-codex");
    assert.equal(blocked.allRateLimited, true);
    const now = Date.now();
    const originalNow = Date.now;
    try {
      Date.now = () => now + 6000;
      assert.equal(fallback.isModelLocked("codex", conn.id, "gpt-5.3-codex"), false);
    } finally {
      Date.now = originalNow;
    }
  });

test("an explicit overload retains Retry-After without expanding to sibling models", async () => {
  const conn = await seed();
  const result = await auth.markAccountUnavailable(
    conn.id,
    503,
    "Our servers are currently overloaded. Please try again later.",
    "codex",
    "gpt-5.3-codex",
    profile,
    { structuredError: { code: "server_is_overloaded" }, headers: { "retry-after": "17" } }
  );
  assert.ok(result.cooldownMs >= 16000 && result.cooldownMs <= 17000);
  const after = await providers.getProviderConnectionById(conn.id);
  assert.ok(!after.rateLimitedUntil);
  assert.equal(fallback.isModelLocked("codex", conn.id, "gpt-5.3-codex"), true);
  assert.equal(fallback.isModelLocked("codex", conn.id, "gpt-5.4"), false);
});

for (const code of [undefined, "upstream_connect_error"])
  test(`generic 502 (${code ?? "no code"}) retains connection cooldown`, async () => {
    const conn = await seed();
    await auth.markAccountUnavailable(
      conn.id,
      502,
      "Connection failed",
      "codex",
      "gpt-5.3-codex",
      profile,
      { structuredError: { code } }
    );
    const after = await providers.getProviderConnectionById(conn.id);
    assert.ok(after.rateLimitedUntil);
  });

test("disableCooling does not turn into an implicit model cooldown", async () => {
  const conn = await seed("codex", true);
  const result = await auth.markAccountUnavailable(
    conn.id,
    502,
    "Our servers are currently overloaded. Please try again later.",
    "codex",
    "gpt-5.3-codex",
    profile,
    { structuredError: { code: "server_is_overloaded" } }
  );
  assert.equal(result.cooldownMs, 0);
  assert.equal(fallback.isModelLocked("codex", conn.id, "gpt-5.3-codex"), false);
});

test("chat fallback forwards the structured upstream error code", () => {
  const source = fs.readFileSync(
    new URL("../../src/sse/handlers/chat.ts", import.meta.url),
    "utf8"
  );
  assert.match(
    source,
    /structuredError:\s*\{\s*code:\s*result.errorCode,\s*type:\s*result.errorType/
  );
});

test("429 quota remains family-scoped even if an overload code is also present", async () => {
  const conn = await seed();
  await auth.markAccountUnavailable(
    conn.id,
    429,
    "Rate limit exceeded",
    "codex",
    "gpt-5.3-codex",
    profile,
    { structuredError: { code: "server_is_overloaded" } }
  );
  assert.equal(fallback.isModelLocked("codex", conn.id, "gpt-5.4"), true);
});

test("other providers and requests without a model retain connection cooldown", async () => {
  for (const [provider, model] of [
    ["openai", "gpt-5.4"],
    ["codex", null],
  ] as const) {
    const conn = await seed(provider);
    await auth.markAccountUnavailable(
      conn.id,
      502,
      "Our servers are currently overloaded. Please try again later.",
      provider,
      model,
      profile,
      { structuredError: { code: "server_is_overloaded" } }
    );
    const after = await providers.getProviderConnectionById(conn.id);
    assert.ok(after.rateLimitedUntil);
  }
});

test("an overload never clears an existing terminal account state", async () => {
  const conn = await seed();
  await providers.updateProviderConnection(conn.id, { testStatus: "expired" });
  await auth.markAccountUnavailable(
    conn.id,
    502,
    "Our servers are currently overloaded. Please try again later.",
    "codex",
    "gpt-5.3-codex",
    profile,
    { structuredError: { code: "server_is_overloaded" } }
  );
  const after = await providers.getProviderConnectionById(conn.id);
  assert.equal(after.testStatus, "expired");
});
