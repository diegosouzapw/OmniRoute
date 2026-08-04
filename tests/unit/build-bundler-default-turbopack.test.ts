import test from "node:test";
import assert from "node:assert/strict";

// Turbopack is the default production bundler (Next 16 stable, benchmarked ~2-3x
// faster than the webpack pass); webpack stays available as the explicit opt-out
// escape hatch (OMNIROUTE_USE_TURBOPACK=0) for environments that hit native
// binding or bundler-compat issues.
const buildIsolated = await import("../../scripts/build/build-next-isolated.mjs");

test("resolveNextBuildBundlerFlag defaults to --turbopack when the env var is unset", () => {
  assert.equal(buildIsolated.resolveNextBuildBundlerFlag({}), "--turbopack");
});

test("resolveNextBuildBundlerFlag keeps --turbopack for explicit opt-in", () => {
  assert.equal(
    buildIsolated.resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "1" }),
    "--turbopack"
  );
});

test("resolveNextBuildBundlerFlag honors the webpack escape hatch (=0)", () => {
  assert.equal(
    buildIsolated.resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "0" }),
    "--webpack"
  );
});

test("resolveNextBuildBundlerFlag treats other values as the turbopack default", () => {
  // Only the documented "0" opts out — junk values must not silently flip the bundler.
  assert.equal(
    buildIsolated.resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "yes" }),
    "--turbopack"
  );
});
