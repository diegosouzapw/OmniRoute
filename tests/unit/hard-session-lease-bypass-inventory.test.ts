import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import ts from "typescript";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

type InventoryKind = "connection" | "credential" | "executor";
type BypassClass = "A" | "B" | "C";

const EXPECTED: Record<InventoryKind, Record<string, number>> = {
  credential: {
    "open-sse/handlers/chatCore.ts": 2,
    "open-sse/services/imageCombo.ts": 1,
    "open-sse/services/speechCombo.ts": 1,
    "open-sse/services/videoCombo.ts": 2,
    "src/app/api/compression/compare/verify/route.ts": 1,
    "src/app/api/internal/codex-responses-ws/route.ts": 1,
    // PR #11390: rerank listing endpoint probes configured credentials so the
    // dashboard rerank selector only offers providers that can actually serve.
    "src/app/api/memory/rerank-providers/route.ts": 1,
    "src/app/api/search/providers/route.ts": 3,
    "src/app/api/v1/_shared/elevenLabsProxy.ts": 1,
    "src/app/api/v1/audio/speech/route.ts": 1,
    "src/app/api/v1/_shared/videoModelResolution.ts": 1,
    "src/app/api/v1/audio/transcriptions/route.ts": 2,
    "src/app/api/v1/audio/translations/route.ts": 1,
    "src/app/api/v1/classify/route.ts": 1,
    // v3.8.51 #11754: the second resolveImageRouteModel() call (a duplicate
    // of the retirement-check one hoisted before enforceApiKeyPolicy) was
    // removed as dead redundant code, 6->5.
    "src/app/api/v1/images/edits/route.ts": 5,
    "src/app/api/v1/images/generations/route.ts": 3,
    "src/app/api/v1/images/upscale/route.ts": 1,
    "src/app/api/v1/messages/count_tokens/route.ts": 1,
    "src/app/api/v1/moderations/route.ts": 1,
    "src/app/api/v1/music/generations/route.ts": 2,
    "src/app/api/v1/ocr/route.ts": 1,
    "src/app/api/v1/providers/[provider]/embeddings/route.ts": 1,
    "src/app/api/v1/providers/[provider]/images/generations/route.ts": 1,
    "src/app/api/v1/rerank/route.ts": 2,
    "src/app/api/v1/search/route.ts": 2,
    "src/app/api/v1/segment/route.ts": 1,
    "src/app/api/v1/session-leases/route.ts": 1,
    "src/app/api/v1/videos/generations/route.ts": 2,
    "src/app/api/v1/web/fetch/route.ts": 1,
    // #11088/#11271: third site is the synced local-endpoint route — it resolves
    // credentials through getProviderCredentials with the connection allowlist
    // from resolveLocalSyncedEndpointRoute, and handles allRateLimited, so it is
    // fenced the same way as the two pre-existing sites.
    "src/lib/embeddings/service.ts": 3,
    // PR #11390: second site is the generic derived-provider listing fallback —
    // read-only key presence probe used to decide whether a configured chat
    // provider may appear in the memory embedding-source dropdown.
    "src/lib/memory/embedding/index.ts": 2,
    "src/lib/search/executeWebSearch.ts": 2,
    "src/lib/skills/webFetchExecution.ts": 1,
    "src/sse/handlers/chat.ts": 2,
    "src/sse/services/auth.ts": 4,
    "src/sse/services/imageCredentialRetry.ts": 1,
  },
  executor: {
    "open-sse/handlers/chatCore.ts": 3,
    "open-sse/handlers/chatCore/cliproxyModelMapping.ts": 1,
    "open-sse/handlers/chatCore/cliproxyapiCredentials.ts": 1,
    // v3.8.51 #11754: the legacy common ChatGPT Web's synthetic
    // image-edit-continuation ChatGptWebExecutor.execute() call (the sole
    // executor.execute() site in this file) was removed with the provider;
    // no executor site remains here. The clean-room restoration delegates
    // through its adapter and does not reintroduce this bypass call site.
    // Gemini Web's own image handler+file (open-sse/handlers/imageGeneration/providers/geminiWeb.ts)
    // was already retired by #11708 (its .execute() site removed then too).
    "open-sse/handlers/videoGeneration.ts": 1,
    "open-sse/services/compression/eval/executorModelClient.ts": 1,
    "src/lib/compression/judgeModelClient.ts": 1,
    "src/lib/services/quotaAutoPing.ts": 1,
  },
  connection: {
    "open-sse/handlers/autoComboCandidates.ts": 1,
    "open-sse/handlers/chatCore.ts": 2,
    "open-sse/handlers/cursorCliProxy.ts": 1,
    "open-sse/services/alibabaFreeTier.ts": 1,
    "open-sse/services/alibabaFreeTierQuotaFetcher.ts": 1,
    // Family cooldown persist looks the row up to write PSD, not dispatch.
    "open-sse/services/antigravityFamilyCooldown.ts": 1,
    // v3.8.50 back-merge additions (f95b03d7): combo routing infra and the
    // volcengine-plan binding/auto-sync services query connections the same
    // way as their classified siblings.
    "open-sse/services/combo.ts": 1,
    "open-sse/services/combo/providerWildcard.ts": 1,
    "open-sse/services/tokenRefresh.ts": 1,
    "src/lib/providers/volcPlanAutoSyncBackfill.ts": 1,
    "src/lib/providers/volcenginePlanBinding.ts": 1,
    "src/app/(dashboard)/dashboard/tools/agent-bridge/page.tsx": 1,
    "src/app/api/cloud/auth/route.ts": 1,
    "src/app/api/cloud/credentials/update/route.ts": 1,
    "src/app/api/models/route.ts": 1,
    "src/app/api/monitoring/health/route.ts": 1,
    "src/app/api/oauth/[provider]/[action]/route.ts": 4,
    "src/app/api/oauth/codex/import/route.ts": 1,
    "src/app/api/oauth/kiro/api-key/route.ts": 1,
    "src/app/api/oauth/kiro/auto-import/route.ts": 2,
    "src/app/api/oauth/kiro/import/route.ts": 1,
    "src/app/api/oauth/kiro/social-exchange/route.ts": 1,
    "src/app/api/playground/simulate-route/route.ts": 1,
    "src/app/api/provider-nodes/[id]/route.ts": 1,
    "src/app/api/providers/[id]/chatgpt-web-codex-doctor/route.ts": 1,
    "src/app/api/providers/[id]/refresh-token/route.ts": 1,
    "src/app/api/providers/bulk/route.ts": 1,
    "src/app/api/providers/client/route.ts": 1,
    "src/app/api/providers/free-onboarding/route.ts": 2,
    "src/app/api/providers/import/route.ts": 1,
    // Base drift (already present before #11754 boarded, from earlier-merged
    // #11698/#11720 retirement PRs): a third getProviderConnections-family
    // call site landed here without a golden-inventory update at the time.
    "src/app/api/providers/route.ts": 3,
    "src/app/api/providers/test-batch/route.ts": 2,
    "src/app/api/rate-limits/route.ts": 1,
    "src/app/api/services/dario/admin/import-from-omniroute/route.ts": 2,
    "src/app/api/settings/export-json/route.ts": 1,
    "src/app/api/settings/qdrant/embedding-models/route.ts": 1,
    "src/app/api/settings/route.ts": 1,
    "src/app/api/token-health/route.ts": 1,
    "src/app/api/translator/send/route.ts": 1,
    "src/app/api/translator/translate/route.ts": 1,
    "src/app/api/usage/call-logs/route.ts": 1,
    "src/app/api/usage/quota/route.ts": 1,
    "src/app/api/usage/utilization/route.ts": 1,
    "src/app/api/v1/vscode/[token]/api/tags/route.ts": 1,
    "src/app/api/v1/vscode/raw/[token]/api/tags/route.ts": 1,
    "src/app/api/v1beta/models/route.ts": 1,
    "src/instrumentation-node.ts": 1,
    "src/lib/a2a/skills/providerDiscovery.ts": 1,
    "src/lib/chaos/chaosExecutor.ts": 1,
    "src/lib/cloudAgent/api.ts": 1,
    "src/lib/cloudSync.ts": 1,
    "src/lib/combos/builderOptions.ts": 1,
    "src/lib/copilot/tools.ts": 1,
    "src/lib/credentialHealth/scheduler.ts": 1,
    // Base drift (already present before #11754 boarded, from earlier-merged
    // #11698/#11720 retirement PRs' combined getProviderConnectionById
    // fallback in the three write-path functions): not introduced by this PR.
    "src/lib/db/providers.ts": 3,
    "src/lib/db/readCache.ts": 2,
    "src/lib/freeProviderRankings.ts": 1,
    "src/lib/guardrails/visionBridgeCredentials.ts": 1,
    "src/lib/kimi/tokenRefresh.ts": 1,
    "src/lib/monitoring/providerHealthAutopilot.ts": 1,
    "src/lib/monitoring/providerHealthMatrix.ts": 1,
    "src/lib/oauth/connectionPersistence.ts": 1,
    "src/lib/oauth/services/persistCursorConnection.ts": 1,
    "src/lib/oauth/utils/agyAuthImport.ts": 1,
    "src/lib/oauth/utils/claudeAuthImport.ts": 1,
    "src/lib/oauth/utils/codexAuthImport.ts": 1,
    "src/lib/providerModels/managedModelImport.ts": 1,
    "src/lib/providers/codexConnectionDefaults.ts": 1,
    // Volcano Ark plan connect flow (commit d732cf615): both are connection *persistence*
    // sites, not dispatch. volcenginePlanBinding looks the plan connection up by name to
    // decide update-vs-create during connect (same shape as oauth/connectionPersistence);
    // volcPlanAutoSyncBackfill is a one-shot boot backfill that patches a providerSpecificData
    // flag and issues no upstream call. Neither selects a connection to serve a request, so
    // both stay class C (see CLASSIFICATION below).
    "src/lib/providers/volcPlanAutoSyncBackfill.ts": 1,
    "src/lib/providers/volcenginePlanBinding.ts": 1,
    "src/lib/proxyEgress.ts": 1,
    "src/lib/quota/connectionRecovery.ts": 2,
    "src/lib/sync/bundle.ts": 1,
    // #11495: verify-only sweep queries oauth + cookie connections
    "src/lib/tokenHealthCheck.ts": 2,
    "src/lib/tokenHealthCheckCopilot.ts": 1,
    "src/lib/usage/callLogs.ts": 1,
    "src/lib/usage/codexResetCredits.ts": 1,
    "src/lib/usage/comboScoringInspector.ts": 1,
    "src/lib/usage/providerLimits.ts": 4,
    "src/lib/usage/resilienceExplain.ts": 1,
    "src/lib/usage/usageStats.ts": 1,
    "src/lib/vncSession/service.ts": 2,
    "src/lib/warmupScheduler.ts": 1,
    "src/shared/services/codexCatalogRevalidation.ts": 2,
    "src/shared/services/modelSyncScheduler.ts": 1,
    "src/sse/handlers/chatHelpers.ts": 1,
    "src/sse/services/auth.ts": 4,
  },
};

