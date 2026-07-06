/**
 * cost-ledger.test — WP-S4.
 */

import { test } from "node:test";
import { strict as assert } from "node:assert";
import {
  enqueueCostEvent,
  flushCostLedger,
  ledgerQueueDepth,
  _resetLedgerForTests,
} from "../../src/lib/db/costLedger.ts";

function makeInput(overrides: Partial<{ tenantId: string; costUsd: number; provider: string; model: string }> = {}) {
  return {
    virtualKeyId: "vk-test",
    tenantId: overrides.tenantId ?? "t1",
    provider: overrides.provider ?? "openai",
    model: overrides.model ?? "gpt-4o",
    promptTokens: 100,
    completionTokens: 50,
    costUsd: overrides.costUsd ?? 0.001,
  };
}

test("flush is a no-op when queue is empty", async () => {
  _resetLedgerForTests();
  const n = await flushCostLedger();
  assert.equal(n, 0);
  assert.equal(ledgerQueueDepth(), 0);
});

test("enqueue increments the queue depth", () => {
  _resetLedgerForTests();
  assert.equal(ledgerQueueDepth(), 0);
  enqueueCostEvent(makeInput({ costUsd: 0.01 }));
  assert.equal(ledgerQueueDepth(), 1);
  enqueueCostEvent(makeInput({ costUsd: 0.02 }));
  assert.equal(ledgerQueueDepth(), 2);
});

test("size-based flush triggers at OMNIROUTE_LEDGER_FLUSH_ROWS", async () => {
  _resetLedgerForTests();
  const prev = process.env.OMNIROUTE_LEDGER_FLUSH_ROWS;
  process.env.OMNIROUTE_LEDGER_FLUSH_ROWS = "3";
  delete process.env.OMNIROUTE_LEDGER_FLUSH_MS;
  try {
    enqueueCostEvent(makeInput({ costUsd: 0.01 }));
    enqueueCostEvent(makeInput({ costUsd: 0.02 }));
    assert.equal(ledgerQueueDepth(), 2);
    enqueueCostEvent(makeInput({ costUsd: 0.03 }));
    await new Promise((r) => setImmediate(r));
    assert.equal(ledgerQueueDepth(), 0);
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_LEDGER_FLUSH_ROWS;
    else process.env.OMNIROUTE_LEDGER_FLUSH_ROWS = prev;
  }
});
test("flush writes through recordCostEvent without errors", async () => {
  _resetLedgerForTests();
  const prevRows = process.env.OMNIROUTE_LEDGER_FLUSH_ROWS;
  process.env.OMNIROUTE_LEDGER_FLUSH_ROWS = "5";
  try {
    for (let i = 0; i < 5; i++) {
      enqueueCostEvent(makeInput({ costUsd: 0.001 * (i + 1) }));
    }
    await new Promise((r) => setImmediate(r));
    assert.equal(ledgerQueueDepth(), 0);
  } finally {
    if (prevRows === undefined) delete process.env.OMNIROUTE_LEDGER_FLUSH_ROWS;
    else process.env.OMNIROUTE_LEDGER_FLUSH_ROWS = prevRows;
  }
});
