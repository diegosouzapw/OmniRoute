import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeCodexModelsResponse,
  reconcileCodexDiscoveryCatalog,
} from "../../src/app/api/providers/[id]/models/discovery/codex.ts";
import { classifyCodexDiscoveryModel } from "../../src/shared/services/codexDiscoveryPolicy.ts";

test("live hidden API models remain available for internal requests", () => {
  const models = normalizeCodexModelsResponse({
    models: [
      { slug: "codex-auto-review", visibility: "hide", supported_in_api: true },
      { slug: "another-internal-model", visibility: "hide", supported_in_api: true },
      { slug: "unsupported", visibility: "hide", supported_in_api: false },
    ],
  });
  const catalog = reconcileCodexDiscoveryCatalog(models, [], "safe");
  assert.deepEqual(
    catalog.activeModels.map((model) => model.id),
    ["codex-auto-review", "another-internal-model"]
  );
  assert.equal(catalog.activeModels[0].visibility, "hide");
});

test("hidden visibility never bypasses API support or client compatibility", () => {
  const options = { source: "live", mode: "safe", implementedClientVersion: "0.157.1" } as const;
  assert.deepEqual(
    classifyCodexDiscoveryModel(
      { id: "codex-auto-review", visibility: "hide", supportedInApi: false },
      options
    ),
    { status: "incompatible", reason: "api-not-supported" }
  );
  assert.deepEqual(
    classifyCodexDiscoveryModel(
      {
        id: "codex-auto-review",
        visibility: "hide",
        supportedInApi: true,
        minimalClientVersion: "999.0.0",
      },
      options
    ),
    { status: "candidate", reason: "requires-newer-client" }
  );
  assert.deepEqual(
    classifyCodexDiscoveryModel(
      { id: "codex-auto-review", visibility: "hide", supportedInApi: true },
      { ...options, source: "github" }
    ),
    { status: "candidate", reason: "missing-explicit-list-visibility" }
  );
});
