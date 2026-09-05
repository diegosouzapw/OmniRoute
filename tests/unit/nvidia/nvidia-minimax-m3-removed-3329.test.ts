import test from "node:test";
import assert from "node:assert/strict";

const { getRegistryEntry } = await import("../../../open-sse/config/providerRegistry.ts");

// #3329: `minimaxai/minimax-m3` was registered in the nvidia (NVIDIA NIM) tier,
// but NVIDIA NIM does not host it — every request returns `404 page not found`.
// Advertising a model that 404s is a catalog bug; it stays absent from the
// NVIDIA tier while remaining available from providers that actually serve it.
test("nvidia tier does not advertise minimaxai/minimax-m3 (404 upstream) (#3329)", () => {
  const nvidia = getRegistryEntry("nvidia");
  assert.ok(nvidia, "nvidia registry entry must exist");
  const ids = (nvidia.models ?? []).map((m) => m.id);
  assert.ok(!ids.includes("minimaxai/minimax-m3"), "minimaxai/minimax-m3 must not be in nvidia");
  assert.ok(
    !ids.includes("minimaxai/minimax-m2.7"),
    "removed minimaxai/minimax-m2.7 must stay out"
  );
});
