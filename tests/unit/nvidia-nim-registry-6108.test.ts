import test from "node:test";
import assert from "node:assert/strict";

import { nvidiaProvider } from "../../open-sse/config/providers/registry/nvidia/index.ts";

// Regression guard for #6108: the static NVIDIA NIM model registry had gone
// stale — z-ai/glm-5.1 was EOL'd (410) 2026-07-02, while glm-5.2 and
// nvidia/nemotron-3-ultra-550b-a55b were absent. minimaxai/minimax-m3 stays
// excluded per the #3329 guard (nvidia-minimax-m3-removed-3329.test.ts) — the
// single 200 probe in #6108 wasn't reproducible enough to override it.
const modelIds = new Set(nvidiaProvider.models.map((m) => m.id));

test("#6108: NVIDIA NIM registry contains the refreshed live models", () => {
  assert.ok(modelIds.has("z-ai/glm-5.2"), "z-ai/glm-5.2 must be present");
  assert.ok(
    modelIds.has("nvidia/nemotron-3-ultra-550b-a55b"),
    "nvidia/nemotron-3-ultra-550b-a55b must be present"
  );
});

test("#6108: NVIDIA NIM registry no longer lists EOL z-ai/glm-5.1", () => {
  assert.ok(!modelIds.has("z-ai/glm-5.1"), "EOL z-ai/glm-5.1 must be removed");
});