const CLASSIFICATION: Record<InventoryKind, Record<string, BypassClass>> = {
  credential: Object.fromEntries(
    Object.keys(EXPECTED.credential).map((file) => [
      file,
      file === "src/app/api/v1/session-leases/route.ts" ||
      file === "src/sse/handlers/chat.ts" ||
      file === "src/sse/services/auth.ts"
        ? "A"
        : "B",
    ])
  ),
  executor: {
    "open-sse/handlers/chatCore.ts": "A",
    "open-sse/handlers/chatCore/cliproxyModelMapping.ts": "A",
    "open-sse/handlers/chatCore/cliproxyapiCredentials.ts": "A",
    "open-sse/handlers/videoGeneration.ts": "B",
    "open-sse/services/compression/eval/executorModelClient.ts": "B",
    "src/lib/compression/judgeModelClient.ts": "B",
    "src/lib/services/quotaAutoPing.ts": "B",
  },
  connection: Object.fromEntries(
    Object.keys(EXPECTED.connection).map((file) => [
      file,
      [
        "open-sse/handlers/autoComboCandidates.ts",
        "open-sse/handlers/chatCore.ts",
        "open-sse/services/combo.ts",
        "open-sse/services/alibabaFreeTier.ts",
        "open-sse/services/alibabaFreeTierQuotaFetcher.ts",
        "open-sse/services/combo.ts",
        "open-sse/services/combo/providerWildcard.ts",
        "open-sse/services/tokenRefresh.ts",
        "src/app/api/translator/send/route.ts",
        "src/lib/credentialHealth/scheduler.ts",
        "src/lib/providers/volcPlanAutoSyncBackfill.ts",
        "src/lib/providers/volcenginePlanBinding.ts",
        "src/lib/services/quotaAutoPing.ts",
        "src/lib/usage/codexResetCredits.ts",
        "src/lib/usage/providerLimits.ts",
        "src/lib/vncSession/service.ts",
        "src/lib/warmupScheduler.ts",
        "src/shared/services/modelSyncScheduler.ts",
        "src/sse/services/auth.ts",
      ].includes(file)
        ? "B"
        : "C",
    ])
  ),
};

