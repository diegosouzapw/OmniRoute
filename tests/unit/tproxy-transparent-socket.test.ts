/**
 * Fase 3 / Epic A — TPROXY IP_TRANSPARENT socket wrapper.
 *
 * Node's net module can't setsockopt(IP_TRANSPARENT), so the TPROXY listener
 * needs a tiny native addon (src/mitm/tproxy/native/transparent.c). Viability
 * was proven on the VPS: the prebuilt .node loaded under a different Node
 * version (N-API ABI-stable) and, as root, created the transparent socket which
 * Node adopted via server.listen({fd}). This wrapper loads that prebuilt addon
 * CONDITIONALLY — TPROXY mode is gated on its availability so a JS-only install
 * (no toolchain, or non-Linux) keeps working. These tests pin the graceful
 * fallback and the load logic (injected require/platform — deterministic).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { loadTransparentAddon, isTransparentSocketAvailable, createTransparentListenerFd } =
  await import("../../src/mitm/tproxy/transparentSocket.ts");

test("loadTransparentAddon returns null on non-Linux (IP_TRANSPARENT is Linux-only)", () => {
  const addon = loadTransparentAddon(() => ({ createTransparentListener: () => 3 }), () => "darwin");
  assert.equal(addon, null);
});

test("loadTransparentAddon returns null when the prebuilt addon is absent (require throws)", () => {
  const addon = loadTransparentAddon(
    () => {
      throw new Error("Cannot find module");
    },
    () => "linux"
  );
  assert.equal(addon, null);
});

test("loadTransparentAddon returns the addon when present and well-shaped", () => {
  const fake = { createTransparentListener: () => 42 };
  const addon = loadTransparentAddon(() => fake, () => "linux");
  assert.equal(addon, fake);
  assert.equal(addon?.createTransparentListener("0.0.0.0", 1), 42);
});

test("loadTransparentAddon rejects a module missing createTransparentListener", () => {
  const addon = loadTransparentAddon(() => ({ somethingElse: true }), () => "linux");
  assert.equal(addon, null);
});

test("isTransparentSocketAvailable returns a boolean (false in CI — addon not built)", () => {
  assert.equal(typeof isTransparentSocketAvailable(), "boolean");
  assert.equal(isTransparentSocketAvailable(), false);
});

test("createTransparentListenerFd throws a clear, actionable error when unavailable", () => {
  assert.throws(() => createTransparentListenerFd("0.0.0.0", 8443), /not available|Linux|build/i);
});
