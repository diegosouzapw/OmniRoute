import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";

// Regression guard for issue #6686:
// "Account selection can pick accounts already out of quota (no live quota
// preflight outside chat/codex)."
//
// Root cause: getProviderCredentials() (src/sse/services/auth.ts) only skips
// a connection when a LOCAL CACHE already flags it exhausted
// (isQuotaExhaustedForRequest / src/domain/quotaCache.ts). It never itself
// calls the registered upstream QuotaFetcher. Only
// getProviderCredentialsWithQuotaPreflight() performs that live upstream
// check, and before this fix it was wired into exactly 2 call sites
// (src/sse/handlers/chat.ts, src/app/api/internal/codex-responses-ws).
// Every other credentialed route called the plain selector, so an account
// whose local cache entry was never populated (e.g. its first request landed
// on a non-chat/codex route) could be selected even at 0% quota remaining.
//
// The fix routes those remaining call sites through
// getProviderCredentialsWithQuotaPreflight() instead. This test has two
// parts:
//   1) A static, file-content check that every affected route no longer
//      calls the plain, cache-only selector.
//   2) A behavioral check that the preflight-aware selector — now used by
//      every credentialed route — genuinely blocks an account reported
//      100% used by a registered upstream quota fetcher.

const repoRoot = path.resolve(fileURLToPath(new URL("../../", import.meta.url)));

const ROUTES_REQUIRING_QUOTA_PREFLIGHT = [
  "src/app/api/v1/rerank/route.ts",
  "src/app/api/v1/images/generations/route.ts",
  "src/app/api/v1/images/edits/route.ts",
  "src/app/api/v1/audio/transcriptions/route.ts",
  "src/app/api/v1/audio/speech/route.ts",
  "src/app/api/v1/audio/translations/route.ts",
  "src/app/api/v1/videos/generations/route.ts",
  "src/app/api/v1/music/generations/route.ts",
  "src/app/api/v1/ocr/route.ts",
  "src/app/api/v1/providers/[provider]/embeddings/route.ts",
  "src/app/api/v1/providers/[provider]/images/generations/route.ts",
  "src/app/api/v1/web/fetch/route.ts",
  "src/app/api/v1/moderations/route.ts",
  "src/app/api/v1/search/route.ts",
];

test("#6686: previously-plain-selector routes must call the quota-preflight-aware selector, not the plain cache-only one", () => {
  for (const relPath of ROUTES_REQUIRING_QUOTA_PREFLIGHT) {
    const filePath = path.join(repoRoot, relPath);
    const source = fs.readFileSync(filePath, "utf8");

    // A bare `getProviderCredentials(` call (not immediately followed by
    // `WithQuotaPreflight`) means live upstream quota is never checked before
    // the account is used for this route — the exact #6686 gap.
    const bareCalls = source.match(/getProviderCredentials(?!WithQuotaPreflight)\(/g) || [];
    assert.equal(
      bareCalls.length,
      0,
      `${relPath} must not call the plain getProviderCredentials() — use ` +
        `getProviderCredentialsWithQuotaPreflight() instead (issue #6686)`
    );

    assert.match(
      source,
      /getProviderCredentialsWithQuotaPreflight/,
      `${relPath} is expected to select credentials via ` +
        `getProviderCredentialsWithQuotaPreflight (issue #6686)`
    );
  }
});

test("#6686: getProviderCredentialsWithQuotaPreflight (now used by every credentialed route) blocks an account already 100% out of quota upstream", async () => {
  const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-issue-6686-"));
  process.env.DATA_DIR = TEST_DATA_DIR;
  process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "issue-6686-secret";

  const core = await import("../../src/lib/db/core.ts");
  const providersDb = await import("../../src/lib/db/providers.ts");
  const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
  const auth = await import("../../src/sse/services/auth.ts");
  const quotaPreflight = await import("../../open-sse/services/quotaPreflight.ts");

  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

  try {
    const provider = "issue6686";

    const account = await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: "issue-6686-exhausted",
      apiKey: "sk-issue-6686-exhausted",
      isActive: true,
      testStatus: "active",
      // Same shape used by every affected route's selection call — no
      // cooldown, no rate-limit, nothing that would trip the reactive
      // filters. Only a live upstream check can catch this account.
      providerSpecificData: {
        quotaPreflightEnabled: true,
      },
    });

    // A registered upstream quota fetcher — what
    // getProviderCredentialsWithQuotaPreflight() calls to discover the
    // account is exhausted before the request is sent.
    quotaPreflight.registerQuotaFetcher(provider, async () => ({
      used: 100,
      total: 100,
      percentUsed: 1.0,
      resetAt: new Date(Date.now() + 60_000).toISOString(),
    }));

    const preflightSelection = await auth.getProviderCredentialsWithQuotaPreflight(
      provider,
      null,
      null,
      null
    );
    const preflightResult = preflightSelection as {
      allRateLimited?: boolean;
      connectionId?: string;
    } | null;

    assert.ok(
      preflightResult?.allRateLimited === true || preflightResult?.connectionId !== account.id,
      "getProviderCredentialsWithQuotaPreflight should correctly block the exhausted account"
    );
  } finally {
    core.resetDbInstance();
    apiKeysDb.resetApiKeyState();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});
