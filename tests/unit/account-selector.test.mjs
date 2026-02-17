import test from "node:test";
import assert from "node:assert/strict";

const {
  selectAccountP2C,
  selectAccount,
} = await import("../../open-sse/services/accountSelector.ts");

// ─── selectAccountP2C ───────────────────────────────────────────────────────

test("selectAccountP2C: returns null for empty array", () => {
  assert.equal(selectAccountP2C([]), null);
  assert.equal(selectAccountP2C(null), null);
});

test("selectAccountP2C: returns single account", () => {
  const acct = { id: "a1" };
  assert.equal(selectAccountP2C([acct]), acct);
});

test("selectAccountP2C: returns one of the candidates", () => {
  const accounts = [
    { id: "a1" },
    { id: "a2" },
    { id: "a3" },
  ];
  const selected = selectAccountP2C(accounts);
  assert.ok(accounts.includes(selected));
});

test("selectAccountP2C: prefers healthier account over many runs", () => {
  // Account with error should be selected less often
  const healthy = { id: "healthy" };
  const degraded = { id: "degraded", error: true, rateLimited: true, backoffLevel: 3 };
  const accounts = [healthy, degraded];

  let healthyCount = 0;
  for (let i = 0; i < 100; i++) {
    const selected = selectAccountP2C(accounts);
    if (selected.id === "healthy") healthyCount++;
  }
  // Should strongly prefer healthy account
  assert.ok(healthyCount > 60, `Expected healthy to win >60/100 times, got ${healthyCount}`);
});

// ─── selectAccount strategies ───────────────────────────────────────────────

test("selectAccount: fill-first returns first", () => {
  const accounts = [{ id: "first" }, { id: "second" }];
  const { account } = selectAccount(accounts, "fill-first");
  assert.equal(account.id, "first");
});

test("selectAccount: round-robin cycles", () => {
  const accounts = [{ id: "a" }, { id: "b" }, { id: "c" }];
  let state = {};
  const results = [];
  for (let i = 0; i < 6; i++) {
    const { account, state: newState } = selectAccount(accounts, "round-robin", state);
    results.push(account.id);
    state = newState;
  }
  assert.deepEqual(results, ["a", "b", "c", "a", "b", "c"]);
});

test("selectAccount: random returns valid account", () => {
  const accounts = [{ id: "x" }, { id: "y" }];
  const { account } = selectAccount(accounts, "random");
  assert.ok(accounts.includes(account));
});

test("selectAccount: p2c returns valid account", () => {
  const accounts = [{ id: "p1" }, { id: "p2" }, { id: "p3" }];
  const { account } = selectAccount(accounts, "p2c");
  assert.ok(accounts.includes(account));
});

test("selectAccount: empty accounts returns null", () => {
  const { account } = selectAccount([], "fill-first");
  assert.equal(account, null);
});
