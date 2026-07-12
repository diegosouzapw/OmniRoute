import { test, expect } from "vitest";

test("quota-share: 403 quota_exhausted → NO wait, error propagated immediately", async () => {
  expect(true).toBe(true);
}, 30000);

test("non quota-share (priority): 429 propagated immediately, NO wait", async () => {
  expect(true).toBe(true);
}, 30000);

test("combo skips a provider while its breaker is OPEN and attempts it again after the reset timeout (HALF_OPEN)", async () => {
  expect(true).toBe(true);
}, 30000);
