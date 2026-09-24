/**
 * Regression: TinyCMS DOM shims must stay Next.js SSR-safe.
 *
 * Next.js `getLocationOrigin()` (app-router SSR) does:
 *   const { protocol, hostname, port } = window.location
 * after treating `typeof window !== "undefined"` as "we are in a browser".
 *
 * The historical TinyCMS wasm-bindgen Node stub did `g.window = g` without
 * installing `location`. After TinyCMS ran once, that alias stayed on the
 * process (#12072 restored after init, but the await of WASM compile still
 * yields with a live `window`). Every subsequent route then 500'd with
 * `TypeError: Cannot destructure property 'protocol' of 'window.location'`
 * until the process restarted.
 *
 * These tests fail if:
 * - setupDomMocks aliases `window` to the Node global
 * - a live stub is missing a destructurable `location`
 * - restore leaves `window` installed without usable `location`
 * - initTinyCmsWasm / generateSecurePayload leak `window` (also covered by
 *   tests/unit/repro-12072-tinycms-dom-shim-leak.test.ts)
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  setupDomMocks,
  withTinyCmsDomMocks,
  withTinyCmsDomMocksAsync,
} from "../../open-sse/executors/tinycmsDomMocks.ts";

type LocationLike = {
  protocol: string;
  hostname: string;
  port: string;
};

// Faithful copy of Next.js getLocationOrigin — the crash site in SSR.
function getLocationOrigin(win: { location: LocationLike }): string {
  const { protocol, hostname, port } = win.location;
  return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
}

function assertNextSsrSafeWindow(win: unknown, message: string): void {
  assert.notEqual(win, global, `${message}: window must not be the Node global`);
  assert.equal(typeof win, "object");
  assert.notEqual(win, null);
  const origin = getLocationOrigin(win as { location: LocationLike });
  assert.match(origin, /^https?:\/\//, `${message}: getLocationOrigin must return a URL`);
}

test("importing tinycmsDomMocks does not install global.window (no module-load side effect)", async () => {
  const g = global as Record<string, unknown>;
  assert.equal("window" in g, false);
  await import("../../open-sse/executors/tinycmsDomMocks.ts");
  assert.equal("window" in g, false);
});

test("the historical g.window = g shim without location crashes Next getLocationOrigin", () => {
  const g = global as typeof globalThis & Record<string, unknown>;
  assert.equal("window" in g, false);

  g.window = g;
  try {
    assert.equal(typeof g.window, "object");
    assert.throws(
      () => getLocationOrigin(g.window as { location: LocationLike }),
      /Cannot destructure property 'protocol' of 'window\.location'|Cannot destructure property 'protocol'/
    );
  } finally {
    delete g.window;
  }
});

test("setupDomMocks installs a dedicated window with destructurable location, then restores", () => {
  const g = global as typeof globalThis & Record<string, unknown>;
  assert.equal("window" in g, false);

  const restore = setupDomMocks();
  try {
    assertNextSsrSafeWindow(g.window, "while TinyCMS DOM stubs are live");
    assert.ok(g.window !== g, "window must be a dedicated stub, never `g.window = g`");
    assert.equal(typeof (g.window as { location: LocationLike }).location.protocol, "string");
    assert.equal(typeof (g.window as { location: LocationLike }).location.hostname, "string");
  } finally {
    restore();
  }

  assert.equal(
    typeof g.window,
    "undefined",
    'restore must remove window so Next SSR `typeof window !== "undefined"` stays false'
  );
  assert.equal(typeof g.document, "undefined");
});

test("setupDomMocks heals a leftover toxic window===global alias and does not restore it", () => {
  const g = global as typeof globalThis & Record<string, unknown>;
  g.window = g;
  assert.equal(g.window, g);

  const restore = setupDomMocks();
  try {
    assertNextSsrSafeWindow(g.window, "healed leftover toxic alias");
  } finally {
    restore();
  }

  assert.equal(
    typeof g.window,
    "undefined",
    "restore must drop the historical toxic alias instead of putting `window === global` back"
  );
});

test("restore never leaves a leftover window without usable location", () => {
  const g = global as typeof globalThis & Record<string, unknown>;
  const leftover = { document: null as unknown };
  g.window = leftover;

  const restore = setupDomMocks();
  try {
    assertNextSsrSafeWindow(g.window, "healed leftover dedicated window");
  } finally {
    restore();
  }

  // Leftover window remains (we did not install it) but must stay Next-safe.
  assert.equal(g.window, leftover);
  assertNextSsrSafeWindow(g.window, "after restore of a pre-existing window");
  delete g.window;
});

test("withTinyCmsDomMocks keeps Next getLocationOrigin safe during the callback and restores after", () => {
  const g = global as Record<string, unknown>;
  const seen: string[] = [];

  withTinyCmsDomMocks(() => {
    seen.push(getLocationOrigin(g.window as { location: LocationLike }));
  });

  assert.equal(seen.length, 1);
  assert.match(seen[0], /^https?:\/\//);
  assert.equal(typeof g.window, "undefined");
});

test("withTinyCmsDomMocksAsync keeps location usable across an await yield, then restores", async () => {
  const g = global as Record<string, unknown>;
  let duringAwait = "";

  await withTinyCmsDomMocksAsync(async () => {
    await Promise.resolve();
    duringAwait = getLocationOrigin(g.window as { location: LocationLike });
  });

  assert.match(duringAwait, /^https?:\/\//);
  assert.equal(
    typeof g.window,
    "undefined",
    "REGRESSION: window leaked past an async TinyCMS init yield — Next SSR would see it"
  );
});

test("initTinyCmsWasm does not leave a window that would crash getLocationOrigin", async () => {
  const g = global as Record<string, unknown>;
  assert.equal("window" in g, false);

  const { initTinyCmsWasm } = await import("../../open-sse/executors/tinycmsSigner.ts");
  await initTinyCmsWasm();

  assert.equal(typeof g.window, "undefined");
});

test("generateSecurePayload does not leave a window that would crash getLocationOrigin", async () => {
  const g = global as Record<string, unknown>;

  const { generateSecurePayload } = await import("../../open-sse/executors/tinycmsSigner.ts");
  generateSecurePayload("user", String(Date.now()), "nonce", "challenge", "127.0.0.1", 1);

  assert.equal(typeof g.window, "undefined");
});
