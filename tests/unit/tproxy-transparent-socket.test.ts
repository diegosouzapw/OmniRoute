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

const {
  loadTransparentAddon,
  isTransparentSocketAvailable,
  createTransparentListenerFd,
  setSocketMark,
} = await import("../../src/mitm/tproxy/transparentSocket.ts");

test("loadTransparentAddon returns null on non-Linux (IP_TRANSPARENT is Linux-only)", () => {
  const addon = loadTransparentAddon(
    () => ({ createTransparentListener: () => 3 }),
    () => "darwin"
  );
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
  const fake = {
    createTransparentListener: () => 42,
    setSocketMark: () => {},
    connectMarked: () => 7,
  };
  const addon = loadTransparentAddon(
    () => fake,
    () => "linux"
  );
  assert.equal(addon, fake);
  assert.equal(addon?.createTransparentListener("0.0.0.0", 1), 42);
});

test("loadTransparentAddon rejects a module missing createTransparentListener", () => {
  const addon = loadTransparentAddon(
    () => ({ setSocketMark: () => {}, connectMarked: () => 7 }),
    () => "linux"
  );
  assert.equal(addon, null);
});

test("loadTransparentAddon rejects a module missing setSocketMark (anti-loop primitive)", () => {
  const addon = loadTransparentAddon(
    () => ({ createTransparentListener: () => 1, connectMarked: () => 7 }),
    () => "linux"
  );
  assert.equal(addon, null);
});

test("loadTransparentAddon rejects a module missing connectMarked (forward anti-loop)", () => {
  const addon = loadTransparentAddon(
    () => ({ createTransparentListener: () => 1, setSocketMark: () => {} }),
    () => "linux"
  );
  assert.equal(addon, null);
});

test("loadTransparentAddon also tries the cwd-relative standalone path", () => {
  // In the standalone/Docker bundle this module is compiled into .next/server/...
  // so the module-relative `./native/...` misses; the addon is copied to
  // <cwd>/src/mitm/tproxy/native/... and the loader must try that absolute path.
  const tried: string[] = [];
  const addon = loadTransparentAddon(
    (p) => {
      tried.push(p);
      throw new Error("not here");
    },
    () => "linux",
    () => "/app"
  );
  assert.equal(addon, null);
  assert.ok(
    tried.some((p) => p === "/app/src/mitm/tproxy/native/build/Release/transparent.node"),
    `expected a cwd-absolute candidate, got: ${tried.join(", ")}`
  );
});

test("loadTransparentAddon loads the addon from the cwd-relative standalone path", () => {
  const fake = {
    createTransparentListener: () => 1,
    setSocketMark: () => {},
    connectMarked: () => 2,
  };
  const addon = loadTransparentAddon(
    (p) => {
      if (p.startsWith("/app/")) return fake; // standalone dest; module-relative misses
      throw new Error("not here");
    },
    () => "linux",
    () => "/app"
  );
  assert.equal(addon, fake);
});

test("isTransparentSocketAvailable returns a boolean (false in CI — addon not built)", () => {
  assert.equal(typeof isTransparentSocketAvailable(), "boolean");
  assert.equal(isTransparentSocketAvailable(), false);
});

test("createTransparentListenerFd throws a clear, actionable error when unavailable", () => {
  assert.throws(() => createTransparentListenerFd("0.0.0.0", 8443), /not available|Linux|build/i);
});

test("setSocketMark throws when the addon is unavailable", () => {
  assert.throws(() => setSocketMark(7, 0x539), /not available/i);
});
