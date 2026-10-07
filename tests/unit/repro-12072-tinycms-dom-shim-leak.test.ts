/**
 * Regression test for issue #12072.
 *
 * initTinyCmsWasm() / generateSecurePayload() used to call setupDomMocks()
 * and never invoke the restore callback it returns, so global.window /
 * global.document / HTMLCanvasElement remained installed on the Node
 * process for its entire lifetime. On an npm-global install the Next.js
 * dashboard SSR runs in that same process, so after the first TinyCMS
 * request every SSR render observed a fake `document` whose
 * createElement() returns null for anything but 'canvas' — which turned
 * the following SSR render into a plain-text 500.
 *
 * This test proves the shims are scoped to the call (installed, used,
 * restored) instead of leaking past it, directly against
 * tinycmsSigner.ts, without needing a live TinyCMS network call or a
 * running Next.js server.
 */
import test from "node:test";
import assert from "node:assert/strict";

test("initTinyCmsWasm does not leave global.window/document installed after it resolves", async () => {
  const g = global as Record<string, unknown>;

  // Sanity: nothing must be present before we start, otherwise the
  // assertions below prove nothing.
  assert.equal("window" in g, false, "test process must not already have global.window");
  assert.equal("document" in g, false, "test process must not already have global.document");

  const { initTinyCmsWasm } = await import("../../open-sse/executors/tinycmsSigner.ts");

  await initTinyCmsWasm();

  assert.equal(
    typeof g.window,
    "undefined",
    "REGRESSION (#12072): global.window leaked past initTinyCmsWasm() — this is what makes " +
      "`typeof window !== \"undefined\"` true for every subsequent SSR render in the same process"
  );
  assert.equal(
    typeof g.document,
    "undefined",
    "REGRESSION (#12072): global.document leaked past initTinyCmsWasm()"
  );
});

test("generateSecurePayload does not leave global.window/document installed after it returns", async () => {
  const g = global as Record<string, unknown>;

  const { generateSecurePayload } = await import("../../open-sse/executors/tinycmsSigner.ts");

  generateSecurePayload("user", String(Date.now()), "nonce", "challenge", "127.0.0.1", 1);

  assert.equal(
    typeof g.window,
    "undefined",
    "REGRESSION (#12072): global.window leaked past generateSecurePayload()"
  );
  assert.equal(
    typeof g.document,
    "undefined",
    "REGRESSION (#12072): global.document leaked past generateSecurePayload()"
  );
});
