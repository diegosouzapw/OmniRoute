import { test } from "node:test";
import assert from "node:assert/strict";

import { formatResetCountdown } from "@/shared/utils/formatting";

// Guards both the pure formatting behavior and the client-safe home of this
// helper: it MUST live in @/shared/utils/formatting (not db/providers/rateLimit)
// so client components can import it without pulling the server-only DB barrel
// (better-sqlite3/ioredis → node:net) into the browser bundle. See PR #6155.

test("returns null for missing / past / invalid reset times", () => {
  assert.equal(formatResetCountdown(null), null);
  assert.equal(formatResetCountdown(undefined), null);
  assert.equal(formatResetCountdown(0), null);
  assert.equal(formatResetCountdown("not-a-date"), null);
  assert.equal(formatResetCountdown(Date.now() - 60_000), null);
});

test("formats seconds-only remaining", () => {
  const out = formatResetCountdown(Date.now() + 30_000);
  assert.match(out ?? "", /^\d+s$/);
});

test("formats minutes + seconds", () => {
  const out = formatResetCountdown(Date.now() + 5 * 60_000 + 30_000);
  assert.match(out ?? "", /^\d+m \d+s$/);
});

test("formats hours + minutes", () => {
  const out = formatResetCountdown(Date.now() + 2 * 3_600_000 + 35 * 60_000);
  assert.match(out ?? "", /^\d+h \d+m$/);
  assert.ok((out ?? "").startsWith("2h"));
});

test("accepts an ISO string as well as an epoch number", () => {
  const iso = new Date(Date.now() + 90_000).toISOString();
  assert.match(formatResetCountdown(iso) ?? "", /^(1m \d+s|\d+s)$/);
});
