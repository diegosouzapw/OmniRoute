// #13131 / #4037 — chipotle/pepper's upstream (amelia.chipotle.com) 404s on every route
// (verified live 2026-09-15, Azure Application Gateway with no backend route left). The
// upstream protocol cannot be "fixed" — the owner decided to retire the provider entirely
// (Option B), following the phind/kluster quiet-removal precedent. This is the permanent
// regression guard: it asserts the provider is fully GONE from every runtime surface, not a
// live-network repro (which would be flaky/slow/depend on a third party we don't control).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13131-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { REGISTRY } = await import("../../open-sse/config/providers/index.ts");
const { NOAUTH_PROVIDERS } = await import("../../src/shared/constants/providers/noauth.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("issue #13131: chipotle executor is no longer registered", () => {
  assert.equal(hasSpecializedExecutor("chipotle"), false);
  assert.equal(hasSpecializedExecutor("pepper"), false);
});

test("issue #13131: chipotle is no longer in the provider registry", () => {
  assert.equal(Object.prototype.hasOwnProperty.call(REGISTRY, "chipotle"), false);
});

test("issue #13131: chipotle is no longer in the noauth provider catalog", () => {
  assert.equal(Object.prototype.hasOwnProperty.call(NOAUTH_PROVIDERS, "chipotle"), false);
});

test("issue #13131: the chipotle executor module no longer exists", async () => {
  await assert.rejects(() => import("../../open-sse/executors/chipotle.ts"));
});