function sourceFiles(directory: string): string[] {
  const absolute = path.join(REPO_ROOT, directory);
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(relative);
    return /\.(?:cjs|js|mjs|ts|tsx)$/.test(entry.name) ? [relative] : [];
  });
}

function countCalls(): Record<InventoryKind, Record<string, number>> {
  const actual: Record<InventoryKind, Record<string, number>> = {
    connection: {},
    credential: {},
    executor: {},
  };
  for (const file of [...sourceFiles("src"), ...sourceFiles("open-sse"), ...sourceFiles("bin")]) {
    const text = fs.readFileSync(path.join(REPO_ROOT, file), "utf8");
    const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);
    const increment = (kind: InventoryKind) => {
      // Normalize to forward slashes so the frozen inventory is
      // platform-independent (EXPECTED keys are POSIX-style).
      const key = file.split(path.sep).join("/");
      actual[kind][key] = (actual[kind][key] ?? 0) + 1;
    };
    const visit = (node: ts.Node): void => {
      if (ts.isCallExpression(node)) {
        const expression = node.expression;
        if (ts.isIdentifier(expression)) {
          if (
            expression.text === "getProviderCredentials" ||
            expression.text === "getProviderCredentialsWithQuotaPreflight"
          ) {
            increment("credential");
          }
          if (
            expression.text === "getProviderConnectionById" ||
            expression.text === "getProviderConnections"
          ) {
            increment("connection");
          }
        } else if (
          ts.isPropertyAccessExpression(expression) &&
          expression.name.text === "execute" &&
          ts.isIdentifier(expression.expression) &&
          ["executor", "fallbackExecutor", "providerExecutor", "streamExecutor"].includes(
            expression.expression.text
          )
        ) {
          increment("executor");
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return actual;
}

test("hard-lease credential, executor, and connection-query inventory has no unclassified site", () => {
  const actual = countCalls();
  assert.deepEqual(actual, EXPECTED);
  for (const kind of Object.keys(EXPECTED) as InventoryKind[]) {
    assert.deepEqual(Object.keys(CLASSIFICATION[kind]).sort(), Object.keys(EXPECTED[kind]).sort());
    for (const classification of Object.values(CLASSIFICATION[kind])) {
      assert.match(classification, /^[ABC]$/);
    }
  }
});

test("managed request surfaces are fenced centrally or rejected before independent dispatch", () => {
  const chat = fs.readFileSync(path.join(REPO_ROOT, "src/sse/handlers/chat.ts"), "utf8");
  const core = fs.readFileSync(path.join(REPO_ROOT, "open-sse/handlers/chatCore.ts"), "utf8");
  const ws = fs.readFileSync(
    path.join(REPO_ROOT, "src/app/api/internal/codex-responses-ws/route.ts"),
    "utf8"
  );
  const internalKeys = fs.readFileSync(path.join(REPO_ROOT, "src/lib/db/apiKeys.ts"), "utf8");
  const auxiliaryIsolationSources = [
    "src/app/api/providers/[id]/models/route.ts",
    "src/app/api/translator/send/route.ts",
    "src/app/api/translator/translate/route.ts",
    "src/lib/api/modelTestRunner.ts",
    "src/lib/services/quotaAutoPing.ts",
    "src/lib/usage/codexResetCredits.ts",
    "src/lib/vncSession/service.ts",
    "src/lib/warmupScheduler.ts",
    "src/shared/services/modelSyncScheduler.ts",
  ].map((file) => fs.readFileSync(path.join(REPO_ROOT, file), "utf8"));
  const unfencedUsageRefreshSource = fs.readFileSync(
    path.join(REPO_ROOT, "src/lib/usage/providerLimits.ts"),
    "utf8"
  );

  assert.match(chat, /parseManagedLeaseRequestContext\(request\.headers\)/);
  assert.match(chat, /isManagedComboUnsupported/);
  assert.match(core, /assertManagedLeaseFence\(attemptConnectionId\)/);
  assert.match(
    core,
    /assertManagedLeaseFence\(getExecutionConnectionId\(getExecutionCredentials\(\)\)\)/
  );
  assert.match(core, /provider === "codex" &&\s*!managedLease/);
  assert.match(ws, /LEASE_UNSUPPORTED_TRANSPORT/);
  assert.match(internalKeys, /!k\.scopes\?\.includes\(EXCLUSIVE_LEASE_SCOPE\)/);
  for (const source of auxiliaryIsolationSources) {
    assert.match(source, /isConnectionUnavailableToAuxiliaryActivity/);
  }
  // Usage/quota refresh is read-only admin telemetry (#11758) and must not inherit
  // the exclusive-lease auxiliary fence that blocks model tests, translation, VNC,
  // reset-credits, and warmup.
  assert.doesNotMatch(unfencedUsageRefreshSource, /isConnectionUnavailableToAuxiliaryActivity/);
});

test("SQLite claim-race retry removes only the lost candidate from the same policy-valid set", () => {
  const auth = fs.readFileSync(path.join(REPO_ROOT, "src/sse/services/auth.ts"), "utf8");

  assert.match(auth, /_leaseCandidateIds: candidateIds/);
  assert.match(auth, /excludeConnectionIds: \[\.\.\.excludedConnectionIds, connection\.id\]/);
  assert.match(
    auth,
    /pendingCredentialSelection =\s*await selectedCredentials\.selectNextLeaseCandidate\?\.\(connectionId\)/
  );
  assert.doesNotMatch(auth, /exclusiveChatRouting|exclusiveCredentialSelection/);
});
