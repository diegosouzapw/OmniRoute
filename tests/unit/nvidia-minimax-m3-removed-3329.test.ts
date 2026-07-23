import test from "node:test";
import assert from "node:assert/strict";

const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");

// #3329: `minimaxai/minimax-m3` was registered in the nvidia (NVIDIA NIM) tier,
// but NVIDIA NIM does not host it — every request returns `404 page not found`,
// while sibling models on the same provider (e.g. `minimaxai/minimax-m2.7`)
// work. Advertising a model that 404s is a catalog bug; it is removed from the
// nvidia tier until NVIDIA actually serves it. It remains on the tiers that do
// (minimax / minimax-cn / opencode / etc.).
test("nvidia tier does not advertise minimaxai/minimax-m3 (404 upstream) (#3329)", () => {
  const nvidia = getRegistryEntry("nvidia");
  assert.ok(nvidia, "nvidia registry entry must exist");
  const ids = (nvidia.models ?? []).map((m) => m.id);
  assert.ok(!ids.includes("minimaxai/minimax-m3"), "minimaxai/minimax-m3 must not be in nvidia");
  // sanity: the working sibling stays listed
  assert.ok(ids.includes("minimaxai/minimax-m2.7"), "minimaxai/minimax-m2.7 stays available");
});
