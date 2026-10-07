import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { hasSpecializedExecutor } from "../../open-sse/executors/index.ts";

test("Raycast Relay GPL-derived integration is absent from runtime dispatch", () => {
  assert.equal(REGISTRY.raycast, undefined);
  assert.equal(REGISTRY.rc, undefined);
  assert.equal(hasSpecializedExecutor("raycast"), false);
  assert.equal(hasSpecializedExecutor("rc"), false);
  assert.ok(REGISTRY.github, "the independent official GitHub provider must remain");
});

test("Hailuo Web GPL-derived integration is absent without removing official MiniMax", () => {
  assert.equal(REGISTRY["hailuo-web"], undefined);
  assert.equal(hasSpecializedExecutor("hailuo-web"), false);
  assert.ok(REGISTRY.minimax, "the official MiniMax provider must remain registered");
  assert.ok(REGISTRY["minimax-cn"], "the official MiniMax China provider must remain registered");
});

test("GPL-derived implementation and credential source files are absent from the shipped tree", () => {
  const removedPaths = [
    "open-sse/config/providers/registry/minimax/web/index.ts",
    "open-sse/config/providers/registry/raycast/index.ts",
    "open-sse/executors/hailuo-web.ts",
    "open-sse/executors/raycast.ts",
    "open-sse/services/raycast.ts",
    "scripts/raycast/extract-credentials.mjs",
    "scripts/raycast/usage-benchmark.mjs",
    "src/app/api/oauth/raycast/auto-import/route.ts",
    "src/app/api/oauth/raycast/import/route.ts",
    "src/lib/oauth/providers/raycast.ts",
    "src/lib/oauth/services/raycast.ts",
    "src/lib/oauth/services/raycastLocal.ts",
    "src/shared/components/RaycastAuthModal.tsx",
  ];

  for (const relativePath of removedPaths) {
    assert.equal(
      fs.existsSync(path.join(process.cwd(), relativePath)),
      false,
      `${relativePath} must not ship`
    );
  }
});
